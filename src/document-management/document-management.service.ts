import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document-entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class DocumentManagementService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
    private usersService: UsersService,
  ) {}

  async createDocument(req, createDocumentDto: CreateDocumentDto, filePath: string): Promise<Document> {
    const user = await this.usersService.findOne(req.user.emailId);
    const userId = user.id
    if(req.user.role !='admin') {
        const documentCount = await this.documentRepository.count({ where: { userId} });
        if(documentCount >= 2) {//Only ADmin is allowed to create more than 2 documents
            throw new HttpException("Document Creation Limit Reached", HttpStatus.CONFLICT)
        }
    }
    let createDcoumentData = { ...createDocumentDto, userId:user.id, filePath }
    const document = this.documentRepository.create(createDcoumentData);
    return this.documentRepository.save(document);
  }

  async getAllDocuments(): Promise<Document[]> {
    return this.documentRepository.find();
  }

  async getDocumentById(id: string): Promise<Document> {
    const document = await this.documentRepository.findOne({ where: { id } });
    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return document;
  }

  async deleteDocument(id: string): Promise<string> {
    const result = await this.documentRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return "Document Deleted"
  }
}
