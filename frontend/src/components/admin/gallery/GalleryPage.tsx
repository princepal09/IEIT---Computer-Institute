import { PageContainer } from "@/components/shared/PageContainer";

import GalleryGrid from "@/components/admin/gallery/GalleryGrid";
import GalleryUpload from "@/components/admin/gallery/GalleryUpload";

const GalleryPage = () => {
  return (
    <PageContainer className="py-6 sm:py-8">
      <div className="mb-8">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ieit-blue">
          Admin
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
          Gallery
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Upload and manage images displayed in the institute gallery.
        </p>
      </div>

      <div className="space-y-8">
        <GalleryUpload />

        <GalleryGrid />
      </div>
    </PageContainer>
  );
};

export default GalleryPage;