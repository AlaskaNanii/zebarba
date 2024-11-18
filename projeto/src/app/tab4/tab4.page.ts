import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  people = [
    { name: 'André Felipe Silva de Souza', age: 22, turma: 'ADS301M', matricula: '23202095', photo: 'assets/andre.jpeg' },
    { name: 'Kayke Bernardo Gomes', age: 20, turma: 'ADS301M', matricula: '23200096', photo: 'assets/kayke.jpeg' },
    { name: 'Romário Domisco Gonzaga', age: 20, turma: 'ADS301M', matricula: '23200337', photo: 'assets/romario3.jpeg' },
    { name: 'Wallace Pfaltzgraff Pessanha', age: 20, turma: 'ADS301M', matricula: '23203680', photo: 'assets/wallace.jpeg' }
  ];

  constructor() { }

  ngOnInit() {
  }
}


