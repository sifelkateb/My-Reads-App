import React from 'react';
import { Book } from './Book';
export class BooksGrid extends React.Component{
  render(){
  const books=this.props.books;
  return (
    <ol className="books-grid">
    {
      books.map(book=>(<Book key={book.id} book={book} update={this.props.update} />))
    }
    </ol>
  )
  }
}