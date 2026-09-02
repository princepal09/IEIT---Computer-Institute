export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  category: string;
}

export const courses: Course[] = [
  {
    id: "1",
    title: "Full Stack Web Development",
    description:
      "Master modern web technologies from front-end to back-end. Build real-world applications with React, Node.js, and databases.",
    duration: "6 Months",
    level: "Intermediate",
    category: "Web Development",
  },
  {
    id: "2",
    title: "Graphic Design & UI/UX",
    description:
      "Learn professional design principles, tools, and user experience strategies to create stunning digital products.",
    duration: "4 Months",
    level: "Beginner",
    category: "Design",
  },
  {
    id: "3",
    title: "Professional Computer Application",
    description:
      "Gain essential computer skills for professional environments including advanced office tools and productivity software.",
    duration: "3 Months",
    level: "Beginner",
    category: "Computer Fundamentals",
  },
];
