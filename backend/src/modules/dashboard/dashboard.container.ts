import { DashboardRepository } from './dashboard.repository.js';
import { DashboardService } from './dashboard.service.js';

const dashboardRepository = new DashboardRepository();

const dashboardService = new DashboardService(dashboardRepository);

export { dashboardService };
