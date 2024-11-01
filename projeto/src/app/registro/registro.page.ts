import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  nome: string = '';
  telefone: string = '';
  endereco: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  
  // Variáveis para mensagens de erro
  nomeError: string = '';
  telefoneError: string = '';
  emailError: string = '';
  enderecoError: string = '';
  passwordError: string = '';
  confirmPasswordError: string = '';

  constructor(private authService: AuthService) {}

  async cadastrar() {
    // Limpa as mensagens de erro
    this.nomeError = '';
    this.telefoneError = '';
    this.emailError = '';
    this.enderecoError = '';
    this.passwordError = '';
    this.confirmPasswordError = '';

    let isValid = true;

    // Validação dos campos
    if (!this.nome) {
      this.nomeError = 'Nome é obrigatório';
      isValid = false;
    }
    if (!this.telefone) {
      this.telefoneError = 'Telefone é obrigatório';
      isValid = false;
    }
    if (!this.email) {
      this.emailError = 'Email é obrigatório';
      isValid = false;
    }
    if (!this.endereco) {
      this.enderecoError = 'Endereço é obrigatório';
      isValid = false;
    }
    if (!this.password) {
      this.passwordError = 'Senha é obrigatória';
      isValid = false;
    }
    if (this.password !== this.confirmPassword) {
      this.confirmPasswordError = 'As senhas não coincidem';
      isValid = false;
    }

    if (!isValid) {
      return; // Se algum campo não for válido, não continua
    }

    const additionalData = {
      nome: this.nome,
      telefone: this.telefone,
      endereco: this.endereco,
    };

    try {
      await this.authService.register(this.email, this.password, additionalData);
      console.log('Cadastro realizado com sucesso!');
    } catch (error: any) {
      console.error('Erro ao cadastrar:', error);
      this.emailError = 'Erro ao cadastrar: ' + (error.message); // Exibe mensagem ou um erro genérico
    }
    
}
}