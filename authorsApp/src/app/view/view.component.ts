import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  author: any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService) { }

  ngOnInit() {
    this.author = this._httpService.author;
    let observable = this._httpService.grabAuthorById(this.author);
    observable.subscribe(data => {
    this.author = data["data"]
    this.author.quotes.sort(function (a, b) {
      return b.vote - a.vote;
    })
    })
  }
  deleteQuote(author, quote){
    this.author = this._httpService.author;
    let observable = this._httpService.deleteQuote(author, quote);

    observable.subscribe(data => {
      if ((data as any).message == "Success") {
        this.ngOnInit()

      }
     
    })
  }
  voteUp(quote){
    let observable = this._httpService.voteUp(quote);
    observable.subscribe(data =>{
      if ((data as any).message == "Success") {
        this.ngOnInit()

      }
    })

  }
  voteDown(quote) {
    let observable = this._httpService.voteDown(quote);
    observable.subscribe(data => {
      if ((data as any).message == "Success") {
        this.ngOnInit()

      }
    })

  }

}
