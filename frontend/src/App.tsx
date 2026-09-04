import { Route, Routes } from "react-router-dom";

import PublicLayout from "@/layouts/PublicLayout";

import HomePage from "@/pages/public/HomePage";
import ErrorState from "@/components/shared/ErrorState";
import About from "./pages/public/About";
import Gallery from "./pages/public/Gallery";
import Courses from "./pages/public/Courses";
import { Toaster } from "sonner";
import Contact from "./pages/public/Contact";
import Branch from "./pages/public/Branch";
import Enquiry from "./pages/public/Enquiry";
import CourseDetails from "./pages/public/CourseDetails";
import ProtectedAdminRoute from "./pages/admin/ProtectedAdminRoute";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminForgotPasswordPage from "./pages/admin/AdminForgotPassword";
import AdminResetPasswordPage from "./pages/admin/AdminResetPasswordPage";
import AdminCoursesPage from "./components/admin/course/AdminCoursesPage";
import AdminLayout from "./layouts/AdminLayout";

const App = () => {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/branches/:branchSlug" element={<Branch />} />
          <Route path="/enquire" element={<Enquiry />} />
          <Route path="/courses/:courseSlug" element={<CourseDetails />} />
        </Route>

        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/reset-password" element={<AdminResetPasswordPage />} />
        <Route path="/forgot-password" element={<AdminForgotPasswordPage />} />

        <Route element={<ProtectedAdminRoute />}>
          <Route element={<AdminLayout/>}>
            {/* Protected Admin */}
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/courses" element={<AdminCoursesPage />} />

            {/* Later */}

            {/* 
          <Route
            path="/admin/courses"
            element={<AdminCoursesPage />}
          />

          <Route
            path="/admin/branches"
            element={<AdminBranchesPage />}
          />

          <Route
            path="/admin/enquiries"
            element={<AdminEnquiriesPage />}
          />
          */}
          </Route>
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={
            <ErrorState
              title="Page not found"
              description="The page you're looking for doesn't exist or may have been moved."
              showHome
            />
          }
        />
      </Routes>
      <Toaster position="top-right" />
    </>
  );
};

export default App;
