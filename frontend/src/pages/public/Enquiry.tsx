import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { PageContainer } from "@/components/shared/PageContainer";
import { useCourse } from "@/hooks/useCourse";
import EnquiryForm from "@/components/public/enquiry/EnquiryForm";



const Enquiry = () => {
  const [searchParams] = useSearchParams();

  const courseSlug = searchParams.get("course");



  const {
    data,
    isLoading,
    isError,
  } = useCourse(courseSlug ?? "");

  const course = data?.data;

  /* ---------------------------------------------
   * No course selected
   * --------------------------------------------- */

  if (!courseSlug) {
    return (
      <main className="bg-slate-50 py-16 sm:py-20">
        <PageContainer>
          <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h1 className="text-2xl font-extrabold text-slate-950">
              Course not selected
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Please select a course before submitting an enquiry.
            </p>

            <Link
              to="/courses"
              className="mt-6 inline-flex items-center rounded-lg bg-ieit-blue px-4 py-2.5 text-xs font-semibold text-white hover:bg-ieit-blue/90"
            >
              <ArrowLeftIcon className="mr-2 size-3.5" />
              Browse Courses
            </Link>
          </div>
        </PageContainer>
      </main>
    );
  }

  /* ---------------------------------------------
   * Loading
   * --------------------------------------------- */

  if (isLoading) {
    return (
      <main className="bg-slate-50 py-16 sm:py-20">
        <PageContainer>
          <div className="mx-auto max-w-3xl animate-pulse">
            <div className="mx-auto h-3 w-28 rounded bg-slate-200" />

            <div className="mx-auto mt-3 h-9 w-72 rounded bg-slate-200" />

            <div className="mx-auto mt-3 h-4 w-96 max-w-full rounded bg-slate-200" />

            <div className="mt-10 h-[500px] rounded-2xl bg-white" />
          </div>
        </PageContainer>
      </main>
    );
  }

  /* ---------------------------------------------
   * Error
   * --------------------------------------------- */

  if (isError || !course) {
    return (
      <main className="bg-slate-50 py-16 sm:py-20">
        <PageContainer>
          <div className="mx-auto max-w-2xl rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <h1 className="text-xl font-extrabold text-red-700">
              Course not found
            </h1>

            <p className="mt-2 text-sm text-red-600">
              We couldn't find the course you're looking for.
            </p>

            <Link
              to="/courses"
              className="mt-6 inline-flex items-center rounded-lg bg-ieit-blue px-4 py-2.5 text-xs font-semibold text-white hover:bg-ieit-blue/90"
            >
              <ArrowLeftIcon className="mr-2 size-3.5" />
              Browse Courses
            </Link>
          </div>
        </PageContainer>
      </main>
    );
  }

  /* ---------------------------------------------
   * Page
   * --------------------------------------------- */

  return (
    <main className="bg-slate-50 py-16 sm:py-20">
      <PageContainer>
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-ieit-blue">
              Course Enquiry
            </p>

            <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-slate-950 sm:text-4xl">
              Let's get you started.
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
              You're enquiring about{" "}
              <span className="font-semibold text-slate-700">
                {course.name}
              </span>
              . Fill in your details and our team will contact you.
            </p>
          </div>

          {/* Form */}
          <EnquiryForm course={course} />

          {/* Back */}
          <div className="mt-6 text-center">
            <Link
              to={`/courses/${course.slug}`}
              className="inline-flex items-center text-xs font-semibold text-slate-500 transition-colors hover:text-ieit-blue"
            >
              <ArrowLeftIcon className="mr-1.5 size-3.5" />
              Back to course
            </Link>
          </div>
        </div>
      </PageContainer>
    </main>
  );
};

export default Enquiry;