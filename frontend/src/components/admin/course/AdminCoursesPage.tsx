import { PlusIcon, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageContainer } from "@/components/shared/PageContainer";

const AdminCoursesPage = () => {
  return (
    <PageContainer size="wide" padding="md">
      <div className="py-6 sm:py-8">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ieit-blue">
              Management
            </p>

            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
              Courses
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Manage courses offered by the institute.
            </p>
          </div>

          <Button className="rounded-xl bg-ieit-blue hover:bg-ieit-blue/90">
            <PlusIcon className="mr-2 size-4" />
            Add Course
          </Button>
        </div>

        {/* Course List */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

              <Input
                placeholder="Search courses..."
                className="h-10 rounded-xl border-slate-200 pl-9 focus-visible:ring-ieit-blue"
              />
            </div>

            <p className="text-xs text-slate-400">
              0 courses
            </p>
          </div>

          <div className="flex min-h-80 flex-col items-center justify-center px-6 py-12 text-center">
            <div className="flex size-12 items-center justify-center rounded-xl bg-ieit-blue/5 text-ieit-blue">
              <PlusIcon className="size-5" />
            </div>

            <p className="mt-4 text-sm font-semibold text-slate-900">
              No courses found
            </p>

            <p className="mt-1 max-w-sm text-sm leading-6 text-slate-500">
              Courses will appear here once they are added to the
              institute.
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default AdminCoursesPage;