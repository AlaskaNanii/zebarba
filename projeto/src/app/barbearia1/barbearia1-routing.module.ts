import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Barbearia1Page } from './barbearia1.page';

const routes: Routes = [
  {
    path: '',
    component: Barbearia1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Barbearia1PageRoutingModule {}
