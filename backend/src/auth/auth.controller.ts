import {
  Body,
  Controller,
  FileTypeValidator,
  FileValidator,
  Get,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { diskStorage } from 'multer';
import { extname } from 'node:path';
import { FileInterceptor } from '@nestjs/platform-express';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';

class CustomImageValidator extends FileValidator {
  constructor() {
    super({});
  }

  isValid(file: Express.Multer.File): boolean {
    if (!file) return true;
    const validMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    return validMimeTypes.includes(file.mimetype);
  }

  buildErrorMessage(): string {
    return 'Le fichier doit être une image au format PNG, JPG ou JPEG.';
  }
}

const userStorage = diskStorage({
  destination: './uploads/users',
  filename: (req, file, callback) => {
    const uniqueName = `user_${Date.now()}${extname(file.originalname)}`;
    callback(null, uniqueName);
  },
});

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto);
    const token = await this.authService.generateJwtToken(user._id);
    return {
      message: 'Utilisateur Authentifié',
      _id: user._id,
      token,
    };
  }

  @Post('register')
  @UseInterceptors(FileInterceptor('image', { storage: userStorage }))
  async register(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 5242880,
            message: 'Le fichier est trop lourd (max 5Mo)',
          }),

          new CustomImageValidator(),
        ],
        fileIsRequired: false,
      }),
    )
    file?: Express.Multer.File,
  ) {
    if (file) {
      createUserDto.image = `uploads/users/${file.filename}`;
    } else {
      createUserDto.image = 'uploads/users/default_users.png';
    }
    const user = await this.authService.create(createUserDto);
    return {
      message: 'Utilisateur Inscrit',
      _id: user._id,
    };
  }

  @Post('logout')
  logout() {
    return { message: 'Deconnexion réussie' };
  }

  @Post('google')
  @HttpCode(HttpStatus.OK)
  async googleAuth(@Body('token') token: string) {
    // 1. Valide le token reçu d'Expo et récupère ou crée l'utilisateur en BDD
    const user = await this.authService.validateGoogleToken(token);
    
    // 2. Génère votre JWT d'API (exactement comme pour le login classique)
    const apiToken = await this.authService.generateJwtToken(user._id);
    
    // 3. Renvoie une réponse harmonisée avec la route 'login'
    return {
      message: 'Utilisateur Authentifié via Google',
      _id: user._id,
      token: apiToken,
    };
  }
}
}
