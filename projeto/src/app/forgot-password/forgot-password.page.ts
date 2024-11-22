import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  email: string = '';

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController
  ) {}

  async sendResetEmail() {
    if (!this.email) {
      const alert = await this.alertCtrl.create({
        header: 'Erro',
        message: 'Por favor, insira um email válido.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    try {
      await this.authService.resetPassword(this.email);
      const alert = await this.alertCtrl.create({
        header: 'Email Enviado',
        message: 'Verifique sua caixa de entrada para redefinir sua senha.',
        buttons: ['OK'],
      });
      await alert.present();
    } catch (error) {
      const alert = await this.alertCtrl.create({
        header: 'Erro',
        message: 'Não foi possível enviar o email. Tente novamente.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
