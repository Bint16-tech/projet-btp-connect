import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
  private googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // 1. Validation de la connexion Email / Mot de passe
  async validateUser(dto: LoginDto): Promise<any> {
    const email = dto.email;
    const user = await this.userModel
      .findOne({ email })
      .select('+password')
      .exec();
      
    if (!user)
      throw new UnauthorizedException('Mot de passe ou Email Invalide');

    // Si l'utilisateur n'a pas de mot de passe (inscrit uniquement via Google)
    if (!user.password && user.googleId) {
      throw new UnauthorizedException(
        'Cet email est associé à une connexion Google. Veuillez vous connecter avec Google.',
      );
    }

    const isCorrectPassword = await bcrypt.compare(dto.password, user.password);

    if (!isCorrectPassword) {
      throw new UnauthorizedException('Mot de passe ou Email Invalide');
    }

    return {
      _id: user._id,
    };
  }

  // 2. Validation du token Google (Flux Expo) + Inscription automatique
  async validateGoogleToken(idToken: string): Promise<any> {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken: idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      
      if (!payload) {
        throw new UnauthorizedException('Jeton Google invalide');
      }

      const { email, name, picture, sub: googleId } = payload;

      // Recherche de l'utilisateur existant par son email
      let user = await this.userModel.findOne({ email }).exec();

      if (!user) {
        // L'utilisateur n'existe pas : on l'inscrit automatiquement
        // Le mot de passe reste indéfini puisqu'il passe par Google
        user = new this.userModel({
          email,
          name, // Assurez-vous que votre schéma accepte 'name' ou 'username'
          image: picture || 'uploads/users/default_users.png',
          googleId,
        });
        await user.save();
      } else if (!user.googleId) {
        // Sécurité : Si le compte existait par email/password mais n'avait pas encore de googleId,
        // on lie son identifiant Google pour les prochaines connexions.
        user.googleId = googleId;
        if (!user.image || user.image === 'uploads/users/default_users.png') {
          user.image = picture;
        }
        await user.save();
      }

      // On retourne uniquement l'objet contenant l'_id attendu par le contrôleur
      return {
        _id: user._id,
      };

    } catch (error) {
      throw new UnauthorizedException('Échec de la validation Google');
    }
  }

  // 3. Génération du jeton JWT de l'API
  async generateJwtToken(userId: any): Promise<string> {
    const payload = { sub: userId.toString() };
    return this.jwtService.signAsync(payload);
  }

  // 4. Inscription classique (Formulaire)
  async create(createUserDto: CreateUserDto) {
    const { password_confirm, ...dto } = createUserDto;
    if (dto.password !== password_confirm) {
      throw new BadRequestException(
        'Les mots de passe doivent être identiques',
      );
    }
    const email = dto.email;

    const userExists = await this.userModel.findOne({ email });
    if (userExists) {
      throw new BadRequestException('Cette adresse email est déjà utilisée');
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(dto.password, salt);
    dto.password = hashedPassword;
    
    const newUser = new this.userModel(dto);
    const save = await newUser.save();
    
    return { _id: save._id };
  }
}
