import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './bookshelf.js'


class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  }

	render() {
    const { books , changeShelf} = this.props;
    const bookShelves = [
      {
        books: books.filter(book => (book.shelf === 'currentlyReading')),
        title: 'Currently Reading',
        key: 'currentlyReading'
      },
      {
        books: books.filter(book => (book.shelf === 'wantToRead')),
        title: 'Want To Read',
        key: 'wantToRead'
      },
      {
        books: books.filter(book => (book.shelf === 'read')),
        title: 'Read',
        key: 'read'
      }
    ];

    return (
        <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {bookShelves && bookShelves.map((bookShelf)=> (
            <div key={bookShelf.key}>
              <BookShelf
                books={bookShelf.books}
                title={bookShelf.title}
                changeShelf={changeShelf}/>
            </div>
          ))};
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
	}
}

export default ListBooks
