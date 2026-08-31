import { sendContactAdminEmail } from '../../emails/services/contact.email.js';
import ApiError from '../../utils/AppError.js';
import { IContactRepository } from './contact.interface.js';
import { createContactMessageSchemaDTO, updateContactMessageSchemaDTO } from './contact.schema.js';

export class ContactService {
  constructor(private readonly repo: IContactRepository) {}
  // CREATE CONTACT MESSAGE

  async createContactMessage(data: createContactMessageSchemaDTO) {
    const contactMessage = await this.repo.createContactMessage(data);

    const formattedMesage = this.formatContactMessage(contactMessage);

    //send email to admin
    try {
      await sendContactAdminEmail(formattedMesage);
    } catch (err) {
      console.error('Failed to send contact notification email:', err);
    }

    return formattedMesage;
  }

  // GET ALL CONTACT MESSAGES

  async getAllContactMessages() {
    const messages = await this.repo.findAllContactMessages();

    return messages.map((message) => this.formatContactMessage(message));
  }

  // GET CONTACT MESSAGE BY ID

  async getContactMessageById(id: string) {
    const message = await this.repo.findContactMessageById(id);

    if (!message) {
      throw new ApiError(404, 'Contact message not found');
    }

    return this.formatContactMessage(message);
  }

  // UPDATE CONTACT MESSAGE

  async updateContactMessage(id: string, data: updateContactMessageSchemaDTO) {
    const message = await this.repo.findContactMessageById(id);

    if (!message) {
      throw new ApiError(404, 'Contact message not found');
    }

    const updatedMessage = await this.repo.updateContactMessage(id, data);

    return this.formatContactMessage(updatedMessage);
  }

  // DELETE CONTACT MESSAGE

  async deleteContactMessage(id: string) {
    const message = await this.repo.findContactMessageById(id);

    if (!message) {
      throw new ApiError(404, 'Contact message not found');
    }

    await this.repo.deleteContactMessage(id);
  }

  private formatContactMessage(contactMessage: any) {
    return {
      id: contactMessage.id,

      name: contactMessage.name,

      email: contactMessage.email,

      phone: contactMessage.phone,

      message: contactMessage.message,

      status: contactMessage.status,

      createdAt: contactMessage.createdAt,

      updatedAt: contactMessage.updatedAt,
    };
  }
}
