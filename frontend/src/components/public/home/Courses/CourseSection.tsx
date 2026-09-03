import { motion } from "motion/react";
import { ArrowRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

import FeaturedCourseCard from "./FeaturedCourseCard";
import CourseCard from "./CourseCard";

import { homeCourses } from "@/types/homeCourses";

const CoursesSection = () => {
  const featuredCourse = homeCourses.find((course) => course.featured);

  const secondaryCourses = homeCourses.filter((course) => !course.featured);

  return (
    <section className="relative overflow-hidden bg-[#f7f9f8] py-20 sm:py-24 lg:py-28">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-72
          w-72
          -translate-x-1/2
          rounded-full
          bg-blue-100/20
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className="text-center"
        >
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[#16443d]">
            Curriculum
          </p>

          <h2 className="mt-2 text-4xl font-extrabold tracking-[-0.045em] text-slate-900 sm:text-5xl">
            Explored courses
          </h2>
        </motion.div>

        {/* Course Grid */}
        <div className="mt-12 grid gap-4 lg:grid-cols-[1.05fr_1fr]">
          {/* Featured Course */}
          {featuredCourse && <FeaturedCourseCard course={featuredCourse} />}

          {/* Secondary Courses */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {secondaryCourses.map((course, index) => (
              <div
                key={course.id}
                className={index === 0 ? "sm:col-span-2" : "sm:col-span-1"}
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>

        {/* Explore More */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: 0.15,
            ease: "easeOut",
          }}
          className="mt-10 flex justify-center"
        >
          <Link
            to="/courses"
            className="
              group
              inline-flex
              items-center
              gap-2
              rounded-md
              border
              border-slate-300
              bg-white
              px-5
              py-2.5
              font-mono
              text-[10px]
              font-medium
              text-slate-700
              shadow-sm
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:border-ieit-blue
              hover:text-ieit-blue
              hover:shadow-md
            "
          >
            Explore More Courses
            <ArrowRightIcon
              className="
                size-3.5
                transition-transform
                duration-200
                group-hover:translate-x-1
              "
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CoursesSection;
