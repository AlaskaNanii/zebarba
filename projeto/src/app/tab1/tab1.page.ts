import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  constructor(private router: Router) {}

  Barber1() {
    this.router.navigate(['/barbearia1']); 
  }
  Barber2() {
    this.router.navigate(['/barbearia2']); 
  }
  Barber3() {
    this.router.navigate(['/barbearia3']); 
  }
  Barber4() {
    this.router.navigate(['/barbearia4']); 
  }
}