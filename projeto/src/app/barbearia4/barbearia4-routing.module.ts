import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Barbearia4Page } from './barbearia4.page';

const routes: Routes = [
  {
    path: '',
    component: Barbearia4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Barbearia4PageRoutingModule {}
