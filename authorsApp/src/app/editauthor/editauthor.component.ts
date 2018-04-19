import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-editauthor',
  templateUrl: './editauthor.component.html',
  styleUrls: ['./editauthor.component.css']
})
export class EditauthorComponent implements OnInit {
  author: any;
  error: any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.author = this._httpService.author
  }
  saveAuthor(author){

    let observable = this._httpService.saveAuthor(author);
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
