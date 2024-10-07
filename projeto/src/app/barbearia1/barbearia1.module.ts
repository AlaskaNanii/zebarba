import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Barbearia1PageRoutingModule } from './barbearia1-routing.module';

import { Barbearia1Page } from './barbearia1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Barbearia1PageRoutingModule
  ],
  declarations: [Barbearia1Page]
})
export class Barbearia1PageModule {}
