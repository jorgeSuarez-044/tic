# Instrucciones de Despliegue en Netlify

## Preparación del proyecto

Este proyecto ya ha sido preparado para ser desplegado en Netlify. Se han realizado las siguientes configuraciones:

1. Se ha creado un archivo `netlify.toml` con las configuraciones necesarias
2. Se han adaptado los endpoints de la API para funcionar con Netlify Functions
3. Se han creado funciones serverless en la carpeta `netlify/functions`
4. Se ha configurado el enrutamiento con el archivo `_redirects`

## Pasos para desplegar

### Opción 1: Desplegar desde la interfaz web de Netlify

1. Crea una cuenta en [Netlify](https://www.netlify.com/) si aún no tienes una.
2. Ve al dashboard de Netlify y haz clic en "New site from Git".
3. Selecciona GitHub como proveedor de Git (o el que uses).
4. Autoriza a Netlify para acceder a tus repositorios.
5. Selecciona este repositorio.
6. En las opciones de despliegue:
   - **Rama a desplegar**: `main` (o la rama que estés usando)
   - **Comando de construcción**: `npm run build`
   - **Directorio de publicación**: `dist`
7. Haz clic en "Deploy site".

### Opción 2: Desplegar usando Netlify CLI

1. Instala Netlify CLI:
   ```bash
   npm install netlify-cli -g
   ```

2. Inicia sesión en tu cuenta de Netlify:
   ```bash
   netlify login
   ```

3. Inicializa el proyecto con Netlify:
   ```bash
   netlify init
   ```

4. Selecciona la opción "Create & configure a new site".
5. Sigue las instrucciones en pantalla y selecciona el equipo donde quieres crear el sitio.
6. Cuando se te pregunte por el comando de construcción y el directorio de publicación, asegúrate de usar:
   - **Comando de construcción**: `npm run build`
   - **Directorio de publicación**: `dist`

7. Despliega tu sitio:
   ```bash
   netlify deploy --prod
   ```

## Verificación del despliegue

1. Una vez desplegado, Netlify te proporcionará una URL para tu sitio (similar a https://your-site-name.netlify.app).
2. Abre esa URL en tu navegador y verifica que la aplicación funcione correctamente.
3. Prueba las diferentes funcionalidades:
   - Navegación entre las lecciones
   - Visualización de ejercicios
   - Ejecución y verificación de código Java

## Solución de problemas comunes

### La API no funciona correctamente

Si las llamadas a la API devuelven errores 404 o no funcionan:
1. Verifica que las funciones de Netlify se hayan desplegado correctamente en la sección "Functions" del panel de Netlify.
2. Asegúrate de que las rutas en el código cliente estén correctamente configuradas.
3. Revisa los logs de funciones en Netlify para identificar posibles errores.

### Problemas con el enrutamiento

Si al navegar directamente a una URL (por ejemplo, /lessons/if-else) obtienes un error 404:
1. Verifica que el archivo `_redirects` se haya incluido correctamente en la carpeta `public`.
2. Asegúrate de que el archivo `netlify.toml` incluya la configuración de redirección.

## Personalización adicional

Una vez desplegado el sitio, puedes personalizarlo aún más desde el panel de Netlify:

1. **Dominio personalizado**: Puedes configurar un dominio propio desde la sección "Domain settings".
2. **Variables de entorno**: Si necesitas añadir variables de entorno, puedes hacerlo desde "Site settings > Build & deploy > Environment".
3. **Gestión de formularios**: Netlify ofrece gestión de formularios si decides añadir esta funcionalidad en el futuro.

---

### Créditos
Proyecto desarrollado por Jorge Leonardo Suarez Cortes para el curso "Fundamentos TecnoPedagógicos de la Educación en Línea".