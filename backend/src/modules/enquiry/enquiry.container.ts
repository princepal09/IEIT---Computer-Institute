import { EnquiryRepository } from './enquiry.repository.js';

import { EnquiryService } from './enquiry.service.js';

const enquiryRepository = new EnquiryRepository();

const enquiryService = new EnquiryService(enquiryRepository);

export default enquiryService;
