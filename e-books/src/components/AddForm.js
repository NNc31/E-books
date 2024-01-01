import { Button, Container, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

export default function AddForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const bookCreate = async (book) => {
    try {
      const response = await fetch("http://localhost:3001/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });

      if (response.ok) {
        console.log("Book added");
      } else {
        console.error("Error while adding new book");
      }
    } catch (error) {
      console.error("Caugh error:", error);
    }
  };

  const addBook = () => {
    const book = { title, author };
    bookCreate(book);
    setTitle("");
    setAuthor("");
  };

  return (
    <Container>
      <Grid container spacing={4} justifyContent="space-around" alignItems="flex-start">
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={addBook} style={{ backgroundColor: "black" }}>
            Add new book
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
