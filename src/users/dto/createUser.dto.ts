import { ApiProperty } from '@nestjs/swagger';


export class CreateUserDto {
    @ApiProperty({
        description: 'The userName to be updated of the Logged In user',
        example: 'test User 2', // Example email for the Swagger UI
      })
      userName: string;
  }