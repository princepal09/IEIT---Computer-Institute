import { ContactPayload, sendContactMessage } from "@/api/contact.api";
import { useMutation } from "@tanstack/react-query";



export const useContact = () => {
    return useMutation({
            mutationFn : (data:ContactPayload) => sendContactMessage(data)
    })
}