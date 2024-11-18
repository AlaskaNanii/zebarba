import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AgendamentoService {
  private agendamentos: { data: string, hora: string, servico: string }[] = [];

  constructor() {}

  addAgendamento(data: string, hora: string, servico: string): string {
    
    if (!data || !hora || !servico){
      return 'Todos os campos são obrigatorios.';
    }

    
    const now = new Date();
    const agendamentoData = new Date(`${data}`);

    if (agendamentoData < now) {
      return 'A data e hora do agendamento já passaram.';
    }

    // Verifica se o horario ja foi agendado
    const horarioExistente = this.agendamentos.find(ag => ag.data === data && ag.hora === hora);
    if (horarioExistente){
      return 'Este horario já está agendado.';
    }

    this.agendamentos.push({ data, hora, servico });
    return 'Agendamento realizado com sucesso!';
  }

  getAgendamentos() {
    return this.agendamentos;
  }

  deleteAgendamento(index: number) {
    if(index >= 0 && index < this.agendamentos.length){
    this.agendamentos.splice(index, 1);
    }
  }

  private saveAgendamentos(){
    localStorage.setItem('agendamentos' , JSON.stringify(this.agendamentos));
  }

  private loadAgendamentos(){
    const agendamentos = localStorage.getItem('agendamentos');
    if (agendamentos){
      this.agendamentos = JSON.parse(agendamentos);
      this.removeExpiredAgendamentos();
    }
  }

  private removeExpiredAgendamentos(){
    const now = new Date();
    this.agendamentos = this.agendamentos.filter(agendamento => {
      const agendamentoData = new Date(`${agendamento.data}T${agendamento.hora}`);
      return agendamentoData >= now;
    });
    this.saveAgendamentos();
  }
}

