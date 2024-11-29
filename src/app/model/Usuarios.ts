export class Usuarios {
    public correo = '';
    public password = '';
    public nombre = '';
    public preguntaSecreta = '';
    public respuestaSecreta = '';
  
    constructor(
      correo: string,
      password: string,
      nombre: string,
      preguntaSecreta: string,
      respuestaSecreta: string)
    {
      this.correo = correo;
      this.password = password;
      this.nombre = nombre;
      this.preguntaSecreta = preguntaSecreta;
      this.respuestaSecreta = respuestaSecreta;
    }
  
    public listaUsuariosValidos(): Usuarios[] {
      const lista = [];
      lista.push(new Usuarios('atorres@duocuc.cl', '1234', 'Ana Torres Leiva'
        , '¿Cuál es tu animal favorito?', 'gato'));
      lista.push(new Usuarios('jperez@duocuc.cl', '5678', 'Juan Pérez González'
        , '¿Cuál es tu postre favorito?', 'panqueques'));
      lista.push(new Usuarios('cmujica@duocuc.cl', '0987', 'Carla Mujica Sáez'
        , '¿Cuál es tu vehículo favorito?', 'moto'));
      return lista;
    }
  
    public buscarUsuarioValido(correo: string, password: string): Usuarios | null {
      const usu = this.listaUsuariosValidos().find((usuario) => usuario.correo === correo && usuario.password === password);
      if (usu === undefined) {
        return null;
      }
      return usu;
    }
  
    public validarCorreo(): string {
      if (this.correo.trim() === '') {
        return 'Para ingresar al sistema debe ingresar un correo electrónico.';
      }
      return '';
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
  
    public validarUsuario(): string {
      return this.validarCorreo()
        || this.validarPassword();
    }
  }
  