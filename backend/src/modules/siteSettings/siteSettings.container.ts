import { SiteSettingsRepository } from './siteSettings.repository.js';
import { SiteSettingsService } from './siteSettings.service.js';

const siteSettingsRepository = new SiteSettingsRepository();

const siteSettingsService = new SiteSettingsService(siteSettingsRepository);


export default siteSettingsService;
