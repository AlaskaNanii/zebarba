import { Component, OnInit } from '@angular/core';
import { AgendamentoService } from '../agendamento.service';
import { GoogleCalendarService } from '../services/google-calendar.service';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.page.html',
  styleUrls: ['./agendamento.page.scss'],
})
export class AgendamentoPage implements OnInit {
  agendamentos: any[] = [];
  data: string = '';
  hora: string = '';
  servico: string = '';
  mensagem: string = '';
  horasDisponiveis: string[] = [];

  constructor(
    private agendamentoService: AgendamentoService,
    private googleCalendarService: GoogleCalendarService
  ) {
    this.gerarHorariosDisponiveis();
  }

  ngOnInit() {
    this.agendamentos = this.agendamentoService.getAgendamentos();
  }

  gerarHorariosDisponiveis() {
    const start = 10 * 60; // 10:00 em minutos
    const end = 20 * 60; // 20:00 em minutos
    const interval = 30; // 30 minutos

    for (let minutes = start; minutes <= end; minutes += interval) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      this.horasDisponiveis.push(`${this.formatNumber(hours)}:${this.formatNumber(mins)}`);
    }
  }

  formatNumber(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  selecionarHora(hora: string) {
    this.hora = hora;
  }

  async addAgendamento() {
    const agendamento = {
      data: this.data,
      hora: this.hora,
      servico: this.servico,
    };

    this.mensagem = this.agendamentoService.addAgendamento(
      agendamento.data,
      agendamento.hora,
      agendamento.servico
    );
    this.agendamentos = this.agendamentoService.getAgendamentos();

    try {
      // Criar evento no Google Calendar
      const event = {
        summary: `Agendamento de ${this.servico}`,
        start: {
          dateTime: `${this.data}T${this.hora}:00`,
          timeZone: 'America/Sao_Paulo',
        },
        end: {
          dateTime: `${this.data}T${this.addMinutes(this.hora, 30)}:00`,
          timeZone: 'America/Sao_Paulo',
        },
      };
      await this.googleCalendarService.createEvent(event);
      alert('Agendamento criado no Google Calendar com sucesso!');
    } catch (error) {
      console.error('Erro ao criar evento no Google Calendar:', error);
      alert('Erro ao criar evento no Google Calendar.');
    }

    setTimeout(() => {
      this.mensagem = '';
    }, 3000);
  }

  addMinutes(time: string, mins: number): string {
    const [hours, minutes] = time.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + mins;
    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;
    return `${this.formatNumber(newHours)}:${this.formatNumber(newMinutes)}`;
  }

  deleteAgendamento(index: number) {
    this.agendamentoService.deleteAgendamento(index);
    this.agendamentos = this.agendamentoService.getAgendamentos();
  }
}

