import { motion } from "motion/react";
import { MapPinIcon } from "lucide-react";

import institute1 from "@/assets/gallery/WhatsApp Image 2026-09-03 at 6.24.12 AM (1).jpeg";
import institute2 from "@/assets/gallery/seven.jpeg";
import institute3 from "@/assets/gallery/WhatsApp Image 2026-09-03 at 6.23.59 AM (1).jpeg";
import institute4 from "@/assets/gallery/six.jpeg";

const instituteImages = [
  {
    src: institute1,
    alt: "IEIT institute",
  },
  {
    src: institute2,
    alt: "IEIT classroom",
  },
  {
    src: institute3,
    alt: "IEIT students learning",
  },
  {
    src: institute4,
    alt: "IEIT computer lab",
  },
];

const branches = ["Almora", "Bageshwar", "Delhi"];

const AboutIEIT = () => {
  return (
    <section className="relative overflow-hidden bg-[#f7f9fc] py-14 sm:py-16 lg:py-20">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid order-2 lg:order-1 grid-cols-2 gap-3"
          >
            {instituteImages.map((image, index) => (
              <motion.div
                key={image.src}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className={`group relative overflow-hidden rounded-2xl ${
                  index === 0
                    ? "h-52 sm:h-64"
                    : index === 1
                      ? "h-64 sm:h-72"
                      : index === 2
                        ? "h-64 sm:h-72"
                        : "h-52 sm:h-64"
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent opacity-60" />
              </motion.div>
            ))}
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="order-1 lg:order-2"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            {/* Eyebrow */}
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-red-500/60" />

              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-red-600">
                About IEIT
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-extrabold tracking-[-0.04em] text-slate-900 sm:text-4xl lg:text-[2.75rem]">
              A place to learn,
              <span className="block text-ieit-blue">
                grow and build your future.
              </span>
            </h2>

            {/* Description */}
            <div className="mt-5 space-y-4 text-sm leading-6 text-slate-500 sm:text-[15px]">
              <p>
                IEIT is a computer institute dedicated to helping students
                develop practical computer and technology skills through
                focused and career-oriented learning.
              </p>

              <p>
                We aim to create a learning environment where students can
                understand concepts, practice their skills, work on practical
                projects, and become more confident with technology.
              </p>

              <p>
                IEIT currently has three branches located in{" "}
                <span className="font-semibold text-slate-700">
                  Almora, Bageshwar, and Delhi
                </span>
                , serving students across these locations.
              </p>
            </div>

            {/* Branches */}
            <div className="mt-7">
              <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                Our Branches
              </p>

              <div className="flex flex-wrap gap-2">
                {branches.map((branch) => (
                  <div
                    key={branch}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm"
                  >
                    <MapPinIcon className="size-3.5 text-ieit-blue" />
                    {branch}
                  </div>
                ))}
              </div>
            </div>

            {/* Small statement */}
            <div className="mt-7 border-l-2 border-ieit-blue/40 pl-4">
              <p className="text-sm font-medium leading-6 text-slate-700">
                Practical education that helps students turn learning into
                real-world skills.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutIEIT;