import {ApiProperty} from "@nestjs/swagger";
import {RefreshTokenForm} from "../domain/refresh-token-form";
import { IsNotEmpty, IsString } from "class-validator";

export class RefreshTokenFormDto {
    @ApiProperty({
        example: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjE2YjY0Y2E2LWY2YzItNDYyNy1iZTg4LTU0Y2I4Y2I5YzA0NyJ9.eyJqdGkiOiI4Y2E3YjYxMi1lZjM0LTQ0ZTAtYmJlZi1hZTc3MjBiZTI0NzgiLCJleHAiOjE2OTg5MjU0MDAsIm5iZiI6MCwiaWF0IjoxNjk4OTI1MTAwLCJpc3MiOiJodHRwczovL2tleWNsb2FrLmlvL2F1dGgvcmVhbG1zL2V2ZW50LXdlYiIsImF1ZCI6ImV2ZW50LXdlYiIsInN1YiI6IjQzZDIxODQyLTU3YzItNDkyMy1iMDRlLTU3ZjM4MjVlYjI0MiIsInR5cCI6IlJlZnJlc2hUb2tlbiIsImF6cCI6ImV2ZW50LXdlYiIsInNlc3Npb25fc3RhdGUiOiI2MWFhYjhiYS1mZjhiLTQyZTAtYmJlYS1hZjYyMGU4YjI0NzQiLCJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vZGV2LWtleWNsb2FrLmlvOmQ0NDMiXSwicmVzb3VyY2VzIjpbeyJyb3V0ZSI6Ii8iLCJwcmVmZXJyZWRfZm9yIjoiIn1dfQ.MEYCIQDfXoXHk7mX8R9w8KXHhT0pKfW8nqvPp7xHkOaH7vUuDQIhAIpXb7rC4b4r8rXW9u4jO7cO4X1v5mX0u1y9nU9cY5lG',
        description: 'Refresh token provided during authentication',
    })
    @IsString()
    @IsNotEmpty()
    refreshToken: string;

    public static toRefreshTokenForm(refreshTokenFormDto: RefreshTokenFormDto): RefreshTokenForm {
        return {
            refreshToken: refreshTokenFormDto.refreshToken,
        };
    }
}
