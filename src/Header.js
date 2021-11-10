import React from 'react';

export class Header extends React.Component{
render(){
  return (
    <div className="list-books-title">
    <h1>{this.props.title}</h1>
  </div>
  )


}
}
