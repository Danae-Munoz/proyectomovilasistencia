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

  it('Verificar login con credenciales incorrectas', () => {
    cy.visit('http://localhost:8100/login').then(() => {
      cy.get('#cuenta').invoke('val', 'inexistente');
      cy.get('#password').invoke('val', '1234');
      cy.contains('Ingresar').click();
      cy.intercept('/qr-web-scanner').as('route').then(() => {
          cy.get('ion-title').should('contain.text', '¡Bienvenido (a)!');
          cy.get('#saludo').should('contain.text', 'Juan Pérez González');
      });
    });
  });


  // Se intentará navegar hacia la página de inicio con el correo "jperez@duocuc.cl", por lo que
  // la Aplicación debe probar si el saludo se le emite al usuario "Juan Pérez González".
  // En este caso debe pasar correctamente la prueba.

  it('Verificar login con credenciales correctas', () => {
    cy.visit('http://localhost:8100/login').then(() => {
      cy.get('#cuenta').should('be.visible').type('atorres');
      cy.get('#password').type('1234');   // Simular escritura
      cy.contains('Ingresar').click();
      cy.intercept('/qr-web-scanner').as('route');
      cy.get('ion-title').should('be.visible').and('contain.text', '¡Bienvenido (a)!');
      cy.get('h1').should('be.visible').and('contain.text', 'Ana Torres');
      cy.get('#salir').should('be.visible').and('not.be.disabled').click();
    });
  });



  

  
  // describe('Pruebas de funcionalidad de la aplicación', () => {
  //   beforeEach(() => {
  //     // Realizar el inicio de sesión antes de cada prueba
  //     cy.get('#cuenta').should('be.visible').type('atorres');
  //     cy.get('#password').type('1234');   // Simular escritura
  //     cy.contains('Ingresar').click(); // Asegúrate de que el botón tenga este texto o ajústalo según corresponda
  //     cy.url().should('include', '/forum'); // Verificar que la URL se haya redirigido al foro después de iniciar sesión
      
  //     // Agregar una espera corta para asegurar que la página cargue completamente
  //     cy.wait(1000);
  //   });
  
  //   it('Verificar que se puede agregar una nueva publicación en el foro', () => {
  //     // Simular la escritura en el campo de título y contenido
  //     cy.get('#titulo-publicacion').type('Nueva publicación de prueba');
  //     cy.get('#contenido-publicacion').type('Este es el contenido de la publicación de prueba.');
      
  //     // Hacer clic en el botón de publicar
  //     cy.contains('Publicar').click();
      
  //     // Esperar un poco para asegurar que la publicación se guarde correctamente
  //     cy.wait(1000);
      
  //     // Verificar que la publicación se ha agregado correctamente
  //     cy.get('.publicacion').last().should('contain.text', 'Nueva publicación de prueba');
  //     cy.get('.publicacion').last().should('contain.text', 'Este es el contenido de la publicación de prueba.');
  //   });
  
  //   it('Verificar que se puede eliminar una publicación en el foro', () => {
  //     // Verificar que la última publicación es la que queremos eliminar
  //     cy.get('.publicacion').last().should('contain.text', 'Nueva publicación de prueba');
      
  //     // Hacer clic en el botón de eliminar de la última publicación
  //     cy.get('.publicacion').last().find('.btn-eliminar').click();
      
  //     // Confirmar la eliminación si es necesario
  //     cy.on('window:confirm', (texto) => {
  //       expect(texto).to.contains('¿Estás seguro de que quieres eliminar esta publicación?');
  //       return true;
  //     });
      
  //     // Esperar un poco para asegurar que la publicación se elimine correctamente
  //     cy.wait(1000);
      
  //     // Verificar que la publicación ha sido eliminada
  //     cy.get('.publicacion').should('not.contain.text', 'Nueva publicación de prueba');
  //   });
  
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