import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuccessComponent } from './core/success.component';
import { FalconeHomeComponent } from './home/falcone-home/falcone-home.component';

const routes: Routes = [
  {
    path: '', component: FalconeHomeComponent
  },
  {
    path: 'home', component: FalconeHomeComponent
  },
  {
    path: 'success', component: SuccessComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
