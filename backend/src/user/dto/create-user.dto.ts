import { Transform } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  Matches,
  IsStrongPassword,
  IsAlphanumeric,
} from 'class-validator';
import * as UserRole from '../enums/role.enum';

export class CreateUserDto {
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: "Le nom d'utilisateur est obligatoire" })
  @IsString({
    message: "Le nom d'utilisateur doit être une chaîne de caractères",
  })
  @IsAlphanumeric('fr-FR', {
    message: 'Le username doit contenir au moins une lettre',
  })
  @Matches(/[a-zA-Z]/, {
    message: 'Le username doit contenir au moins une lettre',
  })
  username!: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: "L'email est obligatoire" })
  @IsEmail(
    { require_tld: true },
    { message: 'Entrez une adresse email valide' },
  )
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'Entrez une adresse email valide',
  })
  @Transform(({ value }) => value.toLowerCase())
  email!: string;

  @IsOptional()
  @IsEnum(UserRole.UserRole)
  role?: UserRole.UserRole;

  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  googleId?: string;

  @IsNotEmpty({ message: 'Le mot de passe est obligatoire' })
  @IsString()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Le mot de passe est trop faible. Il doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un symbole.',
    },
  )
  password!: string;

  @IsNotEmpty({ message: 'Les mots de passe doivent être identiques' })
  @IsString({ message: 'Les mots de passe doivent être identiques' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message: 'Les mots de passe doivent être identiques',
    },
  )
  password_confirm!: string;

  @IsOptional()
  @IsString()
  image?: string;
}
