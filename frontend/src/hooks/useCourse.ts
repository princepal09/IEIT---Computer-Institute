import { useQuery } from "@tanstack/react-query";

import { getCourseBySlug } from "@/api/course.api";


export const useCourse = (courseSlug : string) => {
    return useQuery({
        queryKey : ["course", courseSlug],
        queryFn : () => getCourseBySlug(courseSlug),
        enabled : Boolean(courseSlug)
    })

}