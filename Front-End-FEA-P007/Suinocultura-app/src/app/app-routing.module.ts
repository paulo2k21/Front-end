import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { VerificarCorreoComponent } from './components/verificar-correo/verificar-correo.component';
import { CadastroSuinoComponent } from './cadastro-suino/cadastro-suino.component';
import { ListaSuinosComponent } from './lista-suinos/lista-suinos.component';
import { EditarSuinoComponent} from "./editar-suino/editar-suino.component";
import { CadastroPesoComponent} from "./cadastro-peso/cadastro-peso.component";
import {ControlePesoComponent} from "./controle-peso/controle-peso.component";
import {CadastroSessaoComponent} from "./cadastro-sessao/cadastro-sessao.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registrar-usuario', component: RegistrarUsuarioComponent },
  { path: 'verificar-correo', component: VerificarCorreoComponent },
  { path: 'recuperar-password', component: RecuperarPasswordComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cadastro-suino', component: CadastroSuinoComponent },
  { path: 'listagem-suinos', component: ListaSuinosComponent },
  { path: 'editar-suino', component: EditarSuinoComponent },
  { path: 'cadastro-peso', component: CadastroPesoComponent },
  { path: 'controle-peso', component: ControlePesoComponent },
  { path: 'cadastro-sessao', component: CadastroSessaoComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
