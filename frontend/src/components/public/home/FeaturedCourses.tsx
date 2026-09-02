import { motion } from "motion/react";
import { courses } from "@/data/courses";
import { PageContainer } from "@/components/shared/PageContainer";
import { SectionHeading } from "@/components/shared/SectionHeading";
import CourseCard from "@/components/public/courses/CourseCard";

const FeaturedCourses = () => {
  const featured = courses.slice(0, 3);

  return (
    <section className="bg-muted/30">
      <PageContainer size="default" padding="lg" className="py-16 sm:py-20">
        <SectionHeading
          heading="Featured Courses"
          subtitle="Explore our most popular programs designed to give you the skills and confidence to succeed."
          align="center"
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {featured.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </div>
      </PageContainer>
    </section>
  );
};

export default FeaturedCourses;
