import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'The email address of the user',
    example: 'test@example.com', // Example email for the Swagger UI
  })
  emailId: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123', // Example password for Swagger UI
  })
  password: string;
}
