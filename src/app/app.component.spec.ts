import { Usuarios } from 'src/app/model/Usuarios';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('Probar el comienzo de la aplicación', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('Se debería crear la aplicación', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Probar que el título de la aplicación sea "Asistencia Duoc"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    alert(app.title);
    expect(app.title).toEqual('Asistencia Duoc');
  });

});

describe('Probar clase de usuario', () => {

  describe ('Probar que la contraseña sea correcta', () => {
      const usuario = new Usuarios('atorres@duocuc.cl', 'abc123', 'Ana Torres Leiva', '¿Cuál es tu animal favorito?', 'gato');

      it ('Probar que la contraseña no sea vacía', () => {
        usuario.password = '';
        expect(usuario.validarPassword()).toContain('ingresar la contraseña');
      });

      it ('Probar que la contraseña sea numérica y no "abcd"', () => {
        usuario.password = 'abcd';
        expect(usuario.validarPassword()).toContain('debe ser numérica');
      });

      it ('Probar que la contraseña no supere los 4 dígitos como por ejemplo "1234567890"', () => {
        usuario.password = '1234567890';
        expect(usuario.validarPassword()).toContain('debe ser numérica de 4 dígitos');
      });

      it ('Probar que la contraseña sea de 4 dígitos como por ejemplo "1234"', () => {
        usuario.password = '1234';
        expect(usuario.validarPassword()).toEqual('');
      });


    });



});
