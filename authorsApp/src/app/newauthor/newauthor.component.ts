import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-newauthor',
  templateUrl: './newauthor.component.html',
  styleUrls: ['./newauthor.component.css']
})
export class NewauthorComponent implements OnInit {
  newAuthor: any;
  error: any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() { 
    this.newAuthor = {name: ""}

  }
  

  addAuthor(name) {
    this.newAuthor.name = name
    let observable = this._httpService.addAuthor(this.newAuthor);
    console.log("22222222222222" + name)
    observable.subscribe(data => {
      if ((data as any).message == "Error") {
        this.error = "Name needs to be at least 3 characters"

      }
      else {
        this._router.navigate([''])
      }

    })
  }

}
