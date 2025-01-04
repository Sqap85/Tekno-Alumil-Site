import React, { memo } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const AboutCard = ({ title, description, image }) => (
  <Card sx={{ height: "100%", textAlign: "center", boxShadow: 3 }}>
    <CardMedia
      component="img"
      image={image}
      alt={title}
      loading="lazy" // Lazy load the image
      sx={{
        height: "150px",
        objectFit: "cover",
        borderRadius: "4px",
      }}
    />
    <CardContent>
      <Typography variant="h6" component="h3" gutterBottom color="primary">
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {description}
      </Typography>
    </CardContent>
  </Card>
);

export default memo(AboutCard);
