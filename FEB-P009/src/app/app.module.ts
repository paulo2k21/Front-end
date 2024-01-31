// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { Trabalho1Component } from './trabalho1/trabalho1.component';
import { Trabalho2Component } from './trabalho2/trabalho2.component';
import { Trabalho3Component } from './trabalho3/trabalho3.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    Trabalho1Component,
    Trabalho2Component,
    Trabalho3Component,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule, // Certifique-se de adicionar a AppRoutingModule aqui
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
