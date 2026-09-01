import { GalleryRepository } from './gallery.repository.js';

import { GalleryService } from './gallery.service.js';

const galleryRepository = new GalleryRepository();

const galleryService = new GalleryService(galleryRepository);

export default galleryService;
