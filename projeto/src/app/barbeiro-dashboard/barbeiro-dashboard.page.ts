import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barbeiro-dashboard',
  templateUrl: './barbeiro-dashboard.page.html',
  styleUrls: ['./barbeiro-dashboard.page.scss'],
})
export class BarbeiroDashboardPage implements OnInit {
  userData: any = null; // Dados do usuário
  editedData: any = {}; // Dados em edição
  isEditing = false;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUserData();
  }

  async loadUserData() {
    const user = await this.afAuth.currentUser;
    if (user) {
      const userDoc = this.firestore.collection('Barbeiros').doc(user.uid);
      userDoc.valueChanges().subscribe((data) => {
        if (data && typeof data === 'object') {
          this.userData = data;
          this.editedData = { ...data }; // Clona os dados para edição
        } else {
          this.userData = null;
          this.editedData = {};
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
  

  enableEditing() {
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
    this.editedData = { ...this.userData }; // Restaura os dados originais
  }

  async saveChanges() {
    const user = await this.afAuth.currentUser;
    if (user) {
      const userDoc = this.firestore.collection('Barbeiros').doc(user.uid);
      await userDoc.update(this.editedData);
      this.isEditing = false;
    }
  }

  async logout() {
    await this.afAuth.signOut();
    this.router.navigate(['/login']);
  }
}
