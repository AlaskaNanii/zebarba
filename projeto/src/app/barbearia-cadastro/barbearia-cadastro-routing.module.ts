import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BarbeariaCadastroPage } from './barbearia-cadastro.page';

const routes: Routes = [
  {
    path: '',
    component: BarbeariaCadastroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BarbeariaCadastroPageRoutingModule {}
