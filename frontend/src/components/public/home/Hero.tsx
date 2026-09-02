import type { ComponentType } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Play, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/shared/PageContainer";

/* ------------------------------------------------------------------ */
/*  Right-side visual — abstract dashboard cards composition           */
/* ------------------------------------------------------------------ */

const StatCard = ({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  color: string;
}) => (
  <div className="w-40 rounded-xl border border-white/15 bg-white/10 px-4 py-3 shadow-[var(--shadow-elevated)] backdrop-blur-md">
    <div className="flex items-center gap-2">
      <div
        className={`flex size-7 shrink-0 items-center justify-center rounded-md ${color}`}
      >
        <Icon className="size-3.5" />
      </div>
      <span className="truncate text-[0.7rem] font-medium text-white/70">
        {label}
      </span>
    </div>
    <p className="mt-2 text-lg font-bold tracking-tight text-white">{value}</p>
  </div>
);

const HeroVisual = () => (
  <div className="relative mx-auto flex w-full max-w-md items-center justify-center lg:mx-0 lg:max-w-none">
    {/* Glow halo behind the card */}
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 rounded-3xl bg-white/10 blur-3xl"
    />

    {/* Main dashboard card */}
    <motion.div
      className="relative w-full overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-[var(--shadow-elevated)] backdrop-blur-md"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.3 }}
    >
      {/* Top bar */}
      <div className="flex items-center gap-1.5 border-b border-white/10 px-5 py-3">
        <span className="size-2.5 rounded-full bg-ieit-red/80" />
        <span className="size-2.5 rounded-full bg-ieit-yellow/80" />
        <span className="size-2.5 rounded-full bg-green-400/80" />
        <span className="ml-3 text-xs font-medium text-white/70">
          IEIT Dashboard
        </span>
      </div>

      {/* Content */}
      <div className="space-y-4 p-5">
        {/* Row of mini stat chips */}
        <div className="flex gap-2">
          {[
            { label: "Students", value: "5,240", accent: "bg-ieit-blue" },
            { label: "Courses", value: "24", accent: "bg-ieit-cyan" },
            { label: "Rating", value: "4.9", accent: "bg-ieit-yellow" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex-1 rounded-lg bg-white/[0.06] px-3 py-2.5"
            >
              <span className="block text-[0.65rem] font-medium text-white/60">
                {s.label}
              </span>
              <span className="mt-0.5 block text-sm font-bold text-white">
                {s.value}
              </span>
              <span
                className={`mt-1.5 block h-1 w-full rounded-full ${s.accent}/40`}
              >
                <span
                  className={`block h-full w-3/4 rounded-full ${s.accent}`}
                />
              </span>
            </div>
          ))}
        </div>

        {/* Progress section */}
        <div className="rounded-lg border border-white/10 bg-white/[0.06] p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-white/80">
              Course Completion
            </span>
            <span className="text-xs font-bold text-white">87%</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
            <div className="h-full w-[87%] rounded-full bg-gradient-to-r from-white to-cyan-300" />
          </div>
        </div>
      </div>
    </motion.div>

    {/* Floating stat cards — positioned around the main card */}
    <motion.div
      className="absolute -left-4 bottom-16 z-10 hidden lg:block"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, delay: 0.6 }}
    >
      <StatCard
        icon={Users}
        label="Active Students"
        value="2,180"
        color="bg-ieit-blue/25 text-cyan-200"
      />
    </motion.div>

    <motion.div
      className="absolute -right-4 top-12 z-10 hidden lg:block"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, delay: 0.7 }}
    >
      <StatCard
        icon={Zap}
        label="Placement Rate"
        value="94%"
        color="bg-ieit-cyan/25 text-cyan-100"
      />
    </motion.div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* ---------- Brand gradient background ---------- */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #003B8F 0%, #0066FF 55%, #00B8F5 100%)",
        }}
      />

      {/* Subtle dot-grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Depth glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-24 size-[420px] rounded-full bg-white/[0.08] blur-[100px]" />
        <div className="absolute -bottom-24 -left-24 size-[360px] rounded-full bg-ieit-cyan/20 blur-[100px]" />
      </div>

      {/* ---------- Content ---------- */}
      <PageContainer
        size="default"
        padding="lg"
        className="relative z-10 flex min-h-[calc(80vh-4rem)] items-center py-20 sm:py-24 lg:py-28"
      >
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* -------- Left: text -------- */}
          <div className="flex flex-col text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                <span className="inline-block size-1.5 rounded-full bg-cyan-300" />
                Bangladesh&apos;s Leading IT Training Institute
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <span className="text-white">Build Your Future</span>
              <br />
              <span className="text-white">
                in{" "}
                <span className="bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                  Information Technology
                </span>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="mt-6 max-w-lg text-lg leading-relaxed text-white/75 lg:max-w-xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
            >
              Empowering students with industry-relevant skills through
              expert-led training programs. Start your career in tech with IEIT.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="mt-10 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
            >
              <Button
                size="lg"
                render={<Link to="/courses" />}
                className="gap-2 bg-white px-7 text-[0.9rem] font-semibold text-ieit-navy hover:bg-white/90"
              >
                Explore Courses
                <ArrowRight className="size-4" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                render={<Link to="/enquire" />}
                className="gap-2 border-white/40 bg-transparent px-7 text-[0.9rem] font-semibold text-white hover:bg-white/10 hover:text-white"
              >
                <Play className="size-3.5" />
                Enroll Now
              </Button>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-white/70 lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {["Accredited Programs", "Expert Faculty", "Job Placement Support"].map(
                (item) => (
                  <span key={item} className="flex items-center gap-2">
                    <span className="inline-block size-1.5 rounded-full bg-cyan-300" />
                    {item}
                  </span>
                ),
              )}
            </motion.div>
          </div>

          {/* -------- Right: visual -------- */}
          <div className="hidden lg:block">
            <HeroVisual />
          </div>
        </div>
      </PageContainer>
    </section>
  );
};

export default Hero;
