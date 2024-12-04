import { IsNotEmpty, isNotEmpty } from 'class-validator';

export class CreateDocumentDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
