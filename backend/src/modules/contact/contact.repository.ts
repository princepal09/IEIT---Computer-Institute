import { prisma } from '../../lib/prisma.js';
import { IContactRepository } from './contact.interface.js';
import { createContactMessageSchemaDTO, updateContactMessageSchemaDTO } from './contact.schema.js';

export class ContactRepository implements IContactRepository{
  async createContactMessage(data: createContactMessageSchemaDTO): Promise<any> {
    return prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
      },
    });
  }

  async findAllContactMessages(): Promise<any[]> {
    return prisma.contactMessage.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findContactMessageById(id: string): Promise<any | null> {
    return prisma.contactMessage.findUnique({
      where: {
        id,
      },
    });
  }
  async updateContactMessage(id: string, data: updateContactMessageSchemaDTO): Promise<any> {
    return prisma.contactMessage.update({
      where: {
        id,
      },
      data: {
        status: data.status,
      },
    });
  }

  async deleteContactMessage(id: string): Promise<any> {
    return prisma.contactMessage.delete({
      where: {
        id,
      },
    });
  }
}
