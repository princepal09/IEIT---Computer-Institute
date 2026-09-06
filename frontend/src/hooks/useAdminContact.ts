import {
  deleteAdminContactMessage,
  getAdminContactMessage,
  getAdminContactMessages,
  updateAdminContactMessage,
} from "@/api/contact.api";
import { UpdateContactMessagePayload } from "@/types/contactDashboard";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";



export const adminContactKeys = {
  all: ["admin-contact"] as const,

  detail: (contactId: string) =>
    ["admin-contact", contactId] as const,
};

/*
 * Get all contact messages
 */
export const useAdminContactMessages = () => {
  return useQuery({
    queryKey: adminContactKeys.all,
    queryFn: getAdminContactMessages,
  });
};

/*
 * Get one contact message
 */
export const useAdminContactMessage = (contactId: string) => {
  return useQuery({
    queryKey: adminContactKeys.detail(contactId),
    queryFn: () => getAdminContactMessage(contactId),
    enabled: Boolean(contactId),
  });
};

/*
 * Update contact status
 */
export const useUpdateAdminContactMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      contactId,
      data,
    }: {
      contactId: string;
      data: UpdateContactMessagePayload;
    }) => updateAdminContactMessage(contactId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: adminContactKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: adminContactKeys.detail(
          variables.contactId
        ),
      });
    },
  });
};

/*
 * Delete contact message
 */
export const useDeleteAdminContactMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (contactId: string) =>
      deleteAdminContactMessage(contactId),

    onSuccess: (_, contactId) => {
      queryClient.invalidateQueries({
        queryKey: adminContactKeys.all,
      });

      queryClient.removeQueries({
        queryKey: adminContactKeys.detail(contactId),
      });
    },
  });
};