import { Post } from 'src/app/model/post';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DatabaseService } from 'src/app/services/database.service';
import { IonicModule, ViewWillEnter } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from 'src/app/model/usuario';
import { showAlertDUOC, showAlertError, showAlertYesNoDUOC } from 'src/app/tools/message-routines';
import { APIClientService} from 'src/app/services/apiclient.service';
import { MessageEnum } from 'src/app/tools/message-enum';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  imports: [IonicModule, CommonModule, FormsModule],
  standalone: true,
})
export class AdminComponent  implements OnInit {
  usuarios: Usuario[] = [];
  usuario: Usuario | null = null ;
  constructor(private authService: AuthService, private bd: DatabaseService,  private api: APIClientService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  // async ngOnInit() {

  //   this.authService.usuarioAutenticado.subscribe((usuario) => {
  //     if (usuario !== null) {
  //       this.usuario = usuario;
  //     }
  //   });
    

  //   this.bd.traerListaUsuarios()
  //   .then((usuarios) => {
  //     this.usuarios = usuarios;
  //   });
    
    
  // }

  // filtrarUsuarioEnSesion(): Usuario[] {
  //   return this.usuarios.filter(usuario => usuario.correo !== 'admin');
  // }

  // async eliminarUsuario(usuario: Usuario) {
  //   const usu = await this.bd.leerUsuario(usuario.correo);
  //   if(usu){
  //     const resp= await showAlertYesNoDUOC('¿Estas seguro que deseas eliminar este usuario ${usu.nombre}? ');
  //     if (resp == MessageEnum.YES){
  //       await this.bd.eliminarUsuarioUsandoCorreo(usuario.correo);

  //       this.usuarios == this.usuarios.filter( u => u.correo !== usuario.correo);
  //     }
  //   }else{
  //     showAlertDUOC('El usuario que desea eliminar no existe')
  //   }

  // }

  

    
    

}


