import React from "react";
import PropTypes from "prop-types";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

function ServiceCard({ title, description, image }) {
  return (
    <Card
      sx={{
        height: "100%",
        textAlign: "center",
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "4px", 
      }}
    >
      <CardMedia
        component="img"
        image={image}
        alt={title}
        loading="lazy" 
        sx={{
          height: "150px",
          objectFit: "cover",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          component="h3"
          gutterBottom
          color="primary"
          sx={{ fontWeight: "bold" }}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

// Prop type validation
ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default ServiceCard;
