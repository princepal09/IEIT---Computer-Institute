export interface IContactResponse {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: 'UNREAD' | 'READ';
  createdAt: Date;
  updatedAt: Date;
}