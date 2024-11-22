import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Barbearia2Page } from './barbearia2.page';

const routes: Routes = [
  {
    path: '',
    component: Barbearia2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Barbearia2PageRoutingModule {}
