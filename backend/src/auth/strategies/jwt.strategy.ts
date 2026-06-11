import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UserService) {
    super({
      // Récupère le token depuis le header "Authorization: Bearer <TOKEN>"
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // Valeur de secours identique à celle définie dans votre AuthModule
      secretOrKey: process.env.JWT_SECRET || 'SECRET_DE_SECOURS',
    });
  }

  async validate(payload: any) {
    // payload.sub contient l'_id de l'utilisateur généré par generateJwtToken
    const user = await this.usersService.findOneById(payload.sub);

    if (!user) {
      throw new UnauthorizedException('Accès refusé');
    }
    
    // Les informations retournées ici seront accessibles via req.user dans vos contrôleurs
    return { _id: payload.sub, role: user.role };
  }
}
