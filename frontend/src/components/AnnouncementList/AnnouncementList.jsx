import React, { useState } from "react";
import { Container, List, Paper, Typography } from "@mui/material";
import AnnouncementSingle from "../AnnouncementSingle/AnnouncementSingle";

const AnnouncementList = (props) => {
  const { announcements, getAnnouncements } = props;
  return (
    <Container sx={{ marginTop: 3, paddingBottom: 5 }}>
      <Paper elevation={4}>
        <Typography
          variant="h5"
          color="#ff8b31"
          sx={{ paddingTop: 1, paddingLeft: "40%" }}
        >
          Announcements
        </Typography>
        <List>
          {announcements
            .slice(0)
            .reverse()
            .map((announcement) => (
              <AnnouncementSingle
                announcement={announcement}
                key={announcement.id}
              />
            ))}
        </List>
      </Paper>
    </Container>
  );
};

export default AnnouncementList;
