import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import DebounceInput from 'react-debounce-input'
import BookItem from './bookitem.js'
import * as BooksAPI from './BooksAPI.js'


class SearchBooks extends Component {
	static propTypes = {
	  books: PropTypes.array,
	  changeShelf: PropTypes.func.isRequired
	}
	state = {
		searchQuery: '',
		searchedBooks: []
	}

	getBookShelf = (bookId) => {
		const {books} = this.props;
		const book = books.find(book => (book.id === bookId));
		return book ? book.shelf : 'none';
	};

	searchBooks = (searchQuery) => {
    this.setState((state) => (state.searchQuery = searchQuery.trim()));
    BooksAPI.search(searchQuery.trim()).then((searchResult) => {
    	if (!searchResult || searchResult.error) {
    		this.setState((state) => (state.searchedBooks = []));
    	} else {
    		for (let book of searchResult) {
    			book.shelf = this.getBookShelf(book.id);
    		}
    		this.setState((state) => (state.searchedBooks = searchResult));
    	}
    })
  }
	render() {
		const { searchedBooks, searchQuery } = this.state;
		return (
			<div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <DebounceInput
            	debounceTimeout={300}
             	type="text"
	            placeholder="Search by title or author"
	            value={searchQuery}
	            onChange={(event) => this.searchBooks(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
        	<ol className="books-grid">
	        	{searchedBooks.map((book)=> (
	            <li key={book.id}>
	              <BookItem item={book} changeShelf={this.props.changeShelf}/>
	            </li>
	          ))}
        	</ol>
      	</div>
    	</div>
		);
	}
}

export default SearchBooks
