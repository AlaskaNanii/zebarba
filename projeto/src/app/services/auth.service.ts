
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
          tipo: 'usuário', // Define o tipo como cliente
          criadoEm: new Date(),
        });
        
        // Redireciona para a página inicial automaticamente após o registro
        this.router.navigate(['/login']);
        console.log('Usuário cadastrado e dados salvos no Firestore!');
        alert('Cadastro realizado com sucesso');
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      alert('Erro ao fazer cadastro');
    }
  }

  async registerBarbeiro(
    email: string,
    password: string,
    additionalData: { nome: string; telefone: string; endereco: string; licenca: string }
  ) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      const user = result.user?.uid;
  
      if (user) {
        // Salva o barbeiro no Firestore, incluindo o tipo de usuário
        await this.firestore.collection('Barbeiros').doc(user).set({
          email,
          nome: additionalData.nome,
          telefone: additionalData.telefone,
          endereco: additionalData.endereco,
          licenca: additionalData.licenca,
          tipo: 'barbeiro', // Define o tipo como barbeiro
          criadoEm: new Date(),
        });
  
        this.router.navigate(['/login']);
        console.log('Barbeiro cadastrado com sucesso no Firestore!');
      }
    } catch (error) {
      console.error('Erro ao cadastrar barbeiro:', error);
      throw error;
    }
  }
  

  async registerBarbearia(barbearia: { nome: string; descricao: string; servicos: string; endereco: string; contato: string }) {
    try {
      const user = await this.afAuth.currentUser; // Obtém o usuário logado (deve ser um barbeiro)
      if (!user) {
        throw new Error('Usuário não autenticado');
      }
  
      const userId = user.uid;
  
      // Salva os dados da barbearia no Firestore
      await this.firestore.collection('Barbearias').doc(userId).set({
        ...barbearia,
        barbeiroId: userId,
        criadoEm: new Date(),
      });
  
      console.log('Barbearia cadastrada com sucesso no Firestore!');
    } catch (error) {
      console.error('Erro ao cadastrar barbearia no Firestore:', error);
      throw error;
    }
  }
  
  async getUserType(): Promise<string | null> {
    const user = await this.afAuth.currentUser;
    if (user) {
      const doc = await this.firestore.collection('Barbeiros').doc(user.uid).get().toPromise();
      return doc?.exists ? 'barbeiro' : 'usuário'; // Verifica se está na coleção de barbeiros
    }
    return null; // Não autenticado
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
 // Novo método para redefinir senha
 async resetPassword(email: string) {
  try {
    await this.afAuth.sendPasswordResetEmail(email);
    console.log('Email de redefinição de senha enviado com sucesso!');
    alert('Verifique seu email para redefinir a senha.');
  } catch (error) {
    console.error('Erro ao enviar email de redefinição de senha:', error);
    alert('Erro ao enviar email de redefinição de senha. Verifique o email e tente novamente.');
  }
}
}

