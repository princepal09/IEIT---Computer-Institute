import { motion } from "motion/react";
import { MapPinIcon, GraduationCapIcon, LaptopIcon } from "lucide-react";

const highlights = [
  {
    icon: GraduationCapIcon,
    title: "Practical Learning",
    description:
      "We focus on practical, skill-based learning that helps students understand technology through hands-on experience.",
  },
  {
    icon: LaptopIcon,
    title: "Technology Skills",
    description:
      "Our courses are designed to help students develop useful computer and technology skills for their education and career.",
  },
  {
    icon: MapPinIcon,
    title: "Three Branches",
    description:
      "IEIT has branches in Almora, Bageshwar, and Delhi, making quality computer education accessible across different locations.",
  },
];

const WhoWeAre = () => {
  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-16 lg:py-20">
      {/* Background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-20 h-64 w-64 rounded-full bg-blue-100/30 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-10 h-64 w-64 rounded-full bg-red-100/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-7 bg-red-500/50" />

            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-red-600">
              Who We Are
            </span>

            <span className="h-px w-7 bg-red-500/50" />
          </div>

          <h2 className="text-3xl font-extrabold tracking-[-0.04em] text-slate-900 sm:text-4xl lg:text-5xl">
            Building skills.
            <span className="block text-ieit-blue">
              Creating opportunities.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-[15px]">
            IEIT is a computer institute focused on providing practical
            technology education and helping students build skills for their
            academic and professional journey.
          </p>
        </motion.div>

        {/* Content */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {highlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                className="rounded-2xl border border-slate-200 bg-[#f8fafc] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ieit-blue/20 hover:shadow-lg hover:shadow-slate-200/50"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-ieit-blue/10 text-ieit-blue">
                  <Icon className="size-5" />
                </div>

                <h3 className="mt-5 text-base font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;