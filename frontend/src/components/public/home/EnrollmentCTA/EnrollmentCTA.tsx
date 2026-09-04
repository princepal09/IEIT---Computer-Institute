import { motion } from "motion/react";
import { ArrowRightIcon, PhoneIcon } from "lucide-react";
import { Link } from "react-router-dom";

import image from "@/assets/gallery/studyTime.jpeg";

const EnrollmentCTA = () => {
  return (
    <section className="relative w-full overflow-hidden py-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className="relative h-[420px] w-full overflow-hidden sm:h-[460px] lg:h-[500px]"
      >
        {/* FULL WIDTH IMAGE */}
        <img
          src={image}
          alt="IEIT students learning technology"
          className="absolute inset-0 h-full w-full object-cover object-[center_25%]"
        />

        {/* Optional dark gradient ONLY behind the text */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"
        />+

        {/* Content */}
        <div className="relative mx-auto flex h-full w-full max-w-7xl items-center px-5 sm:px-8 lg:px-10">
          <div className="max-w-xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4 flex items-center gap-3"
            >
              <span className="h-px w-8 bg-red-400" />

              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-red-400">
                Start Learning
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-3xl font-extrabold tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl"
            >
              Build skills.
              <span className="block text-blue-300">
                Shape your future.
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 max-w-lg text-sm leading-6 text-white/80 sm:text-[15px]"
            >
              Learn practical technology skills through hands-on training,
              real-world projects, and career-focused courses at IEIT.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <Link
                to="/enquire"
                className="group inline-flex h-10 items-center gap-2 rounded-md bg-ieit-blue px-5 text-xs font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-ieit-blue/90"
              >
                Enroll Now
                <ArrowRightIcon className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex h-10 items-center gap-2 rounded-md border border-white/30 bg-white/10 px-5 text-xs font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20"
              >
                <PhoneIcon className="size-3.5" />
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default EnrollmentCTA;