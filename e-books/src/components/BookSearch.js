import { Grid, Container } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
const BookSearch = ({ onSearch }) => {
  const [bookName, setBookName] = useState("");

  const searchBook = () => {
    const searchData = bookName;
    onSearch(searchData);
  };

  return (
  <Container>
    <Grid container spacing={4} justifyContent="space-around" alignItems="flex-start" direction="column">
	  <Grid item xs={6}>
	    <TextField
          label="Name"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
		  fullWidth
        />
	  </Grid>
      <Grid item xs={12}>
	    <Button variant="contained" onClick={searchBook} style={{ backgroundColor: "black" }}>
          Search
        </Button>
	  </Grid> 
    </Grid>
  </Container>
  );
};

export default BookSearch;
