import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import Footer from "./components/Footer/Footer";
import ForgotPassword from "./components/Login/ForgotPassword";
import AllEventsPage from "./components/Events/Eventpage";
import Gallery from "./components/Gallery/Gallery";
import Home from "./components/Home/Home";
import "./index.css";
import PP from "./pages/privacyPolicy";
import RF from "./pages/refundPolicy";
import TC from "./pages/TermsCondition";
import ScrollToTopButton from "./components/Floatingbutton";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/gallery" element={<Gallery />}></Route>
          <Route path="/footer" element={<Footer />}></Route>
          <Route path="/forgot" element={<ForgotPassword />}></Route>
          <Route path="/courses" element={<AllEventsPage />}></Route>
          <Route path="/privacy-policy" element={<PP />}></Route>
          <Route path="/refund-policy" element={<RF />}></Route>
          <Route path="/terms-condition" element={<TC />}></Route>
        </Routes>
      </BrowserRouter>
      <ScrollToTopButton/>
    </>
  );
}

export default App;
