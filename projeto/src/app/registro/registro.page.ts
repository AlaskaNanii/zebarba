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

  formatarTelefone() {
    let valor = this.telefone.replace(/\D/g, ''); // Remove caracteres não numéricos
    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2'); // Adiciona o formato (99) 99999999
    valor = valor.replace(/(\d)(\d{4})$/, '$1-$2'); // Adiciona o traço
    this.telefone = valor.substring(0, 14); // Limita a 15 caracteres
  }

  async cadastrar() {
    // Limpa as mensagens de erro
    this.nomeError = '';
    this.telefoneError = '';
    this.emailError = '';
    this.enderecoError = '';
    this.passwordError = '';
    this.confirmPasswordError = '';

    let isValid = true;

    // Validação do nome (somente letras e pelo menos 10 caracteres)
    const nomeRegex = /^[a-zA-ZÀ-ÿ\s'\-]{10,}$/; // Adiciona ' e - como válidos.
    if (!this.nome || !nomeRegex.test(this.nome)) {
      this.nomeError = 'Nome deve conter apenas letras e ter pelo menos 10 caracteres';
      isValid = false;
    }

    // Remove caracteres não numéricos para validação do telefone
    const telefoneSemMascara = this.telefone.replace(/\D/g, '');
    if (!telefoneSemMascara || telefoneSemMascara.length < 10) {
      this.telefoneError = 'Telefone deve conter pelo menos 11 números';
      isValid = false;
    }

    // Validação do email (deve conter "@" e um domínio válido)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!this.email || !emailRegex.test(this.email)) {
      this.emailError = 'Email inválido. Certifique-se de incluir "@" e um domínio válido';
      isValid = false;
    }

    // Validação do endereço (pelo menos 15 caracteres)
    if (!this.endereco || this.endereco.length < 15) {
      this.enderecoError = 'Endereço deve ter pelo menos 15 caracteres';
      isValid = false;
    }

    // Validação da senha (pelo menos 6 letras e 1 número)
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    if (!this.password || !passwordRegex.test(this.password)) {
      this.passwordError = 'Senha deve ter pelo menos 6 caracteres, incluindo 1 letra e 1 número';
      isValid = false;
    }

    // Validação da confirmação de senha
    if (this.password !== this.confirmPassword) {
      this.confirmPasswordError = 'As senhas não coincidem';
      isValid = false;
    }

    if (!isValid) {
      return; // Se algum campo não for válido, não continua
    }

    // Dados adicionais para cadastro
    const additionalData = {
      nome: this.nome,
      telefone: this.telefone,
      endereco: this.endereco,
    };

    try {
      // Chama o método de registro do AuthService
      await this.authService.register(this.email, this.password, additionalData);
      console.log('Cadastro realizado com sucesso!');
    } catch (error: any) {
      console.error('Erro ao cadastrar:', error);
      this.emailError = 'Erro ao cadastrar. Tente novamente.';
    }
  }
}
