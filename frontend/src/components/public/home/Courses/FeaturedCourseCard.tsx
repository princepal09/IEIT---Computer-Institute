import { motion } from "motion/react";
import { ArrowUpRightIcon, Code2Icon } from "lucide-react";
import { Course } from "@/types/homeCourses";


type FeaturedCourseCardProps = {
  course: Course;
};

const FeaturedCourseCard = ({
  course,
}: FeaturedCourseCardProps) => {
  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
      className="group relative flex min-h-[380px] flex-col justify-between overflow-hidden rounded-[20px] bg-[#eef0f0] p-5 sm:p-6"
    >
      {/* Soft green glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-emerald-200/35 blur-3xl transition-transform duration-500 group-hover:scale-110"
      />

      {/* Top */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="rounded-full bg-[#dce9e5] px-3 py-1.5 font-mono text-[9px] font-medium text-[#16443d]">
          {course.category}
        </span>

        <span className="flex size-8 items-center justify-center rounded-full bg-white text-[#16443d] shadow-sm">
          <Code2Icon className="size-3.5" />
        </span>
      </div>

      {/* Bottom content */}
      <div className="relative z-10 mt-auto">
        <h3 className="max-w-[420px] text-2xl font-extrabold leading-tight tracking-[-0.035em] text-slate-900 sm:text-[25px]">
          {course.title}
        </h3>

        <p className="mt-3 max-w-[390px] text-[13px] leading-5 text-slate-600">
          {course.description}
        </p>

        <div className="mt-5 flex items-center gap-2">
          {course.duration && (
            <span className="rounded-md bg-white/80 px-2.5 py-1.5 font-mono text-[8px] text-slate-600">
              {course.duration}
            </span>
          )}

          {course.type && (
            <span className="rounded-md bg-white/80 px-2.5 py-1.5 font-mono text-[8px] text-slate-600">
              {course.type}
            </span>
          )}
        </div>
      </div>

      {/* Hover arrow */}
      <div className="absolute bottom-5 right-5 flex size-8 items-center justify-center rounded-full bg-white opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100">
        <ArrowUpRightIcon className="size-3.5" />
      </div>
    </motion.article>
  );
};

export default FeaturedCourseCard;