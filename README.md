# Gestión de Cursos e Inscripciones - Experiencia Integrada

Proyecto académico (PA4 - Programación Web II, ISIL) que integra un portal del estudiante en **React**, un módulo público en **Next.js**, y una API REST en **Node.js + Express + MongoDB** (desarrollada en PA2), con autenticación basada en **JWT**.

## Integrantes

| Nombre | Rol en el proyecto |
|--------|---------------------|
| Frank Anthony | Configuración base, integración React + API, autenticación/JWT |
| Diego Alonso Josue García Díaz | Implementación del catálogo de cursos en React |
| Integrante 3 | |
| Integrante 4 | |
| Integrante 5 | |

## Descripción del proyecto

El sistema permite:
- Iniciar sesión con autenticación JWT y acceder a una ruta protegida.
- Consultar el listado de cursos y ver el detalle de cada uno desde React, consumiendo la API REST.
- Mantener el estado de sesión del estudiante y cerrar sesión.
- Visualizar, sin necesidad de iniciar sesión, una capa pública en Next.js con información académica (inicio + catálogo de cursos).
- Preparar el proyecto para producción mediante variables de entorno, scripts de build y estructura ordenada.

## Tecnologías utilizadas

**Backend (API - PA2)**
- Node.js, Express, MongoDB, Mongoose
- JWT (jsonwebtoken), bcryptjs
- dotenv, cors, helmet

**Frontend - Portal del estudiante**
- React (Create React App)
- Tailwind CSS
- Fetch API para consumo de endpoints

**Frontend - Módulo público**
- Next.js (Pages Router)
- Tailwind CSS

## Estructura del repositorio
proyecto-pa4/
├── api/                  # API REST (Node + Express + MongoDB) 
├── react-portal/         # Portal del estudiante (React + Tailwind)
├── nextjs-publico/       # Módulo público (Next.js + Tailwind)
└── README.md

## Variables de entorno

### `api/.env`
PORT=3000
MONGO_URI=mongodb://localhost:27017/gestion_cursos
JWT_SECRET=una_clave_secreta_muy_larga_y_segura

### `react-portal/.env`
REACT_APP_API_URL=http://localhost:3000

### `nextjs-publico/.env.local`
NEXT_PUBLIC_API_URL=http://localhost:3000

> Cada quien debe crear estos archivos `.env` localmente; no se suben datos sensibles al repositorio.

## Instalación y ejecución (entorno local)

### Requisitos previos
- Node.js v18 o superior
- MongoDB corriendo localmente (o vía MongoDB Compass) en `mongodb://localhost:27017`
- Git

### 1. Clonar el repositorio
```bash
git clone https://github.com/FrankAnthony1998/proyecto-pa4-gestion-cursos.git
cd proyecto-pa4-gestion-cursos
```

### 2. Levantar la API (backend)
```bash
cd api
npm install
```
Crear el archivo `.env` indicado arriba, luego:
```bash
npm start
```
La API quedará disponible en `http://localhost:3000`.

### 3. Levantar el portal del estudiante (React)
En otra terminal:
```bash
cd react-portal
npm install
```
Crear el archivo `.env` indicado arriba, luego:
```bash
npm start
```
React tomará automáticamente el puerto `3001` (porque el `3000` ya está ocupado por la API).

### 4. Levantar el módulo público (Next.js)
En otra terminal:
```bash
cd nextjs-publico
npm install
```
Crear el archivo `.env.local` indicado arriba, luego:
```bash
npm run dev
```
Next.js quedará disponible en `http://localhost:3002` (puerto fijo configurado en `package.json`).

### 5. Build de producción (verificación)
```bash
# React
cd react-portal
npm run build

# Next.js
cd ../nextjs-publico
npm run build
```
Ambos comandos deben ejecutarse sin errores críticos.

## Flujo de trabajo en Git

- Cada integrante trabaja en su propia rama: `feat/nombre-funcionalidad`.
- Hacer commits descriptivos e identificables por integrante.
- Antes de mergear a `main`, probar que el proyecto corre sin errores.

```bash
git checkout -b feat/login
# ... trabajo ...
git add .
git commit -m "feat: implementar vista de login con JWT"
git push origin feat/login
```

Luego crear un Pull Request hacia `main` en GitHub para revisión del equipo.

## Distribución de aportes por integrante

| Integrante | Aporte |
|---|---|
| Frank Anthony | 100% |
| Diego Alonso Josue García Díaz |  100%|
| Integrante 3 | — |
| Integrante 4 | — |
| Integrante 5 | — |

## Evidencias


## Video de sustentación
