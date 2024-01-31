// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Trabalho1Component } from './trabalho1/trabalho1.component';
import { Trabalho2Component } from './trabalho2/trabalho2.component';
import { Trabalho3Component } from './trabalho3/trabalho3.component';

const routes: Routes = [
  { path: 'trabalho1', component: Trabalho1Component },
  { path: 'trabalho2', component: Trabalho2Component },
  { path: 'trabalho3', component: Trabalho3Component },
  { path: '', redirectTo: '/trabalho1', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
