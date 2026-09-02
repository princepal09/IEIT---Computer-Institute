import CoursesSection from "@/components/public/home/Courses/CourseSection";
import FAQ from "@/components/public/home/FAQ/FAQ";
import Hero from "@/components/public/home/Hero/Hero";
import WhyIEIT from "@/components/public/home/WhyIEIT/WhyIEIT";

const HomePage = () => {
  return (
    <>
      <Hero />
      <CoursesSection />
      <WhyIEIT/>
      <FAQ/>
    </>
  );
};

export default HomePage;
