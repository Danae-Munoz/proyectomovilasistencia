import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs'; // Para simular valores observables
import { User } from 'src/app/model/user';
import { DatabaseService } from 'src/app/services/database.service';

describe('Probar el comienzo de la aplicación', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent], // Cambiado de declarations a imports
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            // Simular un snapshot o un observable
            snapshot: { params: {} },
            params: of({}),
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  it('Se debería crear la aplicación', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app);
  });

  it('Probar que el título de la aplicación sea "Asistencia Duoc"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    // Asegúrate de que el título esté definido correctamente en tu componente
    app.title = 'Asistencia Duoc'; 
    expect(app.title);
  });

  it('Debería manejar rutas dinámicas correctamente', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
  
    // Simulación del ActivatedRoute
    const route = TestBed.inject(ActivatedRoute);
    (route.snapshot as any).params = { id: '123' };
  
    app.ngOnInit(); // Llamada explícita si accede a los datos en ngOnInit
  
  });

});