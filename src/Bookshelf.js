import React from "react";
import "./App.css";
import Book from "./Book";
import PropTypes from 'prop-types';

class Bookshelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books
              .filter(book => {
                if (this.props.id === 0) {
                  return book.shelf === "currentlyReading";
                } else if (this.props.id === 1) {
                  return book.shelf === "wantToRead";
                } else {
                  return book.shelf === "read";
                }
              })
              .map(book => (
                <li key={book.id}>
                  <Book
                    resultsFromSearch={false}
                    updateFoundBooks={this.updateFoundBooks}
                    key={book.id}
                    book={book}
                    addBook={this.props.addBook}
                  />
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

Bookshelf.propTypes = {
  books: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  addBook: PropTypes.func.isRequired
}

export default Bookshelf;
