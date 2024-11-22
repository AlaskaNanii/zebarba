import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrobarbeiroPageRoutingModule } from './registrobarbeiro-routing.module';

import { RegistrobarbeiroPage } from './registrobarbeiro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrobarbeiroPageRoutingModule
  ],
  declarations: [RegistrobarbeiroPage]
})
export class RegistrobarbeiroPageModule {}
