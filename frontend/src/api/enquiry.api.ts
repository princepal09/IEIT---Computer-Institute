import api from "@/lib/axios";
import { EnquiryResponse } from "@/types/enquiry";
import { EnquiryFormValues } from "@/validations/enquiry.schema";

export const createEnquiry = async (data: EnquiryFormValues) :  Promise<EnquiryResponse>=> {
  const response = await api.post<EnquiryResponse>("/enquiries/create", data);
  return response.data;
};


