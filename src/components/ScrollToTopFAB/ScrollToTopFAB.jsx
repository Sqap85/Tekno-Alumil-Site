import React, { useState, useEffect } from "react";
import { Fab, Fade } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function ScrollToTopFAB() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Fade in={visible}>
      <Fab
        size="small"
        color="secondary"
        aria-label="scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        sx={{ position: "fixed", bottom: 80, right: 16, zIndex: 1200 }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Fade>
  );
}

export default ScrollToTopFAB;
