import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Container, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";

import AddForm from "./components/AddForm";
import BookSearch from "./components/BookSearch";
import BookList from "./components/BookList";


function App() {
  const [books, setBookList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/books");
        const data = await response.json();
        setBookList(data);
      } catch (error) {
        console.error("Error while loading data:", error);
      }
    };

    fetchData();
  }, []);
  
    const bookSearch = async (data) => {
    try {
      data = !data || data === undefined ? "" : data;
      const response = await fetch(`http://localhost:3001/books`);
      const resp = await response.json();
      const respFiltered = resp.filter((book) => {
        return (
          book.title && book.title.toLowerCase().includes(data.toLowerCase())
        );
      });
      setBookList(respFiltered);
    } catch (error) {
      console.error("Error while loading data:", error);
    }
  };

  const updateBook = async (updatedBook) => {
    try {
      const response = await fetch(
        `http://localhost:3001/books/${updatedBook._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBook),
        }
      );

      if (response.ok) {
        setBookList((currBookList) =>
          currBookList.map((book) =>
            book._id === updatedBook._id ? updatedBook : book
          )
        );
      } else {
        console.error("Error while book update");
      }
    } catch (error) {
      console.error("Caught error:", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/books/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setBookList((currBookList) =>
          currBookList.filter((book) => book._id !== id)
		);
      } else {
        console.error("Error while deleting the book");
      }
    } catch (error) {
      console.error("Caught error:", error);
    }
  };


  return (
	<Container>
      <Paper
        variant="elevation"
		elevation="8"
        style={{ alignContent: "center", padding: "1%", marginTop: "1%" }}
      >
        <Typography variant="h4" align="left" padding="2%">
          Add a new book
        </Typography>
        <AddForm></AddForm>
        <Typography variant="h4" align="left" padding="2%">
          Find book by name or it's part
        </Typography>
        <BookSearch onSearch={bookSearch}></BookSearch>
        <BookList
          books={books}
          onUpdateBook={updateBook}
          onDeleteBook={deleteBook}
        />
      </Paper>
    </Container>
    
  );
}

export default App;
