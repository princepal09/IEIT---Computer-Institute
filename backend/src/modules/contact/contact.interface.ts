import { createContactMessageSchemaDTO, updateContactMessageSchemaDTO } from './contact.schema.js';

export interface IContactRepository {
  createContactMessage(data: createContactMessageSchemaDTO): Promise<any>;

  findAllContactMessages(): Promise<any[]>;

  findContactMessageById(id: string): Promise<any | null>;

  updateContactMessage(id: string, data: updateContactMessageSchemaDTO): Promise<any>;

  deleteContactMessage(id: string): Promise<any>;
}


