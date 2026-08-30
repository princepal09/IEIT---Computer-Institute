import { Resend } from 'resend';

import environment from '../config/config.js';

const resend = new Resend(environment.RESEND_API_KEY);

export default resend;
