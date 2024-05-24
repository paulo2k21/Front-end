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
import { ListaAvesComponent } from './lista-aves/lista-aves.component'; // Importe ListaAvesComponent
import { FilterAvesPipe } from './lista-aves/filter-aves.pipe'; // Importe FilterAvesPipe
import { CadastroAvesComponent } from './cadastro-aves/cadastro-aves.component'; // Importe CadastroAvesComponent
import {RouterModule} from "@angular/router";
import { EditarAvesComponent } from './editar-aves/editar-aves.component'; // Importe EditarAvesComponent
import { CadastroPesoComponent } from './cadastro-peso/cadastro-peso.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegistrarUsuarioComponent,
    VerificarCorreoComponent,
    RecuperarPasswordComponent,
    SpinnerComponent,
    ListaAvesComponent, // Mude para ListaAvesComponent
    FilterAvesPipe, // Mude para FilterAvesPipe
    CadastroAvesComponent, // Mude para CadastroAvesComponent
    EditarAvesComponent, // Mude para EditarAvesComponent
    CadastroPesoComponent
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
    ListaAvesComponent,
    FilterAvesPipe,
    CadastroAvesComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
