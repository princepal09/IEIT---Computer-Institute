import { useMemo, useState } from "react";
import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { useCourses } from "@/hooks/useCourses";

import CourseCard from "./CourseCard";
import CourseCardSkeleton from "@/components/shared/skeletons/CourseCardSkeleton";

const CoursesSection = () => {
  const { data, isLoading, isError } = useCourses();

  const [activeCategory, setActiveCategory] = useState("All");

  const courses = data?.data ?? [];

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(courses.map((course) => course.category))
    );

    return ["All", ...uniqueCategories];
  }, [courses]);

  const filteredCourses =
    activeCategory === "All"
      ? courses
      : courses.filter((course) => course.category === activeCategory);

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ieit-blue">
              Learn. Practice. Grow.
            </p>

            <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Courses built for your future.
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-[15px]">
              Explore computer, office, programming, and professional courses
              designed to build practical skills for education and careers.
            </p>
          </div>

          <Link
            to="/courses"
            className="
              group
              inline-flex
              w-fit
              items-center
              text-xs
              font-semibold
              text-ieit-blue
            "
          >
            View all courses
            <ArrowRightIcon
              className="
                ml-1.5
                size-3.5
                transition-transform
                duration-200
                group-hover:translate-x-1
              "
            />
          </Link>
        </div>

        {/* Categories */}
        {!isLoading && !isError && categories.length > 1 && (
          <div className="mt-8 flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => {
              const active = category === activeCategory;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`
                    whitespace-nowrap
                    rounded-lg
                    px-4
                    py-2
                    text-xs
                    font-semibold
                    transition-colors
                    ${
                      active
                        ? "bg-slate-950 text-white"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-950"
                    }
                  `}
                >
                  {category}
                </button>
              );
            })}
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <CourseCardSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-6 py-8 text-center">
            <p className="text-sm font-semibold text-red-700">
              Unable to load courses.
            </p>

            <p className="mt-1 text-xs text-red-500">Please try again later.</p>
          </div>
        )}

        {/* Courses */}
        {!isLoading && !isError && filteredCourses.length > 0 && (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && filteredCourses.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
            <p className="text-sm font-semibold text-slate-700">
              No courses available.
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Please check another category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CoursesSection;
