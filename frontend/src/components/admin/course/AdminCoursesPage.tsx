import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import ConfirmationModal from "@/components/shared/ConfirmationModal";

import CourseForm from "@/components/admin/course/CourseForm";
import CourseTable from "@/components/admin/course/CourseTable";

import { useAdminCourses, useDeleteAdminCourse } from "@/hooks/useAdminCourses";

import { getErrorMessage } from "@/utils/error";
import { AdminCourse } from "@/types/coursesDashboard";

const AdminCoursesPage = () => {
  const [formOpen, setFormOpen] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState<AdminCourse | null>(
    null
  );

  const [courseToDelete, setCourseToDelete] = useState<AdminCourse | null>(
    null
  );

  const { data: courses = [], isLoading, isError } = useAdminCourses();

  const deleteMutation = useDeleteAdminCourse();

  // CREATE
  const handleCreate = () => {
    setSelectedCourse(null);
    setFormOpen(true);
  };

  // EDIT
  const handleEdit = (course: AdminCourse) => {
    setSelectedCourse(course);
    setFormOpen(true);
  };

  // OPEN DELETE MODAL
  const handleDelete = (course: AdminCourse) => {
    setCourseToDelete(course);
  };

  // CONFIRM DELETE
  const handleConfirmDelete = () => {
    if (!courseToDelete) return;

    deleteMutation.mutate(courseToDelete.id, {
      onSuccess: () => {
        toast.success("Course deleted successfully");

        setCourseToDelete(null);
      },

      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  // CREATE / EDIT MODAL CLOSE
  const handleFormOpenChange = (open: boolean) => {
    setFormOpen(open);

    if (!open) {
      setSelectedCourse(null);
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">Courses</h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage institute courses.
          </p>
        </div>

        <Button
          onClick={handleCreate}
          className="rounded-xl bg-ieit-blue hover:bg-ieit-blue/90"
        >
          <PlusIcon className="mr-2 size-4" />
          Add Course
        </Button>
      </div>

      {/* TABLE */}
      {isLoading ? (
        <div className="flex min-h-40 items-center justify-center rounded-2xl border border-slate-200 bg-white">
          <p className="text-sm text-slate-500">Loading courses...</p>
        </div>
      ) : isError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
          <p className="text-sm font-medium text-red-600">
            Failed to load courses.
          </p>
        </div>
      ) : (
        <CourseTable
          courses={courses}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* CREATE / EDIT FORM */}
      <CourseForm
        open={formOpen}
        onOpenChange={handleFormOpenChange}
        course={selectedCourse}
      />

      {/* DELETE CONFIRMATION */}
      <ConfirmationModal
        open={Boolean(courseToDelete)}
        onOpenChange={(open) => {
          if (!open && !deleteMutation.isPending) {
            setCourseToDelete(null);
          }
        }}
        title="Delete Course?"
        description={
          courseToDelete
            ? `Are you sure you want to delete "${courseToDelete.name}"? This action cannot be undone.`
            : "Are you sure you want to delete this course?"
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        loading={deleteMutation.isPending}
        variant="danger"
      />
    </div>
  );
};

export default AdminCoursesPage;
