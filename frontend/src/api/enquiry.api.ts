import api from "@/lib/axios";
import { EnquiryFormValues } from "@/types/enquiry.schema";


export const createEnquiry = async(data:EnquiryFormValues) => {
    const response = await api.post("/enquiries/create", data);
    return response.data;

}