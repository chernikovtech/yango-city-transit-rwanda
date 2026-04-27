import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Citizens from "./pages/Citizens.jsx";
import Operators from "./pages/Operators.jsx";
import Government from "./pages/Government.jsx";
import Methodology from "./pages/Methodology.jsx";
import Platform from "./pages/Platform.jsx";
import Impact from "./pages/Impact.jsx";

/**
 * Scroll to top on every route change. Critical UX detail —
 * without this, navigating from a long page to a new sub-page lands you
 * mid-scroll on the new page, which is disorienting.
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/citizens" element={<Citizens />} />
        <Route path="/operators" element={<Operators />} />
        <Route path="/government" element={<Government />} />
        <Route path="/methodology" element={<Methodology />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  );
}
