import {
  ImageIcon,
  Trash2Icon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import ConfirmationModal from "@/components/shared/ConfirmationModal";
import GallerySkeleton from "@/components/shared/skeletons/GallerySkeleton";

import {
  useAdminGallery,
  useDeleteAdminGallery,
} from "@/hooks/useAdminGallery";

import {AdminGallery} from "@/types/gallery";

import { getErrorMessage } from "@/utils/error";

const GalleryGrid = () => {
  const {
    data: gallery = [],
    isLoading,
    isError,
  } = useAdminGallery();

  const deleteMutation = useDeleteAdminGallery();

  const [selectedGallery, setSelectedGallery] =
    useState<AdminGallery | null>(null);

  /*
   * Delete gallery image
   */
  const handleDelete = () => {
    if (!selectedGallery) {
      return;
    }

    deleteMutation.mutate(selectedGallery.id, {
      onSuccess: () => {
        toast.success("Gallery image deleted successfully.");

        setSelectedGallery(null);
      },

      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  /*
   * Loading state
   */
  if (isLoading) {
    return (
      <div>
        {/* Header Skeleton */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <Skeleton className="h-3 w-24 rounded-md" />

            <Skeleton className="mt-2 h-7 w-40 rounded-md" />
          </div>

          <Skeleton className="h-6 w-20 rounded-full" />
        </div>

        {/* Gallery Skeleton */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <GallerySkeleton />
        </div>
      </div>
    );
  }

  /*
   * Error state
   */
  if (isError) {
    return (
      <Card className="rounded-2xl border-red-100 bg-white shadow-sm">
        <CardContent className="flex min-h-64 flex-col items-center justify-center text-center">
          <div className="flex size-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
            <ImageIcon className="size-5" />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            Failed to load gallery
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Please try refreshing the page.
          </p>
        </CardContent>
      </Card>
    );
  }

  /*
   * Empty state
   */
  if (!gallery.length) {
    return (
      <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
        <CardContent className="flex min-h-64 flex-col items-center justify-center text-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-ieit-blue/5 text-ieit-blue">
            <ImageIcon className="size-6" />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            No gallery images
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Upload your first gallery images above.
          </p>
        </CardContent>
      </Card>
    );
  }

  /*
   * Gallery
   */
  return (
    <>
      <div>
        {/* Section Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ieit-blue">
              Media Library
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-950">
              Gallery Images
            </h2>
          </div>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {gallery.length}{" "}
            {gallery.length === 1 ? "image" : "images"}
          </span>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {gallery.map((item) => (
            <Card
              key={item.id}
              className="group overflow-hidden rounded-2xl border-slate-200 bg-white shadow-sm"
            >
              <div className="relative aspect-square overflow-hidden bg-slate-100">
                {/* Image */}
                <img
                  src={item.imageUrl}
                  alt="IEIT Gallery"
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />

                {/* Delete Button */}
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  disabled={deleteMutation.isPending}
                  onClick={() => setSelectedGallery(item)}
                  className="absolute right-2 top-2 size-9 rounded-xl opacity-0 shadow-md transition group-hover:opacity-100"
                >
                  <Trash2Icon className="size-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Delete Confirmation */}
      <ConfirmationModal
        open={Boolean(selectedGallery)}
        onOpenChange={(open) => {
          if (!open && !deleteMutation.isPending) {
            setSelectedGallery(null);
          }
        }}
        title="Delete gallery image?"
        description="This image will be permanently removed from the gallery and Cloudinary. This action cannot be undone."
        confirmText="Delete Image"
        cancelText="Cancel"
        onConfirm={handleDelete}
        loading={deleteMutation.isPending}
        variant="danger"
      />
    </>
  );
};

export default GalleryGrid;