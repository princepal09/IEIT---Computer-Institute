import api from "@/lib/axios";
import {
  AdminContactMessage,
  ContactMessageResponse,
  ContactMessagesResponse,
  UpdateContactMessagePayload,
} from "@/types/contactDashboard";

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const sendContactMessage = async (data: ContactPayload) => {
  const response = await api.post("/contact/create", data);
  return response?.data;
};

/*
 * Get all contact messages
 */
export const getAdminContactMessages = async (): Promise<
  AdminContactMessage[]
> => {
  const response = await api.get<ContactMessagesResponse>("/contact/all");

  return response.data.data;
};

/*
 * Get single contact message
 */
export const getAdminContactMessage = async (
  contactId: string
): Promise<AdminContactMessage> => {
  const response = await api.get<ContactMessageResponse>(
    `/contact/${contactId}`
  );

  return response.data.data;
};

/*
 * Update contact message status
 */
export const updateAdminContactMessage = async (
  contactId: string,
  data: UpdateContactMessagePayload
): Promise<AdminContactMessage> => {
  const response = await api.patch<ContactMessageResponse>(
    `/contact/update/${contactId}`,
    data
  );

  return response.data.data;
};

/*
 * Delete contact message
 */
export const deleteAdminContactMessage = async (
  contactId: string
): Promise<AdminContactMessage> => {
  const response = await api.delete<ContactMessageResponse>(
    `/contact/delete/${contactId}`
  );

  return response.data.data;
};
