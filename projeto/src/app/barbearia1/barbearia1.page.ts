import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-barbearia1',
  templateUrl: './barbearia1.page.html',
  styleUrls: ['./barbearia1.page.scss'],
})
export class Barbearia1Page implements OnInit {
  barbearia: any = null;
  isBarbeiro: boolean = false; // Determina se o usuário é barbeiro
  isEditing: boolean = false; // Alterna entre modo de edição e visualização
  isUsuarioNormal: boolean = false; // Controle do botão de agendamento

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.checkUserType();
    this.loadBarbearia();
    this.checkUserType2();
  }

  async checkUserType() {
    const userType = await this.authService.getUserType();
    this.isBarbeiro = userType === 'barbeiro';
  }

  async loadBarbearia() {
    const userType = await this.authService.getUserType();
    this.isUsuarioNormal = userType === 'usuário'; // Verifica se é um usuário normal
    const barbeariaId = this.route.snapshot.paramMap.get('id'); // Obtém o ID da URL
    if (barbeariaId) {
      try {
        const doc = await this.firestore.collection('Barbearias').doc(barbeariaId).get().toPromise();
        if (doc && doc.exists) {
          this.barbearia = { id: barbeariaId, ...(doc.data() as Record<string, any>) };
          console.log(this.barbearia); // Exibe os dados carregados
        } else {
          console.error('Barbearia não encontrada!');
        }
      } catch (error) {
        console.error('Erro ao carregar detalhes da barbearia:', error);
      }
    }
  }

  async checkUserType2() {
    const userType = await this.authService.getUserType();
    this.isUsuarioNormal = userType === 'usuário'; // Verifica se é um usuário normal
  }
  
  

  // Alterna para o modo de edição
  enableEditMode() {
    this.isEditing = true;
  }

  // Salva as alterações e volta ao modo de visualização
  async saveChanges() {
    if (this.barbearia && this.barbearia.id) {
      try {
        await this.firestore.collection('Barbearias').doc(this.barbearia.id).update({
          nome: this.barbearia.nome,
          descricao: this.barbearia.descricao,
          servicos: this.barbearia.servicos,
          endereco: this.barbearia.endereco,
          contato: this.barbearia.contato,
        });
        console.log('Informações da barbearia atualizadas com sucesso!');
        this.isEditing = false;
      } catch (error) {
        console.error('Erro ao salvar alterações:', error);
        alert('Erro ao salvar alterações.');
      }
    }
  }

  // Cancela as alterações e retorna ao modo de visualização
  cancelEdit() {
    this.isEditing = false;
    this.loadBarbearia(); // Recarrega os dados originais
  }
}
