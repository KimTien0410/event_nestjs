import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString, Length } from "class-validator";
import { Gender } from "src/modules/user/domain/gender";
import { UpdateProfileForm } from "../domain/update-profile-form";

export class UpdateProfileFormDto {
    @ApiProperty({
        example: 'John',
        description: 'First name of the user',
    })
    @IsString()
    @IsOptional()
    firstName?: string;

    @ApiProperty({
        example: 'Doe',
        description: 'Last name of the user',
    })
    @IsString()
    @IsOptional()
    lastName?: string;

    @ApiProperty({
        example: 'https://example.com/picture.jpg',
        description: 'Profile picture URL of the user',
    })
    @IsString()
    @IsOptional()
    picture?: string;

    @ApiProperty({
        example: 'male',
        description: 'Gender of the user',
        enum: Gender,
    })
    @IsOptional()
    @IsEnum(Gender)
    gender?: Gender;

    @ApiProperty({
        example: '1990-01-01',
        description: 'Birthday of the user',
    })
    @IsString()
    @IsOptional()
    birthday?: string;

    @ApiProperty({
        example: '+1234567890',
        description: 'Phone number of the user',
    })
    @IsString()
    @IsOptional()
    @Length(10)
    phoneNumber?: string;

    static toUpdateProfileForm(updateProfileFormDto: UpdateProfileFormDto): UpdateProfileForm {
        return {
            firstName: updateProfileFormDto.firstName,
            lastName: updateProfileFormDto.lastName,
            gender: updateProfileFormDto.gender,
            picture: updateProfileFormDto.picture,
            birthday: updateProfileFormDto.birthday,
            phoneNumber: updateProfileFormDto.phoneNumber,
        };
    }
}