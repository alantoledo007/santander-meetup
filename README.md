# CHALLENGE: Santander Meetup

deploy: http://alantoledo007.github.io/santander-meetup

### Usuarios de prueba

- admin (dev/prod): `admin@test.com`, `Test1234`
- user (dev/prod): `alantoledo.work@gmail.com`, `Test1234`

## Desarrollo (Local)

1. `yarn`
2. `yarn start`

La aplicación estará abierta en desarrollo: [http://localhost:3000](http://localhost:3000)

### `yarn test`

Ejecutá los tests. Si los test no corren probablemente está a la espera del `Watch Usage`. Si es así, con presionar la tecla `a` es suficiente.

## Información de la aplicación

### `Backend`

El backend está resuelto a través de firebase, actualmente existen 2 configuraciones. Una para dev y otra para prod. Tal configuración se puede encontrar en `src/firebase/config`. Son de acceso publico, por tanto es prácticamente inutil utilizar variables de entorno para esta información.

Desde el mismo firebase se gestionan los usuarios y Meetups.

### `Frontend`

El frontend es una `PWA` creada `React` bajo la configuración de `create-react-app`.

La misma se conecta con firebase y los recursos están conectados en `real-time`, es decir que, cuando un usuario realiza una opreación de escritura, todos los usuarios conectados verán estos cambios de forma instantanea.

Además, se conecta con `AppWeather` para consumir los datos meteorológicos necesarios para cumplir con el objetivo de la app.

## Features

- Como usuario me puedo autenticar en la app.
- Como usuario y administrador puede ver las meetups disponibles.
- Como usuario y administrador puede inscribirme en las meetups que quiera.
- Como administrador puede gestionar las meetups (crear, listar, borrar, modificar),
- Como administrador, en base a la temperatura del dia de la fecha de la meetup y la cantidad de personas inscriptas, puedo saber cuantas cajas de birras puedo compar.

## todo

- Notificar a usuarios y administradores el estado de las meetups.
- Como administrador, poder cancelar meetups.

## Reglas de oro

- Los usuarios tienen tiempo de registrarse hasta 24hs antes de la meetups. Permitiendo a los organizadores tener un margen de tiempo para comprar las birras necesarias.

# Stack tecnológico

- ReactJs
- firebase
- StyledComponens
- Redux Toolkix
- MaterialUI
- React-Hook-Form
- Axios
- React-Router-Dom
- React-Testing-Library
- Jest
- Lottie Animations Json
- Yup
- También está installado Cypress, pero no llegue a utilizarlo.

# Detalles técnicos

- .env: Entiendo que el .env debe estar oculo, pero partiendo que es un chalenge, por cuestiones de practicidad decidi exponer el API_KEY de AppWeather para facilitar la prueba de la app.

- Constantes: El projeto cuenta con variables de carácter gobal permitiendo controlar de forma masiva la aplicación y estandarisar valores, como rutas, nomenclaturas, etc.

- RetryStrategy: Los solicitudes HTTP direccionadas a `AppWeather` tiene una lógica de reintentos recursiva. Actualmente configurada en un máximo de 3 reintentos, pero esto se puede modificar conforme se necesite. Ya que la función permite escalarlo (`src/core/utils -> GETrequestWithRetries()`)

- Temperatura seleccionada: Las temeraturas no se eligen a la lijera, se seleccionan a través del siguiente criterio: (`src/utils -> getMaxTempCloserFromDatetimes()`)

  - La fecha de la temperatura debe corresponder a la fecha de la meetup.
  - El horario de la temperatura debe ser el más cerano al del horario de la meetup. (horas antes u horas despues, lo más cercano).
  - La temperatura selecionada es la máxima, por las dudas (para que nunca falten birras).

- Actualización de la temperatura: Todos sabemos que las temperaturas pueden variar. Por eso mismo, dependiendo el estado de la Meetups, se determina si es necesario actualizarse o no.

  - Si la meetup está cancelada. No tiene sentido actualizar la temperatura.
  - Si la meetup no tiene participantes: Solo se actualiza una véz como precaución.
  - Si la meetup es mayor a la fecha actual. Ya no pierde el sentido actualiarla.

- Testings

  - Utils: Todas las utils estan testeadas.
  - Componentes: Parcial (no llegue con el tiempo y decidí testear mas que nada las utils porque muchos componentes dependen de ellas).

- Error Handler:
- En principio cree un hook para manejar los errores utilizando los componentes de MaterialUi. (`src/hooks/useError`)
- Luego implementé una librería que facilitó incluso más las cosas.
- Todos los errores son capturados por una util que se encarga, dependiendo el cédigo de error, retornar un mensage.

- `useUser`: Este hook está conectado al estado de la sesión del usuario, permitiendo controtal cuando un usuario es admin, esta autenticado o aún no se sabe, asimismo, este hook permite acceder los datos del usuario autenticado.

- Redux y StyledComponents:
  Se podian solucionar con otras cosas menos pesadas y más sensillas. Pero me parece que está bueno demostrar coonocimiento sobre estas tecnologías. Ya que es dificil trabajar en una aplicación sesilla.

# Detalles visuales.

- Loader: El loader está ligado al estado el usuario. Cuando al app no conoce su estado, se mantiene esta animación. (cajon de cervesas).

- Spinner: Cuando se realizá un fetch y/o la infromación no está lista para presentarsela al usuario, se muestra el spinner de un elefante rojo animado.

- Cuando un usuario se inscribe a una meetup, se ejecuta una animación de 2 cervesas brindando (tiene una pequeña marca de agua, pero a mi parecer vale la pena).

- Paginas de error 404 personalizadas con animaciones:
  - Pagina no contrada.
  - Recurso no econtrado.
