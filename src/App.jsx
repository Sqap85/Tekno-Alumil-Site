import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import About from "./components/About/About";
import Products from "./components/Products/Products";
import Contact from "./components/Contact/Contact";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import "./i18n";

function App() {
  const location = useLocation(); // Get the current route

  // Do not render Header on the PageNotFound route
  const showHeader = location.pathname !== "*";

  return (
    <React.Fragment>
      {showHeader && <Header />} {/* Conditionally render the Header */}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </React.Fragment>
  );
}

export default App;
