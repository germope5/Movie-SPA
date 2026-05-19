# 🎬 Movie SPA - Prueba Técnica Front-End

Single-Page Application (SPA) desarrollada para la evaluación técnica de Front-End. La aplicación se conecta a la **OMDb API** para buscar películas, ver detalles en un modal accesible y gestionar una lista de favoritos persistente con múltiples criterios de ordenamiento.

## 🏗️ Arquitectura y Dependencias Principales

El proyecto fue inicializado con **Vite** para ofrecer un entorno de desarrollo rápido y un empaquetado optimizado. 

**Dependencias Principales:**
* **Core:** React 18, TypeScript.
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

## 🌐 Despliegue en Vivo
El entorno de producción ha sido desplegado y puede evaluarse en el siguiente enlace en Vercel:
https://movie-spa-one.vercel.app/

### Autor: Germán Mora Pérez

### Computer Engineer & Frontend Developer