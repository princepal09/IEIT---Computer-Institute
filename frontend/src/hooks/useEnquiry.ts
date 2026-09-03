import { createEnquiry } from "@/api/enquiry.api"
import { useMutation } from "@tanstack/react-query"


export const useEnquiry = () => {
    return useMutation({
        mutationFn : createEnquiry
    })
    
}