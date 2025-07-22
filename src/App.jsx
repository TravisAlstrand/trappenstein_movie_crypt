import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "./utils/userContext";

// Components
import Navbar from "./components/Navbar";

// Pages
import LandingPage from "./pages/LandingPage";

function App() {
  const { user } = useUser();

  return (
    <>
      <Navbar />
      {!user && <Navigate to="/" replace />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </>
  );
}

export default App;
