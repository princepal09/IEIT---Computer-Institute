import { Route, Routes } from "react-router-dom";

import PublicLayout from "@/layouts/PublicLayout";

import HomePage from "@/pages/public/HomePage";
import ErrorState from "@/components/shared/ErrorState";

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
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
  );
};

export default App;