import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.scss']
})
export class RecipePageComponent implements OnInit, OnDestroy{
  subscriptions: Subscription[] = []

  constructor(private route: ActivatedRoute,
              public toastr: ToastrService) {}

  ngOnInit(): void{
    this.subscriptions.push(
      this.route.params.subscribe(params => {
        if( isNaN(Number(params['id']))){
          //todo: redirect 404
        }
        console.log(params['id'])
        this.toastr.error('everything is broken', 'Major Error', {});
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}
