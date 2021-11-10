import React from 'react';

export class Book extends React.Component{

render(){
const book = this.props.book;
const update=this.props.update;
return (<li>
  <div className="book">
    <div className="book-top">
      {
      book.imageLinks?(<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+book.imageLinks.thumbnail+')' }}></div>):
      <div className="book-cover" style={{ width: 128, height: 193, backgroundColor:'white' }}></div>
      }
      <div className="book-shelf-changer">
        <select value={book.shelf||'none'} onChange={(e)=>{update(e,book)}}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">{book.title}</div>
    {
    book.authors&&
    <div className="book-authors">{book.authors.join(',')}</div>
    }
  </div>
</li>)
}

}