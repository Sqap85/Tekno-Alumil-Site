import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "./App.css";
import { Box } from "@mui/material";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import ScrollToTopFAB from "./components/ScrollToTopFAB/ScrollToTopFAB";
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton";
import "./i18n";

NProgress.configure({ showSpinner: false, color: "#ef1717" });

const Home = lazy(() => import("./components/Home/Home"));
const About = lazy(() => import("./components/About/About"));
const Services = lazy(() => import("./components/Services/Services"));
const Contact = lazy(() => import("./components/Contact/Contact"));
const PageNotFound = lazy(() => import("./components/PageNotFound/PageNotFound"));

function App() {
  const location = useLocation();

  const showHeader = location.pathname !== "*";

  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => NProgress.done(), 300);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <React.Fragment>
      {showHeader && <Header />}
      <ScrollToTop />
      <Suspense fallback={<Box sx={{ minHeight: "100vh" }} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <WhatsAppButton />
      <ScrollToTopFAB />
    </React.Fragment>
  );
}

export default App;
