import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ReactGoogleReviews,
  type ReactGoogleReview,
} from "react-google-reviews";
import "react-google-reviews/dist/index.css";

const FEATURABLE_ID = "54a11545-881f-4620-9d3b-e8761cafbe3a";

const AUTOPLAY_DELAY = 5000;

/* ---------------------------------------------
   Responsive visible review count
--------------------------------------------- */

const getVisibleCount = () => {
  if (typeof window === "undefined") {
    return 3;
  }

  if (window.innerWidth < 640) {
    return 1;
  }

  if (window.innerWidth < 1024) {
    return 2;
  }

  return 3;
};

/* ---------------------------------------------
   Relative date
--------------------------------------------- */

const getRelativeDate = (dateString: string | null) => {
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);
  const now = new Date();

  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) {
    return `${years} ${years === 1 ? "year" : "years"} ago`;
  }

  if (months > 0) {
    return `${months} ${months === 1 ? "month" : "months"} ago`;
  }

  if (days > 0) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  }

  if (hours > 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }

  if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  }

  return "Just now";
};

/* ---------------------------------------------
   Google icon
--------------------------------------------- */

const GoogleIcon = () => {
  return (
    <div
      aria-label="Google"
      className="flex h-8 w-8 shrink-0 items-center justify-center"
    >
      <span className="text-[25px] font-bold text-[#4285F4]">G</span>
    </div>
  );
};

/* ---------------------------------------------
   Review Card
--------------------------------------------- */

interface ReviewCardProps {
  review: ReactGoogleReview;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const comment = review.comment || "";

  const shouldTruncate = comment.length > 180;

  const displayedComment =
    !expanded && shouldTruncate
      ? `${comment.slice(0, 180).trim()}...`
      : comment;

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}
      className="
        flex
        min-w-0
        h-full
        flex-col
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition-shadow
        duration-300
        hover:shadow-md
        sm:p-6
      "
    >
      {/* Reviewer */}

      <div className="flex min-w-0 items-center gap-3">
        {review.reviewer.profilePhotoUrl ? (
          <img
            src={review.reviewer.profilePhotoUrl}
            alt={review.reviewer.displayName}
            className="
              h-10
              w-10
              shrink-0
              rounded-full
              object-cover
            "
            loading="lazy"
          />
        ) : (
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-red-500
              text-sm
              font-bold
              text-white
            "
          >
            {review.reviewer.displayName?.charAt(0)?.toUpperCase() || "G"}
          </div>
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-900">
            {review.reviewer.displayName}
          </p>

          <p className="mt-0.5 text-xs text-slate-400">
            {getRelativeDate(review.createTime)}
          </p>
        </div>
      </div>

      {/* Review content */}

      <div className="mt-5 flex-1 min-w-0">
        <p className="break-words text-sm leading-6 text-slate-600">
          {displayedComment}
        </p>

        {shouldTruncate && (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="
              mt-2
              text-xs
              font-semibold
              text-ieit-blue
              transition-colors
              hover:text-blue-700
            "
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>

      {/* Bottom */}

      <div
        className="
          mt-5
          flex
          items-center
          justify-between
          border-t
          border-slate-100
          pt-4
        "
      >
        {/* Stars */}

        <div
          className="flex items-center gap-0.5"
          aria-label={`${review.starRating} out of 5 stars`}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <span key={index} className="text-sm leading-none text-[#F4B400]">
              ★
            </span>
          ))}
        </div>

        {/* Google */}

        <GoogleIcon />
      </div>
    </motion.article>
  );
};

/* ---------------------------------------------
   Carousel
--------------------------------------------- */

interface ReviewCarouselProps {
  reviews: ReactGoogleReview[];
}

const ReviewCarousel = ({ reviews }: ReviewCarouselProps) => {
  const [visibleCount, setVisibleCount] = useState(getVisibleCount);
  const [currentPage, setCurrentPage] = useState(0);

  /* -------------------------------------------
     Handle responsive changes
  ------------------------------------------- */

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
      setCurrentPage(0);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* -------------------------------------------
     Create pages
  ------------------------------------------- */

  const pages = useMemo(() => {
    const result: ReactGoogleReview[][] = [];

    for (let i = 0; i < reviews.length; i += visibleCount) {
      result.push(reviews.slice(i, i + visibleCount));
    }

    return result;
  }, [reviews, visibleCount]);

  const totalPages = pages.length;

  /* -------------------------------------------
     Next
  ------------------------------------------- */

  const next = useCallback(() => {
    setCurrentPage((current) => {
      if (totalPages <= 1) {
        return 0;
      }

      return current >= totalPages - 1 ? 0 : current + 1;
    });
  }, [totalPages]);

  /* -------------------------------------------
     Previous
  ------------------------------------------- */

  const previous = useCallback(() => {
    setCurrentPage((current) => {
      if (totalPages <= 1) {
        return 0;
      }

      return current <= 0 ? totalPages - 1 : current - 1;
    });
  }, [totalPages]);

  /* -------------------------------------------
     Autoplay
  ------------------------------------------- */

  useEffect(() => {
    if (totalPages <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      next();
    }, AUTOPLAY_DELAY);

    return () => {
      window.clearInterval(interval);
    };
  }, [next, totalPages]);

  /* -------------------------------------------
     Empty state
  ------------------------------------------- */

  if (!reviews.length) {
    return null;
  }

  /*
   * IMPORTANT:
   *
   * Each page is 100% of the viewport.
   *
   * The motion track contains `totalPages`
   * pages, therefore one page equals:
   *
   * 100 / totalPages %
   *
   * of the entire track.
   *
   * This fixes the partial-card problem.
   */

  const translateX = totalPages > 0 ? currentPage * (100 / totalPages) : 0;

  return (
    <div className="relative w-full min-w-0">
      {/* Carousel viewport */}

      <div className="w-full min-w-0 overflow-hidden">
        {/* Track */}

        <motion.div
          className="flex w-full"
          animate={{
            x: `-${translateX}%`,
          }}
          transition={{
            duration: 0.45,
            ease: "easeInOut",
          }}
        >
          {/* Pages */}

          {pages.map((page, pageIndex) => (
            <div
              key={pageIndex}
              className="
                grid
                w-full
                shrink-0
                min-w-0
                grid-cols-1
                gap-5
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >
              {page.map((review, reviewIndex) => (
                <ReviewCard
                  key={review.reviewId ?? `review-${pageIndex}-${reviewIndex}`}
                  review={review}
                />
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation */}

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-3">
          {/* Previous */}

          <button
            type="button"
            onClick={previous}
            aria-label="Previous reviews"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              bg-white
              text-slate-700
              shadow-sm
              transition-all
              duration-200
              hover:border-slate-300
              hover:bg-slate-50
              active:scale-95
            "
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                d="M15 18l-6-6 6-6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Dots */}

          <div className="flex items-center gap-1.5">
            {pages.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to review page ${index + 1}`}
                aria-current={currentPage === index ? "true" : undefined}
                onClick={() => setCurrentPage(index)}
                className={`
                  h-1.5
                  rounded-full
                  transition-all
                  duration-300
                  ${
                    currentPage === index
                      ? "w-6 bg-ieit-blue"
                      : "w-1.5 bg-slate-300"
                  }
                `}
              />
            ))}
          </div>

          {/* Next */}

          <button
            type="button"
            onClick={next}
            aria-label="Next reviews"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              bg-white
              text-slate-700
              shadow-sm
              transition-all
              duration-200
              hover:border-slate-300
              hover:bg-slate-50
              active:scale-95
            "
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                d="M9 6l6 6-6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

/* ---------------------------------------------
   Google Reviews Section
--------------------------------------------- */

const GoogleReviews = () => {
  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        bg-[#f7f9fc]
        py-14
        sm:py-16
        lg:py-24
      "
    >
      {/* Background decoration */}

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
          sm:h-72
          sm:w-72
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
          bg-red-100/20
          blur-3xl
          sm:h-72
          sm:w-72
        "
      />

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-7xl
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* Header */}

        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 flex items-center justify-center gap-2.5 sm:gap-3">
            <span className="h-px w-5 bg-red-500/50 sm:w-7" />

            <span
              className="
                font-mono
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-red-600
                sm:text-[10px]
              "
            >
              Google Reviews
            </span>

            <span className="h-px w-5 bg-red-500/50 sm:w-7" />
          </div>

          <h2
            className="
              text-3xl
              font-extrabold
              leading-[1.05]
              tracking-[-0.045em]
              text-slate-900
              sm:text-4xl
              lg:text-5xl
            "
          >
            What people
            <span className="block text-ieit-blue">say about IEIT.</span>
          </h2>

          <p
            className="
              mx-auto
              mt-3
              max-w-lg
              px-2
              text-xs
              leading-5
              text-slate-500
              sm:px-0
              sm:text-sm
              sm:leading-6
            "
          >
            Real experiences from students and visitors who have been part of
            the IEIT community.
          </p>
        </div>

        {/* Reviews */}

        <div
          className="
            mt-8
            w-full
            min-w-0
            sm:mt-10
            lg:mt-12
          "
        >
          <ReactGoogleReviews
            layout="custom"
            featurableId={FEATURABLE_ID}
            renderer={(reviews) => <ReviewCarousel reviews={reviews} />}
          />
        </div>

        {/* Trust line */}

        <div
          className="
            mt-7
            flex
            flex-col
            items-center
            justify-center
            gap-2
            text-center
            sm:mt-8
            sm:flex-row
            sm:gap-3
          "
        >
          <div className="flex items-center gap-1">
            <span className="text-xs font-semibold text-slate-700 sm:text-sm">
              Google Reviews
            </span>

            <span className="text-sm text-red-500">★</span>
          </div>

          <span className="hidden size-1 rounded-full bg-slate-300 sm:block" />

          <p
            className="
              font-mono
              text-[8px]
              font-medium
              uppercase
              tracking-[0.13em]
              text-slate-400
              sm:text-[9px]
              sm:tracking-[0.15em]
            "
          >
            Real experiences · Real people · IEIT
          </p>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
