# TeLlevoAPP

## Requisitos previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

1. **Node.js** (versión LTS recomendada)  
   Descarga e instala desde [Node.js](https://nodejs.org/).

2. **Ionic CLI**  
   Instálalo globalmente con el siguiente comando:
   ```bash
   npm install -g @ionic/cli
   ```

3. **Angular CLI** (opcional, para gestionar Angular)  
   Instálalo globalmente con:
   ```bash
   npm install -g @angular/cli
   ```

4. **Git**  
   Si no lo tienes, descárgalo desde [Git](https://git-scm.com/).

---

## Instalación

1. **Clonar el repositorio**  
   Usa el siguiente comando para clonar este proyecto:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```

2. **Instalar las dependencias**  
   Navega al directorio del proyecto e instala las dependencias necesarias:
   ```bash
   cd <NOMBRE_DEL_PROYECTO>
   npm install
   ```

---

## Iniciar la aplicación

Para iniciar el proyecto en el navegador, usa el comando:
```bash
ionic serve
```

Esto abrirá automáticamente la aplicación en tu navegador predeterminado en la dirección `http://localhost:8100/`. Si no se abre automáticamente, puedes ingresar esta URL manualmente.

---

## Estructura del proyecto

El proyecto sigue la estructura estándar de Ionic Angular:

- `src/`
  - `app/`  
    Contiene los módulos principales de la aplicación.
  - `assets/`  
    Archivos estáticos como imágenes y otros recursos.
  - `environments/`  
    Configuraciones específicas para diferentes entornos (producción, desarrollo, etc.).

---

## Generar componentes o servicios

Puedes generar nuevos componentes, servicios u otras entidades con el CLI de Angular:
```bash
ionic generate component <nombre-componente>
ionic generate service <nombre-servicio>
```

---

## Construir para producción

Para generar una versión optimizada para producción:
```bash
ionic build --prod
```

Los archivos generados estarán en la carpeta `www/`.

---

## Desplegar la aplicación

### Desplegar en dispositivos móviles

1. **Asegúrate de tener configurado Capacitor o Cordova.**  
   Configura la plataforma con el siguiente comando:
   ```bash
   ionic capacitor add android
   ionic capacitor add ios
   ```

2. **Compila el proyecto y sincroniza con la plataforma móvil:**
   ```bash
   ionic capacitor copy android
   ionic capacitor copy ios
   ```

3. **Abre el proyecto en Android Studio o Xcode y compílalo desde allí.**

---

## Contribuciones

Si deseas contribuir a este proyecto, por favor:

1. Haz un fork del repositorio.
2. Crea una rama con tu nueva característica (`git checkout -b feature/nueva-caracteristica`).
3. Realiza un commit de tus cambios (`git commit -m 'Agrega nueva característica'`).
4. Sube tu rama (`git push origin feature/nueva-caracteristica`).
5. Abre un pull request.
