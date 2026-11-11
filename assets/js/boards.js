/* =========================================================
   PIZARRA · Operaciones escritas paso a paso
   window.BOARDS[idEjercicio][índiceDelPaso] = [líneas]
   Tipos de línea:
     "LaTeX"                       → se escribe en la pizarra
     "note:texto con $math$"       → nota a mano (letra tipo tiza)
     "mul:343|234"                 → multiplicación en columna (admite comas)
     "add:375|1200|750"            → suma en columna (admite comas)
     "sub:3000|2325"               → resta en columna (admite comas)
     "div:325|23|4"                → división larga (dividendo|divisor|decimales)
     "fact:75"                     → descomposición en factores primos
     "mcm:4,3"                     → m.c.m. por descomposición simultánea
     "sign:3|4|>"                  → tabla de signos de (x−r1)(x−r2)
     "slots:7,6,5|1º,2º,3º"        → método de las casillas
   Colores: \hl{} amarillo · \bl{} azul · \gr{} verde · \rd{} rojo
   Si un paso no tiene pizarra aquí, se arma sola con las fórmulas del paso.
   ========================================================= */
(() => {
const T = String.raw;
window.BOARDS = {
  /* ---------------- ACTIVIDAD 1 ---------------- */
  "a1-1a": {
    0: ["mcm:4,3"],
    1: [T`\frac{3}{4}=\frac{3\,\hl{\times3}}{4\,\hl{\times3}}=\frac{9}{12}`, "note:¿Por qué ×3? Porque 12 ÷ 4 = 3", T`\frac{4}{3}=\frac{4\,\hl{\times4}}{3\,\hl{\times4}}=\frac{16}{12}`, "note:¿Por qué ×4? Porque 12 ÷ 3 = 4"],
    2: [T`\frac{9}{12}+\frac{16}{12}=\frac{\hl{9+16}}{12}=\frac{25}{12}`, "note:El denominador NO se suma: se queda 12"],
    3: ["fact:25", "fact:12", "note:No comparten ningún primo → no se simplifica", "div:25|12|2"],
  },
  "a1-1b": {
    0: ["note:8 ya es múltiplo de 2 (2 × 4 = 8)", T`\text{mcm}(8,2)=8`],
    1: [T`\frac{9}{2}=\frac{9\,\hl{\times4}}{2\,\hl{\times4}}=\frac{36}{8}`, "note:8 ÷ 2 = 4"],
    2: [T`\frac{5}{8}-\frac{36}{8}=\frac{5-36}{8}`, "note:5 − 36: le quito más de lo que tengo → da negativo", T`36-5=31\;\Rightarrow\;5-36=\rd{-31}`, T`=\frac{-31}{8}`],
    3: ["div:31|8|3", T`-\frac{31}{8}=-3{,}875`],
  },
  "a1-1c": {
    0: [T`\frac{7}{6}\cdot\frac{4}{5}=\frac{\hl{7\cdot4}}{\bl{6\cdot5}}=\frac{28}{30}`, "note:Arriba por arriba, abajo por abajo"],
    1: [T`\frac{28\,\hl{\div2}}{30\,\hl{\div2}}=\frac{14}{15}`],
    2: ["mcm:15,3", T`\frac{2}{3}=\frac{2\,\hl{\times5}}{3\,\hl{\times5}}=\frac{10}{15}`],
    3: [T`\frac{14}{15}+\frac{10}{15}=\frac{14+10}{15}=\frac{24}{15}`, T`\frac{24\,\hl{\div3}}{15\,\hl{\div3}}=\frac{8}{5}`, "div:8|5|1"],
  },
  "a1-1d": {
    0: [T`\frac{9}{6}=\frac{9\,\hl{\div3}}{6\,\hl{\div3}}=\frac{3}{2}`],
    1: [T`\frac{3}{2}\div\frac{2}{7}`, "note:Conserva la 1ª · cambia ÷ por × · voltea la 2ª", T`\frac{3}{2}\,\hl{\times}\,\frac{\hl{7}}{\hl{2}}=\frac{3\cdot7}{2\cdot2}=\frac{21}{4}`],
    2: [T`5=\frac{5}{1}=\frac{5\,\hl{\times4}}{1\,\hl{\times4}}=\frac{20}{4}`],
    3: [T`\frac{21}{4}-\frac{20}{4}=\frac{21-20}{4}=\frac{1}{4}`, "div:1|4|2"],
  },
  "a1-1e": {
    0: [T`\frac{2}{5}+\hl{\frac{1}{3}\div\frac{3}{4}\times\frac{9}{3}}-5`, "note:Primero lo amarillo (÷ y ×), de izquierda a derecha"],
    1: [T`\frac{1}{3}\div\frac{3}{4}=\frac{1}{3}\times\frac{4}{3}=\frac{1\cdot4}{3\cdot3}=\frac{4}{9}`],
    2: [T`\frac{4}{9}\times\frac{9}{3}=\frac{4\cdot9}{9\cdot3}=\frac{36}{27}`, T`\frac{36\,\hl{\div9}}{27\,\hl{\div9}}=\frac{4}{3}`],
    3: [T`\frac{2}{5}+\frac{4}{3}-5`, "mcm:5,3"],
    4: [T`\frac{2\,\hl{\times3}}{5\,\hl{\times3}}+\frac{4\,\hl{\times5}}{3\,\hl{\times5}}-\frac{5\,\hl{\times15}}{1\,\hl{\times15}}`, T`=\frac{6}{15}+\frac{20}{15}-\frac{75}{15}`, T`=\frac{6+20-75}{15}=\frac{26-75}{15}=\frac{\rd{-49}}{15}`],
  },
  "a1-1f": {
    0: [T`\frac{3}{8}\times\frac{3}{4}=\frac{3\cdot3}{8\cdot4}=\frac{9}{32}\text{ h}`],
    1: [T`\frac{9}{32}\times60=\frac{9\times60}{32}=\frac{540}{32}`, "div:540|32|3"],
    2: ["mul:0,875|60", T`0{,}875\times60=52{,}5\text{ s}`],
  },
  "a1-2a": {
    0: [T`0{,}\underbrace{25}_{2\text{ cifras}}=\frac{25}{1\underbrace{00}_{2\text{ ceros}}}`],
    1: ["fact:25", "fact:100", T`\frac{25\,\hl{\div25}}{100\,\hl{\div25}}=\frac{1}{4}`],
  },
  "a1-2b": {
    0: [T`4{,}\underbrace{75}_{2}=\frac{475}{100}`, "note:2 decimales → denominador 100"],
    1: [T`\frac{475\,\hl{\div25}}{100\,\hl{\div25}}=\frac{19}{4}`, "div:19|4|2"],
  },
  "a1-2c": {
    0: [T`2{,}\underbrace{399}_{3}=\frac{2399}{1000}`, "note:3 decimales → 1000"],
    1: ["fact:1000", "note:2399 es impar (no se divide entre 2) y no termina en 0 ni 5 (no se divide entre 5)"],
  },
  "a1-2d": {
    0: [T`0{,}\underbrace{275275}_{6}=\frac{275275}{1\,000\,000}`, "note:6 decimales → 6 ceros"],
    1: ["div:275275|25|0", T`1\,000\,000\div25=40\,000`, T`\Rightarrow\frac{11011}{40000}`],
    2: [T`x=0{,}275275\ldots`, T`1000x=275{,}275275\ldots`, T`1000x-x=275`, T`999x=275\;\Rightarrow\;x=\frac{275}{999}`],
  },
  "a1-2e": {
    0: [T`0{,}\hl{39}\,\hl{39}\,\hl{39}\ldots=0{,}\overline{39}`],
    1: [T`\frac{39-0}{\hl{99}}`, "note:El período (39) tiene 2 cifras → dos nueves"],
    2: [T`\frac{39\,\hl{\div3}}{99\,\hl{\div3}}=\frac{13}{33}`],
    3: [T`x=0{,}3939\ldots`, T`100x=39{,}3939\ldots`, T`100x-x=39{,}3939\ldots-0{,}3939\ldots`, T`99x=39\;\Rightarrow\;x=\frac{39}{99}`],
  },
  "a1-2f": {
    0: [T`0{,}\overline{9}=\frac{9}{9}`],
    1: [T`\frac{9}{9}=1`],
    2: [T`\;\;10x=9{,}999\ldots`, T`-\;\;\;\;x=0{,}999\ldots`, T`\overline{\;\;\;9x=9\;\;\;}`, T`x=\frac{9}{9}=1`],
  },
  "a1-2g": {
    0: ["div:22|7|7"],
    1: [T`3{,}\hl{142857}\,\hl{142857}\ldots`, "note:Después de 6 cifras el residuo vuelve a ser 1 → se repite todo"],
    2: [T`3{,}\overline{142857}`],
  },
  "a1-2h": {
    0: [T`\frac{7\,\hl{\times25}}{4\,\hl{\times25}}=\frac{175}{100}`, "note:¿Por qué 25? Porque 4 × 25 = 100"],
    1: [T`\frac{175}{100}=1{,}75`, "note:Dividir entre 100 = correr la coma 2 lugares a la izquierda"],
  },
  "a1-3a": {
    0: ["mul:343|234"],
    1: [T`3{,}\underbrace{43}_{2}\qquad0{,}\underbrace{234}_{3}\qquad2+3=\hl{5}`],
    2: [T`80262\;\to\;0{,}\hl{80262}`, "note:Cuento 5 cifras desde la derecha y pongo la coma"],
  },
  "a1-3b": {
    0: [T`(\rd{-})\cdot(\gr{+})=\rd{-}`],
    1: ["mul:125|69", T`3+1=4\text{ decimales}\;\Rightarrow\;0{,}8625`],
  },
  "a1-3c": {
    0: [T`(\rd{-})\cdot(\gr{+})=\rd{-}`],
    1: ["div:10906|2|0", T`10{,}906\div2=5{,}453`],
    2: ["mul:10906|5", T`1+3=4\text{ decimales}\;\Rightarrow\;5{,}4530`],
  },
  "a1-3d": {
    0: [T`3{,}25\;\div\;0{,}23`, T`\downarrow\times100\qquad\downarrow\times100`, T`325\;\div\;23`],
    1: ["div:325|23|4"],
  },
  "a1-3e": {
    0: [T`(\rd{-})\div(\gr{+})=\rd{-}`],
    1: [T`0{,}146\;\div\;6{,}9`, T`\downarrow\times10\qquad\downarrow\times10`, T`1{,}46\;\div\;69`],
    2: ["note:1,46 ÷ 69 es lo mismo que 146 ÷ 6900", "div:146|6900|5"],
  },
  "a1-3f": {
    1: [T`(\rd{-})\cdot(\rd{-})=\gr{+}`, "mul:15|4", T`1+1=2\text{ decimales}\Rightarrow0{,}60`],
  },
  "a1-p1": {
    0: [T`\frac{1}{8}\times3000=\frac{3000}{8}`, "div:3000|8|0"],
    1: [T`\frac{2}{5}\times3000=\frac{2\times3000}{5}=\frac{6000}{5}`, "div:6000|5|0"],
    2: [T`\frac{1}{4}\times3000=\frac{3000}{4}`, "div:3000|4|0"],
    3: ["add:375|1200|750", "sub:3000|2325"],
    4: [T`\frac{675}{3000}`, "note:Divido arriba y abajo entre 75", T`\frac{675\,\hl{\div75}}{3000\,\hl{\div75}}=\frac{9}{40}`, T`\frac{1}{8}+\frac{2}{5}+\frac{1}{4}=\frac{5}{40}+\frac{16}{40}+\frac{10}{40}=\frac{31}{40}`, T`1-\frac{31}{40}=\frac{40-31}{40}=\frac{9}{40}\;\checkmark`],
  },
  "a1-p2": {
    0: [T`95\text{ cm}\div100=0{,}95\text{ m}`, "note:1 m = 100 cm → divido entre 100 (corro la coma 2 lugares)"],
    2: ["add:0,95|0,6235", T`1{,}97\;>\;1{,}5735`],
    3: ["sub:0,9500|0,6235"],
  },
  "a1-p3": {
    1: [T`8-5=3\text{ partes}=30\text{ km}`],
    2: [T`1\text{ parte}=30\div3=10\text{ km}`, T`\text{Total}=8\times10=80\text{ km}`],
    3: [T`\frac{5}{8}\times80=\frac{5\times80}{8}=\frac{400}{8}=50`, T`80-50=30\;\checkmark`],
  },
  "a1-p4": {
    0: [T`\frac{2}{5}\times150=\frac{2\times150}{5}=\frac{300}{5}=60`],
    1: [T`\frac{3}{5}\times150=\frac{450}{5}=90\;\;(\text{lo que sí recorrió})`, T`90+60=150\;\checkmark`],
  },

  /* ---------------- ACTIVIDAD 2 ---------------- */
  "a2-1a": {
    0: [T`\hl{2^5}\cdot\bl{3^4}\cdot\hl{2^{-2}}\cdot\bl{3^{-3}}`, T`=(\hl{2^5\cdot2^{-2}})\cdot(\bl{3^4\cdot3^{-3}})`],
    1: [T`2^{5+(-2)}=2^{5-2}=2^3`, T`3^{4+(-3)}=3^{4-3}=3^1`],
    2: [T`2^3=2\cdot2\cdot2=8`, T`8\cdot3=24`],
  },
  "a2-1b": {
    0: [T`4=2\cdot2=\hl{2^2}`, T`25=5\cdot5=\hl{5^2}`],
    1: [T`\frac{3^2\cdot2^2\cdot5^3}{2^{-2}\cdot(\rd{-}5^2)}=\rd{-}\frac{3^2\cdot2^2\cdot5^3}{2^{-2}\cdot5^2}`],
    2: [T`\frac{2^2}{2^{-2}}=2^{2-(-2)}=2^{2+2}=2^4`, T`\frac{5^3}{5^2}=5^{3-2}=5^1`],
    3: [T`3^2=9\qquad2^4=16\qquad5^1=5`, "mul:9|16", "mul:144|5", T`\Rightarrow\;\rd{-}720`],
  },
  "a2-1c": {
    0: [T`(3^3)^{-5}=3^{3\cdot(-5)}=3^{-15}`],
    1: [T`\frac{2^{-2}}{3^5}\cdot\frac{3^{-15}}{2^{-7}}=\frac{2^{-2}\cdot3^{-15}}{3^5\cdot2^{-7}}`],
    2: [T`\frac{2^{-2}}{2^{-7}}=2^{-2-(-7)}=2^{-2+7}=2^5`, T`\frac{3^{-15}}{3^5}=3^{-15-5}=3^{-20}`],
    3: [T`2^5\cdot3^{\hl{-20}}=\frac{2^5}{3^{\hl{20}}}`, T`2^5=2\cdot2\cdot2\cdot2\cdot2=32`],
  },
  "a2-1d": {
    0: [T`\left[\left(\tfrac{5}{4}\right)^5\right]^{-2}=\left(\tfrac{5}{4}\right)^{5\cdot(-2)}=\left(\tfrac{5}{4}\right)^{-10}`, T`\left(\tfrac{5}{4}\right)^{\hl{-10}}=\left(\tfrac{4}{5}\right)^{\hl{10}}`],
    1: [T`4^{10}=(2^2)^{10}=2^{20}`, T`\frac{5^4}{2^4}\cdot\frac{2^{20}}{5^{10}}`],
    2: [T`\frac{2^{20}}{2^4}=2^{20-4}=2^{16}`, T`\frac{5^4}{5^{10}}=5^{4-10}=5^{-6}=\frac{1}{5^6}`],
    3: [T`2^{16}=65536\qquad5^6=15625`, "div:65536|15625|2"],
  },
  "a2-1e": {
    0: [T`\frac{-50}{200}=-\frac{50\,\hl{\div50}}{200\,\hl{\div50}}=-\frac{1}{4}`],
    1: [T`\frac{x^8}{x^5}=x^{8-5}=x^3`, T`\frac{y^3}{y^9}=y^{3-9}=y^{-6}`, T`\frac{z^4}{z^2}=z^{4-2}=z^2`],
    2: [T`-\frac{1}{4}\cdot x^3\cdot\hl{y^{-6}}\cdot z^2=-\frac{x^3z^2}{4\hl{y^6}}`, "note:El exponente negativo baja al denominador y se vuelve positivo"],
  },
  "a2-1f": {
    0: [T`(x^2y^3)^4=x^{2\cdot4}\,y^{3\cdot4}=x^8y^{12}`, T`(xy^4)^{-3}=x^{1\cdot(-3)}\,y^{4\cdot(-3)}=x^{-3}y^{-12}`],
    1: [T`x^8\cdot x^{-3}=x^{8+(-3)}=x^5`, T`y^{12}\cdot y^{-12}=y^{12-12}=y^0=1`],
    2: [T`\frac{x^5}{x^2y}=\frac{x^{5-2}}{y}=\frac{x^3}{y}`],
  },
  "a2-1g": {
    0: ["fact:75", T`\sqrt{75}=\sqrt{\hl{5^2}\cdot3}=\hl{5}\sqrt{3}`, "fact:27", T`\sqrt{27}=\sqrt{\hl{3^2}\cdot3}=\hl{3}\sqrt{3}`],
    1: [T`2\sqrt3+5\sqrt3=(2+5)\sqrt3=7\sqrt3`],
    2: [T`\frac{7\cancel{\sqrt3}}{3\cancel{\sqrt3}}=\frac{7}{3}`],
  },
  "a2-1h": {
    0: [T`\sqrt{12}=\sqrt{\hl{4}\cdot3}=\hl{2}\sqrt3`, T`2\sqrt{12}=2\cdot2\sqrt3=4\sqrt3`],
    1: [T`\sqrt{75}=\sqrt{\hl{25}\cdot3}=\hl{5}\sqrt3`, T`3\sqrt{75}=3\cdot5\sqrt3=15\sqrt3`],
    2: [T`\sqrt{27}=\sqrt{\hl{9}\cdot3}=\hl{3}\sqrt3`],
    3: [T`(4-15+3)\sqrt3`, T`4-15=-11`, T`-11+3=-8`, T`\Rightarrow-8\sqrt3`],
  },
  "a2-1i": {
    0: [T`\frac{9}{3}=3\qquad\frac{x^9}{x^1}=x^{9-1}=x^8\qquad\frac{y^{13}}{y^2}=y^{13-2}=y^{11}`],
    1: [T`x^8=\underbrace{\hl{x^5}}_{\text{sale }x}\cdot x^3`, T`y^{11}=\underbrace{\hl{y^5}\cdot\hl{y^5}}_{\text{sale }y^2}\cdot y`],
    2: [T`\sqrt[5]{3\,\hl{x^5}x^3\,\hl{y^{10}}y}=\hl{x}\hl{y^2}\sqrt[5]{3x^3y}`],
  },
  "a2-1j": {
    0: [T`2^{7-3}=2^4\qquad3^{14-2}=3^{12}\qquad5^{10-2}=5^8`],
    1: [T`\sqrt[4]{2^4}=2^{4/4}=2^1`, T`\sqrt[4]{3^{12}}=3^{12/4}=3^3`, T`\sqrt[4]{5^8}=5^{8/4}=5^2`],
    2: [T`2\cdot3^3\cdot5^2=2\cdot27\cdot25`, T`2\cdot27=54`, "mul:54|25"],
  },
  "a2-p1": {
    0: ["fact:50", T`8\sqrt{50}=8\sqrt{\hl{25}\cdot2}=8\cdot\hl{5}\sqrt2=40\sqrt2`, T`40\times1{,}4142\approx56{,}57\text{ m}^2`],
    1: [T`\ell\cdot\ell=\ell^2=56{,}57`, T`\ell=\sqrt{56{,}57}\approx7{,}52\text{ m}`, "note:Compruebo: 7,52 × 7,52 ≈ 56,55 ✓"],
    2: [T`P=\ell+\ell+\ell+\ell=4\ell`, T`4\times7{,}52\approx30{,}08\text{ m}`],
    3: [T`2\text{ vueltas}=2\times4\ell=8\ell`, T`8\times7{,}521\approx60{,}17\text{ m}`],
  },
  "a2-p2": {
    0: [T`V=\text{largo}\times\text{ancho}\times\text{alto}`],
    1: [T`1\cdot4\cdot5=20`, T`18\cdot2\cdot12=36\cdot12=432`, T`x^{1+2+2}=x^5\qquad y^{2+1+2}=y^5`],
    2: ["fact:432", T`432=2^4\cdot3^3=\hl{2^3}\cdot\hl{3^3}\cdot2=\hl{6^3}\cdot2`],
    3: [T`\sqrt[3]{\hl{6^3}\cdot2\cdot\hl{x^3}x^2\cdot\hl{y^3}y^2}=\hl{6xy}\sqrt[3]{2x^2y^2}`],
    4: [T`20\cdot6xy=120xy`, T`V=120xy\sqrt[3]{2x^2y^2}`],
  },
  "a2-m1": {
    0: [T`4=2^2`, T`(2^3)^{-2}=2^{3\cdot(-2)}=2^{-6}`],
    1: [T`2^2\cdot2^{-6}=2^{2+(-6)}=2^{-4}=\frac{1}{2^4}`],
  },
  "a2-m2": {
    0: [T`(-4)(-4)=+16`, T`(+16)(-4)=-64`],
    1: [T`5\cdot5\cdot5=125\;\Rightarrow\;\sqrt[3]{125}=5`],
    2: [T`-64+5=-59`, "note:Signos distintos: resto (64 − 5 = 59) y dejo el signo del mayor (−)"],
  },

  /* ---------------- ACTIVIDAD 3 ---------------- */
  "a3-1a": { 1: [T`\hl{(}-4\;\to\;-4\,\hl{<}\,x`, T`7\hl{)}\;\to\;x\,\hl{<}\,7`, T`\{x\in\mathbb{R}\,/\,-4<x<7\}`] },
  "a3-1b": { 2: [T`\hl{[}-1{,}4\;\to\;-1{,}4\,\hl{\le}\,x`, T`8\hl{]}\;\to\;x\,\hl{\le}\,8`, T`\{x\in\mathbb{R}\,/\,-1{,}4\le x\le8\}`] },
  "a3-1c": { 1: [T`\hl{(}-2\;\to\;-2\,\hl{<}\,x`, T`8\hl{]}\;\to\;x\,\hl{\le}\,8`, T`\{x\in\mathbb{R}\,/\,-2<x\le8\}`] },
  "a3-1d": { 1: [T`\hl{[}3\;\to\;3\,\hl{\le}\,x`, T`7\hl{]}\;\to\;x\,\hl{\le}\,7`, T`\{x\in\mathbb{R}\,/\,3\le x\le7\}`] },
  "a3-1e": { 1: [T`-\infty\;\to\;\text{sin límite a la izquierda}`, T`8\hl{]}\;\to\;x\,\hl{\le}\,8`, T`\{x\in\mathbb{R}\,/\,x\le8\}`] },
  "a3-2a": { 1: [T`x\,\hl{>}\,3\;\to\;\hl{(}3`, T`\text{sin tope}\;\to\;\infty)`, T`(3,\infty)`] },
  "a3-2b": { 1: [T`x\,\hl{\ge}\,9\;\to\;\hl{[}9`, T`\text{sin tope}\;\to\;\infty)`, T`[9,\infty)`] },
  "a3-2c": { 1: [T`x\,\hl{\le}\,-2\;\to\;-2\hl{]}`, T`\text{sin piso}\;\to\;(-\infty`, T`(-\infty,-2]`] },
  "a3-2d": { 1: [T`-9\;<\;-5`, "note:−9 está más a la izquierda: no puede haber un x mayor que −5 y a la vez menor o igual que −9", T`\{x\in\mathbb{R}\,/\,-5<x\le-9\}=\varnothing`] },

  /* ---------------- ACTIVIDAD 4 ---------------- */
  "a4-1a": {
    0: [T`21y-7\le y+5`, T`21y\,\hl{-y}-7\le y\,\hl{-y}+5`, T`20y-7\le5`],
    1: [T`20y-7\,\hl{+7}\le5\,\hl{+7}`, T`20y\le12`],
    2: [T`\frac{20y}{\hl{20}}\le\frac{12}{\hl{20}}`, "note:20 es positivo → el signo NO cambia", T`y\le\frac{12\div4}{20\div4}=\frac{3}{5}`],
    3: [T`y=0:\;\;21(0)-7\le0+5`, T`-7\le5\;\checkmark`],
  },
  "a4-1b": {
    0: [T`4x\,\hl{+2x}+1>15-2x\,\hl{+2x}`, T`6x+1>15`],
    1: [T`6x+1\,\hl{-1}>15\,\hl{-1}`, T`6x>14`],
    2: [T`\frac{6x}{\hl{6}}>\frac{14}{\hl{6}}`, T`x>\frac{14\div2}{6\div2}=\frac{7}{3}`, "div:7|3|2"],
    3: [T`x=3:\;\;4(3)+1>15-2(3)`, T`12+1>15-6`, T`13>9\;\checkmark`],
  },
  "a4-1c": {
    0: [T`\hl{3}\cdot\frac{2}{3}x+\hl{3}\cdot4\ge\hl{3}\cdot x+\hl{3}\cdot1`, T`2x+12\ge3x+3`],
    1: [T`2x\,\hl{-3x}+12\ge3x\,\hl{-3x}+3`, T`-x+12\ge3`, T`-x+12\,\hl{-12}\ge3\,\hl{-12}`, T`-x\ge-9`],
    2: [T`(\rd{-1})(-x)\;\rd{\le}\;(\rd{-1})(-9)`, "note:¡Multiplico por un negativo → el ≥ se voltea a ≤!", T`x\le9`],
    3: [T`x=0:\;\;\tfrac{2}{3}(0)+4\ge0+1\;\to\;4\ge1\;\checkmark`, T`x=12:\;\;8+4\ge13\;\to\;12\ge13\;\rd{\text{no}}`],
  },
  "a4-1d": {
    0: [T`\hl{12}\cdot\frac{7x-1}{3}\ge\hl{12}\cdot\frac{x+2}{4}`, "note:12 ÷ 3 = 4 y 12 ÷ 4 = 3", T`4(7x-1)\ge3(x+2)`],
    1: [T`4\cdot7x-4\cdot1\ge3\cdot x+3\cdot2`, T`28x-4\ge3x+6`],
    2: [T`28x\,\hl{-3x}\ge6\,\hl{+4}`, T`25x\ge10`],
    3: [T`x\ge\frac{10}{25}=\frac{10\div5}{25\div5}=\frac{2}{5}`],
  },
  "a4-1e": {
    0: [T`5x\,\hl{+4x}+2\ge-4x\,\hl{+4x}-23`, T`9x+2\ge-23`],
    1: [T`9x+2\,\hl{-2}\ge-23\,\hl{-2}`, T`9x\ge-25`],
    2: [T`\frac{9x}{\hl{9}}\ge\frac{-25}{\hl{9}}`, T`x\ge-\frac{25}{9}`, "div:25|9|2"],
  },
  "a4-2a": {
    1: ["note:Busco dos números: multiplicados dan 12 y sumados dan −7", T`(-3)\cdot(-4)=12\;\checkmark\qquad(-3)+(-4)=-7\;\checkmark`, T`(x-3)(x-4)>0`, T`x-3=0\Rightarrow x=3\qquad x-4=0\Rightarrow x=4`],
    2: ["sign:3|4|>"],
    3: [T`x=0:\;\;0^2-7(0)+12=12>0\;\checkmark`],
  },
  "a4-2b": {
    1: ["sign:3|4|<="],
    2: [T`x=3{,}5:\;\;(3{,}5)^2-7(3{,}5)+12`, T`=12{,}25-24{,}5+12=-0{,}25\le0\;\checkmark`],
  },
  "a4-2c": {
    0: ["note:Busco dos números: multiplicados dan 18 y sumados dan 11", T`9\cdot2=18\;\checkmark\qquad9+2=11\;\checkmark`, T`(x+9)(x+2)>0`, T`x+9=0\Rightarrow x=-9\qquad x+2=0\Rightarrow x=-2`],
    1: ["sign:-9|-2|>"],
    2: [T`x=0:\;\;18>0\;\checkmark`, T`x=-5:\;\;25-55+18=-12\;\;\rd{\text{no}}`],
  },

  /* ---------------- ACTIVIDAD 5 ---------------- */
  "a5-1": {
    0: [T`3\;\;2\;\;2\;\;4\;\;5\;\;3\;\;1`, T`\hl{3}:\;2\text{ veces}\qquad\bl{2}:\;2\text{ veces}`],
    1: [T`7!=7\cdot6\cdot5\cdot4\cdot3\cdot2\cdot1`, T`7\cdot6=42\to42\cdot5=210\to210\cdot4=840`, T`840\cdot3=2520\to2520\cdot2=5040`],
    2: [T`\frac{7!}{2!\cdot2!}=\frac{5040}{2\cdot2}=\frac{5040}{4}`],
    3: ["div:5040|4|0"],
  },
  "a5-2": {
    0: ["note:310 · 311 · 312 · 313 · 314 · 320 · 321 · 322 · 323 · 324 → son 10"],
    1: ["slots:10,10,10,10,10,10,10,10|prefijo,1º,2º,3º,4º,5º,6º,7º"],
    3: [T`10\cdot10^7=10^{1+7}=10^8`, T`10^8=100\,000\,000`],
  },
  "a5-3": {
    1: ["slots:7,6,5|espacio 1,espacio 2,espacio 3"],
    2: [T`7\cdot6=42`, T`42\cdot5=210`],
    3: [T`C(7,3)=\frac{210}{3!}=\frac{210}{6}=35`],
  },
  "a5-4": {
    1: [T`C(7,4)=\frac{7!}{4!\cdot3!}`, T`=\frac{7\cdot6\cdot5\cdot\cancel{4!}}{\cancel{4!}\cdot3\cdot2\cdot1}`, T`=\frac{210}{6}=35`],
  },
  "a5-5": {
    1: [T`C(6,4)=\frac{6!}{4!\cdot2!}=\frac{6\cdot5\cdot\cancel{4!}}{\cancel{4!}\cdot2\cdot1}`, T`=\frac{30}{2}=15`],
  },
  "a5-6": {
    1: ["slots:22,5,21,4,20|C,V,C,V,C", "note:Cada vez que uso una letra, queda una menos"],
    2: [T`22\cdot5=110`, T`110\cdot21=2310`, T`2310\cdot4=9240`, T`9240\cdot20=184\,800`],
  },
  "a5-m2": { 0: [T`7!=7\cdot6\cdot5\cdot4\cdot3\cdot2\cdot1`, T`7\cdot6=42\to42\cdot5=210\to210\cdot4=840`, T`840\cdot3=2520\to2520\cdot2=5040`] },
  "a5-m3": { 1: [T`P=\frac{12}{30}=\frac{12\div6}{30\div6}=\frac{2}{5}`, "div:2|5|1"] },
  "a5-m4": {
    0: [T`M\;\hl{A}\;T\;E\;M\;\hl{A}\;T\;I\;C\;\hl{A}\;S`, T`11\text{ letras}\qquad3\text{ son }A`],
    1: [T`P(A)=\frac{\text{favorables}}{\text{posibles}}=\frac{3}{11}`],
  },
  "a5-m5": {
    0: ["slots:4,3,2,1,3|1ª,2ª,3ª,4ª,última (1, 3 o 5)", "note:Primero lleno la última casilla: solo 1, 3 o 5"],
    1: [T`4\cdot3\cdot2\cdot1=24`],
    2: [T`24\cdot3=72`],
    3: [T`5!=120\;\text{(todos)}`, T`2\cdot24=48\;\text{(pares)}`, T`120-48=72\;\checkmark`],
  },
};
})();
