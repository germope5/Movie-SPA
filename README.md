# 🎬 Movie SPA - Prueba Técnica Front-End

Single-Page Application (SPA) desarrollada para la evaluación técnica de Front-End. La aplicación se conecta a la **OMDb API** para buscar películas, ver detalles en un modal accesible y gestionar una lista de favoritos persistente con múltiples criterios de ordenamiento.

## 🏗️ Arquitectura y Dependencias Principales

El proyecto fue inicializado con **Vite** para ofrecer un entorno de desarrollo rápido y un empaquetado optimizado. 

**Dependencias Principales:**
* **Core:** React 19, TypeScript.
* **State Management:** Zustand (ligero, libre de boilerplate y con middleware nativo para `localStorage`).
* **Estilos:** CSS Modules (CSS puro sin colisiones, estructurado bajo metodología BEM y Mobile-first).
* **Peticiones HTTP:** Axios (manejo simplificado de promesas y tipado).
* **Calidad de Código:** ESLint, Prettier.

**Arquitectura:**
Se implementó **Diseño Atómico (Atomic Design)** organizando la UI en Átomos, Moléculas, Organismos y Templates. Esto se combinó con el principio de **Separación de Intereses (SoC)**, aislando la lógica de negocio y las integraciones de API en la capa de servicios (`src/services`) y el estado global (`src/store`), manteniendo los componentes de React orientados exclusivamente a la presentación.

## 🧠 Decisiones Técnicas

Las decisiones técnicas se tomaron bajo el enfoque de construir aplicaciones empresariales intensivas en datos, priorizando el rendimiento, la escalabilidad y la experiencia de usuario:

1. **Gestión de Estado Centralizada:** Se eligió Zustand sobre Context API para evitar re-renderizados en cascada en toda la aplicación cada vez que se actualiza la lista de favoritos o los parámetros de búsqueda.
2. **Optimización de Renderizado (Rendimiento):** Se implementó el hook `useMemo` en la lógica de ordenamiento del panel de favoritos. Esto asegura que el cálculo de ordenamiento masivo (A-Z, fecha o género) solo se ejecute cuando las dependencias cambien, protegiendo el *main thread*.
3. **Manejo de Limitaciones de la API:** Dado que la OMDb API no devuelve el género ni la sinopsis completa en la búsqueda general (`s=`), se diseñó un servicio que intercepta los resultados y ejecuta un `Promise.all` para hidratar las tarjetas con los datos completos por ID (`i=`), asegurando una vista rica en información.
4. **Accesibilidad (a11y):** El modal de detalles se construyó garantizando un alto nivel de accesibilidad. Implementa un "Focus Trap" nativo, navegación fluida 100% por teclado, atajo de cierre con la tecla `Escape` y atributos semánticos ARIA (`role="dialog"`, `aria-modal`), cumpliendo con los estándares de contraste WCAG AA.

## ⚙️ Setup y Scripts de Desarrollo/Build

Sigue estas instrucciones para levantar el proyecto en tu entorno local:

### Inicialización del Proyecto (Referencia)
Este proyecto fue creado desde cero utilizando Vite con el template de React y TypeScript mediante los siguientes comandos:
```bash
npm create vite@latest movie-spa -- --template react-ts
```

1. **Clonar el repositorio:**
```bash
git clone <URL_DE_TU_REPOSITORIO>
cd movie-spa
```
Instalar las dependencias:

 ```bash
npm install
```

- Configurar variables de entorno:
- Crea un archivo .env en la raíz del proyecto y agrega tu API Key de OMDb:

 ```bash
VITE_OMDB_API_KEY=tu_api_key_aqui
```
Scripts disponibles:

Desarrollo: Levanta el servidor local con Hot Module Replacement (HMR).

 ```bash
npm run dev
```

Construcción (Build): Compila el proyecto con TypeScript y genera los estáticos optimizados para producción en la carpeta dist.

 ```bash
npm run build
```

Previsualización de Producción: Sirve la carpeta dist localmente para probar el build final antes del despliegue.

 ```bash
npm run preview
```

## 📂 Instrucciones para correr la Actividad #2
La solución a la segunda actividad (desestructuración, inmutabilidad y copia profunda de objetos para evitar mutaciones de referencia en el JSON proporcionado) se encuentra aislada en un script independiente.

Para ejecutar el código y evaluar la demostración en consola, corre el siguiente comando estando en la raíz del proyecto:

 ```bash
node jsonActivity2.js
```

## 🌐 Despliegue en Vercel (Guía)
El proyecto está preparado para desplegarse en Vercel usando el preset de Vite o la configuración por defecto de `npm`.

Pasos rápidos (Interfaz web):

1. Enlaza tu repositorio con Vercel (GitHub/GitLab/Bitbucket).
2. En Project Settings → Environment Variables añade la variable de entorno `VITE_OMDB_API_KEY` con tu API key de OMDb (añádela para `Preview` y `Production`).
3. Revisa la configuración de Deploy:
	 - **Framework Preset:** Vite (si Vercel lo detecta automáticamente, dejarlo).
	 - **Install Command:** `npm install`
	 - **Build Command:** `npm run build`
	 - **Output Directory:** `dist`
4. Despliega el proyecto (Deploy).

Despliegue con Vercel CLI (alternativa):

```bash
npm i -g vercel
vercel login
vercel  # sigue el asistente para enlazar el repo y crear el proyecto
# Añadir variable de entorno para producción desde CLI
vercel env add VITE_OMDB_API_KEY production
vercel --prod
```

Notas importantes para el despliegue:
- Asegúrate de que `VITE_OMDB_API_KEY` esté configurada en Vercel antes de desplegar, de lo contrario la búsqueda fallará por falta de credenciales.
- El comando de build (`npm run build`) ejecuta `tsc -b` y `vite build`, generando los assets en `dist`.
- Si necesitas fijar la versión de Node en Vercel, configúrala en Project Settings → General → Environment → Node.js Version.

Enlace de producción (si ya está desplegado):
https://movie-spa-one.vercel.app/

## 🆕 Cambios y notas recientes
He añadido y documentado varias mejoras en la aplicación. A continuación un resumen útil para quien despliegue o pruebe localmente:

- API y paginación:
	- `searchMovies` ahora acepta `page` y devuelve `SearchResponse` con `movies` y `totalResults` para soportar paginación en la UI.
	- Para obtener `Genre` y `Plot` completos, la búsqueda hidrata cada resultado con una llamada por `imdbID` (`i=`).
	- El filtro por `genre` se aplica del lado del cliente porque OMDb no expone un parámetro fiable para ello.

- Estado global y UI:
	- `useMovieStore` mantiene `currentPage`, `totalResults` y `currentSearchParams` para controlar paginación entre componentes.
	- Se añadió el componente de `Pagination` y la integración en `App` para navegación entre páginas de resultados.
	- Los `favorites` se persisten en `localStorage` (middleware de Zustand con nombre `movie-favorites-storage`).

- Recomendaciones para pruebas locales antes de desplegar:
	- Ejecuta `npm run dev` y confirma que las búsquedas devuelven resultados con `Poster`, `Genre` y `Plot`.
	- Verifica navegación de paginación con varios resultados (usa términos populares como "batman").
	- Comprueba que agregar/quitar favoritos persiste tras recargar la página.


### Autor: Germán Mora Pérez

### Computer Engineer & Frontend Developer