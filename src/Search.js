import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Book from "./Book";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Search extends React.Component {
  state = {
    query: "",
    foundBooks: []
  };

  updateQuery = query =>
    this.setState({ query: query }, () =>
      BooksAPI.search(query).then(books =>
        Array.isArray(books) && this.state.query !== ""
          ? this.collectBooks(books)
          : this.setState({ foundBooks: [] })
      )
    );

  collectBooks = books =>
    this.setState({
      foundBooks: books.map(book => {
        const savedBook = this.props.savedBooks.find(
          savedBook => savedBook.id === book.id
        );
        if (savedBook != null) {
          return savedBook;
        } else {
          return {
            id: book.id,
            title: book.title,
            authors: book.authors,
            cover: book.imageLinks != null ? book.imageLinks.thumbnail : null,
            shelf: "none"
          };
        }
      })
    });

  updateFoundBooks = bookToChange =>
    this.setState(previousState => ({
      foundBooks: previousState.foundBooks.map(book => {
        if (book.id === bookToChange.id) {
          return bookToChange;
        } else {
          return book;
        }
      })
    }));

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.foundBooks.map(foundBook => (
              <li key={foundBook.id}>
                <Book
                  resultsFromSearch={true}
                  updateFoundBooks={this.updateFoundBooks}
                  book={foundBook}
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

Search.propTypes = {
  savedBooks: PropTypes.array.isRequired,
  addBook: PropTypes.func.isRequired
};

export default Search;
