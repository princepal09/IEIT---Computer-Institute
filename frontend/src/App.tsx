import { Routes, Route } from "react-router-dom";

import PublicLayout from "@/layouts/PublicLayout";
import HomePage from "./pages/public/HomePage";

function App() {
  return (
    
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          
        </Route>
      </Routes>
  );
}

export default App;