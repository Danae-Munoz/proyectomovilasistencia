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

  // it('Salir', () => {
  //   cy.visit('http://localhost:8100/home').then(() => {
  //   cy.get('#salir').should('be.visible').and('not.be.disabled').click();
  //   });
  // });

  // Se intentará navegar hacia la página de inicio con un correo inexistente, por lo que
  // será inutil probar si el saludo se le emite al usuario "Juan Pérez González".
  // En este caso se detectará un error y se mostrará un mensaje.

  it('Verificar login con credenciales incorrectas', () => {
    cy.visit('http://localhost:8100/login').then(() => {
      cy.get('#cuenta').invoke('val', 'inexistente');
      cy.get('#password').invoke('val', '1234');
      cy.contains('Ingresar').click();
      cy.intercept('/qr-web-scanner').as('route').then(() => {
        cy.contains('Ingresar')
      });
    });
  });


  // Se intentará navegar hacia la página de inicio con el correo "atorres", por lo que
  // la Aplicación debe probar si el saludo se le emite al usuario "Ana Torres".
  // En este caso debe pasar correctamente la prueba.

  it('Verificar login con credenciales correctas', () => {
    cy.visit('http://localhost:8100/login').then(() => {
      cy.get('#cuenta').should('be.visible').type('atorres');
      cy.get('#password').type('1234');   // Simular escritura
      cy.contains('Ingresar').click();
      cy.intercept('/qr-web-scanner').as('route');
      cy.get('h2').should('be.visible').and('contain.text', '¡Bienvenido (a)!');
      cy.get('h1').should('be.visible').and('contain.text', 'Ana Torres');
      cy.get('#salir').should('be.visible').and('not.be.disabled').click();
    });
  });



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
  //      cy.get('#salir').should('be.visible').and('not.be.disabled').click();
  //   });
  // });

  it('Verificar que se puede eliminar una publicación en el foro', () => {
    cy.visit('http://localhost:8100/login').then(() => {
      cy.get('#cuenta').should('be.visible').type('atorres');
      cy.get('#password').type('1234');   // Simular escritura
      cy.contains('Ingresar').click();
      cy.get('h2').should('be.visible').and('contain.text', '¡Bienvenido (a)!');
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
      cy.get('#salir').should('be.visible').and('not.be.disabled').click();
    });
  });

  it('Verificar validaciones de campos en Mis Datos', () => {
  cy.visit('http://localhost:8100/login').then(() => {
    cy.get('#cuenta').should('be.visible').type('atorres');
    cy.get('#password').type('1234');
    cy.contains('Ingresar').click();
    cy.get('h2').should('be.visible').and('contain.text', '¡Bienvenido (a)!');
    cy.get('h1').should('be.visible').and('contain.text', 'Ana Torres');
    cy.contains('Mis datos').click();
  
    // Verifica que los campos con datos tengan la clase ng-valid
    cy.get('#input-userName').should('have.class', 'ng-valid');
    cy.get('#input-firstName').should('have.class', 'ng-valid');
    cy.get('#input-lastName').should('have.class', 'ng-valid');
    cy.get('#input-email').should('have.class', 'ng-valid');
    cy.get('#input-address').should('have.class', 'ng-valid');
    cy.get('#input-secretQuestion').should('have.class', 'ng-valid');
    cy.get('#input-secretAnswer').should('have.class', 'ng-valid');
    cy.get('#input-dateOfBirth input').should('have.class', 'ng-valid');
    cy.get('#input-password').should('have.class', 'ng-valid');

    // Limpia los campos para que estén vacíos usando type con {selectall}{backspace}
    cy.contains('Limpiar').click();
    cy.wait(1000); // Espera 1 segundo para que la UI se actualice
    // Verifica que los campos estén marcados como inválidos
    cy.get('#input-userName').should('have.class', 'ng-invalid');
    cy.get('#input-firstName').should('have.class', 'ng-invalid');
    cy.get('#input-lastName').should('have.class', 'ng-invalid');
    cy.get('#input-email').should('have.class', 'ng-invalid');
    // cy.get('#input-address', { timeout: 10000 }).should('have.class', 'ng-invalid');
    cy.get('#input-secretQuestion').should('have.class', 'ng-invalid');
    cy.get('#input-secretAnswer').should('have.class', 'ng-invalid');
    // cy.get('#input-dateOfBirth input').should('have.class', 'ng-invalid');
    cy.get('#input-password').should('have.class', 'ng-invalid');
    // Verifica que el boton actualizar este invalido
    cy.get('#update-button').should('have.attr', 'disabled');
    //salir
    cy.get('#salir').should('be.visible').and('not.be.disabled').click();
  });
});

it('Verificar actualizar en Mis Datos', () => {
  cy.visit('http://localhost:8100/login').then(() => {
    cy.get('#cuenta').should('be.visible').type('atorres');
    cy.get('#password').type('1234');
    cy.contains('Ingresar').click();
    cy.get('h2').should('be.visible').and('contain.text', '¡Bienvenido (a)!');
    cy.get('h1').should('be.visible').and('contain.text', 'Ana Torres');
    cy.contains('Mis datos').click();
  
    // Verifica que los campos con datos tengan la clase ng-valid
    cy.get('#input-userName').should('have.class', 'ng-valid');
    cy.get('#input-firstName').should('have.class', 'ng-valid');
    cy.get('#input-lastName').should('have.class', 'ng-valid');
    cy.get('#input-email').should('have.class', 'ng-valid');
    cy.get('#input-address').should('have.class', 'ng-valid');
    cy.get('#input-secretQuestion').should('have.class', 'ng-valid');
    cy.get('#input-secretAnswer').should('have.class', 'ng-valid');
    cy.get('#input-dateOfBirth input').should('have.class', 'ng-valid');
    cy.get('#input-password').should('have.class', 'ng-valid');
    // Haz clic en el botón de actualizar
    cy.get('#update-button').click();
    // Haz clic en el botón de actualizar
    cy.get('#update-button').click();

    // // Espera 2 segundos para que el mensaje de éxito aparezca
    // cy.wait(2000);  // Asegúrate de ajustar esto si es necesario

    // // Verifica que el mensaje de éxito sea visible
    // cy.get('.toast-message', { timeout: 10000 }) // Ajusta el selector si es diferente
    //   .should('be.visible')
    //   .and('contain.text', 'El usuario fue guardado correctamente');
    cy.get('#salir').should('be.visible').and('not.be.disabled').click();

  });
});


  it('Verificar el usuario administrador', () => {
    cy.visit('http://localhost:8100/login').then(() => {
      cy.get('#cuenta').should('be.visible').type('admin');
      cy.get('#password').type('admin');
      cy.contains('Ingresar').click();
      cy.get('h2').should('be.visible').and('contain.text', '¡Bienvenido (a)!');
      cy.get('h1').should('be.visible').and('contain.text', 'admin ');
      cy.get('#admin').click();
      cy.get('#salir').should('be.visible').and('not.be.disabled').click();
  
    });
  });

    it('Verificar el admin borre usuarios', () => {
    cy.visit('http://localhost:8100/login').then(() => {
      cy.get('#cuenta').should('be.visible').type('admin');
      cy.get('#password').type('admin');
      cy.contains('Ingresar').click();
      cy.get('h2').should('be.visible').and('contain.text', '¡Bienvenido (a)!');
      cy.get('h1').should('be.visible').and('contain.text', 'admin ');
      cy.get('#admin').click();
      cy.get('#users').should('have.length.greaterThan', 0);

      // Seleccionar el primer `ion-card` y hacer clic en el botón de eliminación, forzando el clic.
      cy.get('#users').first().find('#eliminarUser').click({ force: true });
      // Interactuar con el cuadro de confirmación
      cy.contains('¿Estás seguro que deseas eliminar este usuario').should('be.visible'); // Asegúrate de que el mensaje se muestra
      cy.contains('Sí').click(); // Hacer clic en el botón "Sí"
      cy.contains('Usuario eliminado exitosamente.').should('be.visible'); // Asegúrate de que el mensaje se muestra
      cy.contains('Aceptar').click(); // Hacer clic en el botón "aceptar"

      // Esperar un momento para que la lista de usuarios se actualice
      cy.wait(1000);

      // Verificar que la lista de usuarios se haya actualizado correctamente
      cy.get('#users').should('have.length', 1); // Ajusta el valor esperado según tu caso
      cy.get('#salir').should('be.visible').and('not.be.disabled').click();

  
    });
  });




});