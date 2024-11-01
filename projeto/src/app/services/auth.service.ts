
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app'; 
import { GoogleAuthProvider } from 'firebase/auth'; 


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}

  // Método para registro com autenticação automática
  async register(email: string, password: string, additionalData: { nome: string; telefone: string; endereco: string }) {
    try {
      // Registra o usuário no Firebase Authentication
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const user = result.user?.uid;

      if (user) {
        // Salva dados adicionais do usuário no Firestore
        await this.firestore.collection('Usuários').doc(user).set({
          email,
          nome: additionalData.nome,
          telefone: additionalData.telefone,
          endereco: additionalData.endereco,
          criadoEm: new Date(),
        });
        
        // Redireciona para a página inicial automaticamente após o registro
        this.router.navigate(['/login']);
        console.log('Usuário cadastrado e dados salvos no Firestore!');
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      alert('Erro ao fazer cadastro');
    }
  }

  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      if (result.user) {
        console.log('Login com sucesso!', result.user);
        this.router.navigate(['/tabs/tab1']); 
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login');
    }
  }

  async googleLogin() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await this.afAuth.signInWithPopup(provider);
      if (result.user) {
        console.log('Login com Google realizado!', result.user);
        this.router.navigate(['/tabs/tab1']);
      }
    } catch (error) {
      console.error('Erro no login com Google:');
      alert('Erro no login com Google');
    }
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      console.log('Logout realizado com sucesso!');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }
}

