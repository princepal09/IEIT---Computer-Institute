import { getPublishedNotices } from "@/api/notice.api";
import { useQuery } from "@tanstack/react-query";

export const noticeKeys = {
  published: ["published-notices"] as const,
};

export const usePublishedNotices = () => {
  return useQuery({
    queryKey: noticeKeys.published,
    queryFn: getPublishedNotices,
  });
};
