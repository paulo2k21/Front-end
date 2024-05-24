import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { VerificarCorreoComponent } from './components/verificar-correo/verificar-correo.component';
import { CadastroAvesComponent } from './cadastro-aves/cadastro-aves.component';
import { ListaAvesComponent } from './lista-aves/lista-aves.component';
import { EditarAvesComponent} from "./editar-aves/editar-aves.component";
import { CadastroPesoComponent} from "./cadastro-peso/cadastro-peso.component";


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registrar-usuario', component: RegistrarUsuarioComponent },
  { path: 'verificar-correo', component: VerificarCorreoComponent },
  { path: 'recuperar-password', component: RecuperarPasswordComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cadastro-aves', component: CadastroAvesComponent },
  { path: 'listagem-aves', component: ListaAvesComponent },
  { path: 'editar-ave', component: EditarAvesComponent },
  { path: 'cadastro-peso', component: CadastroPesoComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
