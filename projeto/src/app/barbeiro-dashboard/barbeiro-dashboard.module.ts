import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarbeiroDashboardPageRoutingModule } from './barbeiro-dashboard-routing.module';

import { BarbeiroDashboardPage } from './barbeiro-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BarbeiroDashboardPageRoutingModule
  ],
  declarations: [BarbeiroDashboardPage]
})
export class BarbeiroDashboardPageModule {}
