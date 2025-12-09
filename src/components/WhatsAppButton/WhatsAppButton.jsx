import React from "react";
import { Fab, Tooltip } from "@mui/material";
import { FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "./WhatsAppButton.css";

const WhatsAppButton = () => {
  const { t } = useTranslation();
  const phoneNumber = "905488488585"; 

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${phoneNumber}`;
    window.open(url, "_blank");
  };

  return (
    <Tooltip title={t("whatsapp.tooltip")} placement="left">
      <Fab
        className="whatsapp-button"
        color="success"
        aria-label="whatsapp"
        onClick={handleWhatsAppClick}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          backgroundColor: "#25D366",
          "&:hover": {
            backgroundColor: "#128C7E",
          },
          zIndex: 1000,
        }}
      >
        <FaWhatsapp size={30} color="white" />
      </Fab>
    </Tooltip>
  );
};

export default WhatsAppButton;
