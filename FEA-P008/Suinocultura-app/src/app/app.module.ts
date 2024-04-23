import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { VerificarCorreoComponent } from './components/verificar-correo/verificar-correo.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importe FormsModule aqui
import { ListaSuinosComponent } from './lista-suinos/lista-suinos.component';
import { FilterSuinosPipe } from './lista-suinos/filter-suinos.pipe';
import { CadastroSuinoComponent } from './cadastro-suino/cadastro-suino.component';
import {RouterModule} from "@angular/router";
import { EditarSuinoComponent } from './editar-suino/editar-suino.component';
import { CadastroPesoComponent } from './cadastro-peso/cadastro-peso.component';
import { ControlePesoComponent} from "./controle-peso/controle-peso.component";
import { CadastroSessaoComponent } from './cadastro-sessao/cadastro-sessao.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegistrarUsuarioComponent,
    VerificarCorreoComponent,
    RecuperarPasswordComponent,
    SpinnerComponent,
    ListaSuinosComponent,
    FilterSuinosPipe,
    CadastroSuinoComponent,
    EditarSuinoComponent,
    CadastroPesoComponent,
    ControlePesoComponent,
    CadastroSessaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CommonModule,
    FormsModule, // Importe o FormsModule aqui
    CommonModule,
    ReactiveFormsModule

  ],
  exports: [
    ListaSuinosComponent,
    FilterSuinosPipe,
    CadastroSuinoComponent,
    ControlePesoComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
