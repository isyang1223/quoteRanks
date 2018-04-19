import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  author: any;

  constructor(private _http: HttpClient) { }
  getAuthors(){
    console.log("11111111")
    return this._http.get('/authors');
  }
  deleteAuthor(author){
    console.log("11111111" + author)
    return this._http.delete('/authors/remove/' + author._id)
  }
  addAuthor(author) {
    console.log("11111111" + author)
    return this._http.post('/author', author)
  }
  grabAuthor(author) {
    console.log("11111111")
    this.author = author
    
  }
  grabAuthorById(author) {
    return this._http.put('/author/edit/' + author._id, this.author)
  }
  saveAuthor(author) {
    console.log("##############" + author)
    console.log("##############" + author._id)
    this.author.name = author;
    return this._http.put('/author/edit/' + this.author._id, this.author)
  }
  view(author){
    this.author = author
    
  }
  newQuote(quote){
    return this._http.put('/author/quote/' + this.author._id, quote)
    
  }
  deleteQuote(author, quote){
    console.log("123124151251521"+author)
    return this._http.put ('/quotes/remove/' + author._id, quote)
  }

  voteUp(quote){
    console.log("123124151251521" + quote._id)
    return this._http.put('/quotes/up/' + quote._id, this.author)

  }
  voteDown(quote) {
    console.log("123124151251521" + quote._id)
    return this._http.put('/quotes/down/' + quote._id, this.author)

  }
}
