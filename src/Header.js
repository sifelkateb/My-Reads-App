import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


export class Header extends React.Component{
render(){
  return (
    <div className="list-books-title">
    <h1>{this.props.title}</h1>
    <Link className={`list-books-link ${window.location.pathname==='/'&&'list-books-link-visited'}`} to='/'>Home</Link>
    <Link className={`list-books-link ${window.location.pathname==='/search'&&'list-books-link-visited'}`} to='/search'  onClick={this.props.clearResults} >Search</Link>

  </div>
  )

}
}
Header.propTypes={
  title:PropTypes.string,
  clearResults:PropTypes.func
}
