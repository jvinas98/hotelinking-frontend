# Manual de instalación

Si aún no ha configurado el servidor puede hacerlo hacinedo click aquí [tech-test-hotelinking-sever](https://github.com/jvinas98/tech-test-hotelinking-sever).

Para poder ejecutar el entonrno necesitaremos:

* Node >= 8 
* NPM >= 5 

Primero debemos instalar [Quasar CLI](https://quasar.dev/quasar-cli/installation) v1.
```
 npm install -g @quasar/cli
```
Una vez instalado clonaremos el proyecto.
```
git clone https://github.com/jvinas98/tech-test-hotelinking-frontend.git
cd tech-test-hotelinking-frontend
```

Ahora instalaremos los paquetes

```
npm install
```

Una vez instalado para levantar el entorno bastará con ejecutar el siguiente comando

```
quasar dev
```

Cuando hayan cargado todos los modulos se abrira en el navegador en ``localhost:8080``

# A tener en cuenta
 El proyecto hace peticiones a la api con la url ``'http://hotelinking.test/api/' ``.
 Para que funcione correctamente se debe añadir el dominio al archivo hosts que se explica en 
 [tech-test-hotelinking-sever](https://github.com/jvinas98/tech-test-hotelinking-sever)
