import React from "react";
import { Link } from "react-router-dom";
import { BooksGrid } from "./BooksGrid";

export class SearchBooks extends React.Component{
render(){
  return (<div className="search-books">
  <div className="search-books-bar">
    <Link to='/'><button onClick={this.props.getShelfs} className="close-search">Close</button></Link>
    <div className="search-books-input-wrapper">
      <input type="text" placeholder="Search by title or author" onChange={this.props.updateResults}/>

    </div>
  </div>
  <div className="search-books-results">
    <BooksGrid books={this.props.books} update={this.props.update}/>
  </div>
</div>)



}

}