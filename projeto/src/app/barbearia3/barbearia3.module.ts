import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Barbearia3PageRoutingModule } from './barbearia3-routing.module';

import { Barbearia3Page } from './barbearia3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Barbearia3PageRoutingModule
  ],
  declarations: [Barbearia3Page]
})
export class Barbearia3PageModule {}
