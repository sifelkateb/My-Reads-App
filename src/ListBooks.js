import React from 'react';
import { BookShelf } from './BookShelf';
import { Header } from './Header';
export class ListBooks extends React.Component{
render()
 {
return (
<div className="list-books">
<Header title='My Reads' clearResults={this.props.clearResults} />
  <div className="list-books-content">
    <div>
    <BookShelf  update={this.props.update} shelfType='Currently Reading' books={this.props.currentlyReading}/>
    <BookShelf  update={this.props.update} shelfType='Want to Read' books={this.props.wantToRead}/>
    <BookShelf  update={this.props.update} shelfType='Read' books={this.props.read}/> 
    </div>
  </div>
</div>)
  }
}