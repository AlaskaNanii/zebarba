import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// Importa as guards
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: '', redirectTo: 'loading', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then(m => m.Tab4PageModule)
  },
 
  {
    path: 'barbearia1',
    loadChildren: () => import('./barbearia1/barbearia1.module').then(m => m.Barbearia1PageModule),
  },
  
  {
    path: 'loading',
    loadChildren: () => import('./loading/loading.module').then(m => m.LoadingPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'agendamento',
    loadChildren: () => import('./agendamento/agendamento.module').then(m => m.AgendamentoPageModule)
  },
  {
    path: 'registrobarbeiro',
    loadChildren: () => import('./registrobarbeiro/registrobarbeiro.module').then(m => m.RegistrobarbeiroPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'barbearia2',
    loadChildren: () => import('./barbearia2/barbearia2.module').then(m => m.Barbearia2PageModule)
  },
  {
    path: 'barbearia3',
    loadChildren: () => import('./barbearia3/barbearia3.module').then(m => m.Barbearia3PageModule)
  },
  {
    path: 'barbearia4',
    loadChildren: () => import('./barbearia4/barbearia4.module').then(m => m.Barbearia4PageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'usuário' } // Apenas usuários podem acessar
  },
  {
    path: 'barbeiro-dashboard',
    loadChildren: () => import('./barbeiro-dashboard/barbeiro-dashboard.module').then(m => m.BarbeiroDashboardPageModule),
    canActivate: [AuthGuard, RoleGuard], // Aplica a RoleGuard
    data: { role: 'barbeiro' } // Só barbeiros podem acessar
  },
  {
    path: 'barbearia-cadastro',
    loadChildren: () => import('./barbearia-cadastro/barbearia-cadastro.module').then(m => m.BarbeariaCadastroPageModule),
    canActivate: [RoleGuard],
    data: { role: 'barbeiro' } // Somente barbeiros têm acesso
  },
  
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
