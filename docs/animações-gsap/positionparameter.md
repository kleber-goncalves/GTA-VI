A ideia principal é:

Position Parameter do GSAP = "onde essa animação vai entrar na timeline?"

Imagine uma régua:

0s        1s        2s        3s        4s
|---------|---------|---------|---------|

Suponha:

tl.to(".A", {
    x: 500,
    duration: 2
});

A animação .A ocupa:

0s ─────────────── 2s
     SECTION A

Agora vamos colocar .B.

🟢 1. Sem posição
tl.to(".A", {
    x: 500,
    duration: 2
});

tl.to(".B", {
    x: 500,
    duration: 1
});

Por padrão, o GSAP coloca a segunda animação depois da primeira terminar.

0s             2s        3s
|--------------|---------|
      A             B

É equivalente a:

tl.to(".B", {...}, "+=0");
🟢 2. "+=1" → depois

Aqui você estava certo. 👍

tl.to(".A", {
    x: 500,
    duration: 2
});

tl.to(".B", {
    x: 500,
    duration: 1
}, "+=1");

Significa:

Espere 1 segundo depois do final da animação anterior.

Resultado:

0s             2s    3s        4s
|--------------|-----|---------|
      A              ↑
                     B
                  começa

Então:

"+=1"

= 1 segundo depois do final da timeline atual.

🔴 3. "-=1" → sobreposição

Aqui também você estava parcialmente certo.

tl.to(".A", {
    x: 500,
    duration: 2
});

tl.to(".B", {
    x: 500,
    duration: 1
}, "-=1");

Significa:

Comece .B 1 segundo antes do ponto final atual da timeline.

A:

0s ─────────────── 2s
       A

B:

          1s ───── 2s
                 B

Juntas:

0s        1s        2s
|---------|---------|
    A       █████
    █████████████
          B

Então sim:

"-=1"

faz uma sobreposição de 1 segundo.

🔵 4. Agora vem o <

Esse é o que costuma confundir.

tl.to(".A", {
    x: 500,
    duration: 2
});

tl.to(".B", {
    x: 500,
    duration: 1
}, "<");

O < significa:

Comece essa animação exatamente no mesmo momento em que começou a animação anterior.

Olha:

0s             2s
|--------------|
A

0s        1s
|---------|
B

As duas começam juntas:

0s        1s        2s
|---------|---------|
A █████████████████
B █████████
↑
mesmo início
Portanto:
"<"

= mesmo início da animação anterior.

🧠 E existe também "<+=..."

Aqui fica poderoso.

Você pode fazer:

"<+=0.5"

Significa:

Comece 0,5 segundo depois do início da animação anterior.

Exemplo:

tl.to(".A", {
    x: 500,
    duration: 2
});

tl.to(".B", {
    x: 500,
    duration: 1
}, "<+=0.5");

Resultado:

0s        0.5s              2s
|----------|-----------------|
A ███████████████████████████
B          ███████████
           ↑
        começa aqui
🔥 E "<-=0.5"?

É o contrário:

"<-=0.5"

Significa:

Comece 0,5 segundo antes do início da animação anterior.

Exemplo conceitual:

-0.5s       0s              2s
  |----------|---------------|
  B █████████
             A █████████████
             ↑
          início de A

Isso permite até começar uma animação antes da animação anterior.

⚠️ A diferença MAIS importante

Compare:

"-=0.5"

com:

"<+=0.5"

Eles não significam a mesma coisa.

-=0.5

Olha para o final da timeline atual:

A
|--------------------|
                     ↑
                  final

              B
              |------|
              ↑
         0.5 antes do final
<+=0.5

Olha para o início da animação anterior:

A
|--------------------|
↑
início

     B
     |------|
     ↑
  0.5 depois do início

Essa diferença é fundamental.

📊 Tabela para decorar
Código	Significado
undefined	Depois da animação anterior
"+=1"	1s depois do final atual
"-=1"	1s antes do final atual
"<"	Mesmo início da animação anterior
">"	Mesmo final da animação anterior
"<+=1"	1s depois do início da anterior
"<-=1"	1s antes do início da anterior
">+=1"	1s depois do final da anterior
">-=1"	1s antes do final da anterior
🎬 Aplicando ao seu projeto

Você tinha:

tlMobile.to(".secao4", {
    yPercent: -100,
    duration: 1.5,
});

tlMobile.to(
    ".secao5",
    {
        yPercent: 0,
        duration: 1.5,
    },
    "<+=0.45"
);

Agora podemos ler isso em português:

Primeira animação:
tlMobile.to(".secao4", ...)

A Section 4 começa.

0s ───────────────── 1.5s
|--------------------|
      SECTION 4
Segunda:
"<+=0.45"

Significa:

"Pegue o início da animação da Section 4 e avance 0,45s."

Então:

0s     0.45s             1.5s
|-------|-----------------|
Section 4
██████████████████████████

       Section 5
       ███████████████████

💡 É exatamente por isso que funcionou para o efeito que você queria.

🧩 Uma analogia para nunca esquecer

Imagine que cada animação é uma pessoa entrando numa fila.

"+="

📍 Olha para onde a fila terminou.

[A terminou] → +1s → [B começa]
"-="

📍 Volta a partir do final da fila.

[A ainda está acontecendo]
          ↑
       B começa
"<"

📍 Olha para onde a pessoa anterior entrou.

A entra
↑
B entra exatamente aqui
"<+=0.5"

📍 Olha onde A entrou e espera 0,5s.

A entra
│
│ 0.5s
↓
B entra
🧠 Regra de ouro

Pense assim:

+ / -  → FINAL da timeline atual

< / >  → REFERÊNCIA à animação anterior

E depois:

"+=X"  → avance X
"-=X"  → volte X

"<+ =X" → início anterior + X
"<- =X" → início anterior - X

">+ =X" → final anterior + X
">- =X" → final anterior - X

Só corrigindo a sua ideia inicial:

❌ "+= sempre significa depois que a outra animação terminar"

Não exatamente.

✅ += desloca o ponto de inserção para frente em relação à posição de referência.

❌ "-= sempre significa antes da outra animação terminar"

Também não exatamente.

✅ -= desloca o ponto de inserção para trás em relação à posição de referência.

Quando você não especifica < ou >, a referência normalmente é o fim atual da timeline. Já < e > mudam a referência para o início/fim da animação anterior.