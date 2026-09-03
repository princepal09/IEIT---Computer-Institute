import { MapPinIcon } from "lucide-react";

import type { Branch } from "@/types/branch";

interface BranchHeroProps {
  branch: Branch;
}

const BranchHero = ({ branch }: BranchHeroProps) => {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div className="relative min-h-[420px] sm:min-h-[480px] lg:min-h-[540px]">
        {/* Image */}
        <img
          src={branch.imageUrl}
          alt={branch.name}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/10" />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950/70 to-transparent" />

        {/* Content */}
        <div className="relative mx-auto flex min-h-[420px] max-w-7xl items-end px-5 pb-14 sm:min-h-[480px] sm:px-8 sm:pb-16 lg:min-h-[540px] lg:px-10 lg:pb-20">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-blue-400" />

              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-300">
                IEIT Branch
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-extrabold tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
              {branch.name}
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
              {branch.description}
            </p>

            {/* Location */}
            <div className="mt-6 flex items-center gap-2 text-sm text-white/80">
              <MapPinIcon className="size-4 text-blue-300" />

              <span>{branch.address}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BranchHero;