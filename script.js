gsap.registerPlugin(ScrollTrigger);

const video = document.getElementById("scroll-video");
const video2 = document.getElementById("scroll-video2");
const video3 = document.getElementById("scroll-video3");
const video4 = document.getElementById("scroll-video4");

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
).matches;

// ============================================================================
// MATCHMEDIA DO GSAP
// ============================================================================
const mm = gsap.matchMedia();

// ============================================================================
// FUNÇÃO PARA CRIAR A TIMELINE DESKTOP
// ============================================================================
function createDesktopTimeline() {
    // ========================================================================
    // ESTADOS INICIAIS
    // ========================================================================

    gsap.set(".secao5", {
        opacity: 0,
        yPercent: 30,
    });

    gsap.set(".secao7", {
        opacity: 1,
        yPercent: 120,
    });

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

    // ========================================================================
    // TIMELINE PRINCIPAL
    // ========================================================================

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".containerPai",

            start: "top top",

            end: "+=15000",

            scrub: 1,

            pin: true,

            // markers: true,
        },
    });

    // ========================================================================
    // 1 — HERO
    // ========================================================================

    tl.to(".secao1", {
        maskSize: "20vw",
        duration: 2,
    });

    tl.to(
        ".LogoBg",
        {
            opacity: 0,
            duration: 0.5,
        },
        "-=1.8",
    );

    tl.to(
        ".secBrac",
        {
            backgroundColor: "white",
            duration: 1,
        },
        "-=1",
    );

    // ========================================================================
    // 2 — SAÍDA HERO
    // ========================================================================

    tl.to(".secao1", {
        opacity: 0,
        duration: 1,
    });

    // ========================================================================
    // 3 — LOGO
    // ========================================================================

    tl.from(
        ".secao2 img",
        {
            opacity: 0,
            filter: "blur(20px)",
            duration: 1,
        },
        "-=0.5",
    );

    tl.to(".secao2", {
        opacity: 0,
        duration: 1,
    });

    // ========================================================================
    // 4 — VÍDEO 1
    // ========================================================================

    tl.from(
        "#scroll-video",
        {
            opacity: 0,
            filter: "blur(20px)",
            duration: 1,
        },
        "-=0.5",
    );

    if (video) {
        tl.to(video, {
            currentTime: video.duration || 1,
            duration: 4,
            ease: "power2.inOut",
        });
    }

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

    // ========================================================================
    // 5 — JASON
    // ========================================================================

    tl.to(
        ".secao4",
        {
            backgroundColor: "rgba(0, 0, 0, 0)",
            duration: 1,
            ease: "power1.in",
        },
        "<",
    );

    tl.fromTo(
        ".jason-content",
        {
            yPercent: 180,
            opacity: 0,
        },
        {
            yPercent: 0,
            opacity: 1,
            duration: 2,
            ease: "power1.out",
        },
        "-=1.5",
    );

    tl.fromTo(
        ".coluna-parallax",
        {
            yPercent: 450,
            opacity: 1,
        },
        {
            yPercent: 0,
            opacity: 1,
            duration: 2,
            ease: "power1.out",
        },
        "-=2",
    );

    // ========================================================================
    // PARALLAX JASON
    // ========================================================================

    tl.to(".coluna-parallax", {
        yPercent: -130,
        duration: 3,
        ease: "none",
    });

    tl.to(
        ".jason-content",
        {
            yPercent: -100,
            duration: 3,
            ease: "power1.inOut",
        },
        "<",
    );

    // ========================================================================
    // 6 — VÍDEO 2
    // ========================================================================

    tl.to(
        ".secao5",
        {
            yPercent: 0,
            opacity: 1,
            duration: 2,
            ease: "power2.inOut",
        },
        "<+=0.5",
    );

    if (video2) {
        tl.to(
            video2,
            {
                currentTime: video2.duration || 1,
                duration: 2,
                ease: "power2.inOut",
            },
            "<+=1",
        );
    }

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

    // ========================================================================
    // 7 — LUCIA
    // ========================================================================

    tl.fromTo(
        ".lucia-content",
        {
            yPercent: 100,
            opacity: 1,
        },
        {
            yPercent: 0,
            opacity: 1,
            duration: 2,
            ease: "none",
        },
        "<-=0.6",
    );

    tl.fromTo(
        ".coluna-parallax2",
        {
            yPercent: 150,
            opacity: 1,
        },
        {
            yPercent: 0,
            opacity: 1,
            duration: 2,
            ease: "none",
        },
        "<",
    );

    // ========================================================================
    // SAÍDA LUCIA
    // ========================================================================

    tl.to(".coluna-parallax2", {
        yPercent: -100,
        duration: 2,
        ease: "none",
    });

    tl.to(
        ".lucia-content",
        {
            yPercent: -100,
            duration: 2,
            ease: "none",
        },
        "<",
    );

    // ========================================================================
    // 8 — SEÇÃO 7
    // ========================================================================

    tl.to(
        ".secao7",
        {
            yPercent: 0,
            duration: 2,
            ease: "none",
        },
        "<",
    );

    if (video3) {
        tl.to(
            video3,
            {
                currentTime: video3.duration || 1,
                duration: 2,
                ease: "none",
            },
            "<",
        );
    }

    tl.to(".secao7", {
        yPercent: -100,
        duration: 1,
        ease: "none",
    });

    // ========================================================================
    // 9 — SEÇÃO 8
    // ========================================================================

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

    if (video4) {
        tl.to(
            video4,
            {
                currentTime: video4.duration || 1,
                duration: 2,
                ease: "none",
            },
            "<",
        );
    }

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

    tl.to("#scroll-video4", {
        opacity: 0,
        duration: 1,
        ease: "power4.out",
    });

    // ========================================================================
    // 10 — ENTRADA SEÇÃO 9
    // ========================================================================

    tl.to(".secao9", {
        yPercent: 0,
        duration: 0.5,
        ease: "power4.out",
    });

    return tl;
}

// ============================================================================
// TIMELINE MOBILE / TABLET
// ============================================================================

function createMobileTimeline() {
    // ========================================================================
    // ESTADOS INICIAIS
    // ========================================================================

    gsap.set(".secao5", {
        opacity: 0,
        yPercent: 15,
    });

    gsap.set(".secao7", {
        opacity: 1,
        yPercent: 100,
    });

    gsap.set(".secao8", {
        opacity: 1,
        yPercent: 100,
        backgroundColor: "#4a3c75",
    });

    gsap.set(".content-secao8", {
        yPercent: 20,
        opacity: 0,
    });

    gsap.set(".secao9", {
        yPercent: 100,
        opacity: 1,
    });

    // ========================================================================
    // TIMELINE MOBILE
    // ========================================================================

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".containerPai",

            start: "top top",

            end: "+=9000",

            scrub: 0.8,

            pin: true,

            // markers: true,
        },
    });

    // ========================================================================
    // HERO
    // ========================================================================

    tl.to(".secao1", {
        maskSize: "45vw",
        duration: 2,
    });

    tl.to(
        ".LogoBg",
        {
            opacity: 0,
            duration: 0.5,
        },
        "-=1.5",
    );

    tl.to(".secao1", {
        opacity: 0,
        duration: 0.8,
    });

    // ========================================================================
    // LOGO
    // ========================================================================

    tl.from(
        ".secao2 img",
        {
            opacity: 0,
            filter: "blur(10px)",
            duration: 0.8,
        },
        "-=0.3",
    );

    tl.to(".secao2", {
        opacity: 0,
        duration: 0.8,
    });

    // ========================================================================
    // VÍDEO 1
    // ========================================================================

    tl.from(
        "#scroll-video",
        {
            opacity: 0,
            duration: 0.8,
        },
        "-=0.3",
    );

    if (video) {
        tl.to(video, {
            currentTime: video.duration || 1,
            duration: 3,
            ease: "none",
        });
    }

    tl.to("#scroll-video", {
        opacity: 0,
        scale: 1.03,
        duration: 0.6,
        ease: "power1.out",
    });

    // ========================================================================
    // JASON — MAIS LEVE
    // ========================================================================

    tl.fromTo(
        ".jason-content",
        {
            yPercent: 50,
            opacity: 0,
        },
        {
            yPercent: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
        },
    );

    tl.fromTo(
        ".coluna-parallax",
        {
            yPercent: 80,
            opacity: 0,
        },
        {
            yPercent: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
        },
        "<",
    );

    // ========================================================================
    // SAÍDA JASON
    // ========================================================================

    tl.to(".jason-content", {
        yPercent: -50,
        opacity: 0,
        duration: 1.5,
    });

    tl.to(
        ".coluna-parallax",
        {
            yPercent: -50,
            opacity: 0,
            duration: 1.5,
        },
        "<",
    );

    // ========================================================================
    // VÍDEO 2
    // ========================================================================

    tl.to(".secao5", {
        yPercent: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
    });

    if (video2) {
        tl.to(video2, {
            currentTime: video2.duration || 1,
            duration: 2,
            ease: "none",
        });
    }

    tl.to("#scroll-video2", {
        opacity: 0,
        duration: 0.5,
    });

    // ========================================================================
    // LUCIA
    // ========================================================================

    tl.fromTo(
        ".lucia-content",
        {
            yPercent: 50,
            opacity: 0,
        },
        {
            yPercent: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
        },
    );

    tl.fromTo(
        ".coluna-parallax2",
        {
            yPercent: 70,
            opacity: 0,
        },
        {
            yPercent: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
        },
        "<",
    );

    // ========================================================================
    // SAÍDA LUCIA
    // ========================================================================

    tl.to(".lucia-content", {
        yPercent: -50,
        opacity: 0,
        duration: 1.5,
    });

    tl.to(
        ".coluna-parallax2",
        {
            yPercent: -50,
            opacity: 0,
            duration: 1.5,
        },
        "<",
    );

    // ========================================================================
    // SEÇÃO 7
    // ========================================================================

    tl.to(".secao7", {
        yPercent: 0,
        duration: 1.5,
        ease: "none",
    });

    if (video3) {
        tl.to(
            video3,
            {
                currentTime: video3.duration || 1,
                duration: 2,
                ease: "none",
            },
            "<",
        );
    }

    tl.to(".secao7", {
        yPercent: -100,
        duration: 1,
    });

    // ========================================================================
    // SEÇÃO 8
    // ========================================================================

    tl.to(".secao8", {
        yPercent: 0,
        duration: 1,
        ease: "none",
    });

    tl.to(".content-secao8", {
        opacity: 1,
        yPercent: 0,
        duration: 1,
        ease: "power2.out",
    });

    if (video4) {
        tl.to(
            video4,
            {
                currentTime: video4.duration || 1,
                duration: 2,
                ease: "none",
            },
            "<",
        );
    }

    tl.to("#scroll-video4", {
        opacity: 0,
        duration: 0.8,
    });

    // ========================================================================
    // SEÇÃO 9
    // ========================================================================

    tl.to(".secao9", {
        yPercent: 0,
        duration: 1,
        ease: "power3.out",
    });

    return tl;
}

// ============================================================================
// REDUCED MOTION
// ============================================================================

if (reduceMotion) {
    gsap.set(".secao1", {
        opacity: 0,
    });

    gsap.set(".secao2", {
        opacity: 0,
    });

    gsap.set(".secao5", {
        opacity: 1,
        yPercent: 0,
    });

    gsap.set(".secao7", {
        yPercent: 0,
    });

    gsap.set(".secao8", {
        yPercent: 0,
        opacity: 1,
        backgroundColor: "#000",
    });

    gsap.set(".content-secao8", {
        yPercent: 0,
        opacity: 1,
    });

    gsap.set(".secao9", {
        yPercent: 0,
        opacity: 1,
    });
}

// ============================================================================
// GSAP MATCHMEDIA
// ============================================================================
else {
    // ========================================================================
    // DESKTOP
    // ========================================================================

    mm.add("(min-width: 1025px)", () => {
        const timeline = createDesktopTimeline();

        return () => {
            timeline.kill();
        };
    });

    // ========================================================================
    // TABLET + MOBILE
    // ========================================================================

    mm.add("(max-width: 1024px)", () => {
        const timeline = createMobileTimeline();

        return () => {
            timeline.kill();
        };
    });
}

// ============================================================================
// SISTEMA DE CARREGAMENTO DOS VÍDEOS
// ============================================================================

const videos = [video, video2, video3, video4].filter((vid) => vid !== null);

let videosLoaded = 0;
let timelineIniciada = false;

function checkVideosReady() {
    if (timelineIniciada) {
        return;
    }

    videosLoaded++;

    if (videosLoaded >= videos.length) {
        timelineIniciada = true;

        ScrollTrigger.refresh();
    }
}

// ============================================================================
// VERIFICAÇÃO DOS VÍDEOS
// ============================================================================

if (videos.length === 0) {
    timelineIniciada = true;

    ScrollTrigger.refresh();
} else {
    videos.forEach((vid) => {
        if (vid.readyState >= 1) {
            checkVideosReady();
        } else {
            vid.addEventListener("loadedmetadata", checkVideosReady, {
                once: true,
            });

            vid.addEventListener("error", checkVideosReady, { once: true });
        }
    });
}

// ============================================================================
// FALLBACK
// ============================================================================

setTimeout(() => {
    if (!timelineIniciada) {
        console.warn(
            "Forçando atualização do ScrollTrigger: vídeos demoraram muito.",
        );

        timelineIniciada = true;

        ScrollTrigger.refresh();
    }
}, 2000);
