import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class LoginDto {
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsNotEmpty({ message: 'mot de passe ou email incorrect' })
  @IsEmail(
    { require_tld: true },
    { message: 'mot de passe ou email incorrect' },
  )
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'mot de passe ou email incorrect',
  })
  @Transform(({ value }) => typeof value === 'string' ? value.toLowerCase() : value)
  email!: string;

  @IsNotEmpty({ message: 'mot de passe ou email incorrect' })
  @IsString({ message: 'mot de passe ou email incorrect' })
  password!: string; // Plus de IsStrongPassword ici, uniquement au Register
}
