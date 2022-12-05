import { IsString, IsNotEmpty } from 'class-validator';

export class GenerateTokenDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
