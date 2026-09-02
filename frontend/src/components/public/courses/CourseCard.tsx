// import { Link } from "react-router-dom";
// import { ArrowRight, GraduationCap } from "lucide-react";
// import type { Course } from "@/data/courses";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";

// const imageStyles: Record<string, string> = {
//   "Web Development":
//     "bg-gradient-to-br from-[color:var(--ieit-blue)]/[0.08] to-[color:var(--ieit-cyan)]/[0.08] text-[color:var(--ieit-blue)]",
//   Design:
//     "bg-gradient-to-br from-purple-500/[0.08] to-pink-500/[0.08] text-purple-600",
//   "Computer Fundamentals":
//     "bg-gradient-to-br from-[color:var(--ieit-navy)]/[0.08] to-[color:var(--ieit-blue)]/[0.08] text-[color:var(--ieit-navy)]",
// };

// interface CourseCardProps {
//   course: Course;
// }

// const CourseCard = ({ course }: CourseCardProps) => {
//   const style = imageStyles[course.category] ?? imageStyles["Web Development"];

//   return (
//     <Card className="group overflow-hidden ring-border/60 transition-shadow hover:shadow-[var(--shadow-elevated)]">
//       {/* Image placeholder */}
//       <div
//         className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden ${style}`}
//       >
//         <GraduationCap className="size-12 opacity-60 transition-transform duration-300 group-hover:scale-110" />
//       </div>

//       <CardHeader className="gap-2 pt-5">
//         <div className="flex items-center gap-2">
//           <Badge variant="secondary" className="text-[0.7rem] font-medium">
//             {course.category}
//           </Badge>
//           <span className="text-xs text-muted-foreground">
//             {course.duration}
//           </span>
//         </div>
//         <CardTitle className="mt-1 text-[1.05rem] font-semibold leading-snug">
//           {course.title}
//         </CardTitle>
//       </CardHeader>

//       <CardContent>
//         <CardDescription className="text-sm leading-relaxed">
//           {course.description}
//         </CardDescription>
//       </CardContent>

//       <div className="mt-auto px-[var(--card-spacing)] pb-[var(--card-spacing)]">
//         <Button
//           variant="ghost"
//           size="sm"
//           render={<Link to="/courses" />}
//           className="gap-1.5 text-sm font-medium text-[color:var(--ieit-blue)] hover:text-[color:var(--ieit-blue-dark)]"
//         >
//           Learn More
//           <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
//         </Button>
//       </div>
//     </Card>
//   );
// };

// export default CourseCard;
