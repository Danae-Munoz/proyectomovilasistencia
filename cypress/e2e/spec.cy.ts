// describe('empty spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

/*
Navegar hacia una página en específico:
   cy.visit('http://localhost:8100/').then(() => { ... });

Hacer clic en un botón, usando el texto del botón:
    cy.contains('Ingresa a tu cuenta').click();

Para hacer clic en un botón, usando el id del botón:
    cy.get('#salir').click();

Cambiar el valor de una caja de texto usando su id:
    cy.get('#correo').invoke('val', 'jperez@duocuc.cl');

Comparar el título de la página actual con un valor esperado:
  cy.get('ion-title').should('contain.text', 'Sistema de Asistencia DUOC');

Comparar el texto de un control HTML identificado por un id="#saludo":
  cy.get('#saludo').should('contain.text', '¡Bienvenido Juan Pérez González!');
*/

describe('Verificar mi aplicación', () => {

  // Se intentará navegar hacia la página de inicio con un correo inexistente, por lo que
  // será inutil probar si el saludo se le emite al usuario "Juan Pérez González".
  // En este caso se detectará un error y se mostrará un mensaje.

  // it('Verificar login con credenciales incorrectas', () => {
  //   cy.visit('http://localhost:8100/login').then(() => {
  //     cy.get('#cuenta').invoke('val', 'inexistente');
  //     cy.get('#password').invoke('val', '1234');
  //     cy.contains('Ingresar').click();
  //     cy.intercept('/qr-web-scanner').as('route').then(() => {
  //       cy.contains('Ingresar')
  //     });
  //   });
  // });


  // Se intentará navegar hacia la página de inicio con el correo "jperez@duocuc.cl", por lo que
  // la Aplicación debe probar si el saludo se le emite al usuario "Juan Pérez González".
  // En este caso debe pasar correctamente la prueba.

  // it('Verificar login con credenciales correctas', () => {
  //   cy.visit('http://localhost:8100/login').then(() => {
  //     cy.get('#cuenta').should('be.visible').type('atorres');
  //     cy.get('#password').type('1234');   // Simular escritura
  //     cy.contains('Ingresar').click();
  //     cy.intercept('/qr-web-scanner').as('route');
  //     cy.get('ion-title').should('be.visible').and('contain.text', '¡Bienvenido (a)!');
  //     cy.get('h1').should('be.visible').and('contain.text', 'Ana Torres');
  //     cy.get('#salir').should('be.visible').and('not.be.disabled').click();
  //   });
  // });



  // it('Verificar publicacion de foro', () => {
  //   cy.visit('http://localhost:8100/login').then(() => {
  //     cy.get('#cuenta').should('be.visible').type('atorres');
  //     cy.get('#password').type('1234');   // Simular escritura
  //     cy.contains('Ingresar').click();
  //     cy.get('ion-title').should('be.visible').and('contain.text', '¡Bienvenido (a)!');
  //     cy.get('h1').should('be.visible').and('contain.text', 'Ana Torres');
  //     cy.contains('Foro').click();
  //     cy.get('#titulo').should('be.visible').type('Carrera de Ingeniería en Informática en el Instituto Duoc', { timeout: 10000 });
  //     cy.wait(2000);
  //     // cy.get('ion-textarea#descripcion', { timeout: 10000 }).should('be.visible')
  //     //   .type('Descripción de prueba', { force: true })
  //     //   .should('have.value', 'Descripción de prueba');cy.contains('Guardar').click();
  //     // // Verificar que la publicación se guardó correctamente
  //     // cy.get('ion-list').children().should('have.length.greaterThan', 0);
  //     // cy.get('ion-card').first().find('h4').should('contain.text', 'Título de prueba');
  //     // cy.get('ion-card').first().find('p').should('contain.text', 'Descripción de prueba');
  //   });
  // });

  it('Verificar que se puede eliminar una publicación en el foro', () => {
    cy.visit('http://localhost:8100/login').then(() => {
      cy.get('#cuenta').should('be.visible').type('atorres');
      cy.get('#password').type('1234');   // Simular escritura
      cy.contains('Ingresar').click();
      cy.get('ion-title').should('be.visible').and('contain.text', '¡Bienvenido (a)!');
      cy.get('h1').should('be.visible').and('contain.text', 'Ana Torres');
      cy.contains('Foro').click();
       // Verificar que la lista de publicaciones contiene al menos una publicación.
      cy.get('ion-list ion-card').should('have.length.greaterThan', 0);

      // Seleccionar el primer `ion-card` y hacer clic en el botón de eliminación, forzando el clic.
      cy.get('ion-list ion-card').first().find('#eliminar').click({ force: true });

      // Esperar un momento para que la lista se actualice después de la eliminación.
      cy.wait(1000); // Ajusta el tiempo de espera según sea necesario.

      // Verificar que la cantidad de elementos ha disminuido.
      cy.get('ion-list ion-card').should('have.length', 14); // Cambia a 11 si esperas que la lista se reduzca en 1.
    });
  });

  it('Verificar validaciones de campos en Mis Datos', () => {
    cy.visit('http://localhost:8100/login').then(() => {
      cy.get('#cuenta').should('be.visible').type('atorres');
      cy.get('#password').type('1234'); // Simular escritura
      cy.contains('Ingresar').click();
      cy.get('ion-title').should('be.visible').and('contain.text', '¡Bienvenido (a)!');
      cy.get('h1').should('be.visible').and('contain.text', 'Ana Torres');
      cy.contains('Mis datos').click();
  
      // Completar los campos del formulario para habilitar el botón de "Actualizar".
      cy.get('ion-input[label="Datos.From.Cuenta"]').type('Usuario123');
      cy.get('ion-input[label="Datos.From.User"]').type('Juan');
      cy.get('ion-input[label="Datos.From.Apellido"]').type('Pérez');
      cy.get('ion-input[type="email"]').type('juan.perez@example.com');
      cy.get('ion-input[label="Datos.From.Direccion"]').type('Calle Falsa 123');
      cy.get('ion-input[label="Datos.From.Pregunta"]').type('¿Color favorito?');
      cy.get('ion-input[label="Datos.From.Respuesta"]').type('Azul');
  
      // Seleccionar un nivel educacional
      cy.get('ion-select').select('Superior completa'); // Cambia el valor a uno real de la lista
  
      // Completar la fecha de nacimiento
      cy.get('input[matInput]').type('01/01/2000');
  
      // Completar la contraseña
      cy.get('ion-input[label="Login.Label.Password"]').type('password123');
  
      // Verificar que el botón de "Actualizar" esté habilitado
      cy.get('ion-button').should('not.be.disabled');
  
      // Vaciar algunos campos para probar la validación
      cy.get('ion-input[label="Datos.From.Cuenta"]').clear();
  
      // Intentar hacer clic en el botón de actualizar
      cy.get('ion-button').click();
  
      // Verificar que el botón esté deshabilitado (la validación no debe permitir enviar)
      cy.get('ion-button').should('be.disabled');
    });
  });
  




  //   it('Verificar validaciones de campos en Mis Datos', () => {
  //     cy.visit('http://localhost:8100/misdatos');

  //     // Agregar una espera para asegurar que la página cargue completamente
  //     cy.wait(1000);

  //     // Dejar los campos en blanco y hacer clic en guardar
  //     cy.get('#nombre').clear();
  //     cy.get('#apellido').clear();
  //     cy.get('#email').clear();
  //     cy.get('#fecha-nacimiento').clear();
  //     cy.contains('Guardar').click();

  //     // Verificar que se muestran mensajes de error para los campos requeridos
  //     cy.get('#error-nombre').should('be.visible').and('contain.text', 'Este campo es obligatorio');
  //     cy.get('#error-apellido').should('be.visible').and('contain.text', 'Este campo es obligatorio');
  //     cy.get('#error-email').should('be.visible').and('contain.text', 'Este campo es obligatorio');
  //     cy.get('#error-fecha').should('be.visible').and('contain.text', 'Este campo es obligatorio');

  //     // Esperar un poco para que los mensajes de error carguen correctamente
  //     cy.wait(1000);

  //     // Ingresar un email inválido y verificar el mensaje de error
  //     cy.get('#email').type('correo-invalido');
  //     cy.contains('Guardar').click();
  //     cy.get('#error-email').should('be.visible').and('contain.text', 'Debe ser un email válido');

  //     // Esperar un poco antes de pasar a la siguiente validación
  //     cy.wait(1000);

  //     // Ingresar una fecha inválida y verificar el mensaje de error
  //     cy.get('#fecha-nacimiento').type('12345678');
  //     cy.contains('Guardar').click();
  //     cy.get('#error-fecha').should('be.visible').and('contain.text', 'Debe ser una fecha válida');
  //   });

  //   it('Verificar que se grabe correctamente la actualización de datos en Mis Datos', () => {
  //     cy.visit('http://localhost:8100/misdatos');

  //     // Esperar un poco para asegurar que la página cargue completamente
  //     cy.wait(1000);

  //     // Ingresar datos válidos en todos los campos
  //     cy.get('#nombre').clear().type('Ana');
  //     cy.get('#apellido').clear().type('Torres');
  //     cy.get('#email').clear().type('ana.torres@example.com');
  //     cy.get('#fecha-nacimiento').clear().type('1990-01-01');

  //     // Hacer clic en el botón de guardar
  //     cy.contains('Guardar').click();

  //     // Esperar un poco para que la actualización se guarde correctamente
  //     cy.wait(1000);

  //     // Verificar que los datos han sido guardados y que la aplicación muestra un mensaje de éxito o redirige correctamente
  //     cy.get('.mensaje-exito').should('be.visible').and('contain.text', 'Datos actualizados correctamente');
  //     cy.get('#nombre').should('have.value', 'Ana');
  //     cy.get('#apellido').should('have.value', 'Torres');
  //     cy.get('#email').should('have.value', 'ana.torres@example.com');
  //     cy.get('#fecha-nacimiento').should('have.value', '1990-01-01');
  //   });
  // });


});