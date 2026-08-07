gsap.registerPlugin(ScrollTrigger);

const video = document.getElementById("scroll-video");
const video2 = document.getElementById("scroll-video2");
const video3 = document.getElementById("scroll-video3");
const video4 = document.getElementById("scroll-video4");

function initTimeline() {
    // 1. Estados Iniciais - Tudo que vem de baixo nasce no yPercent: 100
    gsap.set(".secao5", { opacity: 0, yPercent: 30 });
    gsap.set(".secao7", { opacity: 1, yPercent: 120 });
    gsap.set(".secao8", {
        opacity: 1,
        yPercent: 100,
        backgroundColor: "#4a3c75",
    });
    gsap.set(".content-secao8", {
        yPercent: 40,
        opacity: 0,
    });
    gsap.set(".secao9", {
        yPercent: 100,
        opacity: 1,
    });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".containerPai",
            start: "top top",
            // Ajuste este valor se sobrar rolagem preta no fim.
            // Tente entre "+=12000" e "+=18000" até ficar perfeito:
            end: "+=15000",
            scrub: 1,
            pin: true,
            // markers: true, // Descomente para ajudar a ajustar o 'end' acima
        },
    });

    // =========================================================================
    // 1 a 5. ANIMAÇÕES INICIAIS (Hero, Vídeo 1, Seção 4)
    // =========================================================================
    tl.to(".secao1", { maskSize: "20vw", duration: 2 });
    tl.to(".LogoBg", { opacity: 0, duration: 0.5 }, "-=1.8");
    tl.to(".secBrac", { backgroundColor: "white", duration: 1 }, "-=1");

    tl.to(".secao1", { opacity: 0, duration: 1 });
    tl.from(
        ".secao2 img",
        { opacity: 0, filter: "blur(20px)", duration: 1 },
        "-=0.5",
    );

    tl.to(".secao2", { opacity: 0, duration: 1 });
    tl.from(
        "#scroll-video",
        { opacity: 0, filter: "blur(20px)", duration: 1 },
        "-=0.5",
    );

    tl.to(video, {
        currentTime: video.duration || 1,
        duration: 4,
        ease: "power2.inOut",
    });

    tl.to(
        "#scroll-video",
        {
            scale: 1.1,
            filter: "blur(15px)",
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
        },
        "-=0.5",
    );
    tl.to(
        ".secao4",
        { backgroundColor: "rgba(0, 0, 0, 0)", duration: 1, ease: "power1.in" },
        "<",
    );

    tl.fromTo(
        ".jason-content",
        { yPercent: 180, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 2, ease: "power1.out" },
        "-=1.5",
    );
    tl.fromTo(
        ".coluna-parallax",
        { yPercent: 450, opacity: 1 },
        { yPercent: 0, opacity: 1, duration: 2, ease: "power1.out" },
        "-=2",
    );

    tl.to(".coluna-parallax", { yPercent: -130, duration: 3, ease: "none" });
    tl.to(
        ".jason-content",
        { yPercent: -100, duration: 3, ease: "power1.inOut" },
        "<",
    );

    // =========================================================================
    // 6. TRANSIÇÃO: SAÍDA DA SEÇÃO 4 & ENTRADA DA SEÇÃO 5
    // =========================================================================
    tl.to(
        ".secao5",
        { yPercent: 0, opacity: 1, duration: 2, ease: "power2.inOut" },
        "<+=0.5",
    );

    tl.to(
        video2,
        {
            currentTime: video2.duration || 1,
            duration: 2,
            ease: "power2.inOut",
        },
        "<+=1",
    );

    tl.to(
        "#scroll-video2",
        {
            scale: 1.1,
            filter: "blur(15px)",
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
        },
        "<+=1",
    );
    // =========================================================================
    // 6. ENTRADA DA SEÇÃO 6 (LUCIA) - MAIS CURTA E DIRETA
    // =========================================================================
    // Reduzimos o yPercent de 180 para 100

    tl.fromTo(
        ".lucia-content",
        { yPercent: 100, opacity: 1 },
        { yPercent: 0, opacity: 1, duration: 2, ease: "none" },
        "<-=0.6",
    );

    // O GRANDE VILÃO: Reduzimos de yPercent: 350 para 150.
    // Isso diminui drasticamente a quantidade de scroll necessária.
    tl.fromTo(
        ".coluna-parallax2",
        { yPercent: 150, opacity: 1 },
        { yPercent: 0, opacity: 1, duration: 2, ease: "none" },
        "<",
    );

    // =========================================================================
    // 6. SAÍDA DA SEÇÃO 6 & ROLAGM NORMAL DA SEÇÃO 7
    // =========================================================================
    // Textos/Imagens da Seção 6 começam a subir para sair da tela
    tl.to(".coluna-parallax2", { yPercent: -100, duration: 2, ease: "none" });
    tl.to(".lucia-content", { yPercent: -100, duration: 2, ease: "none" }, "<");

    // O SIMBOLISMO DO "<": A Seção 7 sobe do chão (yPercent: 100 -> 0)
    // exatamente ao mesmo tempo em que a Seção 6 vai embora.
    tl.to(
        ".secao7",
        {
            yPercent: 0,
            duration: 2,
            ease: "none",
        },
        "<",
    );

    // O vídeo 3 rola conforme a Seção 7 já está fixada na tela
    tl.to(
        video3,
        {
            currentTime: video3.duration || 1,
            duration: 2,
            ease: "none",
        },
        "<",
    );
    // O SIMBOLISMO DO "<": A Seção 7 sobe do chão (yPercent: 100 -> 0)
    // exatamente ao mesmo tempo em que a Seção 6 vai embora.
    tl.to(".secao7", { yPercent: -100, duration: 1, ease: "none" });
    // =========================================================================
    // 8. TRANSIÇÃO: SAÍDA DA SEÇÃO 7 & ENTRADA DA SEÇÃO 8
    // =========================================================================

    // A Seção 8 entra parando no ZERO, revelando escala e gradiente ao mesmo tempo
    // label para sincronizar tudo
    tl.addLabel("secao8");

    tl.to(
        ".secao8",
        {
            yPercent: 0,
            duration: 1,
            ease: "none",
        },
        "<",
    );
    tl.to(".content-secao8", {
        opacity: 1,
        yPercent: 0,
        duration: 1,
        ease: "power2.out",
    });
    tl.to(
        video4,
        {
            currentTime: video4.duration || 1,
            duration: 2,
            ease: "none",
        },
        "<",
    );
    tl.to(
        ".secao8",
        {
            backgroundColor: "rgb(0, 0, 0)",
            yPercent: 0,
            duration: 2,
            ease: "none",
        },
        "<",
    );
    tl.to("#scroll-video4", { opacity: 0, duration: 1, ease: "power4.out" });

    // Entrada
    tl.to(".secao9", {
        yPercent: 0,
        duration: 0.5,
        ease: "power4.out",
    });

    // Não faça a saída ainda.
}

// =========================================================================
// SISTEMA DE CARREGAMENTO (Corrigido para aguardar os 4 vídeos)
// =========================================================================
// =========================================================================
// SISTEMA DE CARREGAMENTO À PROVA DE FALHAS
// =========================================================================
const videos = [
    document.getElementById("scroll-video"),
    document.getElementById("scroll-video2"),
    document.getElementById("scroll-video3"),
    document.getElementById("scroll-video4"),
].filter((vid) => vid !== null); // Filtra e ignora os vídeos que não existem no HTML

let videosLoaded = 0;
let timelineIniciada = false;

function checkVideosReady() {
    if (timelineIniciada) return; // Garante que a timeline não inicie duas vezes

    videosLoaded++;
    // Inicia se todos os vídeos encontrados na tela já carregaram
    if (videosLoaded >= videos.length) {
        timelineIniciada = true;
        initTimeline();
    }
}

// 1. Verifica se não tem vídeos na tela (inicia direto)
if (videos.length === 0) {
    timelineIniciada = true;
    initTimeline();
} else {
    // 2. Adiciona o listener para os vídeos que existem
    videos.forEach((vid) => {
        if (vid.readyState >= 1) {
            checkVideosReady();
        } else {
            vid.addEventListener("loadedmetadata", checkVideosReady);
            // Fallback extra caso o erro seja na rede
            vid.addEventListener("error", checkVideosReady);
        }
    });
}

// 3. FALLBACK DE SEGURANÇA MÁXIMA (Trava de 2 segundos)
// Se após 2 segundos a timeline ainda não iniciou, forçamos o início.
// Isso impede que o site fique travado sem scroll se algum vídeo falhar.
setTimeout(() => {
    if (!timelineIniciada) {
        console.warn("Forçando inicialização: vídeos demoraram muito.");
        timelineIniciada = true;
        initTimeline();
    }
}, 2000);
