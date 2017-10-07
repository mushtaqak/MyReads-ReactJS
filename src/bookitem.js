import React, { Component } from 'react'
import PropTypes from 'prop-types'


class BookItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    changeShelf: PropTypes.func.isRequired
  }

  onChangeShelf = (event) => {
    this.props.changeShelf(this.props.item, event.target.value);
  }

  render() {
    const { item } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${item.imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select defaultValue={item.shelf ? item.shelf: 'none' } onChange={(item) => {this.onChangeShelf(item)}}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{item.title}</div>
        <div className="book-authors">{item.authors && item.authors.join(', ')}</div>
      </div>
    );
  }
}

export default BookItem
