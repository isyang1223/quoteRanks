import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-allauthor',
  templateUrl: './allauthor.component.html',
  styleUrls: ['./allauthor.component.css']
})
export class AllauthorComponent implements OnInit {
  authors = [];
  author = {};
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getAuthors()
  }
  getAuthors(){
    let observable = this._httpService.getAuthors();
    console.log("22222222222222")

    observable.subscribe(data => {
      console.log(data)
      this.authors = data["data"];


      
    })
  }
  view(author){
    console.log("&&&&&&&&&" + author._id)
    this._httpService.view(author)

  }
  grabAuthor(author){
    console.log("22222222222222!!!!!!!!!!!" + author)
    this._httpService.grabAuthor(author)
     


    
  }

  deleteAuthor(author){
    let observable = this._httpService.deleteAuthor(author);
    
    observable.subscribe(data => {


      this.getAuthors()
    })
  }
}
