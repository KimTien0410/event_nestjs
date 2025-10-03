import { ApiProperty } from '@nestjs/swagger';
import { GoogleTokenForm } from '../domain/google-token-form';
import { IsString } from 'class-validator';

export class GoogleTokenFormDto {
  @ApiProperty({
    example: "xxxxxxxxxxxxxxxxxxxxxx",
    description:" ID Token"
  })
  @IsString()
  
  idToken: string;

  @ApiProperty({
    example: "Xxxxxxxxxxxxxxxxxxx",
    description: "Access Token"
  })
  @IsString()
  accessToken: string;

  public static toGoogleTokenForm(dto: GoogleTokenFormDto): GoogleTokenForm {
    return {
      idToken: dto.idToken,
      accessToken: dto.accessToken,
    };
  }
}
