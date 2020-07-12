import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import PropTypes from "prop-types";

class Book extends React.Component {
  handleChange(event) {
    event.persist();
    this.props.addBook({ ...this.props.book, shelf: event.target.value });
    if (this.props.resultsFromSearch) {
      this.props.updateFoundBooks({
        ...this.props.book,
        shelf: event.target.value
      });
    }
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${this.props.book.cover})`
            }}
          />
          <div className="book-shelf-changer">
            <select
              value={this.props.book.shelf}
              onChange={event => this.handleChange(event)}
            >
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">
          {this.props.book.title != null
            ? this.props.book.title
            : "Title not found"}
        </div>
        {this.props.book.authors != null ? (
          this.props.book.authors.map(author => (
            <div key={author} className="book-authors">
              {author}
            </div>
          ))
        ) : (
          <div key={this.props.id + "not-found"} className="book-authors">
            Author not found
          </div>
        )}
      </div>
    );
  }
}

Book.propTypes = {
  resultsFromSearch: PropTypes.bool.isRequired,
  updateFoundBooks: PropTypes.func,
  book: PropTypes.object.isRequired,
  addBook: PropTypes.func.isRequired
};

export default Book;
