import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Barbearia3Page } from './barbearia3.page';

const routes: Routes = [
  {
    path: '',
    component: Barbearia3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Barbearia3PageRoutingModule {}
