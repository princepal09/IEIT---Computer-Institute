import { motion } from "motion/react";
import { ArrowRightIcon } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "item-1",
    question: "What courses does IEIT offer?",
    answer:
      "IEIT offers practical, career-focused courses in areas such as Full-Stack Web Development, Python & Data Science, Cloud Computing, and UI/UX Design.",
  },
  {
    id: "item-2",
    question: "Who can join IEIT?",
    answer:
      "Our programs are designed for students, beginners, graduates, and anyone looking to build practical technology skills.",
  },
  {
    id: "item-3",
    question: "Are the courses practical?",
    answer:
      "Yes. Our learning approach focuses on hands-on practice, projects, real-world concepts, and building skills that can be applied beyond the classroom.",
  },
  {
    id: "item-4",
    question: "Does IEIT provide career support?",
    answer:
      "IEIT focuses on helping students become career-ready through practical projects, guidance, skill development, and career-oriented learning.",
  },
  {
    id: "item-5",
    question: "How can I enroll in a course?",
    answer:
      "You can explore the available courses and contact IEIT to learn about current batches, eligibility, fees, and the enrollment process.",
  },
];

const FAQ = () => {
  return (
    <section className="relative overflow-hidden bg-[#f4f8ff] py-20 sm:py-24 lg:py-28">
      {/* =========================================================
          BACKGROUND GLOW
          ========================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-200/25 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-sky-200/25 blur-3xl"
      />

      {/* =========================================================
          CONTAINER
          ========================================================= */}

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        {/* =======================================================
            HEADER
            ======================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className="mx-auto max-w-2xl text-center"
        >
          {/* Eyebrow */}

          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-ieit-blue/40" />

            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ieit-blue">
              FAQ
            </span>

            <span className="h-px w-8 bg-ieit-blue/40" />
          </div>

          {/* Heading */}

          <h2 className="text-3xl font-extrabold tracking-[-0.04em] text-slate-900 sm:text-4xl lg:text-[2.75rem]">
            Questions?
            <span className="block text-ieit-blue">We have answers.</span>
          </h2>

          {/* Description */}

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-500 sm:text-[15px]">
            Everything you need to know about learning at IEIT.
          </p>
        </motion.div>

        {/* =======================================================
            FAQ ACCORDION
            ======================================================= */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.55,
            delay: 0.1,
            ease: "easeOut",
          }}
          className="mt-10 sm:mt-12"
        >
          <Accordion defaultValue={["item-1"]} className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="
                  overflow-hidden
                  rounded-xl
                  border
                  border-blue-100
                  bg-white
                  px-5
                  shadow-[0_8px_30px_-25px_rgba(0,80,180,0.3)]
                  transition-all
                  duration-300
                  data-open:border-blue-200
                  data-open:shadow-[0_15px_40px_-25px_rgba(0,102,255,0.3)]
                  sm:px-6
                "
              >
                <AccordionTrigger
                  className="
                    gap-4
                    py-5
                    text-left
                    text-sm
                    font-semibold
                    text-slate-800
                    hover:no-underline
                    [&>svg]:size-4
                    [&>svg]:text-ieit-blue
                  "
                >
                  <div className="flex items-center gap-4">
                    {/* Number */}

                    <span className="shrink-0 font-mono text-[10px] font-semibold tracking-[0.12em] text-blue-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Question */}

                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>

                <AccordionContent
                  className="
                    pb-5
                    pl-10
                    text-sm
                    leading-6
                    text-slate-500
                    sm:pl-10
                  "
                >
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* =======================================================
            CONTACT PROMPT
            ======================================================= */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.25,
          }}
          className="mt-8 flex items-center justify-center"
        >
          <a
            href="/contact"
            className="
              group
              inline-flex
              items-center
              gap-2
              font-mono
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.12em]
              text-ieit-blue
              transition-colors
              hover:text-ieit-blue-dark
            "
          >
            Still have questions?
            <ArrowRightIcon className="size-3 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
