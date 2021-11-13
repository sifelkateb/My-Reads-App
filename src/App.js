import React from "react";
import * as BooksAPI from './BooksAPI';
import { ListBooks } from './ListBooks';
import { SearchBooks } from "./SearchBooks";
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import './App.css';



class BooksApp extends React.Component {
  state = {
    books:[], //current books available in the userList
    shelfs:{ //books ordered according to shelfs
      currentlyReading:[],
      read:[],
      wantToRead:[],
    },
    searchResults:[], // book results from search
    hash:{}, //  hashmap for checking if the book from seach results in the list or not and getting it's state
  }
  /*
  1-setHash function create hash map for books in the list 
  2-it loops through the books array in the state 
  3-for each book it add a new (id) property to the hash object in the state and set it equal to either ['currentlyReading','read','wantToRead'];
  4-later hash map is used  for applying book state to search results!
  */
  setHash=(books)=>{
    const newHash={};
    this.setState((prevState)=>{
      const currentBooks=books||prevState.books;
      currentBooks.forEach(book=>{
        const bookId=book.id;
        const bookShelf=book.shelf;
        newHash[bookId]=bookShelf;
      })
      return {hash:newHash}
    })
  
  }
  /*
  1-In the Book component book.shelf property is used for setting the value of each book 
  2- because the search results don't include shelf property. hash map is used to get if the book from the result has a state or not and if it has 
  book.shelf property is added to each book object in the results
  */
  setShelfs=(books=this.state.searchResults)=>{
    books.forEach(book=>{
      const bookId=book.id;
      if(this.state.hash[bookId]){
        book.shelf=this.state.hash[bookId];        
      }
    })
    this.setState({searchResults:books})

  }
  /*
  1-getBooks function is used to query the books on the shelfs and 
  2-after that it updates the shelfs state property using setState 
  3-which causes the App component and it's children to rerender with all the required books 

  */
  getBooks=()=>{
    BooksAPI.getAll().then(books=>{
      this.setState({
        books,
        shelfs:{
          currentlyReading:books.filter(book=>(book.shelf==='currentlyReading')),
          wantToRead:books.filter(book=>(book.shelf==='wantToRead')),
          read:books.filter(book=>(book.shelf==='read'))
        }
      });
      this.setHash(books);
      });
  } 
  /*
  1-updateResult function is used to update the searchResults Array in the state
  2-the function perform search using BookAPI.search() and put the result in the searchResults Array in the state
  3-if the input value is empty then empty search results array which caused the BooksGrid to render nothing!
  4-if object is returned instead of array with error value then empty the searchResults array in the state
  5- after getting the results array setShelf function is applied for setting each book  state

  */
  updateResults=(e)=>{
    const searchInput=e.target;
    if(!searchInput.value){
      this.setState({searchResults:[]})
      return ;
    }
    BooksAPI.search(searchInput.value).then(books=>{
      if(!searchInput.value){
        this.setState({searchResults:[]})
        return ;
      }
      if(books.error)
      this.setState({searchResults:[]})
      else{
        this.setShelfs(books);
      }
    })
  }
  /*
  clearResult is used to cleat the searchResult Array after navigating the main route
  */
  clearResults=()=>{
    this.setState({searchResults:[]})
  }
  /*
  1-updateShelfs is used to update each book state with it's current new State
  2- after that getBooks function is used for getting the books from the server 
  3- components are rerendered with the new state
  */
  updateShelfs=(e,book)=>{
    const newValue=e.target.value;
    const previousValue=book.shelf;
    this.setState((prevState=>{
      const previousShelfs=prevState.shelfs;
      let currentBooks=prevState.books;
      previousShelfs[previousValue]=previousShelfs[previousValue].filter(b=>b.id!==book.id);
      currentBooks=currentBooks.filter(b=>b.id!==book.id);
      if(newValue!=='none'){
        book.shelf=newValue;
        previousShelfs[newValue].push(book);
        currentBooks.push(book);
      }
      return {shelf:previousShelfs,books:currentBooks};
    }))
    this.setHash();
    BooksAPI.update(book,e.target.value);
  }
 // reference https://www.freecodecamp.org/news/javascript-debounce-example/
/*
1-a debouncing function with a default timeout value of 300 ms 
2-the function accept another function as argument along with a timeout which defaults to 300!
*/
 debounce=(func, timeout = 300)=>{
  let timer;
  return (...args) => {
    args[0].persist();
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}
  /*
  1-updateSearchShelfs is used to update book states in the search route
  2-searchResults array is looped through 
  3- if the book id matched the book that fired the event new shelf is applied to that book
  */

  updateSearchShelfs=(e,book)=>{
    const newShelf=e.target.value;
    const previousShelf=book.shelf||'none';
    BooksAPI.update(book,newShelf);
    this.setState((prevState)=>{
      const result=prevState.searchResults;
      const shelfs=prevState.shelfs;
      let currentBooks=prevState.books;
      result.forEach(b=>{
        if(b.id===book.id){
          b.shelf=newShelf;
        }
      });
      if(previousShelf!=='none'){
        shelfs[previousShelf]=shelfs[previousShelf].filter(b=>b.id!==book.id);
        currentBooks=currentBooks.filter(b=>b.id!==book.id);
      }
      if(newShelf!=='none'){
        book.shelf=newShelf;
        shelfs[newShelf].push(book);
        currentBooks.push(book);
      }
      return {searchResults:result,shelfs,books:currentBooks}
    });
    this.setHash();
  }
  /*
  when the component is fired rendered componentDidMount is fired and all books are extracted from the server then 
  the components rerender
  */
  componentDidMount(){
    this.getBooks();
  }

  render() {
    const updateResults = this.debounce(this.updateResults);
    return (
      <div className="app">
        <Router>
        <Routes>
        <Route path='/search' element={<SearchBooks clearResults={this.clearResults} update={this.updateSearchShelfs} updateResults={updateResults} books={this.state.searchResults}/> }>
         
          </Route>
          <Route path='/' element={<ListBooks clearResults={this.clearResults} update={this.updateShelfs} read={this.state.shelfs.read} currentlyReading={this.state.shelfs.currentlyReading} wantToRead={this.state.shelfs.wantToRead}/>
}>
          </Route>
          </Routes>
        </Router>
      </div>
    )
  }
}

export default BooksApp
