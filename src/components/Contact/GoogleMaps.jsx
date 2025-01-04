
import React, { useRef, useState, useEffect } from "react";
import { Card, CardContent, Typography, Skeleton, Alert, Box } from "@mui/material";
import { MdLocationOn } from "react-icons/md";
import { useTranslation } from "react-i18next";

const GoogleMaps = ({ googleMapsEmbedUrl }) => {
  const { t } = useTranslation();
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [mapError, setMapError] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (iframeRef.current && iframeRef.current.contentDocument) {
        setIsMapLoading(false);
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">
          <MdLocationOn /> {t("contact.map.title")}
        </Typography>
        {isMapLoading && !mapError && (
          <Skeleton
            variant="rectangular"
            sx={{ width: "100%", height: 300, marginTop: 2 }}
          />
        )}
        {mapError ? (
          <Alert severity="error" sx={{ marginTop: 2 }}>
            {t("contact.map.error_message")}
          </Alert>
        ) : (
          <Box
            component="iframe"
            src={googleMapsEmbedUrl}
            ref={iframeRef}
            onError={() => {
              setIsMapLoading(false);
              setMapError(true);
            }}
            sx={{
              display: mapError || isMapLoading ? "none" : "block",
              width: "100%",
              height: 300,
              border: "none",
              marginTop: 2,
              zIndex: 0,
              pointerEvents: "auto",
            }}
            allow="geolocation"
            allowFullScreen
            loading="lazy"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default GoogleMaps;
