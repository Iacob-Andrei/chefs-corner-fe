import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import {FlexModule} from "@angular/flex-layout";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import { AppComponent } from './app.component';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import { PagenotfoundComponent } from './modules/pagenotfound/pagenotfound.component';
import {ToastrModule} from "ngx-toastr";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {InterceptorService} from "./services/core/interceptor.service";
import {StoreModule} from "@ngrx/store";
import {cartReducer, metaReducerLocalStorage} from "./services/store/cart.reducer";

@NgModule({
  declarations: [AppComponent, PagenotfoundComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FlexModule,
        BrowserAnimationsModule,
        MatButtonModule,
        HttpClientModule,
        ToastrModule.forRoot({
            positionClass: 'toast-top-left',
            tapToDismiss: false,
            closeButton: true
        }),
        MatProgressSpinnerModule,
      StoreModule.forRoot({
        cartEntries: cartReducer
      },{
        metaReducers: [metaReducerLocalStorage]
      })
    ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
