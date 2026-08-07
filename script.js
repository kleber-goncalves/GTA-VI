gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
).matches;

const video = document.getElementById("scroll-video");
const video2 = document.getElementById("scroll-video2");
const video3 = document.getElementById("scroll-video3");
const video4 = document.getElementById("scroll-video4");

// ============================================================================
// FUNÇÃO AUXILIAR
// ============================================================================

function animateMobileElement(element, vars, scrollVars = {}) {
    if (!element) return;

    gsap.fromTo(
        element,
        {
            opacity: 0,
            y: 40,
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none reverse",
                ...scrollVars,
            },
            ...vars,
        },
    );
}

// ============================================================================
// DESKTOP
// ============================================================================

mm.add("(min-width: 1025px)", () => {
    if (reduceMotion) {
        gsap.set(
            [
                ".secao1",
                ".secao2",
                ".secao4",
                ".secao5",
                ".secao6",
                ".secao7",
                ".secao8",
                ".secao9",
            ],
            {
                clearProps: "all",
            },
        );

        return;
    }

    // ------------------------------------------------------------------------
    // ESTADOS INICIAIS
    // ------------------------------------------------------------------------

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

    // ------------------------------------------------------------------------
    // TIMELINE PRINCIPAL
    // ------------------------------------------------------------------------

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".containerPai",
            start: "top top",
            end: "+=15000",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
        },
    });

    // ========================================================================
    // SECTION 1
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

    tl.to(".secao1", {
        opacity: 0,
        duration: 1,
    });

    // ========================================================================
    // SECTION 2
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
    // VIDEO 1
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

    tl.to(video, {
        currentTime: video?.duration || 1,
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

    // ========================================================================
    // SECTION 4 - JASON
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
    // SECTION 5
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

    tl.to(
        video2,
        {
            currentTime: video2?.duration || 1,
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

    // ========================================================================
    // SECTION 6 - LUCIA
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
    // SECTION 7
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

    tl.to(
        video3,
        {
            currentTime: video3?.duration || 1,
            duration: 2,
            ease: "none",
        },
        "<",
    );

    tl.to(".secao7", {
        yPercent: -100,
        duration: 1,
        ease: "none",
    });

    // ========================================================================
    // SECTION 8
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

    tl.to(
        video4,
        {
            currentTime: video4?.duration || 1,
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

    tl.to("#scroll-video4", {
        opacity: 0,
        duration: 1,
        ease: "power4.out",
    });

    // ========================================================================
    // SECTION 9
    // ========================================================================

    tl.to(".secao9", {
        yPercent: 0,
        duration: 0.8,
        ease: "power4.out",
    });

    return () => {
        tl.kill();
    };
});

// ============================================================================
// TABLET
// 769px - 1024px
// ============================================================================

mm.add("(min-width: 769px) and (max-width: 1024px)", () => {
    if (reduceMotion) {
        return;
    }

    gsap.set(".secao5", {
        opacity: 0,
        yPercent: 20,
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
        opacity: 0,
        yPercent: 20,
    });

    gsap.set(".secao9", {
        opacity: 1,
        yPercent: 100,
    });

    const tlTablet = gsap.timeline({
        scrollTrigger: {
            trigger: ".containerPai",
            start: "top top",
            end: "+=10000",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
        },
    });

    // ------------------------------------------------------------------------
    // HERO
    // ------------------------------------------------------------------------

    tlTablet.to(".secao1", {
        maskSize: "25vw",
        duration: 2,
    });

    tlTablet.to(
        ".LogoBg",
        {
            opacity: 0,
            duration: 0.5,
        },
        "-=1.5",
    );

    tlTablet.to(".secao1", {
        opacity: 0,
        duration: 1,
    });

    // ------------------------------------------------------------------------
    // SECTION 2
    // ------------------------------------------------------------------------

    tlTablet.from(
        ".secao2 img",
        {
            opacity: 0,
            filter: "blur(12px)",
            duration: 1,
        },
        "-=0.5",
    );

    tlTablet.to(".secao2", {
        opacity: 0,
        duration: 1,
    });

    // ------------------------------------------------------------------------
    // VIDEO 1
    // ------------------------------------------------------------------------

    tlTablet.from(
        "#scroll-video",
        {
            opacity: 0,
            duration: 1,
        },
        "-=0.5",
    );

    tlTablet.to(video, {
        currentTime: video?.duration || 1,
        duration: 3,
        ease: "none",
    });

    // ------------------------------------------------------------------------
    // JASON
    // ------------------------------------------------------------------------

    tlTablet.fromTo(
        ".jason-content",
        {
            yPercent: 80,
            opacity: 0,
        },
        {
            yPercent: 0,
            opacity: 1,
            duration: 2,
            ease: "power2.out",
        },
    );

    tlTablet.fromTo(
        ".coluna-parallax",
        {
            yPercent: 100,
        },
        {
            yPercent: 0,
            duration: 2,
            ease: "none",
        },
        "<",
    );

    // ------------------------------------------------------------------------
    // SECTION 5
    // ------------------------------------------------------------------------

    tlTablet.to(".secao5", {
        yPercent: 0,
        opacity: 1,
        duration: 1.5,
    });

    tlTablet.to(
        video2,
        {
            currentTime: video2?.duration || 1,
            duration: 2,
            ease: "none",
        },
        "<",
    );

    // ------------------------------------------------------------------------
    // LUCIA
    // ------------------------------------------------------------------------

    tlTablet.fromTo(
        ".lucia-content",
        {
            yPercent: 70,
            opacity: 0,
        },
        {
            yPercent: 0,
            opacity: 1,
            duration: 2,
        },
    );

    tlTablet.fromTo(
        ".coluna-parallax2",
        {
            yPercent: 80,
        },
        {
            yPercent: 0,
            duration: 2,
        },
        "<",
    );

    // ------------------------------------------------------------------------
    // SECTION 7
    // ------------------------------------------------------------------------

    tlTablet.to(".secao7", {
        yPercent: 0,
        duration: 1.5,
    });

    tlTablet.to(
        video3,
        {
            currentTime: video3?.duration || 1,
            duration: 2,
        },
        "<",
    );

    // ------------------------------------------------------------------------
    // SECTION 8
    // ------------------------------------------------------------------------

    tlTablet.to(".secao8", {
        yPercent: 0,
        duration: 1,
    });

    tlTablet.to(".content-secao8", {
        opacity: 1,
        yPercent: 0,
        duration: 1,
    });

    tlTablet.to(
        video4,
        {
            currentTime: video4?.duration || 1,
            duration: 2,
        },
        "<",
    );

    tlTablet.to("#scroll-video4", {
        opacity: 0,
        duration: 1,
    });

    // ------------------------------------------------------------------------
    // SECTION 9
    // ------------------------------------------------------------------------

    tlTablet.to(".secao9", {
        yPercent: 0,
        duration: 0.8,
        ease: "power2.out",
    });

    return () => {
        tlTablet.kill();
    };
});

// ============================================================================
// CELULAR
// <= 768px
// ============================================================================

mm.add("(max-width: 768px)", () => {
    // ------------------------------------------------------------------------
    // ACESSIBILIDADE
    // ------------------------------------------------------------------------

    if (reduceMotion) {
        gsap.set(
            [
                ".secao1",
                ".secao2",
                ".secao4",
                ".secao5",
                ".secao6",
                ".secao7",
                ".secao8",
                ".secao9",
                ".jason-content",
                ".lucia-content",
                ".coluna-parallax",
                ".coluna-parallax2",
                ".content-secao8",
            ],
            {
                clearProps: "all",
                opacity: 1,
                y: 0,
                yPercent: 0,
            },
        );

        return;
    }

    // ------------------------------------------------------------------------
    // ESTADO INICIAL MOBILE
    // ------------------------------------------------------------------------

    gsap.set(".secao1", {
        opacity: 1,
    });

    gsap.set(
        [
            ".jason-content",
            ".coluna-parallax",
            ".lucia-content",
            ".coluna-parallax2",
        ],
        {
            opacity: 0,
            y: 40,
        },
    );

    gsap.set(".secao5", {
        opacity: 1,
    });

    gsap.set(".secao7", {
        opacity: 1,
    });

    gsap.set(".secao8", {
        opacity: 1,
        backgroundColor: "#4a3c75",
    });

    gsap.set(".content-secao8", {
        opacity: 0,
        y: 30,
    });

    gsap.set(".secao9", {
        opacity: 0,
        y: 30,
    });

    // ========================================================================
    // SECTION 1
    // ========================================================================

    gsap.fromTo(
        ".secao1 .LogoBg",
        {
            opacity: 0,
            scale: 1.05,
        },
        {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
        },
    );

    // ========================================================================
    // SECTION 2
    // ========================================================================

    gsap.fromTo(
        ".secao2 img",
        {
            opacity: 0,
            scale: 0.9,
            filter: "blur(10px)",
        },
        {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".secao2",
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
        },
    );

    // ========================================================================
    // VIDEO 1
    // ========================================================================

    gsap.fromTo(
        "#scroll-video",
        {
            opacity: 0,
            scale: 1.05,
        },
        {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".secao3",
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
        },
    );

    // ========================================================================
    // SECTION 4 - JASON
    // ========================================================================

    animateMobileElement(
        ".jason-content",
        {
            duration: 0.8,
        },
        {
            start: "top 80%",
        },
    );

    animateMobileElement(
        ".coluna-parallax",
        {
            duration: 0.9,
            delay: 0.1,
        },
        {
            start: "top 85%",
        },
    );

    // Imagens individuais
    gsap.utils.toArray(".secao4 img").forEach((img, index) => {
        gsap.fromTo(
            img,
            {
                opacity: 0,
                scale: 1.04,
            },
            {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                delay: index * 0.08,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: img,
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                },
            },
        );
    });

    // ========================================================================
    // SECTION 5
    // ========================================================================

    gsap.fromTo(
        "#scroll-video2",
        {
            opacity: 0,
            scale: 1.03,
        },
        {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".secao5",
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
        },
    );

    // ========================================================================
    // SECTION 6 - LUCIA
    // ========================================================================

    animateMobileElement(
        ".lucia-content",
        {
            duration: 0.8,
        },
        {
            start: "top 80%",
        },
    );

    animateMobileElement(
        ".coluna-parallax2",
        {
            duration: 0.9,
        },
        {
            start: "top 85%",
        },
    );

    gsap.utils.toArray(".secao6 img").forEach((img, index) => {
        gsap.fromTo(
            img,
            {
                opacity: 0,
                scale: 1.04,
            },
            {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                delay: index * 0.08,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: img,
                    start: "top 90%",
                    toggleActions: "play none none reverse",
                },
            },
        );
    });

    // ========================================================================
    // SECTION 7
    // ========================================================================

    gsap.fromTo(
        ".post-card-wrapper",
        {
            opacity: 0,
            scale: 0.96,
        },
        {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".secao7",
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
        },
    );

    // ========================================================================
    // SECTION 8
    // ========================================================================

    gsap.fromTo(
        ".content-secao8",
        {
            opacity: 0,
            y: 30,
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".secao8",
                start: "top 75%",
                toggleActions: "play none none reverse",
            },
        },
    );

    gsap.fromTo(
        ".secao8",
        {
            backgroundColor: "#4a3c75",
        },
        {
            backgroundColor: "#000000",
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".secao8",
                start: "top 65%",
                toggleActions: "play none none reverse",
            },
        },
    );

    // ========================================================================
    // SECTION 9
    // ========================================================================

    gsap.fromTo(
        ".secao9",
        {
            opacity: 0,
            y: 40,
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".secao9",
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
        },
    );

    gsap.fromTo(
        ".footer img",
        {
            opacity: 0,
            scale: 0.9,
        },
        {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".secao9",
                start: "top 75%",
                toggleActions: "play none none reverse",
            },
        },
    );

    gsap.fromTo(
        ".gradient-title",
        {
            opacity: 0,
            y: 25,
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.15,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".gradient-title",
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
        },
    );

    gsap.fromTo(
        ".logos",
        {
            opacity: 0,
            y: 20,
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.25,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".logos",
                start: "top 90%",
                toggleActions: "play none none reverse",
            },
        },
    );

    // ------------------------------------------------------------------------
    // REFRESH
    // ------------------------------------------------------------------------

    requestAnimationFrame(() => {
        ScrollTrigger.refresh();
    });
});

// ============================================================================
// SISTEMA DE CARREGAMENTO DOS VÍDEOS
// ============================================================================

const videos = [video, video2, video3, video4].filter(Boolean);

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
// REDUCED MOTION / MOBILE
// ============================================================================

// No celular não precisamos esperar os vídeos.
// As animações das seções podem começar imediatamente.

if (window.innerWidth <= 768) {
    timelineIniciada = true;

    requestAnimationFrame(() => {
        ScrollTrigger.refresh();
    });
} else {
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

    // =========================================================================
    // FALLBACK
    // =========================================================================

    setTimeout(() => {
        if (!timelineIniciada) {
            console.warn("Forçando inicialização: vídeos demoraram muito.");

            timelineIniciada = true;

            ScrollTrigger.refresh();
        }
    }, 2000);
}
