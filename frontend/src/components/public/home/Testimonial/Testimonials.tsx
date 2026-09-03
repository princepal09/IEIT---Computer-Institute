import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Prince Pal",
    role: "Full-Stack Development Student",
    initials: "RA",
    review:
      "IEIT helped me understand web development through practical projects. The learning experience was simple, focused, and easy to follow.",
  },
  {
    id: 2,
    name: "Monika Palariya",
    role: "Python & Data Science Student",
    initials: "NJ",
    review:
      "I really liked the practical approach at IEIT. The instructors explained difficult topics clearly and helped me improve my technical skills.",
  },
  {
    id: 3,
    name: "Santosh Pant",
    role: "Cloud Computing Student",
    initials: "TH",
    review:
      "The course structure is very useful for beginners. Working on real-world concepts gave me much more confidence in my skills.",
  },
  {
    id: 4,
    name: "Rahul Chandra Saraswati",
    role: "Cloud Computing Student",
    initials: "TH",
    review:
      "The course structure is very useful for beginners. Working on real-world concepts gave me much more confidence in my skills.",
  },
  {
    id: 5,
    name: "ksdfdsnf",
    role: "Cloud Computing Student",
    initials: "TH",
    review:
      "The course structure is very useful for beginners. Working on real-world concepts gave me much more confidence in my skills.",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  /* --------------------------------
     Detect screen size
  -------------------------------- */

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => {
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  /* --------------------------------
     Cards visible at once
     
     Desktop = 3
     Mobile  = 1
  -------------------------------- */

  const cardsPerView = isMobile ? 1 : 3;

  const maxSlide = Math.max(testimonials.length - cardsPerView, 0);

  /* --------------------------------
     Next slide
  -------------------------------- */

  const nextSlide = () => {
    setCurrent((prev) => {
      if (prev >= maxSlide) {
        return 0;
      }

      return prev + 1;
    });
  };

  /* --------------------------------
     Previous slide
  -------------------------------- */

  const previousSlide = () => {
    setCurrent((prev) => {
      if (prev <= 0) {
        return maxSlide;
      }

      return prev - 1;
    });
  };

  /* --------------------------------
     Automatic sliding
     
     Every 2 seconds
  -------------------------------- */

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => {
        if (prev >= maxSlide) {
          return 0;
        }

        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [maxSlide]);

  /* --------------------------------
     Keep index valid when resizing
  -------------------------------- */

  useEffect(() => {
    setCurrent((prev) => Math.min(prev, maxSlide));
  }, [maxSlide]);

  return (
    <section className="relative overflow-hidden bg-[#f7f9fc] py-10 sm:py-12 lg:py-14">
      {/* Background glow */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-32
          top-10
          h-64
          w-64
          rounded-full
          bg-blue-100/30
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-32
          bottom-0
          h-64
          w-64
          rounded-full
          bg-red-100/30
          blur-3xl
        "
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* =====================================
            HEADER
        ====================================== */}

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

          <div className="mb-3 flex items-center justify-center gap-3">
            <span className="h-px w-7 bg-red-500/50" />

            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-red-600">
              Student Stories
            </span>

            <span className="h-px w-7 bg-red-500/50" />
          </div>

          {/* Heading */}

          <h2 className="text-3xl font-extrabold tracking-[-0.04em] text-slate-900 sm:text-4xl">
            What our students
            <span className="block text-ieit-blue">say about IEIT.</span>
          </h2>

          {/* Description */}

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
            Real experiences from students building practical skills and
            preparing for their careers.
          </p>
        </motion.div>

        {/* =====================================
            TESTIMONIAL SLIDER
        ====================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.5,
            delay: 0.1,
            ease: "easeOut",
          }}
          className="relative mt-8"
        >
          {/* Slider viewport */}

          <div className="overflow-hidden px-1 py-2">
            <motion.div
              className="flex"
              animate={{
                x: `-${current * (100 / cardsPerView)}%`,
              }}
              transition={{
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="
                    w-full
                    shrink-0
                    px-2
                    md:w-1/3
                  "
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* =================================
              LEFT ARROW
          ================================== */}

          <button
            type="button"
            onClick={previousSlide}
            aria-label="Previous testimonial"
            className="
              absolute
              left-0
              top-1/2
              z-10
              flex
              size-9
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              bg-white
              text-slate-500
              shadow-md
              transition-all
              duration-200
              hover:-translate-x-0.5
              hover:border-red-200
              hover:bg-red-50
              hover:text-red-600
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-red-500/30
              sm:-left-2
            "
          >
            <ChevronLeft className="size-4" />
          </button>

          {/* =================================
              RIGHT ARROW
          ================================== */}

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next testimonial"
            className="
              absolute
              right-0
              top-1/2
              z-10
              flex
              size-9
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              bg-white
              text-slate-500
              shadow-md
              transition-all
              duration-200
              hover:translate-x-0.5
              hover:border-red-200
              hover:bg-red-50
              hover:text-red-600
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-red-500/30
              sm:-right-2
            "
          >
            <ChevronRight className="size-4" />
          </button>
        </motion.div>

        {/* =====================================
            DOTS
        ====================================== */}

        <div className="mt-5 flex justify-center gap-1.5">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              className="p-1"
            >
              <span
                className={`
                  block
                  h-1.5
                  rounded-full
                  transition-all
                  duration-300
                  ${
                    current === index
                      ? "w-6 bg-red-500"
                      : "w-1.5 bg-slate-300 hover:bg-slate-400"
                  }
                `}
              />
            </button>
          ))}
        </div>

        {/* =====================================
            BOTTOM LINE
        ====================================== */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
          className="mt-5 flex justify-center"
        >
          <p className="font-mono text-[9px] font-medium uppercase tracking-[0.15em] text-slate-400">
            Learn practical skills. Build with confidence.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

/* =========================================
   TESTIMONIAL CARD
========================================= */

type TestimonialCardProps = {
  testimonial: (typeof testimonials)[number];
};

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <Card
      className="
        group
        relative
        h-full
        min-h-[215px]
        overflow-hidden
        rounded-[18px]
        border-slate-200
        bg-white
        shadow-[0_8px_30px_-25px_rgba(15,23,42,0.3)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-red-100
        hover:shadow-[0_18px_40px_-25px_rgba(220,38,38,0.25)]
      "
    >
      {/* Top red accent */}

      <div
        aria-hidden="true"
        className="
          absolute
          left-0
          top-0
          h-0.5
          w-0
          bg-red-500
          transition-all
          duration-300
          group-hover:w-full
        "
      />

      <CardContent className="p-5">
        {/* Rating + quote */}
        {/* 
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="size-3 fill-red-500 text-red-500" />
            ))}
          </div>

          <div className="flex size-8 items-center justify-center rounded-full bg-red-50 text-red-500">
            <Quote className="size-3.5" />
          </div>
        </div> */}

        {/* Review */}

        <p className="mt-5 min-h-[95px] text-[13px] leading-5 text-slate-600">
          “{testimonial.review}”
        </p>
      </CardContent>

      {/* Student */}

      <CardFooter className="border-t border-slate-100 px-5 py-4">
        <div className="flex w-full items-center gap-3">
          {/* Avatar */}

          <Avatar className="size-9 shrink-0">
            <AvatarFallback className="bg-ieit-blue text-[10px] font-bold text-white">
              {testimonial.initials}
            </AvatarFallback>
          </Avatar>

          {/* Student info */}

          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-bold text-slate-900">
              {testimonial.name}
            </p>

            <p className="mt-0.5 truncate text-[9px] text-slate-500">
              {testimonial.role}
            </p>
          </div>

          {/* Badge */}

          <Badge
            variant="secondary"
            className="
              hidden
              shrink-0
              rounded-md
              bg-slate-100
              px-2
              py-1
              font-mono
              text-[8px]
              font-medium
              uppercase
              tracking-wide
              text-slate-500
              sm:inline-flex
            "
          >
            Student
          </Badge>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Testimonials;
