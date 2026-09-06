import { useMemo, useState } from "react";

import { BookOpenIcon, PlusIcon, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { PageContainer } from "@/components/shared/PageContainer";

import { useAdminCourses } from "@/hooks/useAdminCourses";
import CourseTable from "./CourseTable";
import CourseForm from "./CourseForm";
import { AdminCourse } from "@/types/coursesDashboard";


const AdminCoursesPage = () => {
  const [search, setSearch] = useState("");

  const [courseFormOpen, setCourseFormOpen] = useState(false);

  const { data: courses = [], isLoading, isError } = useAdminCourses();

  const filteredCourses = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return courses;
    }

    return courses.filter(
      (course) =>
        course.name.toLowerCase().includes(value) ||
        course.category.toLowerCase().includes(value) ||
        course.slug.toLowerCase().includes(value)
    );
  }, [courses, search]);

  const handleEditCourse = (course: AdminCourse) => {
    console.log("Edit course:", course);
  };

  const handleDeleteCourse = (course: AdminCourse) => {
    console.log("Delete course:", course);
  };

  return (
    <PageContainer size="wide" padding="md">
      <div className="py-6 sm:py-8">
        {/* Header */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-xl bg-ieit-blue/5 text-ieit-blue">
                <BookOpenIcon className="size-4" />
              </div>

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-ieit-blue">
                Management
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Courses
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage institute courses and their information.
            </p>
          </div>

          <Button
            onClick={() => setCourseFormOpen(true)}
            className="rounded-xl bg-ieit-blue px-4 hover:bg-ieit-blue/90"
          >
            <PlusIcon className="mr-2 size-4" />
            Add Course
          </Button>
        </div>

        {/* Content */}

        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Toolbar */}

          <div className="flex flex-col gap-4 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search courses..."
                className="rounded-xl pl-9"
              />
            </div>

            <p className="text-xs text-slate-400">
              {filteredCourses.length}{" "}
              {filteredCourses.length === 1 ? "course" : "courses"}
            </p>
          </div>

          {/* Loading */}

          {isLoading && (
            <div className="flex min-h-64 items-center justify-center">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <div className="size-4 animate-spin rounded-full border-2 border-slate-200 border-t-ieit-blue" />
                Loading courses...
              </div>
            </div>
          )}

          {/* Error */}

          {isError && (
            <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
              <p className="text-sm font-semibold text-slate-900">
                Unable to load courses
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Something went wrong while fetching courses.
              </p>
            </div>
          )}

          {/* Empty */}

          {!isLoading && !isError && filteredCourses.length === 0 && (
            <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <BookOpenIcon className="size-5" />
              </div>

              <p className="mt-4 text-sm font-semibold text-slate-900">
                {search ? "No courses found" : "No courses yet"}
              </p>

              <p className="mt-1 max-w-sm text-sm text-slate-500">
                {search
                  ? "Try searching with a different course name or category."
                  : "Create your first course to get started."}
              </p>

              {!search && (
                <Button
                  onClick={() => setCourseFormOpen(true)}
                  className="mt-4 rounded-xl bg-ieit-blue hover:bg-ieit-blue/90"
                >
                  <PlusIcon className="mr-2 size-4" />
                  Add Course
                </Button>
              )}
            </div>
          )}

          {/* Table */}

          {!isLoading && !isError && filteredCourses.length > 0 && (
            <CourseTable
              courses={filteredCourses}
              onEdit={handleEditCourse}
              onDelete={handleDeleteCourse}
            />
          )}
        </div>
      </div>

      {/* Create Course */}

      <CourseForm open={courseFormOpen} onOpenChange={setCourseFormOpen} />
    </PageContainer>
  );
};

export default AdminCoursesPage;
