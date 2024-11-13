import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  people = [
    { name: 'André Felipe Silva de Souza', age: 22, role: 'O Mestre', email: 'andrefelipe.silvasouza@souunisuam.com.br', photo: 'assets/imgs/pessoa1.jpg' },
    { name: 'Kayke Bernardo Gomes', age: 20, role: 'Css man', email: 'kaykegomes@souusisuam.com.br', photo: 'assets/imgs/pessoa2.jpg' },
    { name: 'Romário Gonzaga', age: '20 (Supostamente)', role: 'Botafoguense', email: 'pessoa3@example.com', photo: 'assets/imgs/pessoa3.jpg' },
    { name: 'Wallace Pfaltzgraff pessanha', age: 20, role: 'Ginecofego', email: 'wallace.pfa@hotmail.com', photo: 'assets/imgs/pessoa4.jpg' }
  ];

  constructor() { }

  ngOnInit() {
  }
}


