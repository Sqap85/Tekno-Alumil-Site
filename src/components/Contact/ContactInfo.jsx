import React, { useMemo } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { useTranslation } from "react-i18next";

const ContactInfo = ({ phoneNumbers, email }) => {
  const { t } = useTranslation();

  // Memoize phone elements to avoid unnecessary re-renders
  const phoneElements = useMemo(
    () =>
      phoneNumbers.map((phone, index) => (
        <Typography
          key={index}
          variant="body2"
          component="a"
          href={`tel:${phone}`}
          sx={{
            textDecoration: "none",
            color: "primary.main",
            display: "flex",
            alignItems: "center",
            gap: 1,
            "&:hover": { textDecoration: "underline" },
          }}
        >
          <MdPhone /> {t("contact.info.phone_label")}: {phone}
        </Typography>
      )),
    [phoneNumbers, t]
  );

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{t("contact.info.title")}</Typography>

        {/* Phone Numbers */}
        <Box sx={{ marginTop: 2 }}>
          {phoneElements}
        </Box>

        {/* Email Section */}
        <Box sx={{ marginTop: 2 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <MdEmail /> {t("contact.info.email_label")}:
          </Typography>
          <Typography
            variant="body2"
            component="a"
            href={`mailto:${email}`}
            sx={{
              textDecoration: "none",
              color: "primary.main",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {email}
          </Typography>
        </Box>

        {/* Address Section */}
        <Box sx={{ marginTop: 2 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <MdLocationOn /> {t("contact.info.address_label")}:
          </Typography>
          <Typography variant="body2">{t("contact.info.address")}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default React.memo(ContactInfo);
