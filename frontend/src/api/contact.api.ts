import api from "@/lib/axios";

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const sendContactMessage = async (data: ContactPayload) => {
  const response = await api.post("/contact", data);
  return response?.data;
};
