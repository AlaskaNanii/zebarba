import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barbearia-cadastro',
  templateUrl: './barbearia-cadastro.page.html',
  styleUrls: ['./barbearia-cadastro.page.scss'],
})
export class BarbeariaCadastroPage implements OnInit {
  barbearia = {
    nome: '',
    descricao: '',
    servicos: '',
    endereco: '',
    contato: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  async onSubmit() {
    try {
      const barbeariaId = await this.authService.registerBarbearia(this.barbearia);
      alert('Barbearia cadastrada com sucesso!');
      
      // Redireciona para a página de detalhes da barbearia
      this.router.navigate(['/barbearia1', barbeariaId]);
    } catch (error) {
      console.error('Erro ao cadastrar barbearia:', error);
      alert('Erro ao cadastrar a barbearia. Tente novamente.');
    }
  }
}  

