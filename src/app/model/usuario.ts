import { NivelEducacional } from './nivel-educacional';
import { Persona } from "./persona";
import { Asistencia } from '../interfaces/asistencia';
import { DatabaseService } from '../services/database.service';
import { Optional } from '@angular/core';

export class Usuario extends Persona {

  public cuenta: string;
  public correo: string;
  public password: string;
  public preguntaSecreta: string;
  public respuestaSecreta: string;
  public asistencia: Asistencia;
  public listaUsuarios: Usuario[];


  constructor(@Optional() private db?: DatabaseService) {
    super();
    this.cuenta = '';
    this.correo = '';
    this.password = '';
    this.preguntaSecreta = '';
    this.respuestaSecreta = '';
    this.nombre = '';
    this.apellido = '';
    this.nivelEducacional = NivelEducacional.buscarNivelEducacional(1)!;
    this.fechaNacimiento = undefined;
    this.asistencia = this.asistenciaVacia();
    this.listaUsuarios = [];
  }

  public asistenciaVacia(): Asistencia {
    return {  
      bloqueInicio: 0,
      bloqueTermino: 0,
      dia: '',
      horaFin: '',
      horaInicio: '',
      idAsignatura: '',
      nombreAsignatura: '',
      nombreProfesor: '',
      seccion: '',
      sede: ''
    };
  }

  public static getNewUsuario(
    cuenta: string,
    correo: string,
    password: string,
    preguntaSecreta: string,
    respuestaSecreta: string,
    nombre: string,
    apellido: string,
    nivelEducacional: NivelEducacional,
    fechaNacimiento: Date | undefined
  ) {
    let usuario = new Usuario();
    usuario.cuenta = cuenta;
    usuario.correo = correo;
    usuario.password = password;
    usuario.preguntaSecreta = preguntaSecreta;
    usuario.respuestaSecreta = respuestaSecreta;
    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.nivelEducacional = nivelEducacional;
    usuario.fechaNacimiento = fechaNacimiento;
    return usuario;
  }

  async buscarUsuarioValido(cuenta: string, password: string): Promise<Usuario | undefined> {
    return await this.db!.buscarUsuarioValido(cuenta, password);
  }

  async buscarUsuarioPorCuenta(cuenta: string): Promise<Usuario | undefined>  {
    return await this.db!.buscarUsuarioPorCuenta(cuenta);
  }
  public static buscarUsuarioPorCorreo(correo: string): Usuario | undefined {
    const usuario = new Usuario();  // Crear una nueva instancia de Usuario
    DatabaseService.crearUsuariosDePrueba();  // Asegurarte de que la lista de usuarios esté poblada
    return usuario.listaUsuarios.find(usu => usu.correo === correo);  // Buscar en la lista de usuarios
  }
  

  async guardarUsuario(usuario: Usuario): Promise<void> {
    this.db!.guardarUsuario(usuario);
  }

  async eliminarUsuario(cuenta: string): Promise<void>  {
    this.db!.eliminarUsuarioUsandoCuenta(cuenta);
  }

  public override toString(): string {
    return `
      ${this.cuenta}
      ${this.correo}
      ${this.password}
      ${this.preguntaSecreta}
      ${this.respuestaSecreta}
      ${this.nombre}
      ${this.apellido}
      ${this.nivelEducacional.getEducacion()}
      ${this.getFechaNacimiento()}`;
  }

  public validarPassword(): string {
    if (this.password.trim() === '') {
      return 'Para entrar al sistema debe ingresar la contraseña.';
    }
    for(let i = 0; i < this.password.length; i++) {
      if ('0123456789'.indexOf(this.password.charAt(i)) === -1) {
        return 'La contraseña debe ser numérica.';
      }
    }
    if (this.password.length !== 4) {
      return 'La contraseña debe ser numérica de 4 dígitos.';
    }
    return '';
  }
}