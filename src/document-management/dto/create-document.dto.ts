import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, isNotEmpty } from 'class-validator';

export class CreateDocumentDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The title of the document',
    example: 'Sample Document',
})
  title: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'A short description about the document',
    example: 'This is same description of the document',
  })
  description: string;
}
