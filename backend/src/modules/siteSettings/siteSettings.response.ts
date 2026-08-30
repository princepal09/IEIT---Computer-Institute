export interface ISiteSettingsResponse {
  id: string;
  instituteName: string;
  logoUrl: string | null;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  about: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}