import {
  ImagePlusIcon,
  Loader2Icon,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useCreateAdminGallery } from "@/hooks/useAdminGallery";

const MAX_FILES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const GalleryUpload = () => {
  const createMutation = useCreateAdminGallery();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  /*
   * Create image previews
   */
  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));

    setPreviews(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  /*
   * Select images
   */
  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files ?? []);

    if (!selectedFiles.length) {
      return;
    }

    /*
     * Calculate remaining slots
     */
    const remainingSlots = MAX_FILES - files.length;

    if (remainingSlots <= 0) {
      toast.error(`You can upload a maximum of ${MAX_FILES} images at a time.`);

      event.target.value = "";
      return;
    }

    /*
     * Only take files that fit within the limit
     */
    const filesToCheck = selectedFiles.slice(0, remainingSlots);

    /*
     * Warn if user selected too many
     */
    if (selectedFiles.length > remainingSlots) {
      toast.warning(
        `Only ${remainingSlots} more image${
          remainingSlots === 1 ? "" : "s"
        } can be selected.`
      );
    }

    const validFiles: File[] = [];

    /*
     * Validate files
     */
    for (const file of filesToCheck) {
      /*
       * Validate image type
       */
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not a valid image.`);
        continue;
      }

      /*
       * Validate image size
       */
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} is larger than 5MB.`);
        continue;
      }

      validFiles.push(file);
    }

    /*
     * Add valid files
     */
    setFiles((current) => [...current, ...validFiles]);

    /*
     * Allow selecting the same files again
     */
    event.target.value = "";
  };

  /*
   * Remove selected image
   */
  const removeFile = (index: number) => {
    setFiles((current) =>
      current.filter((_, fileIndex) => fileIndex !== index)
    );
  };

  /*
   * Clear all selected images
   */
  const clearFiles = () => {
    setFiles([]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /*
   * Upload images
   */
  const handleUpload = () => {
    if (!files.length) {
      toast.error("Please select at least one image.");
      return;
    }

    createMutation.mutate(files, {
      onSuccess: () => {
        toast.success("Gallery images uploaded successfully.");

        clearFiles();
      },

      onError: (error) => {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to upload gallery images."
        );
      },
    });
  };

  return (
    <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
      <CardContent className="p-5 sm:p-6">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ieit-blue">
            Gallery
          </p>

          <h2 className="text-xl font-bold text-slate-950">Upload Images</h2>

          <p className="text-sm text-slate-500">
            Upload images to your institute gallery.
          </p>
        </div>

        {/* Upload Area */}
        <button
          type="button"
          disabled={createMutation.isPending || files.length >= MAX_FILES}
          onClick={() => fileInputRef.current?.click()}
          className="mt-6 flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 transition hover:border-ieit-blue hover:bg-ieit-blue/5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <div className="flex size-12 items-center justify-center rounded-xl bg-ieit-blue/5 text-ieit-blue">
            <ImagePlusIcon className="size-6" />
          </div>

          <p className="mt-3 text-sm font-semibold text-slate-900">
            Choose gallery images
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Select up to {MAX_FILES} JPG, PNG, JPEG or WEBP images
          </p>

          <p className="mt-1 text-xs text-slate-400">Maximum 5MB per image</p>

          {files.length > 0 && (
            <p className="mt-2 text-xs font-medium text-ieit-blue">
              {files.length} / {MAX_FILES} images selected
            </p>
          )}
        </button>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          multiple
          hidden
          onChange={handleFilesChange}
          disabled={createMutation.isPending || files.length >= MAX_FILES}
        />

        {/* Selected Images */}
        {files.length > 0 && (
          <>
            <div className="mt-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Selected Images{" "}
                  <span className="text-slate-400">
                    ({files.length}/{MAX_FILES})
                  </span>
                </p>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="rounded-lg text-slate-500 hover:text-red-600"
                disabled={createMutation.isPending}
                onClick={clearFiles}
              >
                Clear all
              </Button>
            </div>

            {/* Preview Grid */}
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {previews.map((preview, index) => (
                <div
                  key={`${files[index]?.name}-${index}`}
                  className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
                >
                  <img
                    src={preview}
                    alt={files[index]?.name ?? "Selected gallery image"}
                    className="aspect-square w-full object-cover"
                  />

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    disabled={createMutation.isPending}
                    className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-white text-slate-700 shadow-md transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <XIcon className="size-4" />
                  </button>

                  {/* File Name */}
                  <div className="absolute inset-x-0 bottom-0 bg-black/50 px-2 py-1.5">
                    <p className="truncate text-[11px] text-white">
                      {files[index]?.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Upload Action */}
            <div className="mt-5 flex justify-end">
              <Button
                type="button"
                disabled={createMutation.isPending}
                onClick={handleUpload}
                className="rounded-xl bg-ieit-blue hover:bg-ieit-blue/90"
              >
                {createMutation.isPending ? (
                  <>
                    <Loader2Icon className="mr-2 size-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <UploadCloudIcon className="mr-2 size-4" />
                    Upload {files.length}{" "}
                    {files.length === 1 ? "Image" : "Images"}
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default GalleryUpload;
