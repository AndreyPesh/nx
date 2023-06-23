import { IsEmail, IsNotEmpty, Max, Min } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  // @Min(5)
  // @Max(20)
  password: string;
}
