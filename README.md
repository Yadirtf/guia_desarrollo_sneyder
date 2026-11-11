# Guía interactiva · Matemáticas 11° (Plan de apoyo, Período I)

Página web de estudio para preparar el examen del **Plan de Apoyo de Matemáticas 11°** (archivo PDF de este repositorio). Explica y resuelve paso a paso **todos los puntos del taller**:

| Actividad | Tema | Método pedagógico | Laboratorio interactivo |
|---|---|---|---|
| 1 | Fracciones, decimales y operaciones con reales | Concreto → Pictórico → Abstracto, modelo de barras | Barras de fracciones · Convertidor decimal → fracción |
| 2 | Potenciación y radicación | Descubrimiento de patrones + tarjetas de memoria | Tarjetas que se voltean · "La cárcel de los radicales" |
| 3 | Intervalos en los reales | Triángulo de representaciones (gráfica ⇄ intervalo ⇄ conjunto) | Recta numérica interactiva + retos |
| 4 | Desigualdades e inecuaciones | Analogía de la balanza + tabla de signos | Balanza de desigualdades · Parábola con solución |
| 5 | Técnicas de conteo y probabilidad | Árbol de preguntas + método de casillas | "¿Qué fórmula uso?" · Calculadora de casillas |

Además incluye: quiz con retroalimentación por tema, **simulacro final** de 13 preguntas, **hoja de fórmulas** imprimible, progreso guardado en el navegador y **voz del profe** en español (Web Speech API, se activa con 🔊).

## Estructura

```
index.html               ← página principal (SPA con rutas #/…)
assets/css/styles.css    ← estilo "liquid glass" sobre fondo negro
assets/js/content.js     ← TODO el contenido pedagógico (teoría, ejercicios, quizzes)
assets/js/app.js         ← lógica: rutas, paso a paso, voz, laboratorios, quizzes
assets/vendor/katex/     ← KaTeX 0.16.9 (fórmulas matemáticas), incluido localmente
```

Para editar o agregar ejercicios solo hay que tocar `assets/js/content.js`. Las fórmulas van entre `$…$` y se escriben en LaTeX.

## Ver en local

Es un sitio estático, sin compilación:

```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```

## Desplegar en Vercel

1. En [vercel.com/new](https://vercel.com/new) importa este repositorio.
2. Framework preset: **Other**. No hace falta build command ni output directory.
3. Deploy. Cada push a `main` se publica solo.

> La voz depende del navegador: funciona mejor en Chrome, Edge y Safari (iPhone incluido). En el celular, sube el volumen y quita el modo silencio.
