O ease é uma das partes mais importantes do GSAP porque ele controla como a animação percorre o caminho entre o início e o fim.

Pense assim:

gsap.to(".box", {
    x: 500,
    duration: 2,
    ease: "power2.out"
});

A caixa vai de x: 0 → x: 500 em 2 segundos.

O ease decide como ela distribui essa velocidade ao longo desses 2 segundos.

🧠 1. Sem ease
ease: "none"

É velocidade constante:

velocidade
   │
   │ ─────────────────────
   │
   └──────────────────────── tempo

Ela anda:

rápido → igual → igual → igual → igual

Exemplo:

ease: "none"

É excelente para:

🎥 progresso de vídeo
🌊 parallax
🔄 rotação contínua
movimentos que precisam acompanhar o scroll exatamente

Por isso você usa:

ease: "none"

em:

tlMobile.to(video3, {
    currentTime: () => video3.duration || 1,
    duration: 2,
    ease: "none"
});

Faz sentido: você geralmente não quer que o vídeo acelere artificialmente no começo ou desacelere no final.

🚀 2. power1, power2, power3, power4

Esses são alguns dos mais importantes para você.

power1

Movimento relativamente suave.

ease: "power1.out"

Visualmente:

████████████████
         ███████
              ███
                 █

Começa rápido e desacelera suavemente.

power2

Mais perceptível.

ease: "power2.out"
████████████
       █████
          ███
             ██
               █

É provavelmente um dos melhores "eases padrão" para interfaces.

Você está usando bastante:

ease: "power2.out"

E está correto para entradas de elementos.

power3

Mais agressivo.

ease: "power3.out"

O elemento começa muito rápido e desacelera bastante no final.

Pode dar uma sensação mais cinematográfica.

power4

Ainda mais extremo.

ease: "power4.out"

Ótimo quando você quer:

⚡ "ENTROU MUITO RÁPIDO E PAROU"

Mas se usar demais, pode parecer artificial.

🎯 3. O segredo está no .in, .out e .inOut

Essa parte é MUITO importante.

Você pode pensar:

.in     → acelera
.out    → desacelera
.inOut  → acelera + desacelera
🟢 ease: "power2.in"

Começa devagar e vai acelerando.

velocidade
   │
   │              █
   │           ███
   │        ███
   │     ███
   │  ███
   └──────────────── tempo

É como:

🚗

começa devagar → acelera → termina rápido

Bom para saída de elementos.

Exemplo:

tl.to(".secao4", {
    yPercent: -100,
    duration: 1.2,
    ease: "power2.in"
});
🔵 ease: "power2.out"

Começa rápido e termina devagar.

velocidade
   │ █████
   │      ████
   │          ███
   │             ██
   │               █
   └──────────────── tempo

É como:

🚗💨

começa rápido → vai desacelerando → para suavemente

Excelente para entrada.

Por exemplo:

tl.fromTo(".lucia-content",
    {
        yPercent: 70,
        opacity: 0
    },
    {
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power2.out"
    }
);
🟣 ease: "power2.inOut"

Esse é diferente.

Ele faz:

devagar
   ↓
acelera
   ↓
desacelera
   ↓
para

Visualmente:

velocidade
   │       █████
   │     ██     ██
   │   ██         ██
   │ ██             ██
   │█                 █
   └──────────────────── tempo

É ótimo para:

➡️ transições entre sections.

Por exemplo:

tlMobile.to(".secao4", {
    yPercent: -100,
    duration: 1.2,
    ease: "power2.inOut"
});

A section:

começa suave → movimenta → termina suave.

🔥 4. linear

Você também pode encontrar:

ease: "linear"

Na prática, para GSAP, normalmente você vai preferir:

ease: "none"

para movimento completamente linear.

💥 5. back

Agora começa a ficar interessante.

ease: "back.out"

O elemento passa um pouco do destino e volta.

Imagine:

         destino
            ↓
───────────●────────
          ↗
       passa
          ↘
           ●

Dá aquela sensação:

"cheguei... opa, passei um pouco... voltei."

Muito usado em:

botões
cards
modais
elementos UI

Exemplo:

gsap.from(".card", {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: "back.out"
});
🌀 6. elastic

Esse é ainda mais exagerado.

ease: "elastic.out"

O elemento parece preso a uma mola:

       ●
      ↗
     ↘
      ↗
       ↘
        ↗
         ●

Pode parecer:

🪀 mola / borracha

Excelente para efeitos divertidos.

Mas eu não usaria isso nas suas sections principais.

Pode deixar seu site com cara de animação exagerada.

🔨 7. bounce
ease: "bounce.out"

Parece uma bola quicando:

      ●
       \
        \
         ●
          \
           ●

Bom para:

notificações
elementos pequenos
UI divertida

Ruim para:

❌ transições cinematográficas de sections.

🎬 8. circ
ease: "circ.out"

Tem uma sensação mais suave e natural.

Pode ser interessante para:

imagens
máscaras
transições mais elegantes
🎥 9. expo
ease: "expo.out"

Esse é mais dramático.

Começa extremamente rápido e desacelera fortemente.

Sensação:

█████████████████
              ███
                 ██
                   █

É excelente para:

🎬 entrada cinematográfica.

Mas novamente:

use com moderação.

🧩 10. Agora vamos conectar isso ao SEU código

Você tem:

tlMobile.to(".secao4", {
    yPercent: -100,
    duration: 1.2,
    ease: "power2.inOut"
});

Isso significa:

SECTION 4

começa
  ↓
🐢
  ↓
🚗
  ↓
🚀
  ↓
🚗
  ↓
🐢
  ↓
termina

Ou seja:

acelera no meio e desacelera no final.

Agora veja:

tlMobile.to(".secao6", {
    yPercent: 0,
    duration: 1.5,
    ease: "power1.out"
});

Aqui:

SECTION 6

🚀 ────────→ 🚗 → 🐢

Ela entra rapidamente e vai desacelerando.

E quando você usa:

tlMobile.to(".coluna-parallax2", {
    yPercent: -25,
    duration: 1.2,
    ease: "none"
});

É:

🚗 → → → → → → → → 🚗

Velocidade constante.

Isso combina muito bem com parallax.

⚠️ 11. Uma coisa MUITO importante no seu projeto

Você está usando:

scrub: 1

Isso muda bastante a interpretação do ease.

Seu timeline está ligado ao scroll:

scrollTrigger: {
    scrub: 1
}

Então você não está simplesmente fazendo:

"anime durante 1,2 segundos".

Você está fazendo:

"essa animação ocupa uma determinada distância dentro do scroll".

O duration define quanto espaço da timeline aquela animação ocupa.

E o ease define como o movimento acontece dentro desse espaço.

Por isso você pode ter:

duration: 2,
ease: "power2.out"

e o usuário ainda pode levar vários segundos reais para percorrer aquilo dependendo do scroll.

🧠 Uma regra prática para o seu projeto

Eu usaria aproximadamente:

Situação	Ease
🎥 Vídeo seguindo scroll	none
🌊 Parallax	none
📥 Elemento entrando	power2.out
📤 Elemento saindo	power2.in
🔄 Section entrando/saindo	power2.inOut
🎬 Entrada cinematográfica	power3.out
⚡ Entrada muito rápida	expo.out
🪀 Pequeno efeito elástico	back.out
🏀 Quicar	bounce.out
E uma regra que vale ouro:
MOVIMENTO CONTROLADO PELO SCROLL
            ↓
        ease: none
ENTRADA DE ELEMENTO
            ↓
      power2.out
SAÍDA DE ELEMENTO
            ↓
      power2.in
TRANSIÇÃO ENTRE SECTIONS
            ↓
      power2.inOut

Isso já cobre a maior parte das animações que você está construindo.