import { useState } from "react";
import { motion } from "framer-motion";
import { MegaphoneIcon } from "lucide-react";

import { PageContainer } from "@/components/shared/PageContainer";
import { usePublishedNotices } from "@/hooks/useNotice";

const NoticeBanner = () => {
  const { data: notices, isLoading, isError } = usePublishedNotices();

  const [isPaused, setIsPaused] = useState(false);

  if (isLoading || isError || !notices?.length) {
    return null;
  }

  const notice = notices[0];

  const noticeContent = (
    <>
      <span className="text-sm font-semibold text-slate-900 sm:text-[15px]">
        {notice.title}
      </span>

      <span className="mx-5 size-1.5 shrink-0 rounded-full bg-ieit-blue" />

      <span className="text-sm text-slate-500">{notice.description}</span>

      <span className="mx-6 text-ieit-blue/40">✦</span>
    </>
  );

  return (
    <section className="border-y border-ieit-blue/10 bg-white">
      <PageContainer>
        <div className="flex h-14 items-center gap-3">
          {/* Fixed label */}
          <div className="z-20 flex shrink-0 items-center gap-2 bg-white pr-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-ieit-blue text-white">
              <MegaphoneIcon className="size-4" />
            </div>

            <span className="hidden text-[10px] font-bold uppercase tracking-[0.18em] text-ieit-blue sm:block">
              Latest Notice
            </span>
          </div>

          {/* Moving area */}
          <div
            className="relative min-w-0 flex-1 overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Left fade */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent" />

            {/* Right fade */}
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent" />

            <motion.div
              className="flex w-max items-center"
              animate={{
                x: isPaused ? undefined : ["-50%", "0%"],
              }}
              transition={{
                duration: 22,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              {/* Copy 1 */}
              <div className="flex shrink-0 items-center">{noticeContent}</div>

              {/* Copy 2 */}
              <div className="flex shrink-0 items-center">{noticeContent}</div>
            </motion.div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
};

export default NoticeBanner;
