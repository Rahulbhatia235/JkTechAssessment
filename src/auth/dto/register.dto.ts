import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
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

  @ApiProperty({
    description: 'The userName of the user',
    example: 'Test user',
  })
  userName: string

  @ApiProperty({
    description: 'The role of the user',
    example: 'user', 
  })
  role: string;

}
