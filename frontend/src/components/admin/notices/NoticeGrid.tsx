import {
  CalendarDaysIcon,
  EyeIcon,
  FileTextIcon,
  PencilIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";

import { useState } from "react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

import ConfirmationModal from "@/components/shared/ConfirmationModal";

import NoticeSkeleton from "@/components/shared/skeletons/NoticeSkeleton";

import NoticeForm from "@/components/admin/notices/NoticeForm";

import { useAdminNotices, useDeleteAdminNotice } from "@/hooks/useAdminNotice";

import type { AdminNotice } from "@/types/notice";

import { getErrorMessage } from "@/utils/error";

const NoticeGrid = () => {
  const { data: notices = [], isLoading, isError } = useAdminNotices();

  const deleteMutation = useDeleteAdminNotice();

  const [selectedNotice, setSelectedNotice] = useState<AdminNotice | null>(
    null
  );

  const [noticeToDelete, setNoticeToDelete] = useState<AdminNotice | null>(
    null
  );

  const [editingNotice, setEditingNotice] = useState<AdminNotice | null>(null);

  const [showCreateForm, setShowCreateForm] = useState(false);

  /*
   * Date formatter
   */
  const formatDate = (date?: string | null) => {
    if (!date) {
      return "Not set";
    }

    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  /*
   * Delete
   */
  const handleDelete = () => {
    if (!noticeToDelete) {
      return;
    }

    deleteMutation.mutate(noticeToDelete.id, {
      onSuccess: () => {
        toast.success("Notice deleted successfully.");

        if (selectedNotice?.id === noticeToDelete.id) {
          setSelectedNotice(null);
        }

        setNoticeToDelete(null);
      },

      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  /*
   * Loading
   */
  if (isLoading) {
    return (
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <Skeleton className="h-3 w-24 rounded-md" />

            <Skeleton className="mt-2 h-7 w-40 rounded-md" />
          </div>

          <Skeleton className="h-9 w-32 rounded-xl" />
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <NoticeSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  /*
   * Error
   */
  if (isError) {
    return (
      <Card className="rounded-2xl border-red-100 bg-white shadow-sm">
        <CardContent className="flex min-h-64 flex-col items-center justify-center text-center">
          <div className="flex size-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <FileTextIcon className="size-5" />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-slate-900">
            Failed to load notices
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Please try refreshing the page.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ieit-blue">
            Announcements
          </p>

          <h2 className="mt-1 text-xl font-bold text-slate-950">Notices</h2>
        </div>

        <div className="flex items-center gap-3">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {notices.length} {notices.length === 1 ? "notice" : "notices"}
          </span>

          <Button
            type="button"
            onClick={() => setShowCreateForm(true)}
            className="rounded-xl bg-ieit-blue hover:bg-ieit-blue/90"
          >
            <PlusIcon className="mr-2 size-4" />
            Add Notice
          </Button>
        </div>
      </div>

      {/* Empty */}
      {!notices.length ? (
        <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
          <CardContent className="flex min-h-72 flex-col items-center justify-center text-center">
            <div className="flex size-12 items-center justify-center rounded-xl bg-ieit-blue/5 text-ieit-blue">
              <FileTextIcon className="size-6" />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-slate-900">
              No notices yet
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Create your first notice for students and visitors.
            </p>

            <Button
              type="button"
              onClick={() => setShowCreateForm(true)}
              className="mt-5 rounded-xl bg-ieit-blue hover:bg-ieit-blue/90"
            >
              <PlusIcon className="mr-2 size-4" />
              Create Notice
            </Button>
          </CardContent>
        </Card>
      ) : (
        /* Grid */
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {notices.map((notice) => (
            <Card
              key={notice.id}
              className="group overflow-hidden rounded-2xl border-slate-200 bg-white shadow-sm"
            >
              <CardContent className="p-0">
                {/* Header */}
                <div className="border-b border-slate-100 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-ieit-blue/5 text-ieit-blue">
                        <FileTextIcon className="size-5" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-slate-900">
                          {notice.title}
                        </h3>

                        <p className="mt-1 text-xs text-slate-400">
                          {formatDate(notice.createdAt)}
                        </p>
                      </div>
                    </div>

                    {/* Status */}
                    <span
                      className={[
                        "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium",
                        notice.isPublished
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-600",
                      ].join(" ")}
                    >
                      {notice.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5">
                  <p className="line-clamp-4 text-sm leading-6 text-slate-600">
                    {notice.description}
                  </p>

                  {/* Dates */}
                  <div className="mt-5 space-y-2.5">
                    <div className="flex items-start gap-2.5">
                      <CalendarDaysIcon className="mt-0.5 size-4 shrink-0 text-slate-400" />

                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                          Published
                        </p>

                        <p className="mt-0.5 text-xs text-slate-600">
                          {formatDate(notice.publishedAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <CalendarDaysIcon className="mt-0.5 size-4 shrink-0 text-slate-400" />

                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                          Expires
                        </p>

                        <p className="mt-0.5 text-xs text-slate-600">
                          {formatDate(notice.expiresAt)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedNotice(notice)}
                      className="flex-1 rounded-xl"
                    >
                      <EyeIcon className="mr-2 size-4" />
                      View
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setEditingNotice(notice)}
                      className="size-9 rounded-xl"
                    >
                      <PencilIcon className="size-4" />
                    </Button>

                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      disabled={deleteMutation.isPending}
                      onClick={() => setNoticeToDelete(notice)}
                      className="size-9 rounded-xl"
                    >
                      <Trash2Icon className="size-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Modal */}
      {showCreateForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setShowCreateForm(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="border-b border-slate-100 p-5">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ieit-blue">
                Announcements
              </p>

              <h3 className="mt-1 text-xl font-bold text-slate-950">
                Create Notice
              </h3>
            </div>

            <div className="p-5">
              <NoticeForm
                onSuccess={() => setShowCreateForm(false)}
                onCancel={() => setShowCreateForm(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingNotice && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setEditingNotice(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="border-b border-slate-100 p-5">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ieit-blue">
                Announcements
              </p>

              <h3 className="mt-1 text-xl font-bold text-slate-950">
                Edit Notice
              </h3>
            </div>

            <div className="p-5">
              <NoticeForm
                notice={editingNotice}
                onSuccess={() => setEditingNotice(null)}
                onCancel={() => setEditingNotice(null)}
              />
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {selectedNotice && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelectedNotice(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="border-b border-slate-100 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ieit-blue">
                    Notice
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-slate-950">
                    {selectedNotice.title}
                  </h3>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedNotice(null)}
                  className="rounded-lg"
                >
                  Close
                </Button>
              </div>
            </div>

            <div className="space-y-5 p-5">
              {/* Status */}
              <div>
                <p className="text-xs font-medium text-slate-400">Status</p>

                <span
                  className={[
                    "mt-2 inline-flex rounded-full px-3 py-1 text-xs font-medium",
                    selectedNotice.isPublished
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-600",
                  ].join(" ")}
                >
                  {selectedNotice.isPublished ? "Published" : "Draft"}
                </span>
              </div>

              {/* Description */}
              <div>
                <p className="text-xs font-medium text-slate-400">
                  Description
                </p>

                <div className="mt-2 rounded-xl bg-slate-50 p-4">
                  <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                    {selectedNotice.description}
                  </p>
                </div>
              </div>

              {/* Published */}
              <div>
                <p className="text-xs font-medium text-slate-400">
                  Published At
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  {formatDate(selectedNotice.publishedAt)}
                </p>
              </div>

              {/* Expiry */}
              <div>
                <p className="text-xs font-medium text-slate-400">Expires At</p>

                <p className="mt-1 text-sm text-slate-700">
                  {formatDate(selectedNotice.expiresAt)}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 rounded-xl"
                  onClick={() => {
                    setSelectedNotice(null);

                    setEditingNotice(selectedNotice);
                  }}
                >
                  <PencilIcon className="mr-2 size-4" />
                  Edit
                </Button>

                <Button
                  type="button"
                  variant="destructive"
                  className="flex-1 rounded-xl"
                  onClick={() => {
                    setNoticeToDelete(selectedNotice);

                    setSelectedNotice(null);
                  }}
                >
                  <Trash2Icon className="mr-2 size-4" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmationModal
        open={Boolean(noticeToDelete)}
        onOpenChange={(open) => {
          if (!open && !deleteMutation.isPending) {
            setNoticeToDelete(null);
          }
        }}
        title="Delete notice?"
        description="This notice will be permanently deleted. This action cannot be undone."
        confirmText="Delete Notice"
        cancelText="Cancel"
        onConfirm={handleDelete}
        loading={deleteMutation.isPending}
        variant="danger"
      />
    </>
  );
};

export default NoticeGrid;
