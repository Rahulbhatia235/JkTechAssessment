import {Controller,  Get, Post, Patch, Delete, Param, Body, UploadedFile, UseInterceptors, UseGuards, Request} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentManagementService } from './document-management.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('documents')
export class DocumentManagementController {
  constructor(private readonly documentService: DocumentManagementService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {//currently saving locally later in production can saave to s3 url in the Db and save the file in s3
          const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
          callback(null, fileName);
        },
      }),
    }),
  )
  @UseGuards(JwtAuthGuard)
  async createDocument(
    @Request() req,
    @Body() createDocumentDto: CreateDocumentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.documentService.createDocument(req, createDocumentDto, file.path);
  }

  @Get()
  async getAllDocuments() {
    return this.documentService.getAllDocuments();
  }

  @Get(':id')
  async getDocumentById(@Param('id') id: string) {
    return this.documentService.getDocumentById(id);
  }

  @Delete(':id')
  async deleteDocument(@Param('id') id: string) {
    return this.documentService.deleteDocument(id);
  }
}
