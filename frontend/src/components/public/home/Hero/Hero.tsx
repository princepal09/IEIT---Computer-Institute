import { motion, useInView } from "motion/react";
import { ArrowRightIcon, PlayIcon, TrendingUpIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const Hero = () => {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        "bg-[#f7f9f8]",
        "border-b border-slate-200/70",
      )}
    >
      {/* Minimal background gradients */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-blue-100/35 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-24 h-[320px] w-[320px] rounded-full bg-ieit-blue/5 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-emerald-100/25 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative max-w-xl"
          >
            {/* Subtle left glow behind content */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-20 top-10 -z-10 h-72 w-72 rounded-full bg-blue-200/20 blur-3xl"
            />

            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-slate-300" />

              <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-ieit-blue">
                Welcome to IEIT Almora
              </span>
            </div>

            {/* Heading */}
            <h1 className="max-w-lg text-4xl font-extrabold leading-[1.02] tracking-[-0.045em] text-slate-900 sm:text-5xl lg:text-[3.65rem]">
              Empowering Futures,
              <span className="mt-1 block font-serif font-semibold italic tracking-[-0.035em] text-ieit-blue">
                One Code at a Time.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-md text-sm leading-6 text-slate-600 sm:text-[15px]">
              Pioneering technical education in Uttarakhand with
              industry-aligned curriculum, expert faculty, and a commitment to
              transforming passionate learners into tech leaders.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/courses"
                className={cn(
                  "group inline-flex h-10 items-center justify-center gap-2",
                  "rounded-md bg-ieit-blue px-5",
                  "font-mono text-[11px] font-medium text-white",
                  "shadow-[0_8px_20px_-8px_rgba(0,102,255,0.55)]",
                  "transition-all duration-200",
                  "hover:-translate-y-0.5 hover:bg-ieit-blue-dark",
                  "hover:shadow-[0_12px_24px_-8px_rgba(0,102,255,0.6)]",
                  "focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-ieit-blue focus-visible:ring-offset-2",
                )}
              >
                Explore Courses
                <ArrowRightIcon className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>

              <Link
                to="/login"
                className={cn(
                  "inline-flex h-10 items-center justify-center gap-2",
                  "rounded-md border border-slate-300 bg-white/60 px-5",
                  "font-mono text-[11px] font-medium text-slate-700",
                  "transition-all duration-200",
                  "hover:border-slate-400 hover:bg-white",
                  "focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-ieit-blue focus-visible:ring-offset-2",
                )}
              >
                <PlayIcon className="size-3" />
                Enroll Now
              </Link>
            </div>

            {/* Divider */}
            <div className="mt-10 h-px w-full bg-slate-200" />

            {/* STATS */}
            <div className="mt-7 grid grid-cols-3 gap-5">
              <Stat value={15} suffix="+" label="Courses" />
              <Stat value={2000} suffix="+" label="Alumni" />
              <Stat value={99} suffix="%" label="Practical Work" />
            </div>
          </motion.div>

          {/* RIGHT VISUAL */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: "easeOut",
            }}
            className="relative mx-auto w-full max-w-[560px]"
          >
            {/* Main visual frame */}
            <div
              className={cn(
                "relative overflow-hidden rounded-[22px]",
                "border border-white/80",
                "bg-slate-200",
                "shadow-[0_28px_60px_-25px_rgba(15,23,42,0.35)]",
              )}
            >
              <div className="relative aspect-[1.12/1] overflow-hidden bg-slate-300">
                <img
                  src="/hero-image.jpeg"
                  alt="IEIT students learning technology"
                  className="h-full w-full object-cover grayscale-[15%]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-white/10" />

                {/* Fake browser controls */}
                <div className="absolute left-3 top-3 flex items-center gap-1.5">
                  <span className="flex size-6 items-center justify-center rounded-full bg-white/80 text-[9px] text-slate-500 shadow-sm backdrop-blur">
                    +
                  </span>

                  <span className="flex size-6 items-center justify-center rounded-full bg-white/80 text-[9px] text-slate-500 shadow-sm backdrop-blur">
                    ↗
                  </span>
                </div>

                {/* Bottom interface card */}
                <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/50 bg-slate-900/75 p-4 text-white shadow-xl backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/50">
                        Learning Platform
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        Build skills that matter.
                      </p>
                    </div>

                    <div className="flex size-8 items-center justify-center rounded-lg bg-ieit-blue">
                      <ArrowRightIcon className="size-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating next batch card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.7,
              }}
              className={cn(
                "absolute -bottom-5 left-4 sm:left-8",
                "flex items-center gap-3",
                "rounded-xl border border-slate-200",
                "bg-white px-4 py-3",
                "shadow-[0_15px_35px_-15px_rgba(15,23,42,0.35)]",
              )}
            >
              <span className="flex size-7 items-center justify-center rounded-full bg-lime-200 text-slate-900">
                <TrendingUpIcon className="size-3.5" />
              </span>

              <div>
                <p className="font-mono text-[9px] text-slate-500">
                  Next Batch
                </p>

                <p className="text-sm font-semibold text-slate-800">
                  Starts Oct 24
                </p>
              </div>
            </motion.div>

            {/* Decorative glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-10 -right-10 -z-10 h-40 w-40 rounded-full bg-emerald-200/40 blur-3xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   ANIMATED STAT
   ========================================================= */

type StatProps = {
  value: number;
  suffix: string;
  label: string;
};

const Stat = ({ value, suffix, label }: StatProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.6,
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 1400;
    const startTime = performance.now();

    let animationFrame: number;

    const animateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out animation
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(easedProgress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animateCount);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animateCount);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45 }}
    >
      <motion.p
        initial={{ opacity: 0, scale: 0.92 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{
          duration: 0.45,
          delay: 0.1,
          ease: "easeOut",
        }}
        className="font-mono text-xl font-bold tracking-[-0.04em] text-[#073b36] sm:text-2xl"
      >
        {count.toLocaleString()}
        {suffix}
      </motion.p>

      <p className="mt-1 font-mono text-[8px] font-medium uppercase tracking-[0.12em] text-slate-500 sm:text-[9px]">
        {label}
      </p>
    </motion.div>
  );
};

export default Hero;
