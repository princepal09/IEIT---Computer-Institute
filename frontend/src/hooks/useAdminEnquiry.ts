import {
  deleteAdminEnquiry,
  getAdminEnquiry,
  getAdminEnquiries,
  updateAdminEnquiry,
} from "@/api/enquiry.api";
import { UpdateEnquiryPayload } from "@/types/enquiryDashboard";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const adminEnquiryKeys = {
  all: ["admin-enquiries"] as const,

  detail: (enquiryId: string) => ["admin-enquiries", enquiryId] as const,
};

/*
 * Get all enquiries
 */
export const useAdminEnquiries = () => {
  return useQuery({
    queryKey: adminEnquiryKeys.all,
    queryFn: getAdminEnquiries,
  });
};

/*
 * Get single enquiry
 */
export const useAdminEnquiry = (enquiryId: string) => {
  return useQuery({
    queryKey: adminEnquiryKeys.detail(enquiryId),
    queryFn: () => getAdminEnquiry(enquiryId),
    enabled: Boolean(enquiryId),
  });
};

/*
 * Update enquiry status
 */
export const useUpdateAdminEnquiry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      enquiryId,
      data,
    }: {
      enquiryId: string;
      data: UpdateEnquiryPayload;
    }) => updateAdminEnquiry(enquiryId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: adminEnquiryKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: adminEnquiryKeys.detail(variables.enquiryId),
      });
    },
  });
};

/*
 * Delete enquiry
 */
export const useDeleteAdminEnquiry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (enquiryId: string) => deleteAdminEnquiry(enquiryId),

    onSuccess: (_, enquiryId) => {
      queryClient.invalidateQueries({
        queryKey: adminEnquiryKeys.all,
      });

      queryClient.removeQueries({
        queryKey: adminEnquiryKeys.detail(enquiryId),
      });
    },
  });
};
