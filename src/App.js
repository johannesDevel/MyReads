import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import Search from "./Search";
import Bookshelf from "./Bookshelf";
import * as BooksAPI from "./BooksAPI";
import { Link, Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    shelves: [
      {
        id: 0,
        title: "Currently Reading"
      },
      {
        id: 1,
        title: "Want to Read"
      },
      {
        id: 2,
        title: "Read"
      }
    ]
  };

  componentDidMount() {
    BooksAPI.getAll().then(books =>
      this.setState({
        books: books.map(book => ({
          id: book.id,
          title: book.title,
          authors: book.authors,
          cover: book.imageLinks != null ? book.imageLinks.thumbnail : null,
          shelf: book.shelf
        }))
      })
    );
  }

  addBook = bookToChange => {
    const foundBook = this.state.books.find(
      book => book.id === bookToChange.id
    );
    BooksAPI.update(bookToChange, bookToChange.shelf);
    if (foundBook == null) {
      this.setState(currentState => ({
        books: [...currentState.books, bookToChange]
      }));
    } else {
      this.setState(currentState => ({
        books: currentState.books
          .filter(book => book.id !== bookToChange.id)
          .concat(bookToChange)
      }));
    }
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                {this.state.shelves.map(shelf => (
                  <div key={shelf.id}>
                    <Bookshelf
                      id={shelf.id}
                      title={shelf.title}
                      books={this.state.books}
                      addBook={this.addBook}
                    />
                  </div>
                ))}
              </div>
              <div className="open-search">
                <Link to="/search">
                  <button>Add a book</button>
                </Link>
              </div>
            </div>
          )}
        />
        <Route
          path="/search"
          render={() => (
            <Search savedBooks={this.state.books} addBook={this.addBook} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
