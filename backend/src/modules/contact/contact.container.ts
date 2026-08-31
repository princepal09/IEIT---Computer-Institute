import { ContactRepository } from './contact.repository.js';

import { ContactService } from './contact.service.js';

const contactRepository = new ContactRepository();

const contactService = new ContactService(contactRepository);

export default contactService;
