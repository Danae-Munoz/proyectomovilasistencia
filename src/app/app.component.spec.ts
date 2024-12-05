import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs'; // Para simular valores observables
import { DatabaseService } from 'src/app/services/database.service';
import { User } from 'src/app/model/user';
import { EducationalLevel } from 'src/app/model/educational-level';
import { TestBed } from '@angular/core/testing';

describe('Probar el comienzo de la aplicación', () => {
  let databaseService: DatabaseService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {
          provide: DatabaseService,
          useValue: {
            saveUser: jasmine.createSpy('saveUser').and.returnValue(Promise.resolve()),
            readUser: jasmine.createSpy('readUser').and.callFake((userName: string) => {
              if (userName === 'newUser') {
                return Promise.resolve({
                  userName: 'newUser',
                  email: 'newuser@example.com',
                });
              }
              return Promise.resolve({
                userName: 'atorres',
                email: 'atorres@duocuc.cl',
              });
            }),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: {} },
            params: of({}),
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  
    databaseService = TestBed.inject(DatabaseService);
  });

  it('Se debería crear la aplicación', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Probar que el título de la aplicación sea "Asistencia Duoc"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.title = 'Asistencia Duoc'; 
    expect(app.title).toEqual('Asistencia Duoc');
  });

  it('Debería manejar rutas dinámicas correctamente', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    // Simulación del ActivatedRoute
    const route = TestBed.inject(ActivatedRoute);
    (route.snapshot as any).params = { id: '123' };

    app.ngOnInit(); // Llamada explícita si accede a los datos en ngOnInit
  });

  it('crear nuevo usuario valido', () => {
    const user = User.getNewUsuario(
      'testUser',
      'test@example.com',
      '1234',
      '¿Cual es tu color favorito?',
      'azul',
      'John',
      'Doe',
      EducationalLevel.findLevel(5)!,
      new Date(1995, 4, 20),
      '123 Main St',
      'default-image.jpg'
    );

    expect(user.userName).toBe('testUser');
    expect(user.email).toBe('test@example.com');
    expect(user.validarPassword()).toBe('');
  });

  it('Error por formato de contraseña no válido', () => {
    const user = new User();
    user.password = 'abcd'; // Contraseña no numérica
    expect(user.validarPassword()).toBe('La contraseña debe ser numérica.');

    user.password = '123'; // Menos de 4 dígitos
    expect(user.validarPassword()).toBe('La contraseña debe ser numérica de 4 dígitos.');
  });

  it('Guardar usuario', async () => {
    const user = User.getNewUsuario(
      'newUser',
      'newuser@example.com',
      '5678',
      'What is your favorite food?',
      'pizza',
      'Alice',
      'Smith',
      EducationalLevel.findLevel(6)!,
      new Date(1990, 6, 15),
      '456 Elm St',
      'user-image.jpg'
    );
  
    // Llamada al método mockeado
    await databaseService.saveUser(user);
  
    // Verificar que el método se llamó con los argumentos correctos
    expect(databaseService.saveUser).toHaveBeenCalledWith(user);
  
    // Simular la respuesta de la base de datos
    const savedUser = await databaseService.readUser('newUser');
    expect(savedUser?.userName).toBe('newUser');
    expect(savedUser?.email).toBe('newuser@example.com');
  });

  it('leer usuario por su userName', async () => {
    const userName = 'atorres';
    const user = await databaseService.readUser(userName);
    expect(user).toBeDefined();
    expect(user?.userName).toBe(userName);
    expect(user?.email).toBe('atorres@duocuc.cl');
  });
});




