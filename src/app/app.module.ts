import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { declarations, httpInterceptorProviders } from './core';
import { NgBootstrapModule } from './ngbootstrap-index';
import { HttpClientModule } from '@angular/common/http';
import { FalconeHomeComponent } from './home/falcone-home/falcone-home.component';
import { SuccessComponent } from './core/success.component';

@NgModule({
  declarations: [
    AppComponent,
    declarations,
    FalconeHomeComponent,
    SuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgBootstrapModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
