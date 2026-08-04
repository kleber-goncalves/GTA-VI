gsap.registerPlugin(ScrollTrigger);

const video = document.getElementById("scroll-video");
const video2 = document.getElementById("scroll-video2");

function initTimeline() {
    // Esconde a Seção 5 no estado inicial para não sobrepor nada
    gsap.set(".secao5", { opacity: 0, yPercent: 30 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".containerPai",
            start: "top top",
            end: "+=20000",
            scrub: 1,
            markers: true,
            pin: true,
        },
    });

    // 1. Animação Hero (Seção 1)
    tl.to(".secao1", { maskSize: "20vw", duration: 2 });
    tl.to(".LogoBg", { opacity: 0, duration: 0.5 }, "-=1.8");
    tl.to(".secBrac", { backgroundColor: "white", duration: 1 }, "-=1");

    // 2. Transição Seção 1 -> Seção 2
    tl.to(".secao1", { opacity: 0, duration: 1 });
    tl.from(
        ".secao2 img",
        { opacity: 0, filter: "blur(20px)", duration: 1 },
        "-=0.5",
    );

    // 3. Transição Seção 2 -> Seção 3 (Vídeo 1)
    tl.to(".secao2", { opacity: 0, duration: 1 });
    tl.from(
        "#scroll-video",
        { opacity: 0, filter: "blur(20px)", duration: 1 },
        "-=0.5",
    );

    // 4. Execução do Vídeo 1 no Scroll
    tl.to(video, {
        currentTime: video.duration || 1,
        duration: 4,
        ease: "none",
    });

    // 5. TRANSIÇÃO: VÍDEO 1 SAINDO & SEÇÃO 4 ENTRANDO
    tl.to(
        "#scroll-video",
        {
            scale: 1.1,
            filter: "blur(15px)",
            opacity: 0,
            duration: 1,
            ease: "power1.in",
        },
        "-=0.5",
    );

    tl.to(
        ".secao4",
        {
            backgroundColor: "rgba(0, 0, 0, 0)",
            duration: 1,
            ease: "power1.in",
        },
        "<",
    );

    // Entrada das colunas da Seção 4
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

    // Movimento continuo de parallax na Seção 4
    tl.to(".coluna-parallax", {
        yPercent: -130,
        duration: 3,
        ease: "none",
    });
    tl.to(
        ".jason-content",
        { yPercent: -100, duration: 3, ease: "power1.inOut" },
        "<",
    );

    // =========================================================================
    // 6. TRANSIÇÃO: SAÍDA DA SEÇÃO 4 & ENTRADA DA SEÇÃO 5
    // =========================================================================

    // A) Saída dos elementos da Seção 4


    // B) Entrada da Seção 5 (Aparece subindo e com opacity gradual)
    tl.to(
        ".secao5 ",
        {
            yPercent: 0,
            opacity: 1,
            duration: 2,
            ease: "power2.InOut",
        },

        "<+=0.5",
    ); // Executa junto com a saída da Seção 4

    // C) Execução do Vídeo 2 no Scroll
    tl.to(
        video2,
        {
            currentTime: video2.duration || 1,
            duration: 5,
            ease: "power2.InOut",
        },
        "<+=1",
    );

    // D) Saída Final do Vídeo 2
    tl.to("#scroll-video2", {
        opacity: 0,
        duration: 1,
        ease: "power2.Inout",
    }, "<+=2");
    
    // Entrada das colunas da Seção 4
    tl.fromTo(
        ".lucia-content",
        { yPercent: 180, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 2, ease: "power1.out" },
        "<-=0.5",
    );

    tl.fromTo(
        ".coluna-parallax2",
        { yPercent: 350, opacity: 1 },
        { yPercent: 0, opacity: 1, duration: 2, ease: "power1.out" },
        "<+=-0.5",
    );

    // Movimento continuo de parallax na Seção 4
    tl.to(".coluna-parallax2", {
        yPercent: -100,
        duration: 2,
        ease: "none",
    }, "-=1.5");
    tl.to(
        ".lucia-content",
        { yPercent: -100, duration: 2, ease: "none" },
        "<",
    );

}

// Garantir carregamento dos metadados dos vídeos
let videosLoaded = 0;
function checkVideosReady() {
    videosLoaded++;
    if (videosLoaded >= 2) {
        initTimeline();
    }
}

if (video.readyState >= 1) checkVideosReady();
else video.addEventListener("loadedmetadata", checkVideosReady);

if (video2.readyState >= 1) checkVideosReady();
else video2.addEventListener("loadedmetadata", checkVideosReady);
