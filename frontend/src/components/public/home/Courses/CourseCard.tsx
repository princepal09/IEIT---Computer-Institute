import { motion } from "motion/react";
import { ArrowUpRightIcon } from "lucide-react";
import { Course } from "@/types/homeCourses";


type CourseCardProps = {
  course: Course;
};

const CourseCard = ({ course }: CourseCardProps) => {
  const variantStyles = {
    blue: {
      card: "bg-[#075fbe] text-white",
      icon: "bg-white/10 text-white",
      description: "text-white/70",
    },

    lime: {
      card: "bg-[#eef0f0] text-slate-900",
      icon: "bg-lime-300 text-slate-900",
      description: "text-slate-600",
    },

    neutral: {
      card: "bg-[#f1f2f2] text-slate-900",
      icon: "bg-white text-slate-700",
      description: "text-slate-500",
    },
  };

  const styles = variantStyles[course.variant ?? "neutral"];

  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25 }}
      className={`group relative flex min-h-[181px] flex-col justify-between overflow-hidden rounded-[18px] p-5 ${styles.card}`}
    >
      {/* Icon */}
      <div
        className={`flex size-10 items-center justify-center rounded-xl ${styles.icon}`}
      >
        <span className="font-mono text-xs font-semibold">
          {course.icon}
        </span>
      </div>

      {/* Content */}
      <div>
        <h3 className={`text-[16px] ${course.id === 'cloud' && "text-white"}  font-bold leading-tight tracking-[-0.02em]`}>
          {course.title}
        </h3>

        {course.description && (
          <p
            className={`mt-1.5 max-w-[270px] text-[10px] leading-4 ${styles.description}`}
          >
            {course.description}
          </p>
        )}

        {course.subtitle && (
          <p
            className={`mt-1 font-mono text-[9px] ${
              course.variant === "blue"
                ? "text-white/60"
                : "text-slate-500"
            }`}
          >
            {course.subtitle}
          </p>
        )}
      </div>

      {/* Hover arrow */}
      <div className="absolute right-4 top-4 opacity-0 transition-all duration-200 group-hover:opacity-100">
        <ArrowUpRightIcon className="size-3.5" />
      </div>
    </motion.article>
  );
};

export default CourseCard;