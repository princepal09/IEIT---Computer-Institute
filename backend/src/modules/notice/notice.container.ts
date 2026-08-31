import { NoticeRepository } from './notice.repository.js';

import { NoticeService } from './notice.service.js';

const noticeRepository = new NoticeRepository();

const noticeService = new NoticeService(noticeRepository);

export default noticeService;