import { SiteSettingsRepository } from './siteSettings.repository.js';
import { SiteSettingsService } from './siteSettings.service.js';
import { SiteSettingsController } from './siteSettings.controller.js';

const siteSettingsRepository = new SiteSettingsRepository();

const siteSettingsService = new SiteSettingsService(siteSettingsRepository);

const siteSettingsController = new SiteSettingsController(siteSettingsService);

export default siteSettingsController;
