import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  barbearias: any[] = []; // Lista de barbearias

  constructor(private router: Router, private firestore: AngularFirestore) {}

  ngOnInit() {
    this.loadBarbearias();
  }

  // Função para buscar barbearias no Firestore
  async loadBarbearias() {
    try {
      const snapshot = await this.firestore.collection('Barbearias').get().toPromise();
      if (snapshot && snapshot.docs) { // Verifica se snapshot e docs estão definidos
        this.barbearias = snapshot.docs.map(doc => {
          const data = doc.data(); // Obtém os dados do documento
          return data ? { id: doc.id, ...data } : null; // Verifica se os dados não são nulos
        }).filter(barbearia => barbearia !== null); // Remove os valores nulos, caso existam
      }
    } catch (error) {
      console.error('Erro ao carregar barbearias:', error);
    }
  }

  // Navegar para a página de detalhes de uma barbearia
  goToBarbearia(id: string) {
    this.router.navigate([`/barbearia1/${id}`]);
  }
}
