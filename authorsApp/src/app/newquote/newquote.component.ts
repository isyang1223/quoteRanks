import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-newquote',
  templateUrl: './newquote.component.html',
  styleUrls: ['./newquote.component.css']
})
export class NewquoteComponent implements OnInit {
  author: any;
  newQuote: any;
  error: any;
  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.newQuote = {quote:""};
    this.author = this._httpService.author;
    console.log(this.author)
  }
  onSubmit(){
    
    let observable = this._httpService.newQuote(this.newQuote);
    
    observable.subscribe(data => {
      console.log(data)
      if ((data as any).message == "Error") {
        this.error = "Quote needs to be at least 3 characters"

      }
      else {
        
        this._router.navigate(['/quotes/'+ this.author._id])
      }

    })
  }

}
