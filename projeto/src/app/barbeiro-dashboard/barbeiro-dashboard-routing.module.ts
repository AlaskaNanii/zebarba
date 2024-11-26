import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BarbeiroDashboardPage } from './barbeiro-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: BarbeiroDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BarbeiroDashboardPageRoutingModule {}
