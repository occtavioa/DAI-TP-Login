
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">DAI-TP-Login</h3>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Contenidos</summary>
  <ol>
    <li>
      <a href="#sobre-el-proyecto">Sobre el proyecto</a>
      <ul>
        <li><a href="#hecho-con">Hecho con</a></li>
      </ul>
    </li>
    <li>
      <a href="#introducción">Introducción</a>
      <ul>
        <li><a href="#prerrequisitos">Prerrequisitos</a></li>
        <li><a href="#instalación">Instalación</a></li>
      </ul>
    </li>
    <li><a href="#uso">Uso</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contacto">Contacto</a></li>
    <li><a href="#agradecimientos">Agradecimientos</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## Sobre el proyecto

La aplicación permite a los usuarios crear una cuenta con nombre de usuario y contraseña e iniciar sesiónc con ella. Los datos del perfil pueden ser modificados al iniciar sesión por el usuario

### Hecho con

* [![Express.js][Express.js]][Express.js-url]
* [![SQL Server][SQL Server]][SQL Server-url]
* [![Expo.js][Expo.js]][Expo.js-url]

<!-- GETTING STARTED -->
## Introducción

Para correr la aplicación de manera local, siga las instrucciones.

### Prerrequisitos
* <a href="https://nodejs.org/es">Node.js - npm</a>
* <a href="https://www.microsoft.com/es-ar/sql-server/sql-server-downloads">SQL Server</a>
* <a href="https://yarnpkg.com/getting-started/install">Yarn</a>
### Instalación
```
git clone https://github.com/occtavioa/DAI-TP-Login.git
```
#### Backend
```
cd express
npm install
node index.js
```
#### Frontend
```
cd rn-expo
yarn install
yarn run web
```
#### SQL Server
* Crear login con nombre y contraseña 'daitplogin'
* Ejecutar `script.sql`

<!-- USAGE EXAMPLES -->
## Uso
<b>Login:</b>
Muestra un formulario para completar con tu nombre de usuario y contraseña
![Login]
<b>Home:</b>
Te da la bienvenida en caso de haber completado los datos adicionales del perfil con un boton para verlo/modificarlo
![Home]
<b>Perfil:</b>
Campos de texto con todos los datos del perfil, modificables en caso de apretar el boton de "Editar"
![Profile]
<b>Registro:</b>
Formulario para registrarse con nombre de usuario y contraseña
![Register]

<!-- ROADMAP -->
## Roadmap

- [x] Registro e inicio de sesión de usuarios
- [x] Modificar datos del perfil
- [ ] Añadir más estilos


<!-- CONTACT -->
## Contacto
### Hecho por
* Octavio Arfa
* Luka Moskovich
<!-- ACKNOWLEDGMENTS -->
## Agradecimientos

* [Documentación de Expo](https://docs.expo.dev/)
* [Documentación React Native](https://reactnative.dev/docs/getting-started)
* [MDN Web Docs](https://developer.mozilla.org/es/docs/Web)
* [Documentación de Axios](https://axios-http.com/es/docs/intro)
* [Documentación de React Navigation](https://reactnavigation.org/)


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[Express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[Express.js-url]: https://expressjs.com/
[SQL Server]: https://img.shields.io/badge/Microsoft%20SQL%20Server-CC2927?style=for-the-badge&logo=microsoft%20sql%20server&logoColor=white
[SQL Server-url]: http://microsoft.com/es-ar/sql-server/sql-server-2022
[Expo.js]: https://img.shields.io/badge/Expo-000.svg?style=for-the-badge&logo=EXPO&labelColor=000&logoColor=FFF
[Expo.js-url]: https://expo.dev/
[Login]: imgs/login.png
[Home]: imgs/home.png
[Profile]: imgs/profile.png
[Register]: imgs/register.png
