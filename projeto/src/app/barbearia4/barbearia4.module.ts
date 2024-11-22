import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Barbearia4PageRoutingModule } from './barbearia4-routing.module';

import { Barbearia4Page } from './barbearia4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Barbearia4PageRoutingModule
  ],
  declarations: [Barbearia4Page]
})
export class Barbearia4PageModule {}
