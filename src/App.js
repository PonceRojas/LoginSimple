import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import Landing from "./pages/web/Landing";

const showLanding = process.env.REACT_APP_SHOW_LANDING === "true";

function App() {
  return (
    <BrowserRouter>
      <Routes>
         {showLanding && <Route path="/Landing" element={<Landing />} />}

        <Route path="/" element={showLanding ? <Navigate to="/Landing" /> : <Login />}
        />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;