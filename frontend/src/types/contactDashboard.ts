export type ContactStatus = "UNREAD" | "READ";

export interface AdminContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  status: ContactStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessagesResponse {
  success: boolean;
  message: string;
  data: AdminContactMessage[];
}

export interface ContactMessageResponse {
  success: boolean;
  message: string;
  data: AdminContactMessage;
}

export interface UpdateContactMessagePayload {
  status: ContactStatus;
}