import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Barbearia2PageRoutingModule } from './barbearia2-routing.module';

import { Barbearia2Page } from './barbearia2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Barbearia2PageRoutingModule
  ],
  declarations: [Barbearia2Page]
})
export class Barbearia2PageModule {}
