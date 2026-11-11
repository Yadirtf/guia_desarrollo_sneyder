/* =========================================================
   CONTENIDO DE LA GUÍA · Matemáticas 11° · Plan de apoyo
   Todo el contenido pedagógico vive aquí.
   - Las fórmulas van entre $...$ (en línea) o $$...$$ (bloque) y las pinta KaTeX.
   - La voz del profe se genera automáticamente a partir del texto.
   ========================================================= */
const T = String.raw;

window.MODULES = [
  /* =====================================================
     ACTIVIDAD 1 · RACIONALES Y DECIMALES
     ===================================================== */
  {
    id: "a1",
    num: 1,
    color: "#0A84FF",
    color2: "#64D2FF",
    emoji: "🍕",
    title: "Fracciones y decimales",
    subtitle: "Operaciones y relaciones con los números reales",
    method: "Concreto → Pictórico → Abstracto",
    methodWhy: "Primero lo vemos con objetos (pizzas y barras), luego con dibujos y al final con la fórmula. Así el cerebro entiende el porqué antes del cómo.",
    minutes: 40,
    intro: T`¡Hola! Empezamos por la base de todo: las <b>fracciones</b> y los <b>decimales</b>. Si dominas esto, el resto del examen se vuelve mucho más fácil. Piensa siempre en una pizza: el número de abajo dice en cuántos pedazos la cortaste y el de arriba cuántos pedazos tomas.`,
    theory: [
      {
        title: "¿Qué es un número racional?",
        icon: "🧩",
        html: T`<p>Un número racional es cualquier número que se puede escribir como <b>una fracción de enteros</b>:</p>
$$\mathbb{Q}=\left\{\frac{a}{b}\;:\;a,b\in\mathbb{Z},\;b\neq 0\right\}$$
<p>En $\frac{a}{b}$: <b>b</b> (denominador) = en cuántas partes iguales corto el todo; <b>a</b> (numerador) = cuántas partes tomo.</p>
<div class="callout">💡 Los decimales <b>exactos</b> (0,25) y los <b>periódicos</b> (0,3333…) también son racionales, porque se pueden convertir en fracción.</div>
<p>Los que <b>no</b> se pueden escribir como fracción (decimales infinitos que no se repiten, como $\pi$ o $\sqrt{2}$) son los <b>irracionales</b> $\mathbb{I}$. Juntos forman los reales:</p>
$$\mathbb{R}=\mathbb{Q}\cup\mathbb{I}$$`,
      },
      {
        title: "Sumar y restar fracciones",
        icon: "➕",
        html: T`<p><b>Mismo denominador:</b> se suman los de arriba y se deja el de abajo. $\frac{2}{7}+\frac{3}{7}=\frac{5}{7}$</p>
<p><b>Distinto denominador:</b> hay que "cortar las pizzas del mismo tamaño". Buscamos el <b>m.c.m.</b> de los denominadores y convertimos cada fracción.</p>
<p>Atajo (producto cruzado) que siempre funciona:</p>
$$\frac{a}{b}\pm\frac{c}{d}=\frac{a\cdot d\pm b\cdot c}{b\cdot d}$$
<div class="callout warn">⚠️ Error típico: sumar arriba con arriba y abajo con abajo. $\frac{1}{2}+\frac{1}{3}\neq\frac{2}{5}$. ¡Media pizza más un tercio es más que media pizza!</div>`,
      },
      {
        title: "Multiplicar y dividir fracciones",
        icon: "✖️",
        html: T`<p><b>Multiplicar es lo más fácil:</b> derecho, arriba por arriba y abajo por abajo.</p>
$$\frac{a}{b}\cdot\frac{c}{d}=\frac{a\cdot c}{b\cdot d}$$
<p><b>Dividir:</b> usa la regla <b>"Conserva, Cambia, Voltea"</b>: conserva la primera, cambia ÷ por ×, voltea la segunda.</p>
$$\frac{a}{b}\div\frac{c}{d}=\frac{a}{b}\cdot\frac{d}{c}=\frac{a\cdot d}{b\cdot c}$$
<div class="callout">🍕 La palabra <b>"de"</b> significa multiplicar: "la mitad de 8" es $\frac{1}{2}\cdot 8=4$.</div>`,
      },
      {
        title: "Jerarquía de operaciones: PAPOMUDAS",
        icon: "🪜",
        html: T`<p>Cuando hay varias operaciones juntas, el orden es:</p>
<ol class="steps-list"><li><b>PA</b>réntesis</li><li><b>PO</b>tencias y raíces</li><li><b>MU</b>ltiplicación y <b>D</b>ivisión (de izquierda a derecha)</li><li><b>A</b>dición y <b>S</b>ustracción (de izquierda a derecha)</li></ol>
<div class="callout warn">⚠️ En $\frac{2}{5}+\frac{1}{3}\div\frac{3}{4}$ primero se hace la división, ¡no la suma!</div>`,
      },
      {
        title: "Convertir decimal → fracción (3 casos)",
        icon: "🔁",
        html: T`<p><b>1. Decimal exacto</b> (se acaba): arriba el número sin coma; abajo un 1 con tantos ceros como cifras decimales. Luego simplifica.</p>
$$0{,}75=\frac{75}{100}=\frac{3}{4}$$
<p><b>2. Periódico puro</b> (se repite desde la coma): arriba el número hasta el final del primer período, sin coma, <b>menos</b> la parte que no se repite; abajo tantos <b>9</b> como cifras tenga el período.</p>
$$0{,}\overline{39}=\frac{39-0}{99}=\frac{13}{33}$$
<p><b>3. Periódico mixto</b> (algo no se repite y luego sí): abajo tantos <b>9</b> como cifras del período <b>seguidos de</b> tantos <b>0</b> como cifras decimales no periódicas.</p>
$$0{,}1\overline{6}=\frac{16-1}{90}=\frac{15}{90}=\frac{1}{6}$$
<div class="callout">🧠 Truco para entender el porqué: si $x=0{,}3939\ldots$ entonces $100x=39{,}3939\ldots$. Restando: $99x=39$, así que $x=\frac{39}{99}$.</div>`,
      },
      {
        title: "Multiplicar y dividir decimales",
        icon: "🔢",
        html: T`<p><b>Multiplicar:</b> 1) quita las comas y multiplica como enteros; 2) cuenta las cifras decimales de ambos números; 3) pon la coma dejando esa cantidad de cifras.</p>
$$3{,}43\times0{,}234:\quad 343\times234=80262\;\Rightarrow\;2+3=5\text{ decimales}\;\Rightarrow\;0{,}80262$$
<p><b>Dividir:</b> corre la coma del divisor hasta que sea entero, y corre la del dividendo los mismos lugares.</p>
$$3{,}25\div0{,}23=325\div23$$
<p><b>Ley de los signos:</b> $(+)(+)=+$, $(-)(-)=+$, $(+)(-)=-$, $(-)(+)=-$. Igual para la división.</p>`,
      },
    ],
    exercises: [
      { group: "Punto 1 · Operaciones con fracciones", id: "a1-1a", title: T`$\frac{3}{4}+\frac{4}{3}$`,
        hint: "Los denominadores son distintos: busca el m.c.m. de 4 y 3.",
        steps: [
          T`Los denominadores son distintos (4 y 3). Buscamos el mínimo común múltiplo: $\text{mcm}(4,3)=12$.`,
          T`Convertimos cada fracción a doceavos: $\frac{3}{4}=\frac{3\cdot3}{4\cdot3}=\frac{9}{12}$ y $\frac{4}{3}=\frac{4\cdot4}{3\cdot4}=\frac{16}{12}$.`,
          T`Ahora tienen el mismo denominador, sumamos los numeradores: $\frac{9}{12}+\frac{16}{12}=\frac{25}{12}$.`,
          T`¿Se simplifica? $25=5\cdot5$ y $12=2\cdot2\cdot3$, no comparten factores. Queda igual.`,
        ],
        answer: T`$\frac{25}{12}\approx2{,}08$` },
      { group: "Punto 1 · Operaciones con fracciones", id: "a1-1b", title: T`$\frac{5}{8}-\frac{9}{2}$`,
        hint: "8 ya es múltiplo de 2, así que el m.c.m. es 8.",
        steps: [
          T`$\text{mcm}(8,2)=8$, porque 8 ya es múltiplo de 2.`,
          T`Convertimos: $\frac{9}{2}=\frac{9\cdot4}{2\cdot4}=\frac{36}{8}$.`,
          T`Restamos: $\frac{5}{8}-\frac{36}{8}=\frac{5-36}{8}=\frac{-31}{8}$.`,
          T`Da negativo porque le quitamos más de lo que teníamos ($\frac{9}{2}=4{,}5$ es mayor que $\frac{5}{8}=0{,}625$).`,
        ],
        answer: T`$-\frac{31}{8}=-3{,}875$` },
      { group: "Punto 1 · Operaciones con fracciones", id: "a1-1c", title: T`$\left(\frac{7}{6}\cdot\frac{4}{5}\right)+\frac{2}{3}$`,
        hint: "Primero el paréntesis (multiplicación derecha), luego la suma.",
        steps: [
          T`PAPOMUDAS: primero el paréntesis. Multiplicamos derecho: $\frac{7}{6}\cdot\frac{4}{5}=\frac{28}{30}$.`,
          T`Simplificamos dividiendo arriba y abajo entre 2: $\frac{28}{30}=\frac{14}{15}$.`,
          T`Ahora la suma. $\text{mcm}(15,3)=15$, entonces $\frac{2}{3}=\frac{10}{15}$.`,
          T`$\frac{14}{15}+\frac{10}{15}=\frac{24}{15}$. Simplificamos entre 3: $\frac{8}{5}$.`,
        ],
        answer: T`$\frac{8}{5}=1{,}6$` },
      { group: "Punto 1 · Operaciones con fracciones", id: "a1-1d", title: T`$\left(\frac{9}{6}\div\frac{2}{7}\right)-5$`,
        hint: "Conserva, cambia, voltea. Y recuerda que 5 = 20/4.",
        steps: [
          T`Primero simplificamos lo que se pueda: $\frac{9}{6}=\frac{3}{2}$.`,
          T`División: Conserva, Cambia, Voltea. $\frac{3}{2}\div\frac{2}{7}=\frac{3}{2}\cdot\frac{7}{2}=\frac{21}{4}$.`,
          T`Escribimos el 5 como fracción con denominador 4: $5=\frac{20}{4}$.`,
          T`$\frac{21}{4}-\frac{20}{4}=\frac{1}{4}$.`,
        ],
        answer: T`$\frac{1}{4}=0{,}25$` },
      { group: "Punto 1 · Operaciones con fracciones", id: "a1-1e", title: T`$\left(\frac{2}{5}+\frac{1}{3}\div\frac{3}{4}\times\frac{9}{3}-5\right)$`,
        hint: "¡Cuidado! PAPOMUDAS: primero ÷ y × de izquierda a derecha, después + y −.",
        steps: [
          T`Dentro del paréntesis hay varias operaciones. Por PAPOMUDAS, primero la <b>división y la multiplicación</b> de izquierda a derecha.`,
          T`División: $\frac{1}{3}\div\frac{3}{4}=\frac{1}{3}\cdot\frac{4}{3}=\frac{4}{9}$.`,
          T`Multiplicación: $\frac{4}{9}\times\frac{9}{3}=\frac{36}{27}=\frac{4}{3}$.`,
          T`Nos queda: $\frac{2}{5}+\frac{4}{3}-5$. El $\text{mcm}(5,3)=15$.`,
          T`$\frac{6}{15}+\frac{20}{15}-\frac{75}{15}=\frac{6+20-75}{15}=\frac{-49}{15}$.`,
        ],
        answer: T`$-\frac{49}{15}\approx-3{,}27$` },
      { group: "Punto 1 · Operaciones con fracciones", id: "a1-1f", title: T`$\frac{3}{8}$ de $\frac{3}{4}$ de una hora`,
        hint: "“de” significa multiplicar. Una hora tiene 60 minutos.",
        steps: [
          T`La palabra <b>"de"</b> significa multiplicar: $\frac{3}{8}\cdot\frac{3}{4}=\frac{9}{32}$ de hora.`,
          T`Pasamos a minutos (1 hora = 60 min): $\frac{9}{32}\cdot60=\frac{540}{32}=16{,}875$ minutos.`,
          T`La parte decimal a segundos: $0{,}875\cdot60=52{,}5$ segundos.`,
        ],
        answer: T`$\frac{9}{32}$ h ≈ 16 min 52,5 s` },

      { group: "Punto 2 · Decimal ↔ fracción", id: "a1-2a", title: T`$0{,}25$`,
        hint: "Decimal exacto con 2 cifras decimales → denominador 100.",
        steps: [
          T`Es un decimal <b>exacto</b> con 2 cifras decimales: $0{,}25=\frac{25}{100}$.`,
          T`Simplificamos dividiendo entre 25: $\frac{25\div25}{100\div25}=\frac{1}{4}$.`,
        ],
        answer: T`$\frac{1}{4}$` },
      { group: "Punto 2 · Decimal ↔ fracción", id: "a1-2b", title: T`$4{,}75$`,
        hint: "Todo el número sin coma va arriba: 475.",
        steps: [
          T`Exacto con 2 decimales: arriba todo el número sin coma, abajo 100: $\frac{475}{100}$.`,
          T`Simplificamos entre 25: $\frac{19}{4}$. Comprobamos: $19\div4=4{,}75$ ✓`,
        ],
        answer: T`$\frac{19}{4}$` },
      { group: "Punto 2 · Decimal ↔ fracción", id: "a1-2c", title: T`$2{,}399$`,
        hint: "3 cifras decimales → denominador 1000.",
        steps: [
          T`Exacto con 3 decimales: $2{,}399=\frac{2399}{1000}$.`,
          T`El 1000 solo tiene factores 2 y 5. El 2399 es impar y no termina en 0 ni 5, así que <b>no se puede simplificar</b>.`,
        ],
        answer: T`$\frac{2399}{1000}$` },
      { group: "Punto 2 · Decimal ↔ fracción", id: "a1-2d", title: T`$0{,}275275$`,
        hint: "Está escrito sin puntos suspensivos: es exacto (6 decimales).",
        steps: [
          T`Como está escrito <b>sin</b> "…", es un decimal exacto de 6 cifras: $\frac{275275}{1\,000\,000}$.`,
          T`Simplificamos entre 25: $\frac{11011}{40000}$. (11011 = 7·11·11·13, ya no comparte factores con 40000.)`,
          T`💡 Ojo: si el profe lo escribiera como $0{,}\overline{275}$ (periódico), sería $\frac{275}{999}$. Si te lo preguntan, explica los dos casos: ¡eso suma puntos!`,
        ],
        answer: T`$\frac{11011}{40000}$ (si es periódico: $\frac{275}{999}$)` },
      { group: "Punto 2 · Decimal ↔ fracción", id: "a1-2e", title: T`$0{,}393939\ldots$`,
        hint: "Periódico puro, el período es 39 (2 cifras) → dos nueves abajo.",
        steps: [
          T`Es <b>periódico puro</b>: se repite el $39$ desde la coma. $0{,}\overline{39}$`,
          T`Arriba: el número hasta el final del primer período menos la parte que no se repite: $39-0=39$. Abajo: un 9 por cada cifra del período: $99$.`,
          T`$\frac{39}{99}$, simplificamos entre 3: $\frac{13}{33}$.`,
          T`Comprobación con álgebra: $x=0{,}3939\ldots$, $100x=39{,}3939\ldots$; restando, $99x=39$ ✓`,
        ],
        answer: T`$\frac{13}{33}$` },
      { group: "Punto 2 · Decimal ↔ fracción", id: "a1-2f", title: T`$0{,}999999\ldots$`,
        hint: "¡Pregunta trampa! Aplica la regla del periódico puro.",
        steps: [
          T`Periódico puro con período de 1 cifra: $0{,}\overline{9}=\frac{9}{9}$.`,
          T`$\frac{9}{9}=1$. ¡Sí, $0{,}999\ldots$ es exactamente $1$!`,
          T`Prueba: $x=0{,}999\ldots$, $10x=9{,}999\ldots$. Restando: $9x=9$, entonces $x=1$. Otra forma: $\frac{1}{3}=0{,}333\ldots$ y $3\cdot\frac{1}{3}=0{,}999\ldots=1$.`,
        ],
        answer: T`$1$` },
      { group: "Punto 2 · Decimal ↔ fracción", id: "a1-2g", title: T`$\frac{22}{7}$`,
        hint: "Ahora al revés: divide 22 entre 7.",
        steps: [
          T`Fracción → decimal: dividimos $22\div7$.`,
          T`$22\div7=3{,}142857\,142857\ldots$ El bloque $142857$ se repite.`,
          T`Es un decimal <b>periódico puro</b>: $3{,}\overline{142857}$. Curiosidad: se parece a $\pi=3{,}14159\ldots$ pero no es igual; $\frac{22}{7}$ es racional y $\pi$ es irracional.`,
        ],
        answer: T`$3{,}\overline{142857}$` },
      { group: "Punto 2 · Decimal ↔ fracción", id: "a1-2h", title: T`$\frac{7}{4}$`,
        hint: "Multiplica arriba y abajo por 25 para tener denominador 100.",
        steps: [
          T`Truco: $\frac{7}{4}=\frac{7\cdot25}{4\cdot25}=\frac{175}{100}$.`,
          T`$\frac{175}{100}=1{,}75$. Decimal exacto.`,
        ],
        answer: T`$1{,}75$` },

      { group: "Punto 3 · Operaciones con decimales", id: "a1-3a", title: T`$(3{,}43)(0{,}234)$`,
        hint: "Multiplica sin comas y cuenta 2 + 3 decimales.",
        steps: [
          T`Sin comas: $343\times234=80262$.`,
          T`Cifras decimales: $3{,}43$ tiene 2 y $0{,}234$ tiene 3. Total: 5.`,
          T`Ponemos la coma dejando 5 cifras a la derecha: $0{,}80262$.`,
        ],
        answer: T`$0{,}80262$` },
      { group: "Punto 3 · Operaciones con decimales", id: "a1-3b", title: T`$(-0{,}125)(6{,}9)$`,
        hint: "Signo: (−)(+) = −. Luego 125 × 69.",
        steps: [
          T`Signo primero: $(-)(+)=-$.`,
          T`Sin comas: $125\times69=8625$. Decimales: $3+1=4$ → $0{,}8625$.`,
        ],
        answer: T`$-0{,}8625$` },
      { group: "Punto 3 · Operaciones con decimales", id: "a1-3c", title: T`$(-0{,}5)(10{,}906)$`,
        hint: "Multiplicar por 0,5 es lo mismo que sacar la mitad.",
        steps: [
          T`Signo: $(-)(+)=-$.`,
          T`Truco: multiplicar por $0{,}5$ es sacar la <b>mitad</b>: $10{,}906\div2=5{,}453$.`,
          T`Comprobación: $5\times10906=54530$, con $1+3=4$ decimales → $5{,}4530$ ✓`,
        ],
        answer: T`$-5{,}453$` },
      { group: "Punto 3 · Operaciones con decimales", id: "a1-3d", title: T`$(3{,}25)\div(0{,}23)$`,
        hint: "Corre la coma 2 lugares en ambos números.",
        steps: [
          T`El divisor $0{,}23$ tiene 2 decimales: corremos la coma 2 lugares en los dos números: $325\div23$.`,
          T`$23\times14=322$, sobra $3$. Seguimos dividiendo: $325\div23=14{,}1304\ldots$`,
        ],
        answer: T`$\approx14{,}13$` },
      { group: "Punto 3 · Operaciones con decimales", id: "a1-3e", title: T`$(-0{,}146)\div(6{,}9)$`,
        hint: "Signo negativo. Corre la coma 1 lugar: −1,46 ÷ 69.",
        steps: [
          T`Signo: $(-)\div(+)=-$.`,
          T`Corremos la coma 1 lugar en ambos: $1{,}46\div69$.`,
          T`$1{,}46\div69=0{,}02116\ldots$`,
        ],
        answer: T`$\approx-0{,}0212$` },
      { group: "Punto 3 · Operaciones con decimales", id: "a1-3f", title: "Inventar uno",
        hint: "Inventa uno con signos distintos para mostrar que dominas la ley de signos.",
        steps: [
          T`Ejemplo propio: $(-1{,}5)(-0{,}4)$.`,
          T`Signo: $(-)(-)=+$. Sin comas: $15\times4=60$. Decimales: $1+1=2$ → $0{,}60$.`,
          T`Resultado: $0{,}6$. ¡Ahora inventa el tuyo y explícalo así!`,
        ],
        answer: T`$(-1{,}5)(-0{,}4)=0{,}6$` },

      { group: "Problemas", id: "a1-p1", title: "El tanque de 3000 litros",
        statement: T`Un tanque tiene 3000 L para una semana. El lunes se consume $\frac{1}{8}$, el martes $\frac{2}{5}$ y el miércoles $\frac{1}{4}$ del contenido total. ¿Cuánto se gastó cada día? ¿Cuánto queda? ¿Qué fracción queda?`,
        hint: "“1/8 de 3000” = 3000 ÷ 8. Haz lo mismo con cada día.",
        steps: [
          T`Lunes: $\frac{1}{8}\cdot3000=375$ L.`,
          T`Martes: $\frac{2}{5}\cdot3000=\frac{6000}{5}=1200$ L.`,
          T`Miércoles: $\frac{1}{4}\cdot3000=750$ L.`,
          T`Total gastado: $375+1200+750=2325$ L. Quedan: $3000-2325=675$ L.`,
          T`Fracción que queda: $\frac{675}{3000}=\frac{9}{40}$. Comprobación: $1-\left(\frac{1}{8}+\frac{2}{5}+\frac{1}{4}\right)=1-\frac{5+16+10}{40}=\frac{9}{40}$ ✓`,
        ],
        answer: T`375 L, 1200 L, 750 L · quedan 675 L = $\frac{9}{40}$` },
      { group: "Problemas", id: "a1-p2", title: "Las estaturas de la familia de Juan",
        statement: T`El padre mide 1,97 m, Juan 95 cm y su hermano 0,6235 m. ¿Cuánto mide Juan en metros? ¿Qué es mayor: el padre o Juan y su hermano juntos? ¿Cuánto más alto es Juan que su hermano?`,
        hint: "Primero pasa todo a la misma unidad: metros.",
        steps: [
          T`Todo a metros: $95\text{ cm}=0{,}95\text{ m}$ (1 m = 100 cm). Juan mide $0{,}95$ m.`,
          T`El hermano mide $0{,}6235$ m.`,
          T`Juntos: $0{,}95+0{,}6235=1{,}5735$ m. Como $1{,}97>1{,}5735$, <b>el padre es más alto</b> que los dos juntos.`,
          T`Diferencia: $0{,}9500-0{,}6235=0{,}3265$ m. (Tip: completa con ceros para alinear las comas.)`,
        ],
        answer: T`Juan 0,95 m · hermano 0,6235 m · padre mayor · diferencia 0,3265 m` },
      { group: "Problemas", id: "a1-p3", title: "Ciclista: le faltan 30 km", visual: "barModel",
        statement: T`Un ciclista ha recorrido $\frac{5}{8}$ de la distancia total y le faltan 30 km. ¿Cuál es la distancia total? a) 75 b) 80 c) 90 d) 60`,
        hint: "Método de la barra: divide la carrera en 8 partes iguales.",
        steps: [
          T`<b>Método de la barra (modelo de Singapur):</b> dibujamos la carrera como una barra de 8 partes iguales. Ya recorrió 5.`,
          T`Le faltan $8-5=3$ partes, y esas 3 partes son 30 km.`,
          T`Una parte: $30\div3=10$ km. Todo: $8\cdot10=80$ km.`,
          T`Comprobación: $\frac{5}{8}\cdot80=50$ km recorridos, $80-50=30$ ✓. Respuesta <b>b</b>.`,
        ],
        answer: T`b) 80 km` },
      { group: "Problemas", id: "a1-p4", title: "Álvaro y su bicicleta",
        statement: T`La carrera tiene 150 km. Cuando le falta $\frac{2}{5}$ del total, se le daña la bici. ¿Cuántos km le faltaron? a) 30 b) 90 c) 60 d) 149`,
        hint: "Lo que le falta ya te lo dicen: 2/5 de 150.",
        steps: [
          T`Le falta $\frac{2}{5}$ del total: $\frac{2}{5}\cdot150=\frac{300}{5}=60$ km.`,
          T`Distractor: $90$ km es lo que <b>sí</b> recorrió ($\frac{3}{5}\cdot150$). Lee bien qué te preguntan. Respuesta <b>c</b>.`,
        ],
        answer: T`c) 60 km` },
    ],
    labs: ["fractionLab", "decimalLab"],
    quiz: [
      { q: T`¿Cuánto es $\frac{1}{2}+\frac{1}{3}$?`, options: [T`$\frac{2}{5}$`, T`$\frac{5}{6}$`, T`$\frac{1}{6}$`, T`$\frac{2}{6}$`], correct: 1,
        explain: T`$\text{mcm}(2,3)=6$: $\frac{3}{6}+\frac{2}{6}=\frac{5}{6}$. Si elegiste $\frac{2}{5}$, sumaste arriba con arriba y abajo con abajo: ¡ese es el error típico!` },
      { q: T`¿Qué fracción es $0{,}4545\ldots$?`, options: [T`$\frac{45}{100}$`, T`$\frac{9}{20}$`, T`$\frac{5}{11}$`, T`$\frac{4}{9}$`], correct: 2,
        explain: T`Periódico puro de 2 cifras: $\frac{45}{99}=\frac{5}{11}$. $\frac{45}{100}$ sería si fuera exacto ($0{,}45$).` },
      { q: T`$\frac{2}{3}\div\frac{4}{5}=$`, options: [T`$\frac{8}{15}$`, T`$\frac{5}{6}$`, T`$\frac{6}{5}$`, T`$\frac{4}{5}$`], correct: 1,
        explain: T`Conserva, cambia, voltea: $\frac{2}{3}\cdot\frac{5}{4}=\frac{10}{12}=\frac{5}{6}$.` },
      { q: T`$(-0{,}2)(0{,}3)=$`, options: [T`$-0{,}6$`, T`$0{,}06$`, T`$-0{,}06$`, T`$-0{,}006$`], correct: 2,
        explain: T`$2\times3=6$, con $1+1=2$ decimales: $0{,}06$. Signo $(-)(+)=-$.` },
      { q: T`$\frac{1}{2}+\frac{1}{2}\cdot4=$`, options: [T`$4$`, T`$\frac{5}{2}$`, T`$2$`, T`$\frac{3}{2}$`], correct: 1,
        explain: T`PAPOMUDAS: primero la multiplicación $\frac{1}{2}\cdot4=2$, luego $\frac{1}{2}+2=\frac{5}{2}$.` },
    ],
  },

  /* =====================================================
     ACTIVIDAD 2 · POTENCIACIÓN Y RADICACIÓN
     ===================================================== */
  {
    id: "a2",
    num: 2,
    color: "#BF5AF2",
    color2: "#FF6FD8",
    emoji: "⚡",
    title: "Potencias y raíces",
    subtitle: "Propiedades de la potenciación y la radicación",
    method: "Descubrimiento de patrones + tarjetas de memoria",
    methodWhy: "Las propiedades no se memorizan a ciegas: se descubren expandiendo la potencia. Luego las fijamos con tarjetas (práctica de recuperación), que es la técnica de estudio con más evidencia científica.",
    minutes: 45,
    intro: T`Las potencias parecen difíciles pero son solo <b>multiplicaciones repetidas</b>. Te voy a mostrar que cada propiedad sale de contar factores. Y para las raíces usaremos la historia de <b>la cárcel</b>: los factores salen de la raíz en grupos.`,
    theory: [
      {
        title: "¿Qué es una potencia?",
        icon: "🔋",
        html: T`$$a^n=\underbrace{a\cdot a\cdot a\cdots a}_{n\text{ veces}}$$
<p><b>a</b> es la base y <b>n</b> el exponente: cuántas veces se multiplica la base.</p>
<p>Ejemplo: $2^5=2\cdot2\cdot2\cdot2\cdot2=32$.</p>
<div class="callout">🔍 <b>Descubre el patrón:</b> $2^3\cdot2^2=(2\cdot2\cdot2)(2\cdot2)=2^5$. Contamos 3 + 2 = 5 doses. ¡Por eso <b>se suman</b> los exponentes!</div>`,
      },
      {
        title: "Las propiedades de la potenciación",
        icon: "📜",
        html: T`<div class="prop-grid">
<div class="prop"><span>Producto misma base</span>$a^m\cdot a^n=a^{m+n}$</div>
<div class="prop"><span>Cociente misma base</span>$\frac{a^m}{a^n}=a^{m-n}$</div>
<div class="prop"><span>Potencia de potencia</span>$(a^m)^n=a^{m\cdot n}$</div>
<div class="prop"><span>Potencia de un producto</span>$(a\cdot b)^n=a^n\cdot b^n$</div>
<div class="prop"><span>Potencia de un cociente</span>$\left(\frac{a}{b}\right)^n=\frac{a^n}{b^n}$</div>
<div class="prop"><span>Exponente cero</span>$a^0=1$</div>
<div class="prop"><span>Exponente negativo</span>$a^{-n}=\frac{1}{a^n}$</div>
<div class="prop"><span>Exponente fraccionario</span>$a^{\frac{m}{n}}=\sqrt[n]{a^m}$</div>
</div>
<div class="callout">🛗 <b>El exponente negativo es un ascensor:</b> si un factor está arriba con exponente negativo, baja al denominador y se vuelve positivo (y al revés). $\frac{2^{-3}}{5}=\frac{1}{5\cdot2^3}$</div>
<div class="callout warn">⚠️ Solo se suman o restan exponentes cuando la <b>base es la misma</b>. $2^3\cdot3^2$ no se puede juntar.</div>`,
      },
      {
        title: "Radicación: la historia de la cárcel",
        icon: "⛓️",
        html: T`<p>$\sqrt[n]{a}$ es el número que elevado a la $n$ da $a$. El número pequeño $n$ es el <b>índice</b>.</p>
<p>Imagina que la raíz es una <b>cárcel</b> y el índice es la regla para salir: los factores solo pueden salir <b>en grupos de n</b>. Del grupo sale <b>uno</b> solo. Los que no completan grupo se quedan adentro.</p>
$$\sqrt{75}=\sqrt{5\cdot5\cdot3}=5\sqrt{3}$$
<p>Dos cincos forman pareja (índice 2) → sale un 5. El 3 está solo → se queda.</p>
$$\sqrt[3]{x^5}=\sqrt[3]{x^3\cdot x^2}=x\sqrt[3]{x^2}$$
<div class="prop-grid">
<div class="prop"><span>Raíz de un producto</span>$\sqrt[n]{ab}=\sqrt[n]{a}\cdot\sqrt[n]{b}$</div>
<div class="prop"><span>Raíz de un cociente</span>$\sqrt[n]{\frac{a}{b}}=\frac{\sqrt[n]{a}}{\sqrt[n]{b}}$</div>
<div class="prop"><span>Raíz de una potencia</span>$\sqrt[n]{a^m}=a^{\frac{m}{n}}$</div>
<div class="prop"><span>Raíz de raíz</span>$\sqrt[m]{\sqrt[n]{a}}=\sqrt[m\cdot n]{a}$</div>
</div>`,
      },
      {
        title: "Sumar radicales: manzanas con manzanas",
        icon: "🍎",
        html: T`<p>Solo se suman radicales <b>semejantes</b> (mismo índice y mismo número adentro), igual que $2x+5x=7x$.</p>
$$2\sqrt{3}+5\sqrt{3}=7\sqrt{3}$$
<p>Si no se parecen, primero <b>simplifica</b> cada uno (sacando factores de la cárcel) y muchas veces aparecen iguales:</p>
$$\sqrt{12}+\sqrt{27}=2\sqrt{3}+3\sqrt{3}=5\sqrt{3}$$
<div class="callout">🧰 <b>Estrategia general:</b> descompón todo en factores primos ($4=2^2$, $25=5^2$, $27=3^3$, $75=3\cdot5^2$...). Con primos, las propiedades se aplican casi solas.</div>`,
      },
    ],
    exercises: [
      { group: "Punto 1 · Propiedades", id: "a2-1a", title: T`$2^5\cdot3^4\cdot2^{-2}\cdot3^{-3}$`,
        hint: "Agrupa las bases iguales y suma sus exponentes.",
        steps: [
          T`Agrupamos bases iguales: $(2^5\cdot2^{-2})\cdot(3^4\cdot3^{-3})$.`,
          T`Producto de misma base, se suman exponentes: $2^{5+(-2)}\cdot3^{4+(-3)}=2^3\cdot3^1$.`,
          T`$2^3\cdot3=8\cdot3=24$.`,
        ],
        answer: T`$24$` },
      { group: "Punto 1 · Propiedades", id: "a2-1b", title: T`$\frac{(3^2)(4)(5^3)}{(2^{-2})(-25)}$`,
        hint: "Escribe 4 = 2² y 25 = 5². El signo menos queda aparte.",
        steps: [
          T`Escribimos todo en primos: $4=2^2$ y $25=5^2$. El signo $-$ del denominador hace negativo el resultado.`,
          T`$-\frac{3^2\cdot2^2\cdot5^3}{2^{-2}\cdot5^2}$`,
          T`Cociente de misma base (se restan exponentes): $2^{2-(-2)}=2^4$ y $5^{3-2}=5^1$.`,
          T`$-(3^2\cdot2^4\cdot5)=-(9\cdot16\cdot5)=-720$.`,
        ],
        answer: T`$-720$` },
      { group: "Punto 1 · Propiedades", id: "a2-1c", title: T`$\left[\frac{2^{-2}}{3^5}\cdot\frac{(3^3)^{-5}}{2^{-7}}\right]$`,
        hint: "Primero potencia de potencia: (3³)⁻⁵ = 3⁻¹⁵.",
        steps: [
          T`Potencia de una potencia (se multiplican): $(3^3)^{-5}=3^{-15}$.`,
          T`Juntamos todo en una fracción: $\frac{2^{-2}\cdot3^{-15}}{3^5\cdot2^{-7}}$.`,
          T`Base 2: $2^{-2-(-7)}=2^{5}$. Base 3: $3^{-15-5}=3^{-20}$.`,
          T`El exponente negativo baja (ascensor): $2^5\cdot3^{-20}=\frac{2^5}{3^{20}}=\frac{32}{3^{20}}$.`,
        ],
        answer: T`$\frac{2^5}{3^{20}}=\frac{32}{3\,486\,784\,401}$` },
      { group: "Punto 1 · Propiedades", id: "a2-1d", title: T`$\left(\frac{5}{2}\right)^4\cdot\left[\left(\frac{5}{4}\right)^5\right]^{-2}$`,
        hint: "Potencia de potencia: 5·(−2) = −10. Un negativo voltea la fracción.",
        steps: [
          T`Potencia de potencia: $\left[\left(\frac{5}{4}\right)^5\right]^{-2}=\left(\frac{5}{4}\right)^{-10}=\left(\frac{4}{5}\right)^{10}$ (el negativo voltea la fracción).`,
          T`Escribimos en primos: $4^{10}=(2^2)^{10}=2^{20}$. Queda: $\frac{5^4}{2^4}\cdot\frac{2^{20}}{5^{10}}$.`,
          T`Base 2: $2^{20-4}=2^{16}$. Base 5: $5^{4-10}=5^{-6}$ → baja al denominador.`,
          T`$\frac{2^{16}}{5^6}=\frac{65536}{15625}\approx4{,}19$.`,
        ],
        answer: T`$\frac{2^{16}}{5^{6}}\approx4{,}19$` },
      { group: "Punto 1 · Propiedades", id: "a2-1e", title: T`$\frac{-50x^8y^3z^4}{200x^5y^9z^2}$`,
        hint: "Números con números, cada letra con su letra.",
        steps: [
          T`Números: $\frac{-50}{200}=-\frac{1}{4}$.`,
          T`Letras (se restan exponentes): $x^{8-5}=x^3$, $y^{3-9}=y^{-6}$, $z^{4-2}=z^2$.`,
          T`$y^{-6}$ baja al denominador como $y^6$: $-\frac{x^3z^2}{4y^6}$.`,
        ],
        answer: T`$-\frac{x^3z^2}{4y^6}$` },
      { group: "Punto 1 · Propiedades", id: "a2-1f", title: T`$\frac{(x^2y^3)^4(xy^4)^{-3}}{x^2y}$`,
        hint: "Reparte cada exponente exterior a cada letra del paréntesis.",
        steps: [
          T`Potencia de un producto: $(x^2y^3)^4=x^8y^{12}$ y $(xy^4)^{-3}=x^{-3}y^{-12}$.`,
          T`Numerador: $x^{8-3}y^{12-12}=x^5y^0=x^5$ (recuerda $y^0=1$).`,
          T`Dividimos: $\frac{x^5}{x^2y}=\frac{x^{5-2}}{y}=\frac{x^3}{y}$.`,
        ],
        answer: T`$\frac{x^3}{y}$` },
      { group: "Punto 1 · Propiedades", id: "a2-1g", title: T`$\frac{2\sqrt{3}+\sqrt{75}}{\sqrt{27}}$`,
        hint: "75 = 25·3 y 27 = 9·3. ¡Saca factores de la cárcel!",
        steps: [
          T`Simplificamos: $\sqrt{75}=\sqrt{25\cdot3}=5\sqrt{3}$ y $\sqrt{27}=\sqrt{9\cdot3}=3\sqrt{3}$.`,
          T`Numerador (manzanas con manzanas): $2\sqrt{3}+5\sqrt{3}=7\sqrt{3}$.`,
          T`$\frac{7\sqrt{3}}{3\sqrt{3}}$: se cancela $\sqrt{3}$ → $\frac{7}{3}$.`,
        ],
        answer: T`$\frac{7}{3}$` },
      { group: "Punto 1 · Propiedades", id: "a2-1h", title: T`$2\sqrt{12}-3\sqrt{75}+\sqrt{27}$`,
        hint: "Los tres se convierten en algo por √3.",
        steps: [
          T`$2\sqrt{12}=2\sqrt{4\cdot3}=2\cdot2\sqrt{3}=4\sqrt{3}$.`,
          T`$3\sqrt{75}=3\sqrt{25\cdot3}=3\cdot5\sqrt{3}=15\sqrt{3}$.`,
          T`$\sqrt{27}=\sqrt{9\cdot3}=3\sqrt{3}$.`,
          T`$4\sqrt{3}-15\sqrt{3}+3\sqrt{3}=(4-15+3)\sqrt{3}=-8\sqrt{3}$.`,
        ],
        answer: T`$-8\sqrt{3}\approx-13{,}86$` },
      { group: "Punto 1 · Propiedades", id: "a2-1i", title: T`$\sqrt[5]{\frac{9x^9y^{13}}{3xy^2}}$`,
        hint: "Primero simplifica adentro. Luego saca grupos de 5.",
        steps: [
          T`Simplificamos adentro: $\frac{9}{3}=3$, $x^{9-1}=x^8$, $y^{13-2}=y^{11}$. Queda $\sqrt[5]{3x^8y^{11}}$.`,
          T`Índice 5 → salen grupos de 5: $x^8=x^5\cdot x^3$ (sale una $x$) y $y^{11}=y^{10}\cdot y=(y^5)^2\cdot y$ (salen $y^2$).`,
          T`El 3, $x^3$ e $y$ se quedan adentro: $xy^2\sqrt[5]{3x^3y}$.`,
        ],
        answer: T`$xy^2\sqrt[5]{3x^3y}$` },
      { group: "Punto 1 · Propiedades", id: "a2-1j", title: T`$\sqrt[4]{\frac{2^7\cdot3^{14}\cdot5^{10}}{2^3\cdot3^2\cdot5^2}}$`,
        hint: "Resta exponentes adentro y luego divide cada exponente entre 4.",
        steps: [
          T`Adentro, cociente de misma base: $2^{7-3}\cdot3^{14-2}\cdot5^{10-2}=2^4\cdot3^{12}\cdot5^8$.`,
          T`Raíz cuarta = exponente $\frac{1}{4}$: $2^{4/4}\cdot3^{12/4}\cdot5^{8/4}=2\cdot3^3\cdot5^2$.`,
          T`$2\cdot27\cdot25=1350$.`,
        ],
        answer: T`$1350$` },
      { group: "Problemas", id: "a2-p1", title: "Cercar el terreno cuadrado",
        statement: T`Un terreno cuadrado tiene un área aproximada de $8\sqrt{50}$ m². ¿Cuántos metros de alambre se necesitan para cercarlo con dos vueltas?`,
        hint: "Área del cuadrado = lado². Perímetro = 4·lado. Dos vueltas = 2 perímetros.",
        steps: [
          T`Simplificamos el área: $8\sqrt{50}=8\sqrt{25\cdot2}=8\cdot5\sqrt{2}=40\sqrt{2}\approx56{,}57$ m².`,
          T`En un cuadrado $A=\ell^2$, así que $\ell=\sqrt{A}=\sqrt{40\sqrt{2}}\approx\sqrt{56{,}57}\approx7{,}52$ m.`,
          T`Una vuelta = perímetro: $4\ell\approx4\cdot7{,}52=30{,}08$ m.`,
          T`Dos vueltas: $8\ell\approx60{,}17$ m. (Forma exacta: $8\sqrt{40\sqrt{2}}=16\sqrt[4]{200}$.)`,
        ],
        answer: T`$\approx60{,}17$ m de alambre` },
      { group: "Problemas", id: "a2-p2", title: "Volumen del paralelepípedo",
        statement: T`Las aristas miden $\sqrt[3]{18xy^2}$, $4\sqrt[3]{2x^2y}$ y $5\sqrt[3]{12x^2y^2}$. Halla la expresión del volumen.`,
        hint: "Volumen = largo · ancho · alto. Mismo índice: se multiplica adentro.",
        steps: [
          T`$V=\sqrt[3]{18xy^2}\cdot4\sqrt[3]{2x^2y}\cdot5\sqrt[3]{12x^2y^2}$.`,
          T`Coeficientes de afuera: $1\cdot4\cdot5=20$. Mismo índice 3 → multiplicamos adentro: $18\cdot2\cdot12=432$, $x^{1+2+2}=x^5$, $y^{2+1+2}=y^5$.`,
          T`$V=20\sqrt[3]{432x^5y^5}$. Descomponemos: $432=216\cdot2=6^3\cdot2$.`,
          T`Salen de la cárcel (grupos de 3): un $6$, una $x$ y una $y$. Adentro quedan $2x^2y^2$.`,
          T`$V=20\cdot6xy\sqrt[3]{2x^2y^2}=120xy\sqrt[3]{2x^2y^2}$.`,
        ],
        answer: T`$120xy\sqrt[3]{2x^2y^2}$` },
      { group: "Selección múltiple", id: "a2-m1", title: T`Equivalente a $4\cdot(2^3)^{-2}$`,
        statement: T`a) $2^{-6}$ b) $2^5$ c) $\frac{1}{2^4}$ d) $2^{-5}$`,
        hint: "Escribe 4 como potencia de 2.",
        steps: [
          T`$4=2^2$ y $(2^3)^{-2}=2^{-6}$.`,
          T`$2^2\cdot2^{-6}=2^{-4}=\frac{1}{2^4}$. Respuesta <b>c</b>.`,
        ],
        answer: T`c) $\frac{1}{2^4}$` },
      { group: "Selección múltiple", id: "a2-m2", title: T`Valor de $(-4)^3+\sqrt[3]{125}$`,
        statement: T`a) 64 b) −59 c) −49 d) −79`,
        hint: "Un negativo elevado a exponente impar sigue negativo.",
        steps: [
          T`$(-4)^3=(-4)(-4)(-4)=-64$ (exponente impar → signo negativo).`,
          T`$\sqrt[3]{125}=5$ porque $5^3=125$.`,
          T`$-64+5=-59$. Respuesta <b>b</b>.`,
        ],
        answer: T`b) $-59$` },
    ],
    labs: ["flashLab", "radicalLab"],
    quiz: [
      { q: T`$a^3\cdot a^5=$`, options: [T`$a^{15}$`, T`$a^8$`, T`$2a^8$`, T`$a^2$`], correct: 1, explain: T`Misma base: se suman los exponentes, $3+5=8$.` },
      { q: T`$7^0=$`, options: [T`$0$`, T`$7$`, T`$1$`, T`No existe`], correct: 2, explain: T`Todo número (distinto de 0) elevado a 0 da 1: $\frac{7^2}{7^2}=7^{2-2}=7^0=1$.` },
      { q: T`$2^{-3}=$`, options: [T`$-8$`, T`$-6$`, T`$\frac{1}{8}$`, T`$\frac{1}{6}$`], correct: 2, explain: T`El exponente negativo no hace negativo el número: lo manda al denominador. $2^{-3}=\frac{1}{2^3}=\frac{1}{8}$.` },
      { q: T`$\sqrt{50}$ simplificada es:`, options: [T`$25\sqrt{2}$`, T`$5\sqrt{2}$`, T`$2\sqrt{5}$`, T`$10\sqrt{5}$`], correct: 1, explain: T`$50=25\cdot2$, la pareja de cincos sale: $5\sqrt{2}$.` },
      { q: T`$8^{\frac{2}{3}}=$`, options: [T`$4$`, T`$\frac{16}{3}$`, T`$12$`, T`$2$`], correct: 0, explain: T`$8^{2/3}=\left(\sqrt[3]{8}\right)^2=2^2=4$.` },
    ],
  },

  /* =====================================================
     ACTIVIDAD 3 · INTERVALOS
     ===================================================== */
  {
    id: "a3",
    num: 3,
    color: "#30D158",
    color2: "#A6F36B",
    emoji: "📏",
    title: "Intervalos en los reales",
    subtitle: "Notación de intervalo, de conjunto y gráfica",
    method: "Triángulo de representaciones",
    methodWhy: "Un mismo intervalo se puede escribir de 3 formas: gráfica, intervalo y conjunto. Si sabes pasar de una a otra en cualquier dirección, ya lo dominas. El laboratorio te deja moverlo con tus manos.",
    minutes: 25,
    intro: T`Este es el tema más fácil del examen si te aprendes <b>una sola regla</b>: el <b>corchete</b> [ ] abraza al número (lo incluye, punto relleno) y el <b>paréntesis</b> ( ) lo esquiva (no lo incluye, punto vacío). Y el infinito siempre va con paréntesis, porque nunca se alcanza.`,
    theory: [
      {
        title: "¿Qué es un intervalo?",
        icon: "📏",
        html: T`<p>Un intervalo es un <b>tramo de la recta numérica</b>: todos los números reales entre dos extremos.</p>
<div class="legend-row"><span class="dot filled"></span> <b>[ ]</b> corchete = <b>incluye</b> el extremo (≤, ≥)</div>
<div class="legend-row"><span class="dot open"></span> <b>( )</b> paréntesis = <b>no incluye</b> el extremo (&lt;, &gt;)</div>
<div class="callout">∞ El infinito <b>siempre</b> lleva paréntesis: $(-\infty,5]$, nunca $[-\infty,5]$.</div>`,
      },
      {
        title: "Los tipos de intervalo",
        icon: "🗂️",
        html: T`<div class="table-wrap"><table class="nice">
<tr><th>Tipo</th><th>Intervalo</th><th>Conjunto</th></tr>
<tr><td>Abierto</td><td>$(3,5)$</td><td>$\{x\in\mathbb{R}/3<x<5\}$</td></tr>
<tr><td>Cerrado</td><td>$[3,5]$</td><td>$\{x\in\mathbb{R}/3\le x\le5\}$</td></tr>
<tr><td>Semiabierto (cerrado izq.)</td><td>$[3,5)$</td><td>$\{x\in\mathbb{R}/3\le x<5\}$</td></tr>
<tr><td>Semiabierto (cerrado der.)</td><td>$(3,5]$</td><td>$\{x\in\mathbb{R}/3<x\le5\}$</td></tr>
<tr><td>Infinito abierto</td><td>$(5,\infty)$</td><td>$\{x\in\mathbb{R}/x>5\}$</td></tr>
<tr><td>Infinito cerrado</td><td>$(-\infty,5]$</td><td>$\{x\in\mathbb{R}/x\le5\}$</td></tr>
</table></div>
<div class="callout">🔁 <b>Triángulo:</b> Gráfica ⇄ Intervalo ⇄ Conjunto. Practica pasar de cualquiera a cualquiera en el laboratorio.</div>`,
      },
      {
        title: "Cómo leer el conjunto",
        icon: "🗣️",
        html: T`<p>$\{x\in\mathbb{R}/-2<x\le8\}$ se lee: "los $x$ reales <b>tales que</b> $x$ es mayor que $-2$ y menor o igual que $8$".</p>
<p>Truco: el signo que toca el número te dice el símbolo: $<$ → paréntesis, $\le$ → corchete.</p>
<div class="callout warn">⚠️ El número menor siempre va a la izquierda. Si te dan $-5<x\le-9$, ¡ningún número es mayor que $-5$ y a la vez menor que $-9$! Eso es el <b>conjunto vacío</b> $\varnothing$.</div>`,
      },
    ],
    exercises: [
      { group: "Punto 1 · Intervalo → conjunto y tipo", id: "a3-1a", title: T`$(-4,7)$`, viz: { a: -4, b: 7, ac: false, bc: false },
        steps: [T`Paréntesis en ambos lados: no incluye ni $-4$ ni $7$.`, T`Conjunto: $\{x\in\mathbb{R}/-4<x<7\}$. Tipo: <b>abierto</b>.`],
        answer: T`$\{x\in\mathbb{R}/-4<x<7\}$ · abierto` },
      { group: "Punto 1 · Intervalo → conjunto y tipo", id: "a3-1b", title: T`$[-1{,}4\,;\,8]$`, viz: { a: -1.4, b: 8, ac: true, bc: true },
        steps: [T`Ojo con la coma decimal: los extremos son $-1{,}4$ y $8$.`, T`Corchetes en ambos lados: incluye los dos extremos.`, T`Conjunto: $\{x\in\mathbb{R}/-1{,}4\le x\le8\}$. Tipo: <b>cerrado</b>.`],
        answer: T`$\{x\in\mathbb{R}/-1{,}4\le x\le8\}$ · cerrado` },
      { group: "Punto 1 · Intervalo → conjunto y tipo", id: "a3-1c", title: T`$(-2,8]$`, viz: { a: -2, b: 8, ac: false, bc: true },
        steps: [T`Izquierda paréntesis (no incluye $-2$), derecha corchete (incluye $8$).`, T`Conjunto: $\{x\in\mathbb{R}/-2<x\le8\}$. Tipo: <b>semiabierto</b> (abierto a la izquierda, cerrado a la derecha).`],
        answer: T`$\{x\in\mathbb{R}/-2<x\le8\}$ · semiabierto` },
      { group: "Punto 1 · Intervalo → conjunto y tipo", id: "a3-1d", title: T`$[3,7]$`, viz: { a: 3, b: 7, ac: true, bc: true },
        steps: [T`Corchetes en ambos lados: incluye 3 y 7.`, T`Conjunto: $\{x\in\mathbb{R}/3\le x\le7\}$. Tipo: <b>cerrado</b>.`],
        answer: T`$\{x\in\mathbb{R}/3\le x\le7\}$ · cerrado` },
      { group: "Punto 1 · Intervalo → conjunto y tipo", id: "a3-1e", title: T`$(-\infty,8]$`, viz: { a: null, b: 8, ac: false, bc: true },
        steps: [T`Va desde menos infinito (sin límite a la izquierda) hasta 8, incluyendo el 8.`, T`Conjunto: $\{x\in\mathbb{R}/x\le8\}$. Tipo: <b>infinito</b>, cerrado por la derecha.`],
        answer: T`$\{x\in\mathbb{R}/x\le8\}$ · infinito` },
      { group: "Punto 1 · Intervalo → conjunto y tipo", id: "a3-1f", title: "Inventar un ejercicio", viz: { a: -3, b: 0, ac: true, bc: false },
        steps: [T`Ejemplo propio: $[-3,0)$.`, T`Conjunto: $\{x\in\mathbb{R}/-3\le x<0\}$. Tipo: <b>semiabierto</b> (cerrado a la izquierda). Usa el laboratorio para crear el tuyo.`],
        answer: T`$[-3,0)$ = $\{x\in\mathbb{R}/-3\le x<0\}$` },
      { group: "Punto 2 · Conjunto → intervalo y gráfica", id: "a3-2a", title: T`$\{x\in\mathbb{R}/x>3\}$`, viz: { a: 3, b: null, ac: false, bc: false },
        steps: [T`"Mayor que 3": no incluye el 3 → paréntesis. Sigue hasta el infinito.`, T`Intervalo: $(3,\infty)$. Gráfica: punto vacío en 3 y flecha a la derecha.`],
        answer: T`$(3,\infty)$` },
      { group: "Punto 2 · Conjunto → intervalo y gráfica", id: "a3-2b", title: T`$\{x\in\mathbb{R}/x\ge9\}$`, viz: { a: 9, b: null, ac: true, bc: false },
        steps: [T`"Mayor o igual que 9": incluye el 9 → corchete.`, T`Intervalo: $[9,\infty)$. Gráfica: punto relleno en 9 y flecha a la derecha.`],
        answer: T`$[9,\infty)$` },
      { group: "Punto 2 · Conjunto → intervalo y gráfica", id: "a3-2c", title: T`$\{x\in\mathbb{R}/x\le-2\}$`, viz: { a: null, b: -2, ac: false, bc: true },
        steps: [T`"Menor o igual que −2": incluye el $-2$ y va hacia la izquierda hasta $-\infty$.`, T`Intervalo: $(-\infty,-2]$. Gráfica: punto relleno en $-2$ y flecha a la izquierda.`],
        answer: T`$(-\infty,-2]$` },
      { group: "Punto 2 · Conjunto → intervalo y gráfica", id: "a3-2d", title: T`$\{x\in\mathbb{R}/-5<x\le-9\}$`, viz: { empty: true },
        steps: [
          T`¡Pregunta trampa! Debe ser mayor que $-5$ <b>y</b> menor o igual que $-9$.`,
          T`En la recta, $-9$ está a la izquierda de $-5$. Ningún número cumple las dos cosas: el resultado es el <b>conjunto vacío</b> $\varnothing$.`,
          T`Si fue un error de digitación y querían decir $-9<x\le-5$, la respuesta sería $(-9,-5]$. En el examen escribe las dos ideas: muestra que entiendes.`,
        ],
        answer: T`$\varnothing$ (o $(-9,-5]$ si era $-9<x\le-5$)` },
      { group: "Punto 2 · Conjunto → intervalo y gráfica", id: "a3-2e", title: "Inventar un ejercicio", viz: { a: -6, b: 1, ac: false, bc: true },
        steps: [T`Ejemplo: $\{x\in\mathbb{R}/-6<x\le1\}$.`, T`Intervalo: $(-6,1]$. Punto vacío en $-6$, relleno en $1$.`],
        answer: T`$(-6,1]$` },
    ],
    labs: ["intervalLab"],
    quiz: [
      { q: T`¿Qué intervalo es $\{x\in\mathbb{R}/-1<x\le6\}$?`, options: [T`$[-1,6)$`, T`$(-1,6]$`, T`$(-1,6)$`, T`$[-1,6]$`], correct: 1, explain: T`$<$ con el $-1$ → paréntesis; $\le$ con el $6$ → corchete.` },
      { q: T`¿Cuál está bien escrito?`, options: [T`$[-\infty,4]$`, T`$(4,\infty]$`, T`$(-\infty,4]$`, T`$[\infty,4)$`], correct: 2, explain: T`El infinito siempre va con paréntesis.` },
      { q: T`Punto relleno en 2 y flecha a la derecha:`, options: [T`$(2,\infty)$`, T`$[2,\infty)$`, T`$(-\infty,2]$`, T`$\{x/x<2\}$`], correct: 1, explain: T`Relleno = incluye → corchete. Flecha a la derecha = hasta $+\infty$: $\{x\in\mathbb{R}/x\ge2\}$.` },
      { q: T`$(-3,5)$ es un intervalo:`, options: ["Cerrado", "Abierto", "Semiabierto", "Vacío"], correct: 1, explain: T`Paréntesis en ambos extremos: abierto.` },
    ],
  },

  /* =====================================================
     ACTIVIDAD 4 · DESIGUALDADES E INECUACIONES
     ===================================================== */
  {
    id: "a4",
    num: 4,
    color: "#FF9F0A",
    color2: "#FFD60A",
    emoji: "⚖️",
    title: "Desigualdades e inecuaciones",
    subtitle: "Lineales y cuadráticas, con solución en intervalo",
    method: "Analogía de la balanza + tabla de signos",
    methodWhy: "Una desigualdad es una balanza inclinada: puedes hacer lo mismo en ambos lados y sigue inclinada igual... excepto cuando multiplicas por un negativo, que la voltea. Para las cuadráticas usamos la gráfica de la parábola: se ve la respuesta.",
    minutes: 45,
    intro: T`Resolver una inecuación es casi igual que resolver una ecuación, con <b>una sola diferencia</b> que tienes que tatuarte: si multiplicas o divides por un número <b>negativo</b>, el signo de la desigualdad <b>se voltea</b>. Y al final la respuesta no es un número, es un <b>intervalo</b>. ¡Por eso vimos intervalos antes!`,
    theory: [
      {
        title: "Propiedades de las desigualdades",
        icon: "⚖️",
        html: T`<div class="prop-grid">
<div class="prop"><span>Transitiva</span>Si $a<b$ y $b<c$ → $a<c$</div>
<div class="prop"><span>Sumar</span>Si $a<b$ → $a+c<b+c$</div>
<div class="prop"><span>Restar</span>Si $a<b$ → $a-c<b-c$</div>
<div class="prop"><span>Multiplicar por positivo</span>Si $a<b$, $c>0$ → $ac<bc$</div>
<div class="prop hot"><span>Multiplicar por NEGATIVO</span>Si $a<b$, $c<0$ → $ac>bc$ 🔄</div>
<div class="prop hot"><span>Dividir por NEGATIVO</span>Si $a<b$, $c<0$ → $\frac{a}{c}>\frac{b}{c}$ 🔄</div>
<div class="prop"><span>Inverso (mismo signo)</span>Si $a<b$ → $\frac{1}{a}>\frac{1}{b}$</div>
</div>
<div class="callout">🧪 ¿Por qué se voltea? $2<5$ es cierto. Multiplica por $-1$: $-2$ y $-5$. En la recta, $-2$ está a la derecha de $-5$, entonces $-2>-5$. ¡Se volteó! Pruébalo en la balanza del laboratorio.</div>`,
      },
      {
        title: "Inecuaciones lineales: receta",
        icon: "📝",
        html: T`<ol class="steps-list">
<li>Si hay fracciones, multiplica todo por el <b>m.c.m.</b> de los denominadores (es positivo, no voltea).</li>
<li>Pasa las $x$ a un lado y los números al otro.</li>
<li>Despeja $x$. Si divides entre negativo → <b>voltea el signo</b>.</li>
<li>Escribe la solución como <b>intervalo</b> y dibújala.</li>
<li><b>Comprueba</b> con un número del intervalo.</li>
</ol>`,
      },
      {
        title: "Inecuaciones cuadráticas: las 3 R",
        icon: "🎢",
        html: T`<p>Forma $ax^2+bx+c>0$ (o $<,\ge,\le$), con $a\ne0$.</p>
<ol class="steps-list">
<li><b>Reordena:</b> todo a un lado, cero al otro.</li>
<li><b>Raíces:</b> factoriza (o usa $x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}$) para hallar dónde vale cero.</li>
<li><b>Región:</b> si $a>0$ la parábola es una carita feliz 🙂: es <b>positiva afuera</b> de las raíces y <b>negativa entre</b> ellas.</li>
</ol>
$$x^2-7x+12=(x-3)(x-4)$$
<div class="callout">🙂 Con $a>0$: "$>0$" → afuera: $(-\infty,r_1)\cup(r_2,\infty)$. "$<0$" → entre: $(r_1,r_2)$. Con $\ge$ o $\le$ las raíces se incluyen (corchetes).</div>
<div class="callout">🧮 Para factorizar $x^2+bx+c$ busca dos números que <b>multiplicados</b> den $c$ y <b>sumados</b> den $b$.</div>`,
      },
    ],
    exercises: [
      { group: "Punto 1 · Inecuaciones lineales", id: "a4-1a", title: T`$21y-7\le y+5$`, viz: { a: null, b: 0.6, ac: false, bc: true },
        hint: "Pasa las y a la izquierda y los números a la derecha.",
        steps: [
          T`Restamos $y$ a ambos lados: $20y-7\le5$.`,
          T`Sumamos 7: $20y\le12$.`,
          T`Dividimos entre 20 (positivo, <b>no</b> se voltea): $y\le\frac{12}{20}=\frac{3}{5}$.`,
          T`Intervalo: $\left(-\infty,\frac{3}{5}\right]$. Comprobación con $y=0$: $-7\le5$ ✓`,
        ],
        answer: T`$\left(-\infty,\frac{3}{5}\right]$` },
      { group: "Punto 1 · Inecuaciones lineales", id: "a4-1b", title: T`$4x+1>15-2x$`, viz: { a: 7 / 3, b: null, ac: false, bc: false },
        hint: "Suma 2x a ambos lados.",
        steps: [
          T`Sumamos $2x$: $6x+1>15$.`,
          T`Restamos 1: $6x>14$.`,
          T`Dividimos entre 6: $x>\frac{14}{6}=\frac{7}{3}\approx2{,}33$.`,
          T`Intervalo: $\left(\frac{7}{3},\infty\right)$. Comprobación con $x=3$: $13>9$ ✓`,
        ],
        answer: T`$\left(\frac{7}{3},\infty\right)$` },
      { group: "Punto 1 · Inecuaciones lineales", id: "a4-1c", title: T`$\frac{2}{3}x+4\ge x+1$`, viz: { a: null, b: 9, ac: false, bc: true },
        hint: "Multiplica todo por 3 para quitar la fracción. ¡Ojo al final!",
        steps: [
          T`Multiplicamos todo por 3 (positivo): $2x+12\ge3x+3$.`,
          T`Restamos $3x$: $-x+12\ge3$. Restamos 12: $-x\ge-9$.`,
          T`Multiplicamos por $-1$ → 🔄 <b>se voltea el signo</b>: $x\le9$.`,
          T`Intervalo: $(-\infty,9]$. Comprobación con $x=0$: $4\ge1$ ✓; con $x=12$: $12\ge13$ ✗ (bien, 12 no está).`,
        ],
        answer: T`$(-\infty,9]$` },
      { group: "Punto 1 · Inecuaciones lineales", id: "a4-1d", title: T`$\frac{7x-1}{3}\ge\frac{x+2}{4}$`, viz: { a: 0.4, b: null, ac: true, bc: false },
        hint: "Multiplica ambos lados por 12 (m.c.m. de 3 y 4).",
        steps: [
          T`$\text{mcm}(3,4)=12$. Multiplicamos: $4(7x-1)\ge3(x+2)$.`,
          T`Distributiva: $28x-4\ge3x+6$.`,
          T`$28x-3x\ge6+4$ → $25x\ge10$.`,
          T`$x\ge\frac{10}{25}=\frac{2}{5}$. Intervalo: $\left[\frac{2}{5},\infty\right)$.`,
        ],
        answer: T`$\left[\frac{2}{5},\infty\right)$` },
      { group: "Punto 1 · Inecuaciones lineales", id: "a4-1e", title: T`$5x+2\ge-4x-23$`, viz: { a: -25 / 9, b: null, ac: true, bc: false },
        hint: "Suma 4x y resta 2.",
        steps: [
          T`Sumamos $4x$: $9x+2\ge-23$.`,
          T`Restamos 2: $9x\ge-25$.`,
          T`Dividimos entre 9 (positivo): $x\ge-\frac{25}{9}\approx-2{,}78$.`,
          T`Intervalo: $\left[-\frac{25}{9},\infty\right)$.`,
        ],
        answer: T`$\left[-\frac{25}{9},\infty\right)$` },
      { group: "Punto 2 · Inecuaciones cuadráticas", id: "a4-2a", title: T`$x^2-7x+12>0$`, parab: { a: 1, b: -7, c: 12, op: ">" },
        hint: "Dos números que multiplicados den 12 y sumados −7.",
        steps: [
          T`<b>Reordena:</b> ya está todo a un lado.`,
          T`<b>Raíces:</b> $-3\cdot-4=12$ y $-3+(-4)=-7$ → $(x-3)(x-4)>0$. Raíces: $x=3$ y $x=4$.`,
          T`<b>Región:</b> $a=1>0$, carita feliz. Queremos $>0$ (positivo) → <b>afuera</b> de las raíces.`,
          T`Solución: $(-\infty,3)\cup(4,\infty)$. Paréntesis porque es $>$ (las raíces dan 0, no sirven). Prueba: $x=0$ → $12>0$ ✓`,
        ],
        answer: T`$(-\infty,3)\cup(4,\infty)$` },
      { group: "Punto 2 · Inecuaciones cuadráticas", id: "a4-2b", title: T`$x^2-7x+12\le0$`, parab: { a: 1, b: -7, c: 12, op: "<=" },
        hint: "Misma parábola que la anterior, pero ahora la parte de abajo.",
        steps: [
          T`Misma factorización: $(x-3)(x-4)\le0$. Raíces 3 y 4.`,
          T`Queremos $\le0$ (negativo o cero) → <b>entre</b> las raíces, incluyéndolas.`,
          T`Solución: $[3,4]$. Prueba: $x=3{,}5$ → $12{,}25-24{,}5+12=-0{,}25\le0$ ✓`,
        ],
        answer: T`$[3,4]$` },
      { group: "Punto 2 · Inecuaciones cuadráticas", id: "a4-2c", title: T`$x^2+11x+18>0$`, parab: { a: 1, b: 11, c: 18, op: ">" },
        hint: "Dos números que multiplicados den 18 y sumados 11.",
        steps: [
          T`<b>Raíces:</b> $9\cdot2=18$ y $9+2=11$ → $(x+9)(x+2)>0$. Raíces: $x=-9$ y $x=-2$.`,
          T`<b>Región:</b> $a=1>0$ y queremos $>0$ → afuera de las raíces.`,
          T`Solución: $(-\infty,-9)\cup(-2,\infty)$. Prueba: $x=0$ → $18>0$ ✓; $x=-5$ → $25-55+18=-12$ ✗ (bien, no está).`,
        ],
        answer: T`$(-\infty,-9)\cup(-2,\infty)$` },
    ],
    labs: ["balanceLab", "parabolaLab"],
    quiz: [
      { q: T`Si $-2x>6$, entonces:`, options: [T`$x>-3$`, T`$x<-3$`, T`$x>3$`, T`$x<3$`], correct: 1, explain: T`Dividimos entre $-2$ (negativo) → se voltea: $x<-3$.` },
      { q: T`Solución de $3x-2\le7$:`, options: [T`$(-\infty,3]$`, T`$(-\infty,3)$`, T`$[3,\infty)$`, T`$\left(-\infty,\frac{5}{3}\right]$`], correct: 0, explain: T`$3x\le9$ → $x\le3$ → $(-\infty,3]$.` },
      { q: T`Solución de $x^2-9<0$:`, options: [T`$(-\infty,-3)\cup(3,\infty)$`, T`$(-3,3)$`, T`$[-3,3]$`, T`$(9,\infty)$`], correct: 1, explain: T`$(x-3)(x+3)<0$, carita feliz, negativo → entre las raíces: $(-3,3)$.` },
      { q: T`Si $a<b$, entonces $-3a\;\square\;-3b$:`, options: [T`$<$`, T`$>$`, T`$=$`, T`No se sabe`], correct: 1, explain: T`Multiplicar por $-3$ voltea la desigualdad: $-3a>-3b$.` },
    ],
  },

  /* =====================================================
     ACTIVIDAD 5 · TÉCNICAS DE CONTEO Y PROBABILIDAD
     ===================================================== */
  {
    id: "a5",
    num: 5,
    color: "#FF375F",
    color2: "#FF9F0A",
    emoji: "🎲",
    title: "Técnicas de conteo y probabilidad",
    subtitle: "Principio multiplicativo, permutaciones, combinaciones",
    method: "Árbol de preguntas + método de las casillas",
    methodWhy: "El problema nunca es la fórmula, es saber cuál usar. Por eso te enseño 3 preguntas que te dicen la fórmula, y a dibujar casillas para contar sin memorizar nada.",
    minutes: 45,
    intro: T`En conteo el secreto es hacerte <b>una pregunta mágica</b>: <b>"¿Si cambio el orden, obtengo algo diferente?"</b> Si la respuesta es sí, es <b>permutación</b>. Si es no, es <b>combinación</b>. Y si te pierdes, dibuja casillas y llénalas: ese método nunca falla.`,
    theory: [
      {
        title: "Factorial: n!",
        icon: "❗",
        html: T`$$n!=n\cdot(n-1)\cdot(n-2)\cdots2\cdot1$$
<p>$5!=5\cdot4\cdot3\cdot2\cdot1=120$. Por definición $0!=1$ y $1!=1$.</p>
<p>Truco para simplificar: $\frac{7!}{4!}=\frac{7\cdot6\cdot5\cdot\cancel{4!}}{\cancel{4!}}=210$.</p>
<div class="callout">📈 Crece rapidísimo: $7!=5040$, $10!=3\,628\,800$.</div>`,
      },
      {
        title: "Principio multiplicativo (casillas)",
        icon: "🔲",
        html: T`<p>Si una tarea tiene etapas y cada etapa se puede hacer de $n_1, n_2, \ldots$ formas, el total es:</p>
$$N=n_1\cdot n_2\cdots n_k$$
<p><b>Método de las casillas:</b> dibuja una rayita por cada posición y escribe cuántas opciones tiene cada una. Luego multiplica.</p>
<p>Ejemplo: placas con 2 letras y 1 dígito → $\underline{27}\cdot\underline{27}\cdot\underline{10}=7290$.</p>`,
      },
      {
        title: "Permutación vs combinación",
        icon: "🔀",
        html: T`<div class="prop-grid">
<div class="prop"><span>Permutación (todos)</span>$P(n)=n!$</div>
<div class="prop"><span>Permutación de r en n (orden importa)</span>$P(n,r)=\frac{n!}{(n-r)!}$</div>
<div class="prop"><span>Combinación (orden NO importa)</span>$C(n,r)=\binom{n}{r}=\frac{n!}{r!(n-r)!}$</div>
<div class="prop"><span>Permutación con repetición</span>$\frac{n!}{a!\,b!\cdots}$</div>
</div>
<p>🏆 <b>Podio</b> (1°, 2°, 3°): el orden importa → permutación. 👥 <b>Comité</b> de 3 personas: da igual el orden → combinación.</p>
<div class="callout">❓ <b>Pregunta mágica:</b> "Si cambio el orden, ¿obtengo algo diferente?" Ana-Beto-Caro en un podio ≠ Caro-Beto-Ana. Pero en un comité es el mismo comité.</div>
<div class="callout">🔁 Si hay elementos repetidos (como letras de una palabra), divide entre el factorial de cada repetición: "CASA" → $\frac{4!}{2!}=12$.</div>`,
      },
      {
        title: "Probabilidad clásica (Laplace)",
        icon: "🎯",
        html: T`$$P(A)=\frac{\text{casos favorables}}{\text{casos posibles}}$$
<p>Siempre está entre 0 (imposible) y 1 (seguro). Se puede dar en fracción, decimal o porcentaje.</p>
<p>Ejemplo: sacar un número par en un dado: $\frac{3}{6}=\frac{1}{2}=0{,}5=50\%$.</p>`,
      },
    ],
    exercises: [
      { group: "Ejercicios y problemas", id: "a5-1", title: "Números de 7 cifras con 3224531",
        hint: "Son 7 dígitos, pero el 3 y el 2 están repetidos.",
        steps: [
          T`Los dígitos son 3, 2, 2, 4, 5, 3, 1: son 7, pero el <b>3 aparece 2 veces</b> y el <b>2 aparece 2 veces</b>.`,
          T`Si todos fueran distintos serían $7!=5040$ ordenamientos.`,
          T`Pero intercambiar los dos 3 (o los dos 2) da el mismo número, así que dividimos: $\frac{7!}{2!\cdot2!}=\frac{5040}{4}$.`,
          T`$=1260$ números distintos.`,
        ],
        answer: T`$1260$` },
      { group: "Ejercicios y problemas", id: "a5-2", title: "Números de celular de Claro",
        hint: "Un celular en Colombia tiene 10 dígitos: 3 del prefijo + 7 libres.",
        steps: [
          T`Prefijos disponibles: 310, 311, 312, 313, 314, 320, 321, 322, 323, 324 → <b>10</b> prefijos.`,
          T`Un celular colombiano tiene 10 dígitos: después del prefijo quedan <b>7 casillas</b>, cada una con 10 opciones (0 a 9).`,
          T`Casillas: $\underline{10}\cdot\underline{10}\cdot\underline{10}\cdot\underline{10}\cdot\underline{10}\cdot\underline{10}\cdot\underline{10}\cdot\underline{10}$ (prefijo + 7 dígitos) $=10\cdot10^7$.`,
          T`$=100\,000\,000$ números (cien millones).`,
        ],
        answer: T`$10\cdot10^7=100\,000\,000$` },
      { group: "Ejercicios y problemas", id: "a5-3", title: "7 libros en 3 espacios",
        hint: "Al acomodar en espacios, ¿importa el orden?",
        steps: [
          T`Pregunta mágica: si cambio el orden de los libros en la repisa, ¿es una organización diferente? <b>Sí</b> → permutación de 3 en 7.`,
          T`Casillas: espacio 1 → 7 opciones, espacio 2 → 6, espacio 3 → 5.`,
          T`$P(7,3)=\frac{7!}{(7-3)!}=7\cdot6\cdot5=210$.`,
          T`💡 Si solo importara <b>cuáles</b> 3 libros se eligen (sin acomodarlos), sería $C(7,3)=35$.`,
        ],
        answer: T`$210$` },
      { group: "Ejercicios y problemas", id: "a5-4", title: "7 personas y 4 desayunos",
        hint: "Solo importa QUIÉNES se sientan, no en qué orden.",
        steps: [
          T`Nos preguntan <b>quiénes</b> se sientan: elegir a Ana, Beto, Caro y Dani es lo mismo en cualquier orden → <b>combinación</b>.`,
          T`$C(7,4)=\frac{7!}{4!\cdot3!}=\frac{7\cdot6\cdot5}{3\cdot2\cdot1}=\frac{210}{6}=35$.`,
          T`⚠️ Las opciones del taller (120, 48, 60, 24) no coinciden con 35. Si además importara en qué silla se sienta cada uno, sería $P(7,4)=840$, que tampoco aparece. Escribe 35 con tu procedimiento y pregúntale al profe: argumentar bien vale puntos.`,
        ],
        answer: T`$C(7,4)=35$` },
      { group: "Ejercicios y problemas", id: "a5-5", title: "Escoger 4 temas de 6",
        hint: "¿Importa el orden en que escoges los temas?",
        steps: [
          T`Escoger los temas {A, B, C, D} es lo mismo que {D, C, B, A} → <b>combinación</b>.`,
          T`$C(6,4)=\frac{6!}{4!\cdot2!}=\frac{6\cdot5}{2\cdot1}=15$.`,
        ],
        answer: T`$15$ selecciones` },
      { group: "Ejercicios y problemas", id: "a5-6", title: "Palabras consonante-vocal-consonante-vocal-consonante",
        hint: "Casillas C V C V C, sin repetir letras. El abecedario español tiene 27 letras: 5 vocales y 22 consonantes.",
        steps: [
          T`Abecedario español: 27 letras = <b>5 vocales</b> + <b>22 consonantes</b>.`,
          T`Casillas C V C V C sin repetir: consonantes $22,21,20$ y vocales $5,4$.`,
          T`$\underline{22}\cdot\underline{5}\cdot\underline{21}\cdot\underline{4}\cdot\underline{20}=184\,800$.`,
          T`💡 Si el profe usa el alfabeto de 26 letras (sin ñ, 21 consonantes): $21\cdot5\cdot20\cdot4\cdot19=159\,600$. Aclara cuál usas.`,
        ],
        answer: T`$184\,800$ palabras` },
      { group: "Selección múltiple", id: "a5-m1", title: "¿Cuándo usar permutaciones?",
        statement: T`a) Seleccionar 3 de 10 para un comité. b) Organizar libros de una estantería en un orden específico. c) Elegir 2 sabores de 8. d) Apretones de manos entre 15.`,
        steps: [
          T`Pregunta mágica en cada una: comité, sabores y apretones → el orden no importa (combinaciones).`,
          T`Organizar en un <b>orden específico</b> → el orden importa: permutación. Respuesta <b>b</b>.`,
        ],
        answer: "b" },
      { group: "Selección múltiple", id: "a5-m2", title: "7 personas en fila",
        statement: T`a) 120 b) 5040 c) 720 d) 35`,
        steps: [T`Ordenar a las 7 en fila: $7!=7\cdot6\cdot5\cdot4\cdot3\cdot2\cdot1=5040$.`, T`Que sean hombres, mujeres o niños no cambia nada: son 7 personas distintas. Respuesta <b>b</b>.`],
        answer: "b) 5040" },
      { group: "Selección múltiple", id: "a5-m3", title: "Probabilidad de elegir un niño",
        statement: T`30 estudiantes: 18 niñas y 12 niños. a) 0,6 b) 0,4 c) 0,5 d) 0,3`,
        steps: [T`Favorables: 12 niños. Posibles: 30 estudiantes.`, T`$P=\frac{12}{30}=\frac{2}{5}=0{,}4$. Respuesta <b>b</b>. (0,6 es la de niña, ¡distractor!)`],
        answer: "b) 0,4" },
      { group: "Selección múltiple", id: "a5-m4", title: "La letra A en MATEMATICAS",
        statement: T`a) 1/11 b) 3/11 c) 2/11 d) 4/11`,
        steps: [T`M-A-T-E-M-A-T-I-C-A-S tiene <b>11 letras</b> (casos posibles).`, T`La A aparece <b>3 veces</b> (favorables). $P=\frac{3}{11}$. Respuesta <b>b</b>.`],
        answer: T`b) $\frac{3}{11}$` },
      { group: "Selección múltiple", id: "a5-m5", title: "Números impares de 5 cifras distintas con 1,2,3,4,5",
        hint: "Empieza por la casilla con restricción: la última.",
        steps: [
          T`Regla de oro: <b>llena primero la casilla con restricción</b>. Para que sea impar, la última cifra debe ser 1, 3 o 5 → <b>3</b> opciones.`,
          T`Quedan 4 dígitos para las otras 4 casillas: $4\cdot3\cdot2\cdot1=4!=24$.`,
          T`Total: $24\cdot3=72$.`,
          T`Comprobación: en total hay $5!=120$ números; pares (terminan en 2 o 4) $2\cdot24=48$; impares $120-48=72$ ✓`,
        ],
        answer: T`$72$` },
    ],
    labs: ["countWizard", "countLab"],
    quiz: [
      { q: T`¿De cuántas formas se elige un comité de 3 entre 8 personas?`, options: [T`$336$`, T`$56$`, T`$24$`, T`$512$`], correct: 1, explain: T`Comité → no importa el orden: $C(8,3)=\frac{8\cdot7\cdot6}{3\cdot2\cdot1}=56$. 336 sería con orden.` },
      { q: T`¿De cuántas formas se reparten oro, plata y bronce entre 10 atletas?`, options: [T`$120$`, T`$30$`, T`$720$`, T`$1000$`], correct: 2, explain: T`Podio → importa el orden: $10\cdot9\cdot8=720$.` },
      { q: T`$\frac{6!}{4!}=$`, options: [T`$30$`, T`$2$`, T`$1{,}5$`, T`$24$`], correct: 0, explain: T`$\frac{6\cdot5\cdot4!}{4!}=6\cdot5=30$.` },
      { q: T`Probabilidad de sacar un número mayor que 4 en un dado:`, options: [T`$\frac{1}{6}$`, T`$\frac{1}{3}$`, T`$\frac{1}{2}$`, T`$\frac{2}{3}$`], correct: 1, explain: T`Favorables: 5 y 6 → 2. Posibles: 6. $\frac{2}{6}=\frac{1}{3}$.` },
    ],
  },
];

/* ===================== SIMULACRO FINAL ===================== */
window.SIMULACRO = [
  { m: "a1", q: T`$\frac{2}{3}+\frac{1}{4}=$`, options: [T`$\frac{3}{7}$`, T`$\frac{11}{12}$`, T`$\frac{3}{12}$`, T`$\frac{2}{12}$`], correct: 1, explain: T`$\frac{8}{12}+\frac{3}{12}=\frac{11}{12}$.` },
  { m: "a1", q: T`$0{,}272727\ldots$ como fracción es:`, options: [T`$\frac{27}{100}$`, T`$\frac{3}{11}$`, T`$\frac{27}{90}$`, T`$\frac{2}{7}$`], correct: 1, explain: T`Periódico puro: $\frac{27}{99}=\frac{3}{11}$.` },
  { m: "a1", q: T`$\frac{3}{4}\div\frac{9}{8}=$`, options: [T`$\frac{27}{32}$`, T`$\frac{2}{3}$`, T`$\frac{3}{2}$`, T`$\frac{12}{36}$`], correct: 1, explain: T`$\frac{3}{4}\cdot\frac{8}{9}=\frac{24}{36}=\frac{2}{3}$.` },
  { m: "a2", q: T`$3^4\cdot3^{-6}=$`, options: [T`$\frac{1}{9}$`, T`$-9$`, T`$3^{-24}$`, T`$9$`], correct: 0, explain: T`$3^{4-6}=3^{-2}=\frac{1}{9}$.` },
  { m: "a2", q: T`$\sqrt{48}=$`, options: [T`$16\sqrt{3}$`, T`$4\sqrt{3}$`, T`$3\sqrt{4}$`, T`$6\sqrt{2}$`], correct: 1, explain: T`$48=16\cdot3$ → $4\sqrt{3}$.` },
  { m: "a2", q: T`$27^{\frac{2}{3}}=$`, options: [T`$18$`, T`$9$`, T`$3$`, T`$\frac{54}{3}$`], correct: 1, explain: T`$\left(\sqrt[3]{27}\right)^2=3^2=9$.` },
  { m: "a3", q: T`$\{x\in\mathbb{R}/x<-1\}$ en intervalo:`, options: [T`$(-\infty,-1]$`, T`$(-1,\infty)$`, T`$(-\infty,-1)$`, T`$[-\infty,-1)$`], correct: 2, explain: T`Menor estricto → paréntesis; hacia la izquierda → $-\infty$.` },
  { m: "a3", q: T`$[-2,5)$ en conjunto:`, options: [T`$\{x/-2<x<5\}$`, T`$\{x/-2\le x<5\}$`, T`$\{x/-2\le x\le5\}$`, T`$\{x/-2<x\le5\}$`], correct: 1, explain: T`Corchete en $-2$ → $\le$; paréntesis en 5 → $<$.` },
  { m: "a4", q: T`Solución de $-3x+4>10$:`, options: [T`$x>-2$`, T`$x<-2$`, T`$x>2$`, T`$x<2$`], correct: 1, explain: T`$-3x>6$ → dividir entre $-3$ voltea: $x<-2$.` },
  { m: "a4", q: T`Solución de $x^2-5x+6<0$:`, options: [T`$(2,3)$`, T`$[2,3]$`, T`$(-\infty,2)\cup(3,\infty)$`, T`$(-3,-2)$`], correct: 0, explain: T`$(x-2)(x-3)<0$ → entre las raíces, abierto: $(2,3)$.` },
  { m: "a5", q: T`Anagramas de la palabra CASA:`, options: [T`$24$`, T`$12$`, T`$6$`, T`$4$`], correct: 1, explain: T`4 letras con la A repetida 2 veces: $\frac{4!}{2!}=12$.` },
  { m: "a5", q: T`Elegir 2 sabores de helado entre 5:`, options: [T`$20$`, T`$10$`, T`$25$`, T`$7$`], correct: 1, explain: T`Orden no importa: $C(5,2)=\frac{5\cdot4}{2}=10$.` },
  { m: "a5", q: T`Probabilidad de sacar un rey de una baraja de 52 cartas:`, options: [T`$\frac{1}{52}$`, T`$\frac{1}{13}$`, T`$\frac{1}{4}$`, T`$\frac{4}{13}$`], correct: 1, explain: T`Hay 4 reyes: $\frac{4}{52}=\frac{1}{13}$.` },
];

/* ===================== HOJA DE FÓRMULAS ===================== */
window.FORMULAS = [
  { title: "Fracciones", color: "#0A84FF", items: [
    T`$\frac{a}{b}+\frac{c}{d}=\frac{ad+bc}{bd}$`, T`$\frac{a}{b}\cdot\frac{c}{d}=\frac{ac}{bd}$`, T`$\frac{a}{b}\div\frac{c}{d}=\frac{ad}{bc}$`,
    T`PAPOMUDAS: ( ) → $x^n$ → $\times\div$ → $+-$`,
    T`Exacto: $0{,}75=\frac{75}{100}$`, T`Periódico puro: $0{,}\overline{ab}=\frac{ab}{99}$`, T`Mixto: $0{,}a\overline{b}=\frac{ab-a}{90}$` ] },
  { title: "Potencias y raíces", color: "#BF5AF2", items: [
    T`$a^m a^n=a^{m+n}$`, T`$\frac{a^m}{a^n}=a^{m-n}$`, T`$(a^m)^n=a^{mn}$`, T`$a^0=1$`, T`$a^{-n}=\frac{1}{a^n}$`,
    T`$a^{\frac{m}{n}}=\sqrt[n]{a^m}$`, T`$\sqrt[n]{ab}=\sqrt[n]{a}\sqrt[n]{b}$`, T`$\sqrt{75}=\sqrt{25\cdot3}=5\sqrt{3}$` ] },
  { title: "Intervalos", color: "#30D158", items: [
    T`$[\;]$ incluye ● · $(\;)$ no incluye ○`, T`$\infty$ siempre con $(\;)$`, T`$(a,b)=\{x/a<x<b\}$`, T`$[a,b]=\{x/a\le x\le b\}$`, T`$[a,\infty)=\{x/x\ge a\}$` ] },
  { title: "Inecuaciones", color: "#FF9F0A", items: [
    T`× o ÷ por negativo → 🔄 voltea el signo`, T`Lineal: despeja y escribe intervalo`,
    T`Cuadrática: Reordena · Raíces · Región`, T`$a>0$: $>0$ afuera · $<0$ entre`, T`$x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}$` ] },
  { title: "Conteo y probabilidad", color: "#FF375F", items: [
    T`$n!=n(n-1)\cdots1$, $0!=1$`, T`Multiplicativo: $n_1\cdot n_2\cdots$`, T`$P(n,r)=\frac{n!}{(n-r)!}$ (orden importa)`,
    T`$C(n,r)=\frac{n!}{r!(n-r)!}$ (orden no importa)`, T`Repetidos: $\frac{n!}{a!b!}$`, T`$P(A)=\frac{\text{favorables}}{\text{posibles}}$` ] },
];
