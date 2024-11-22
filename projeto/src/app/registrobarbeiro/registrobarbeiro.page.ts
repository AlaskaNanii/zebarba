import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registrobarbeiro',
  templateUrl: './registrobarbeiro.page.html',
  styleUrls: ['./registrobarbeiro.page.scss'],
})
export class RegistrobarbeiroPage {
  nome: string = '';
  telefone: string = '';
  endereco: string = '';
  email: string = '';
  licenca: string = ''; // Novo campo
  password: string = '';
  confirmPassword: string = '';

  // Variáveis para mensagens de erro
  nomeError: string = '';
  telefoneError: string = '';
  emailError: string = '';
  enderecoError: string = '';
  licencaError: string = ''; // Novo campo
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
    // Limpa mensagens de erro
    this.nomeError = '';
    this.telefoneError = '';
    this.emailError = '';
    this.enderecoError = '';
    this.licencaError = '';
    this.passwordError = '';
    this.confirmPasswordError = '';

    let isValid = true;

    // Validações (similares às do registro.page.ts)
    const nomeRegex = /^[a-zA-ZÀ-ÿ\s'\-]{10,}$/;
    if (!this.nome || !nomeRegex.test(this.nome)) {
      this.nomeError = 'Nome deve conter apenas letras e ter pelo menos 10 caracteres';
      isValid = false;
    }

    const telefoneSemMascara = this.telefone.replace(/\D/g, '');
    if (!telefoneSemMascara || telefoneSemMascara.length < 10) {
      this.telefoneError = 'Telefone deve conter pelo menos 11 números';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!this.email || !emailRegex.test(this.email)) {
      this.emailError = 'Email inválido. Certifique-se de incluir "@" e um domínio válido';
      isValid = false;
    }

    if (!this.endereco || this.endereco.length < 15) {
      this.enderecoError = 'Endereço deve ter pelo menos 15 caracteres';
      isValid = false;
    }

    if (!this.licenca || this.licenca.length < 5) {
      this.licencaError = 'Número da licença inválido. Deve ter pelo menos 5 caracteres';
      isValid = false;
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    if (!this.password || !passwordRegex.test(this.password)) {
      this.passwordError = 'Senha deve ter pelo menos 6 caracteres, incluindo 1 letra e 1 número';
      isValid = false;
    }

    if (this.password !== this.confirmPassword) {
      this.confirmPasswordError = 'As senhas não coincidem';
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const additionalData = {
      nome: this.nome,
      telefone: this.telefone,
      endereco: this.endereco,
      licenca: this.licenca, // Adiciona o campo específico
    };

    try {
      await this.authService.registerBarbeiro(this.email, this.password, additionalData);
      console.log('Barbeiro cadastrado com sucesso!');
    } catch (error: any) {
      console.error('Erro ao cadastrar barbeiro:', error);
      this.emailError = 'Erro ao cadastrar. Tente novamente.';
    }
  }
}
