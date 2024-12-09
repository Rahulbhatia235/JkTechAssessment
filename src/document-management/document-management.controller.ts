import { Controller, Get, Post, Patch, Delete, Param, Body, UploadedFile, UseInterceptors, UseGuards, Request, HttpException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentManagementService } from './document-management.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiOperation, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Document } from './document-entity';

@ApiTags('Documents')
@Controller('documents')
export class DocumentManagementController {
  constructor(private readonly documentService: DocumentManagementService) { }

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
  @ApiOperation({ summary: 'Create a new document' })

  @ApiBody({ type: CreateDocumentDto, description: 'Details of the document to be created' })
  @ApiResponse({
    status: 201,
    description: 'Document successfully created',
    schema: {
      type: 'object', properties: {
        userId: { type: 'string', example: '18' },
        title: { type: 'string', example: 'Sample Document' },
        description: { type: 'string', example: 'This is sample Document' },
        filePath: { type: 'string', example: 'uploads/1d222591-0008-4b26-9e97-39374e07bae1.jpeg' },
        id: { type: 'string', example: '5c319274-4e7b-485d-afbb-a32499908081' },
        created: { type: 'string', example: '2024-12-09T04:13:17.159Z' }
      }
    }
  })

  @ApiResponse({
    status: 400,
    description: 'Error: Document Creation Limit Reached',
  })
  async createDocument(
    @Request() req,
    @Body() createDocumentDto: CreateDocumentDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      return await this.documentService.createDocument(req, createDocumentDto, file.path);
    } catch (exception) {
      throw new HttpException(`Error: ${exception.message}`, exception.status);
    }

  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Retreive all document' })
  @ApiResponse({
    status: 201,
    description: 'Document successfully created',
    schema: {
      type: 'object', properties: {
        userId: { type: 'string', example: '18' },
        title: { type: 'string', example: 'Sample Document' },
        description: { type: 'string', example: 'This is sample Document' },
        filePath: { type: 'string', example: 'uploads/1d222591-0008-4b26-9e97-39374e07bae1.jpeg' },
        id: { type: 'string', example: '5c319274-4e7b-485d-afbb-a32499908081' },
        created: { type: 'string', example: '2024-12-09T04:13:17.159Z' }
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Error: Invalid Access',
  })
  async getAllDocuments(@Request() req) {
    try {
      return await this.documentService.getAllDocuments(req);
    } catch (exception) {
      throw new HttpException(`Error: ${exception.message}`, exception.status);
    }

  }

  @Get(':id')
  async getDocumentById(@Param('id') id: string) {
    try {
      return this.documentService.getDocumentById(id);
    } catch (exception) {
      throw new HttpException(`Error: ${exception.message}`, exception.status);
    }

  }

  @Delete(':id')
  async deleteDocument(@Param('id') id: string) {
    try {
      return this.documentService.deleteDocument(id);
    } catch (exception) {
      throw new HttpException(`Error: ${exception.message}`, exception.status);
    }

  }
}
