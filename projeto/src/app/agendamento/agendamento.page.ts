import { Component, OnInit } from '@angular/core';
import { AgendamentoService } from '../agendamento.service';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.page.html',
  styleUrls: ['./agendamento.page.scss'],
})
export class AgendamentoPage implements OnInit {
  agendamentos: any[] = [];
  data: string='';
  hora: string='';
  servico: string='';
  mensagem: string='';

  horasDisponiveis: string[] = [];
  

  constructor(private agendamentoService: AgendamentoService) {
    this.gerarHorariosDisponiveis();
  }

  ngOnInit() {
    this.agendamentos = this.agendamentoService.getAgendamentos();
  }

  gerarHorariosDisponiveis(){
    const start = 10 * 60; // 10:00 em minutos
    const end = 20 * 60; // 20:00 em minutos
    const interval = 30; // 30 minutos

    for (let minutes = start; minutes <= end; minutes += interval){
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      this.horasDisponiveis.push(`${this.formatNumber(hours)}:${this.formatNumber(mins)}`);
    }
  }

  formatNumber(num: number): string{
    return num < 10 ? '0' + num : num.toString();
  }

  selecionarHora(hora: string){
    this.hora = hora;
    
  }


  addAgendamento() {
    this.mensagem = this.agendamentoService.addAgendamento(this.data, this.hora, this.servico)
   
    this.agendamentos = this.agendamentoService.getAgendamentos();

    setTimeout(() => {
      this.mensagem = '';
    }, 3000);
  }

  deleteAgendamento(index: number){
    this.agendamentoService.deleteAgendamento(index);
    this.agendamentos = this.agendamentoService.getAgendamentos();
  }
}

