import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrobarbeiroPage } from './registrobarbeiro.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrobarbeiroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrobarbeiroPageRoutingModule {}
