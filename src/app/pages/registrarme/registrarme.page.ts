import { AuthService } from 'src/app/services/auth.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';
import { DatabaseService } from 'src/app/services/database.service';
import { showAlertDUOC, showToast } from 'src/app/tools/message-routines';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { TranslateModule } from '@ngx-translate/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EducationalLevel } from 'src/app/model/educational-level';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-registrarme',
  templateUrl: './registrarme.page.html',
  styleUrls: ['./registrarme.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TranslateModule, MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class RegistrarmePage implements OnInit {

  usuario = new User();
  repeticionPassword = '';
  listaNivelesEducacionales: EducationalLevel[] = EducationalLevel.getLevels();

  constructor(private authService: AuthService, private bd: DatabaseService, private router: Router) { }

  async ngOnInit() {
    this.authService.usuarioAutenticado.subscribe((usuario) => {
      if (usuario !== null) {
        this.usuario = usuario!;
        this.repeticionPassword = usuario!.password;
      }
    })
  }

  mostrarMensaje(nombreCampo:string, valor: string) {
    if (valor.trim() === '') {
      showAlertDUOC(`Debe ingresar un valor para el campo "${nombreCampo}".`);
      return false;
    }
    return true;
  }
  

  async registro() {
    // Verificar si el nombre de usuario ya existe
    try {
        const usuarioExiste = await this.bd.findUsersByUserName(this.usuario.userName);
        if (usuarioExiste) {
            showAlertDUOC(`El nombre de usuario "${this.usuario.userName}" ya está en uso. Por favor, elija otro.`);
            return;
        }
    } catch (error) {
        console.error('Error al verificar el usuario:', error);
        showAlertDUOC('Error al verificar el nombre de usuario. Por favor, intente más tarde.');
        return;
    }

    // Continuar con las demás validaciones
    if (!this.mostrarMensaje('cuenta', this.usuario.userName)) return;
    if (!this.mostrarMensaje('nombre', this.usuario.firstName)) return;
    if (!this.mostrarMensaje('apellido', this.usuario.lastName)) return;
    if (!this.mostrarMensaje('direccion', this.usuario.address)) return;
    if (!this.mostrarMensaje('correo', this.usuario.email)) return;
    if (!this.mostrarMensaje('pregunta secreta', this.usuario.secretQuestion)) return;
    if (!this.mostrarMensaje('respuesta secreta', this.usuario.secretAnswer)) return;
    if (!this.mostrarMensaje('respuesta secreta', this.usuario.educationalLevel.getEducation())) return;
    if (!this.mostrarMensaje('respuesta secreta', this.usuario.getDateOfBirth())) return;
    if (!this.mostrarMensaje('contraseña', this.usuario.password)) return;

    if (this.usuario.password !== this.repeticionPassword) {
        showAlertDUOC(`Las contraseñas escritas deben ser iguales.`);
        return;
    }

    // Proceder con el registro
    this.bd.loadingUsuario(this.usuario);
    this.authService.setUsuarioAutenticado(this.usuario);
    showToast('Ha sido registrado correctamente');
}


  volverAlInicio(){
    this.router.navigate(['/login']);
  }



}
