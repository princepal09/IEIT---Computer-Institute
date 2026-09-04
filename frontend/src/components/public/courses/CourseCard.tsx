import { ArrowRightIcon, Clock3Icon, GraduationCapIcon } from "lucide-react";

import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import type { Course } from "@/types/course";

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  console.log(course)
  const fee = Number(course.fee);
  const discountPercent = Number(course.discountPercent);
  const originalFee = Number(course.originalFee);

  const hasDiscount =
    Number.isFinite(originalFee) &&
    Number.isFinite(fee) &&
    originalFee > fee &&
    discountPercent > 0;

  return (
    <Card
      className="
        group
        overflow-hidden
        rounded-2xl
        border-slate-200
        bg-white
        shadow-sm
        transition-shadow
        duration-200
        hover:shadow-md
      "
    >
      <CardContent className="p-0">
        {/* Top section */}
        <div className="border-b border-slate-100 p-6">
          <div className="flex items-start justify-between gap-4">
            <Badge
              variant="secondary"
              className="
                rounded-md
                border-0
                bg-blue-50
                px-2.5
                py-1
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.08em]
                text-ieit-blue
              "
            >
              {course.category}
            </Badge>

            <span className="text-xs font-medium text-slate-400">
              {course.duration}
            </span>
          </div>

          <h3
            className="
              mt-5
              text-xl
              font-extrabold
              tracking-[-0.03em]
              text-slate-900
            "
          >
            {course.name}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {course.shortDescription}
          </p>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 divide-x divide-slate-100 border-b border-slate-100">
          {/* Duration */}
          <div className="p-5">
            <div className="flex items-center gap-2 text-slate-400">
              <Clock3Icon className="size-4" />

              <span className="text-[11px] font-semibold uppercase tracking-wide">
                Duration
              </span>
            </div>

            <p className="mt-2 text-sm font-bold text-slate-800">
              {course.duration}
            </p>
          </div>

          {/* Eligibility */}
          <div className="p-5">
            <div className="flex items-center gap-2 text-slate-400">
              <GraduationCapIcon className="size-4" />

              <span className="text-[11px] font-semibold uppercase tracking-wide">
                Eligibility
              </span>
            </div>

            <p className="mt-2 text-sm font-bold text-slate-800">
              {course.eligibility}
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between gap-4 p-5">
          {/* Price */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">
              Course Fee
            </p>

            <div className="mt-1 flex flex-wrap items-center gap-2">
              {/* Original / Cut Price */}
              {hasDiscount && (
                <span className="text-sm font-medium text-slate-400 line-through">
                  ₹{originalFee.toLocaleString("en-IN")}
                </span>
              )}

              {/* Actual Price */}
              <span className="text-lg font-extrabold text-slate-900">
                ₹{fee.toLocaleString("en-IN")}
              </span>

              {/* Discount */}
              {discountPercent > 0 && (
                <span
                  className="
                    rounded-md
                    bg-emerald-50
                    px-2
                    py-1
                    text-[10px]
                    font-bold
                    text-emerald-600
                  "
                >
                  {discountPercent}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Enquire */}
          <Link
            to={`/courses/${course.slug}`}
            className="
              inline-flex
              h-9
              shrink-0
              items-center
              rounded-lg
              bg-ieit-blue
              px-4
              text-xs
              font-semibold
              text-white
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:bg-ieit-blue/90
              hover:shadow-md
            "
          >
            Enquire
            <ArrowRightIcon className="ml-1.5 size-3.5" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
