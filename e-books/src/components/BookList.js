import {
  Container,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  Modal,
  Paper,
  TextField
} from "@mui/material";
import React, { useState } from "react";

const BookList = ({ books, onUpdateBook, onDeleteBook }) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);

  const closeModalTag = () => {
    setModalOpened(false);
    setSelectedBook(null);
  };

  const clickedUpdate = (book) => {
    setSelectedBook(book);
    setModalOpened(true);
  };

  const clickedDelete = (bookId) => {
    onDeleteBook(bookId);
  };

  const updateBook = () => {
    onUpdateBook(selectedBook);
    closeModalTag();
  };

  return (
    <div>
	<Container style={{ marginTop: "2%" }}>
	  <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book._id}>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>
                  <Button onClick={() => clickedUpdate(book)} style={{ color: "green" }}>
                    Update
                  </Button>
				  /
                  <Button onClick={() => clickedDelete(book._id)} style={{ color: "red" }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={modalOpened} onClose={closeModalTag}>
        <Card style={{ margin: "10%", padding: "2%" }}>
          <div>
            <TextField
              label="Name"
              value={selectedBook?.title}
              onChange={(e) =>
                setSelectedBook((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <TextField
              label="Author"
              value={selectedBook?.author}
              onChange={(e) =>
                setSelectedBook((prev) => ({ ...prev, author: e.target.value }))
              }
            />
            <Button onClick={updateBook}>Update</Button>
          </div>
        </Card>
      </Modal>
	  </Container>
    </div>
  );
};

export default BookList;
