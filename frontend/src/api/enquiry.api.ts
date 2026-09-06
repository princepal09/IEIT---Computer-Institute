import api from "@/lib/axios";
import { EnquiryResponse } from "@/types/enquiry";
import { AdminEnquiry, EnquiriesResponse, UpdateEnquiryPayload } from "@/types/enquiryDashboard";
import { EnquiryFormValues } from "@/validations/enquiry.schema";

export const createEnquiry = async (data: EnquiryFormValues) :  Promise<EnquiryResponse>=> {
  const response = await api.post<EnquiryResponse>("/enquiries/create", data);
  return response.data;
};


/*
 * Get all enquiries
 */
export const getAdminEnquiries = async (): Promise<AdminEnquiry[]> => {
  const response = await api.get<EnquiriesResponse>(
    "/enquiries/all"
  );

  return response.data.data;
};

/*
 * Get single enquiry
 */
export const getAdminEnquiry = async (
  enquiryId: string
): Promise<AdminEnquiry> => {
  const response = await api.get<EnquiryResponse>(
    `/enquiries/${enquiryId}`
  );

  return response.data.data;
};

/*
 * Update enquiry status
 */
export const updateAdminEnquiry = async (
  enquiryId: string,
  data: UpdateEnquiryPayload
): Promise<AdminEnquiry> => {
  const response = await api.patch<EnquiryResponse>(
    `/enquiries/update/${enquiryId}`,
    data
  );

  return response.data.data;
};

/*
 * Delete enquiry
 */
export const deleteAdminEnquiry = async (
  enquiryId: string
): Promise<AdminEnquiry> => {
  const response = await api.delete<EnquiryResponse>(
    `/enquiries/delete/${enquiryId}`
  );

  return response.data.data;
};