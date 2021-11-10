import React from 'react';
import { BooksGrid } from './BooksGrid';

export class BookShelf extends React.Component{
render(){
  return (
    <div className="bookshelf">
                  <h2 className="bookshelf-title">{this.props.shelfType}</h2>
                  <div className="bookshelf-books">
                  <BooksGrid update={this.props.update} books={this.props.books}/>
                  </div>
                </div>
  )
}
}
