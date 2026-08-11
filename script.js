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
                ".jason-content",
                ".lucia-content",
                ".coluna-parallax",
                ".coluna-parallax2",
                ".content-secao8",
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

    // IMPORTANTE:
    // Section 6 agora começa fora da tela.
    gsap.set(".secao6", {
        opacity: 1,
        yPercent: 100,
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
            invalidateOnRefresh: true,
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

    if (video) {
        tl.to(video, {
            currentTime: () => video.duration || 1,
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
    // SECTION 5 - VIDEO 2
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
                currentTime: () => video2.duration || 1,
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
    // SECTION 6 - LUCIA
    // ========================================================================

    // ============================================================
    // CORREÇÃO PRINCIPAL
    //
    // A SECTION 6 estava em yPercent: 100 e nunca voltava para 0.
    // Agora ela entra na tela antes do conteúdo da Lúcia.
    // ============================================================

    tl.to(
        ".secao6",
        {
            yPercent: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
        },
        "<",
    );

    // Conteúdo da Lúcia

    tl.fromTo(
        ".lucia-content",
        {
            yPercent: 100,
            opacity: 0,
        },
        {
            yPercent: 0,
            opacity: 1,
            duration: 2,
            ease: "power1.out",
        },
        "<+=0.2",
    );

    // Galeria da Lúcia

    tl.fromTo(
        ".coluna-parallax2",
        {
            yPercent: 150,
            opacity: 0,
        },
        {
            yPercent: 0,
            opacity: 1,
            duration: 2,
            ease: "power1.out",
        },
        "<",
    );

    // Parallax

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

    if (video3) {
        tl.to(
            video3,
            {
                currentTime: () => video3.duration || 1,
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

    if (video4) {
        tl.to(
            video4,
            {
                currentTime: () => video4.duration || 1,
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

    // ------------------------------------------------------------------------
    // ESTADOS INICIAIS
    // ------------------------------------------------------------------------

    gsap.set(".secao5", {
        opacity: 0,
        yPercent: 20,
    });

    gsap.set(".secao6", {
        opacity: 1,
        yPercent: 100,
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

    // ------------------------------------------------------------------------
    // TIMELINE
    // ------------------------------------------------------------------------

    const tlTablet = gsap.timeline({
        scrollTrigger: {
            trigger: ".containerPai",
            start: "top top",
            end: "+=10000",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
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

    if (video) {
        tlTablet.to(video, {
            currentTime: () => video.duration || 1,
            duration: 3,
            ease: "none",
        });
    }

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
            opacity: 0,
        },
        {
            yPercent: 0,
            opacity: 1,
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

    if (video2) {
        tlTablet.to(
            video2,
            {
                currentTime: () => video2.duration || 1,
                duration: 2,
                ease: "none",
            },
            "<",
        );
    }

    tlTablet.to("#scroll-video2", {
        opacity: 0,
        duration: 0.7,
    });

    // ------------------------------------------------------------------------
    // SECTION 6 - LUCIA
    // ------------------------------------------------------------------------

    // CORREÇÃO:
    // Faz a section6 realmente entrar na tela.

    tlTablet.to(".secao6", {
        yPercent: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
    });

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
            ease: "power2.out",
        },
        "<+=0.1",
    );

    tlTablet.fromTo(
        ".coluna-parallax2",
        {
            yPercent: 80,
            opacity: 0,
        },
        {
            yPercent: 0,
            opacity: 1,
            duration: 2,
            ease: "none",
        },
        "<",
    );

    tlTablet.to(".coluna-parallax2", {
        yPercent: -30,
        duration: 1.5,
        ease: "none",
    });

    tlTablet.to(
        ".lucia-content",
        {
            yPercent: -30,
            duration: 1.5,
            ease: "none",
        },
        "<",
    );

    // ------------------------------------------------------------------------
    // SECTION 7
    // ------------------------------------------------------------------------

    tlTablet.to(".secao7", {
        yPercent: 0,
        duration: 1.5,
        ease: "power2.out",
    });

    if (video3) {
        tlTablet.to(
            video3,
            {
                currentTime: () => video3.duration || 1,
                duration: 2,
                ease: "none",
            },
            "<",
        );
    }

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

    if (video4) {
        tlTablet.to(
            video4,
            {
                currentTime: () => video4.duration || 1,
                duration: 2,
                ease: "none",
            },
            "<",
        );
    }

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
// MOBILE
// ============================================================================

mm.add("(max-width: 768px)", () => {
    // ------------------------------------------------------------------------
    // REDUCED MOTION
    // ------------------------------------------------------------------------

    if (reduceMotion) {
        gsap.set(
            [
                ".secao1",
                ".secao2",
                ".secao3",
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
            },
        );

        return;
    }

    // ========================================================================
    // FRAMES DOS VÍDEOS — SOMENTE MOBILE
    // ========================================================================

    function preloadFrames(path, total) {
        const frames = [];

        for (let i = 1; i <= total; i++) {
            const img = new Image();

            const number = String(i).padStart(4, "0");

            img.src = `${path}/frame_${number}.webp`;

            frames.push(img);
        }

        return frames;
    }

    // ------------------------------------------------------------------------
    // VÍDEO 1
    // ------------------------------------------------------------------------

    const frameImage1 = document.getElementById("scroll-frame1");

    const framesVideo1 = preloadFrames("/frames/video1", 59);

    // ------------------------------------------------------------------------
    // VÍDEO 2
    // ------------------------------------------------------------------------

    const frameImage2 = document.getElementById("scroll-frame2");

    const framesVideo2 = preloadFrames("/frames/video2", 89);

    // ------------------------------------------------------------------------
    // VÍDEO 3
    // ------------------------------------------------------------------------

    const frameImage3 = document.getElementById("scroll-frame3");

    const framesVideo3 = preloadFrames("/frames/video3", 60);

    // ------------------------------------------------------------------------
    // VÍDEO 4
    // ------------------------------------------------------------------------

    const frameImage4 = document.getElementById("scroll-frame4");

    const framesVideo4 = preloadFrames("/frames/video4", 55);

    // ------------------------------------------------------------------------
    // ESTADOS INICIAIS
    // ------------------------------------------------------------------------

    gsap.set(".secao1", {
        opacity: 1,
        yPercent: 0,
    });

    gsap.set(".secao2", {
        opacity: 1,
        yPercent: 0,
    });

    gsap.set(".secao3", {
        opacity: 1,
        yPercent: 0,
    });

    gsap.set(".secao4", {
        opacity: 1,
        yPercent: 0,
    });

    gsap.set(".secao5", {
        opacity: 1,
        yPercent: 100,
    });

    // SECTION 6 começa fora da tela
    gsap.set(".secao6", {
        opacity: 1,
        yPercent: 100,
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

    gsap.set(".secao9", {
        opacity: 1,
        yPercent: 100,
    });

    // ------------------------------------------------------------------------
    // CONTEÚDOS
    // ------------------------------------------------------------------------

    gsap.set(".jason-content", {
        opacity: 0,
        yPercent: 60,
    });

    gsap.set(".coluna-parallax", {
        opacity: 0,
        yPercent: 80,
    });

    gsap.set(".lucia-content", {
        opacity: 0,
        yPercent: 60,
    });

    gsap.set(".coluna-parallax2", {
        opacity: 0,
        yPercent: 80,
    });

    gsap.set(".content-secao8", {
        opacity: 0,
        yPercent: 20,
    });

    // ------------------------------------------------------------------------
    // ANIMAÇÃO DOS FRAMES
    // ------------------------------------------------------------------------

    function animateFramesScroll(timeline, image, frames, duration, position) {
        if (!image || !frames.length) return;

        const state = {
            frame: 0,
        };

        let lastFrame = -1;

        timeline.to(
            state,
            {
                frame: frames.length - 1,
                duration,
                ease: "none",

                onUpdate: () => {
                    const frame = Math.round(state.frame);

                    if (frame === lastFrame) {
                        return;
                    }

                    lastFrame = frame;

                    image.src = frames[frame].src;
                },
            },
            position,
        );
    }

    // ------------------------------------------------------------------------
    // TIMELINE MOBILE
    // ------------------------------------------------------------------------

    const tlMobile = gsap.timeline({
        scrollTrigger: {
            trigger: ".containerPai",
            start: "top top",
            end: "+=9000",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
        },
    });

    // ========================================================================
    // SECTION 1
    // ========================================================================

    tlMobile.to(".secao1", {
        opacity: 0,
        duration: 1.2,
        ease: "power2.inOut",
    });

    tlMobile.to(
        ".LogoBg",
        {
            opacity: 0,
            scale: 1.08,
            duration: 0.7,
            ease: "power2.inOut",
        },
        "<",
    );

    // ========================================================================
    // SECTION 2
    // ========================================================================

    tlMobile.fromTo(
        ".secao2 img",
        {
            opacity: 0,
            scale: 0.8,
            filter: "blur(12px)",
        },
        {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power2.out",
        },
    );

    tlMobile.to(".secao2", {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
    });

    // ========================================================================
    // VIDEO 1
    // ========================================================================

    tlMobile.fromTo(
        "#scroll-frame1",
        {
            opacity: 0,
        },
        {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
        },
    );

    animateFramesScroll(tlMobile, frameImage1, framesVideo1, 2.5);

    tlMobile.to("#scroll-frame1", {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
    });

    // ========================================================================
    // JASON
    // ========================================================================

    tlMobile.fromTo(
        ".jason-content",
        {
            opacity: 0,
            yPercent: 70,
        },
        {
            opacity: 1,
            yPercent: 0,
            duration: 1.2,
            ease: "power2.out",
        },
        "-=0.4",
    );

    tlMobile.fromTo(
        ".coluna-parallax",
        {
            opacity: 0,
            yPercent: 40,
        },
        {
            opacity: 1,
            yPercent: 0,
            duration: 1.4,
            ease: "power2.out",
        },
        "-=0.4",
    );

    tlMobile.to(".coluna-parallax", {
        yPercent: -9,
        duration: 0.5,
        ease: "none",
    });

    tlMobile.to(
        ".jason-content",
        {
            yPercent: -9,
            duration: 0.5,
            ease: "none",
        },
        "<",
    );

    // ========================================================================
    // SAÍDA DA SECTION 4 + ENTRADA DA SECTION 5
    // ========================================================================

    tlMobile.to(".secao4", {
        yPercent: -100,
        duration: 1.2,
        ease: "power2.inOut",
    });

    tlMobile.to(
        ".secao5",
        {
            yPercent: 0,
            duration: 2,
            ease: "power2.inOut",
        },
        "<-=0.4",
    );
    animateFramesScroll(tlMobile, frameImage2, framesVideo2, 2.5, "<+=0.7");

    tlMobile.to(
        ".secao5",
        {
            opacity: 0,

            duration: 0.7,
            ease: "power2.inOut",
        },
        "-=0.7",
    );

    // ========================================================================
    // SECTION 6 - LUCIA
    // ========================================================================

    // ============================================================
    // CORREÇÃO PRINCIPAL
    // ============================================================

    tlMobile.to(
        ".secao6",
        {
            yPercent: 0,
            duration: 1.5,
            ease: "power1.out",
        },
        "<-=0.1",
    );

    tlMobile.fromTo(
        ".coluna-parallax2",
        {
            opacity: 1,
            yPercent: 80,
        },
        {
            opacity: 1,
            yPercent: 0,
            duration: 1.4,
            ease: "power2.out",
        },
        "-=1",
    );

    // Conteúdo Lucia

    tlMobile.fromTo(
        ".lucia-content",
        {
            opacity: 0,
            yPercent: 70,
        },
        {
            opacity: 1,
            yPercent: 0,
            duration: 1.2,
            ease: "power2.out",
        },
        "-=1",
    );

    // Galeria Lucia

    // Parallax Lucia

    tlMobile.to(".coluna-parallax2", {
        yPercent: -25,
        duration: 1.2,
        ease: "power2.inOut",
    });

    tlMobile.to(
        ".lucia-content",
        {
            yPercent: -25,
            duration: 1.2,
            ease: "power2.inOut",
        },
        "<",
    );

    tlMobile.to(".secao6", {
        yPercent: -100,
        duration: 1,
        ease: "none",
    });

    // ========================================================================
    // SECTION 7
    // ========================================================================

    // 1. ENTRA
    tlMobile.to(".secao7", {
        yPercent: 0,
        duration: 0.8,
        ease: "none",
    });

    animateFramesScroll(tlMobile, frameImage3, framesVideo3, 2, "<");

    // 3. SAI DEPOIS DOS FRAMES
    tlMobile.to(".secao7", {
        yPercent: -100,
        duration: 0.8,
        ease: "none",
    });

    // ========================================================================
    // SECTION 8
    // ========================================================================

    tlMobile.to(
        ".secao8",
        {
            yPercent: 0,
            duration: 1,
            ease: "power2.out",
        },
        "-=1",
    );

    tlMobile.to(".content-secao8", {
        opacity: 1,
        yPercent: 0,
        duration: 1,
        ease: "power2.out",
    });

    animateFramesScroll(tlMobile, frameImage4, framesVideo4, 2, "<");

    tlMobile.to(".secao8", {
        backgroundColor: "#000000",
        duration: 0.2,
        ease: "power2.out",
    });

    tlMobile.to(
        "#scroll-frame4",
        {
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
        },
        "<",
    );

    // ========================================================================
    // SECTION 9
    // ========================================================================

    tlMobile.to(".secao9", {
        yPercent: 0,
        duration: 1,
        ease: "power3.out",
    });

    // Logos

    tlMobile.fromTo(
        ".footer img",
        {
            opacity: 0,
            scale: 0.85,
        },
        {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
        },
        "-=0.5",
    );

    // Título

    tlMobile.fromTo(
        ".gradient-title",
        {
            opacity: 0,
            y: 25,
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
        },
        "-=0.5",
    );

    // ------------------------------------------------------------------------
    // REFRESH
    // ------------------------------------------------------------------------

    requestAnimationFrame(() => {
        ScrollTrigger.refresh();
    });

    // ------------------------------------------------------------------------
    // CLEANUP
    // ------------------------------------------------------------------------

    return () => {
        tlMobile.kill();
    };
});

// ============================================================================
// SISTEMA DE CARREGAMENTO DOS VÍDEOS
// ============================================================================

const videos = [video, video2, video3, video4].filter(Boolean);

let videosLoaded = 0;
let timelineIniciada = false;

videos.forEach((vid) => {
    vid.preload = "metadata";
    vid.load();
});

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

                vid.addEventListener("error", checkVideosReady, {
                    once: true,
                });
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
