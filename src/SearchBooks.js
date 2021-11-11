import React from "react";
import { Link } from "react-router-dom";
import { BooksGrid } from "./BooksGrid";
import { Header } from "./Header";
export class SearchBooks extends React.Component{
render(){
  return (
  <div>
  <Header title='My Reads' clearResults={this.props.clearResults} />
  <div className="search-books">
  <div className="search-books-bar">
    <Link to='/'><button  className="close-search">Close</button></Link>
    <div className="search-books-input-wrapper">
      <input type="text" placeholder="Search by title or author" onChange={this.props.updateResults}/>

    </div>
  </div>
  <div className="search-books-results">
    <BooksGrid books={this.props.books} update={this.props.update}/>
  </div>
  </div>
</div>)



}

}