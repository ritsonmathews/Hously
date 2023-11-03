import React, { useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import "./UserProfile.css";

const MyReviews = () => {
  const [receivedReviews, setReceivedReviews] = useState([
    { id: 1, employer: "Employer A", review: "Great employee!", rating: 5 },
    { id: 2, employer: "Employer B", review: "Good work.", rating: 4 },
    {
      id: 3,
      employer: "Employer C",
      review: "Could improve communication.",
      rating: 3,
    },
  ]);

  return (
    <div className="MyReviews">
      <Container>
        <Typography
          variant="h3"
          style={{ color: "#00027B", marginBottom: "15px" }}
        >
          My Reviews
        </Typography>

        <List>
          {receivedReviews.map((review) => (
            <ListItem key={review.id}>
              <ListItemText
                primary={`From: ${review.employer}`}
                secondary={`Rating: ${review.rating} / 5`}
                secondaryTypographyProps={{ color: "textSecondary" }}
              />
              <ListItemText primary={review.review} />
            </ListItem>
          ))}
        </List>
      </Container>
    </div>
  );
};

export default MyReviews;
