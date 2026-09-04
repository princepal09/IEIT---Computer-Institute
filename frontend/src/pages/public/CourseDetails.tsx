import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BookOpenIcon,
  CheckCircle2Icon,
  Clock3Icon,
  IndianRupeeIcon,
  MapPinIcon,
  UserCheckIcon,
} from "lucide-react";

import { Link, useParams } from "react-router-dom";

import { useCourse } from "@/hooks/useCourse";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { PageContainer } from "@/components/shared/PageContainer";

import CourseDetailsSkeleton from "@/components/shared/skeletons/CourseDetailsSkeleton";

const CourseDetails = () => {
  const { courseSlug } = useParams<{ courseSlug: string }>();

  const { data: response, isLoading, isError } = useCourse(courseSlug ?? "");

  if (isLoading) {
    return <CourseDetailsSkeleton />;
  }

  if (isError || !response?.data) {
    return (
      <main className="min-h-[70vh] bg-slate-50 py-16">
        <PageContainer>
          <div className="mx-auto max-w-xl rounded-2xl border border-red-200 bg-white px-6 py-12 text-center shadow-sm">
            <p className="text-sm font-semibold text-red-700">
              Unable to load course.
            </p>

            <p className="mt-2 text-xs text-slate-500">
              The course may not exist or something went wrong.
            </p>

            <Button asChild className="mt-6 rounded-lg bg-ieit-blue text-xs">
              <Link to="/courses">Back to Courses</Link>
            </Button>
          </div>
        </PageContainer>
      </main>
    );
  }

  const course = response.data;

  return (
    <main className="bg-slate-50">
      {/* ------------------------------------------------ */}
      {/* Hero */}
      {/* ------------------------------------------------ */}

      <section className="relative overflow-hidden bg-slate-950 py-16 sm:py-20">
        {/* subtle background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.18),transparent_35%)]"
        />

        <PageContainer className="relative">
          <Link
            to="/courses"
            className="mb-8 inline-flex items-center text-xs font-semibold text-slate-400 transition-colors hover:text-white"
          >
            <ArrowLeftIcon className="mr-2 size-3.5" />
            Back to Courses
          </Link>

          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="rounded-md border-0 bg-ieit-blue/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-blue-300">
                {course.category}
              </Badge>

              <Badge
                variant="outline"
                className="rounded-md border-slate-700 bg-transparent px-2.5 py-1 text-[10px] font-semibold text-slate-300"
              >
                {course.duration}
              </Badge>
            </div>

            <h1 className="mt-5 text-3xl font-extrabold tracking-[-0.04em] text-white sm:text-5xl">
              {course.name}
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              {course.shortDescription}
            </p>

            <div className="mt-8">
              <Button
                asChild
                className="h-11 rounded-lg bg-ieit-blue px-5 text-xs font-bold text-white shadow-lg shadow-blue-950/30 hover:bg-ieit-blue/90"
              >
                <Link to={`/enquire?course=${course.slug}`}>
                  Enquire Now
                  <ArrowRightIcon className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ------------------------------------------------ */}
      {/* Main content */}
      {/* ------------------------------------------------ */}

      <section className="py-12 sm:py-16">
        <PageContainer>
          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            {/* Left */}
            <div className="space-y-8">
              {/* About */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-ieit-blue">
                    <BookOpenIcon className="size-4" />
                  </div>

                  <div>
                    <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-ieit-blue">
                      About the course
                    </p>

                    <h2 className="mt-1 text-xl font-extrabold tracking-[-0.03em] text-slate-950">
                      Learn practical skills
                    </h2>
                  </div>
                </div>

                <p className="mt-6 text-sm leading-7 text-slate-600">
                  {course.description}
                </p>
              </section>

              {/* What you'll learn */}
              <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-ieit-blue">
                  Course focus
                </p>

                <h2 className="mt-2 text-xl font-extrabold tracking-[-0.03em] text-slate-950">
                  What you can expect
                </h2>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <Feature
                    icon={<CheckCircle2Icon className="size-4" />}
                    title="Practical learning"
                    description="Build useful computer and professional skills."
                  />

                  <Feature
                    icon={<CheckCircle2Icon className="size-4" />}
                    title="Hands-on practice"
                    description="Learn through practical training and exercises."
                  />

                  <Feature
                    icon={<CheckCircle2Icon className="size-4" />}
                    title="Career-focused"
                    description="Develop skills useful for education and careers."
                  />

                  <Feature
                    icon={<CheckCircle2Icon className="size-4" />}
                    title="Instructor guidance"
                    description="Learn with support throughout your course."
                  />
                </div>
              </section>

              {/* Branches */}
              {course.branches && course.branches.length > 0 && (
                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-ieit-blue">
                    Available at
                  </p>

                  <h2 className="mt-2 text-xl font-extrabold tracking-[-0.03em] text-slate-950">
                    Choose your IEIT branch
                  </h2>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {course.branches.map((branch) => (
                      <Link
                        key={branch.id}
                        to={`/branches/${branch.slug}`}
                        className="group flex items-center justify-between rounded-xl border border-slate-200 p-4 transition-colors hover:border-ieit-blue/40 hover:bg-blue-50/40"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex size-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-ieit-blue">
                            <MapPinIcon className="size-4" />
                          </div>

                          <span className="text-sm font-semibold text-slate-800">
                            {branch.name}
                          </span>
                        </div>

                        <ArrowRightIcon className="size-4 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-ieit-blue" />
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right */}
            <aside>
              <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-ieit-blue">
                  Course information
                </p>

                <h2 className="mt-2 text-lg font-extrabold text-slate-950">
                  {course.name}
                </h2>

                <div className="mt-6 divide-y divide-slate-100">
                  <InfoRow
                    icon={<Clock3Icon />}
                    label="Duration"
                    value={course.duration}
                  />

                  <InfoRow
                    icon={<UserCheckIcon />}
                    label="Eligibility"
                    value={course.eligibility}
                  />

                  <InfoRow
                    icon={<IndianRupeeIcon />}
                    label="Course Fee"
                    value={`₹${course.fee}`}
                  />

                  <InfoRow
                    icon={<BookOpenIcon />}
                    label="Category"
                    value={course.category}
                  />
                </div>

                <Button
                  asChild
                  className="mt-6 h-11 w-full rounded-lg bg-ieit-blue text-xs font-bold text-white hover:bg-ieit-blue/90"
                >
                  <Link to={`/enquire?course=${course.slug}`}>
                    Enquire About This Course
                  </Link>
                </Button>

                <p className="mt-3 text-center text-[10px] leading-5 text-slate-400">
                  Have questions? Send us an enquiry and our team will get back
                  to you.
                </p>
              </div>
            </aside>
          </div>
        </PageContainer>
      </section>
    </main>
  );
};

type FeatureProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const Feature = ({ icon, title, description }: FeatureProps) => {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
      <div className="flex items-center gap-2 text-ieit-blue">
        {icon}

        <h3 className="text-sm font-bold text-slate-900">{title}</h3>
      </div>

      <p className="mt-2 text-xs leading-5 text-slate-500">{description}</p>
    </div>
  );
};

type InfoRowProps = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
};

const InfoRow = ({ icon, label, value }: InfoRowProps) => {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex items-center gap-3">
        <div className="text-slate-400 [&_svg]:size-4">{icon}</div>

        <span className="text-xs font-medium text-slate-500">{label}</span>
      </div>

      <span className="max-w-[150px] text-right text-xs font-bold text-slate-900">
        {value}
      </span>
    </div>
  );
};

export default CourseDetails;
