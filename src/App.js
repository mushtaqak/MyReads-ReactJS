import React from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './listbooks.js'
import SearchBooks from './searchbooks.js'
import * as BooksAPI from './BooksAPI.js'
import './App.css'


class BooksApp extends React.Component {
  state = {
    books: []
  }

  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }

  componentWillMount() {
    this.getAllBooks();
  }

  changeShelf = (bookItem, shelf) => {
    BooksAPI.update(bookItem, shelf).then((response) => {
      this.getAllBooks();
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            changeShelf={(bookItem, shelf) => {
              this.changeShelf(bookItem, shelf)
            }}/>
        )}/>
        <Route path='/search' render={({ history }) => (
          <SearchBooks
            books={this.state.books}
            changeShelf={(bookItem, shelf) => {
              this.changeShelf(bookItem, shelf)
            }}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
