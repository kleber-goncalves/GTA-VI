gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   CONFIGURAÇÃO
============================================================ */

const mm = gsap.matchMedia();

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
).matches;

/* ============================================================
   ELEMENTOS
============================================================ */

const loader = document.getElementById("page-loader");
const progressBar = document.getElementById("loader-progress-bar");
const progressText = document.getElementById("loader-progress-text");

const video = document.getElementById("scroll-video");
const video2 = document.getElementById("scroll-video2");
const video3 = document.getElementById("scroll-video3");
const video4 = document.getElementById("scroll-video4");

const isMobile = window.matchMedia("(max-width: 768px)").matches;

/* ============================================================
   LOADING
============================================================ */

document.body.classList.add("loading");

let totalAssets = 0;
let loadedAssets = 0;

/* ============================================================
   PROGRESSO
============================================================ */

function updateProgress() {
    loadedAssets++;

    const percent = Math.min(
        100,
        Math.round((loadedAssets / totalAssets) * 100),
    );

    if (progressBar) {
        progressBar.style.width = `${percent}%`;
    }

    if (progressText) {
        progressText.textContent = `${percent}%`;
    }
}

/* ============================================================
   PRELOAD DE IMAGEM
============================================================ */

function preloadImage(src) {
    return new Promise((resolve) => {
        const img = new Image();

        img.onload = async () => {
            try {
                await img.decode();
            } catch (error) {
                // Alguns navegadores podem não suportar decode
            }

            updateProgress();

            resolve(img);
        };

        img.onerror = () => {
            console.warn("Erro ao carregar imagem:", src);

            updateProgress();

            resolve(null);
        };

        img.src = src;
    });
}

/* ============================================================
   PRELOAD DOS FRAMES
============================================================ */

async function preloadFrames(path, total) {
    const frames = new Array(total);

    const promises = [];

    for (let i = 1; i <= total; i++) {
        const number = String(i).padStart(4, "0");

        const src = `${path}/frame_${number}.webp`;

        const promise = preloadImage(src).then((img) => {
            frames[i - 1] = img;
        });

        promises.push(promise);
    }

    await Promise.all(promises);

    return frames;
}

/* ============================================================
   PRELOAD DOS VÍDEOS
============================================================ */

function preloadVideo(videoElement) {
    return new Promise((resolve) => {
        if (!videoElement) {
            resolve();
            return;
        }

        const src = videoElement.dataset.src;

        if (!src) {
            resolve();
            return;
        }

        videoElement.src = src;

        videoElement.preload = "metadata";

        const finish = () => {
            updateProgress();

            resolve();
        };

        if (videoElement.readyState >= 1) {
            finish();

            return;
        }

        videoElement.addEventListener("loadedmetadata", finish, {
            once: true,
        });

        videoElement.addEventListener(
            "error",
            () => {
                console.warn("Erro ao carregar vídeo:", src);

                finish();
            },
            {
                once: true,
            },
        );

        videoElement.load();
    });
}

/* ============================================================
   IMAGENS ESTÁTICAS IMPORTANTES
============================================================ */

const staticImages = [
    "img/hero-bg.webp",
    "img/hero-text.webp",
    "img/logo.webp",

    "img/jason-1.webp",
    "img/jason-2.webp",
    "img/jason-3.webp",

    "img/lucia-1.webp",
    "img/lucia-2.webp",
    "img/lucia-3.webp",

    "img/overlay.webp",

    "img/ps-logo.svg",
    "img/xbox-logo.svg",
];

/* ============================================================
   PRELOAD MOBILE
============================================================ */

async function loadMobileAssets() {
    const frameTotals = {
        video1: 59,
        video2: 89,
        video3: 60,
        video4: 55,
    };

    totalAssets =
        staticImages.length +
        frameTotals.video1 +
        frameTotals.video2 +
        frameTotals.video3 +
        frameTotals.video4;

    /*
     * Importante:
     *
     * No mobile NÃO colocamos src nos vídeos.
     *
     * Portanto eles não serão baixados.
     */

    const staticPromises = staticImages.map((src) => preloadImage(src));

    const framesPromise = Promise.all([
        preloadFrames("/frames/video1", frameTotals.video1),

        preloadFrames("/frames/video2", frameTotals.video2),

        preloadFrames("/frames/video3", frameTotals.video3),

        preloadFrames("/frames/video4", frameTotals.video4),
    ]);

    const [, frames] = await Promise.all([
        Promise.all(staticPromises),

        framesPromise,
    ]);

    return {
        framesVideo1: frames[0],
        framesVideo2: frames[1],
        framesVideo3: frames[2],
        framesVideo4: frames[3],
    };
}

/* ============================================================
   PRELOAD DESKTOP / TABLET
============================================================ */

async function loadDesktopAssets() {
    totalAssets = staticImages.length + 4;

    const staticPromises = staticImages.map((src) => preloadImage(src));

    const videoPromises = [
        preloadVideo(video),
        preloadVideo(video2),
        preloadVideo(video3),
        preloadVideo(video4),
    ];

    await Promise.all([
        Promise.all(staticPromises),

        Promise.all(videoPromises),
    ]);

    return null;
}

/* ============================================================
   ANIMAÇÃO DOS FRAMES
============================================================ */

function animateFramesScroll(timeline, image, frames, duration, position) {
    if (!image || !frames || !frames.length) {
        return;
    }

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

                const currentFrame = frames[frame];

                if (currentFrame) {
                    image.src = currentFrame.src;
                }
            },
        },

        position,
    );
}

/* ============================================================
   DESKTOP
============================================================ */

function initDesktop() {
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

    gsap.set(".secao5", {
        opacity: 0,
        yPercent: 30,
    });

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

    /* ========================================================
       SECTION 1
    ======================================================== */

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

    /* ========================================================
       SECTION 2
    ======================================================== */

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

    /* ========================================================
       VIDEO 1
    ======================================================== */

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

            ease: "none",
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

    /* ========================================================
       JASON
    ======================================================== */

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

    /* ========================================================
       VIDEO 2
    ======================================================== */

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

                ease: "none",
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

    /* ========================================================
       LUCIA
    ======================================================== */

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

    /* ========================================================
       SECTION 7
    ======================================================== */

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

    /* ========================================================
       SECTION 8
    ======================================================== */

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

    /* ========================================================
       SECTION 9
    ======================================================== */

    tl.to(".secao9", {
        yPercent: 0,

        duration: 0.8,

        ease: "power4.out",
    });

    return () => {
        tl.kill();
    };
}

/* ============================================================
   TABLET
============================================================ */

function initTablet() {
    if (reduceMotion) {
        return;
    }

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

    const tl = gsap.timeline({
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

    /* HERO */

    tl.to(".secao1", {
        maskSize: "25vw",

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

        duration: 1,
    });

    /* SECTION 2 */

    tl.from(
        ".secao2 img",
        {
            opacity: 0,

            filter: "blur(12px)",

            duration: 1,
        },
        "-=0.5",
    );

    tl.to(".secao2", {
        opacity: 0,

        duration: 1,
    });

    /* VIDEO 1 */

    tl.from(
        "#scroll-video",
        {
            opacity: 0,

            duration: 1,
        },
        "-=0.5",
    );

    if (video) {
        tl.to(video, {
            currentTime: () => video.duration || 1,

            duration: 3,

            ease: "none",
        });
    }

    /* JASON */

    tl.fromTo(
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

    tl.fromTo(
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

    /* VIDEO 2 */

    tl.to(".secao5", {
        yPercent: 0,

        opacity: 1,

        duration: 1.5,
    });

    if (video2) {
        tl.to(
            video2,
            {
                currentTime: () => video2.duration || 1,

                duration: 2,

                ease: "none",
            },
            "<",
        );
    }

    tl.to("#scroll-video2", {
        opacity: 0,

        duration: 0.7,
    });

    /* LUCIA */

    tl.to(".secao6", {
        yPercent: 0,

        opacity: 1,

        duration: 1.5,

        ease: "power2.out",
    });

    tl.fromTo(
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

    tl.fromTo(
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

    tl.to(".coluna-parallax2", {
        yPercent: -30,

        duration: 1.5,

        ease: "none",
    });

    tl.to(
        ".lucia-content",
        {
            yPercent: -30,

            duration: 1.5,

            ease: "none",
        },
        "<",
    );

    /* SECTION 7 */

    tl.to(".secao7", {
        yPercent: 0,

        duration: 1.5,

        ease: "power2.out",
    });

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

    /* SECTION 8 */

    tl.to(".secao8", {
        yPercent: 0,

        duration: 1,
    });

    tl.to(".content-secao8", {
        opacity: 1,

        yPercent: 0,

        duration: 1,
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

    tl.to("#scroll-video4", {
        opacity: 0,

        duration: 1,
    });

    /* SECTION 9 */

    tl.to(".secao9", {
        yPercent: 0,

        duration: 0.8,

        ease: "power2.out",
    });

    return () => {
        tl.kill();
    };
}

/* ============================================================
   MOBILE
============================================================ */

function initMobile(assetData) {
    const { framesVideo1, framesVideo2, framesVideo3, framesVideo4 } =
        assetData;

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

    const frameImage1 = document.getElementById("scroll-frame1");

    const frameImage2 = document.getElementById("scroll-frame2");

    const frameImage3 = document.getElementById("scroll-frame3");

    const frameImage4 = document.getElementById("scroll-frame4");

    /* ========================================================
       ESTADOS
    ======================================================== */

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

    /* ========================================================
       TIMELINE
    ======================================================== */

    const tl = gsap.timeline({
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

    /* ========================================================
       SECTION 1
    ======================================================== */

    tl.to(".secao1", {
        opacity: 0,

        duration: 1.2,

        ease: "power2.inOut",
    });

    tl.to(
        ".LogoBg",
        {
            opacity: 0,

            scale: 1.08,

            duration: 0.7,

            ease: "power2.inOut",
        },
        "<",
    );

    /* ========================================================
       SECTION 2
    ======================================================== */

    tl.fromTo(
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

    tl.to(".secao2", {
        opacity: 0,

        duration: 0.8,

        ease: "power2.inOut",
    });

    /* ========================================================
       FRAME 1
    ======================================================== */

    tl.fromTo(
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

    animateFramesScroll(tl, frameImage1, framesVideo1, 2.5);

    tl.to("#scroll-frame1", {
        opacity: 0,

        duration: 0.8,

        ease: "power2.inOut",
    });

    /* ========================================================
       JASON
    ======================================================== */

    tl.fromTo(
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

    tl.fromTo(
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

    tl.to(".coluna-parallax", {
        yPercent: -9,

        duration: 0.5,

        ease: "none",
    });

    tl.to(
        ".jason-content",
        {
            yPercent: -9,

            duration: 0.5,

            ease: "none",
        },
        "<",
    );

    /* ========================================================
       SECTION 5
    ======================================================== */

    tl.to(".secao4", {
        yPercent: -100,

        duration: 1.2,

        ease: "power2.inOut",
    });

    tl.to(
        ".secao5",
        {
            yPercent: 0,

            duration: 2,

            ease: "power2.inOut",
        },
        "<-=0.4",
    );

    animateFramesScroll(tl, frameImage2, framesVideo2, 2.5, "<+=0.7");

    tl.to(
        ".secao5",
        {
            opacity: 0,

            duration: 0.7,

            ease: "power2.inOut",
        },
        "-=0.7",
    );

    /* ========================================================
       LUCIA
    ======================================================== */

    tl.to(
        ".secao6",
        {
            yPercent: 0,

            duration: 1.5,

            ease: "power1.out",
        },
        "<-=0.1",
    );

    tl.fromTo(
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

    tl.fromTo(
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

    tl.to(".coluna-parallax2", {
        yPercent: -25,

        duration: 1.2,

        ease: "power2.inOut",
    });

    tl.to(
        ".lucia-content",
        {
            yPercent: -25,

            duration: 1.2,

            ease: "power2.inOut",
        },
        "<",
    );

    tl.to(".secao6", {
        yPercent: -100,

        duration: 1,

        ease: "none",
    });

    /* ========================================================
       SECTION 7
    ======================================================== */

    tl.to(".secao7", {
        yPercent: 0,

        duration: 0.8,

        ease: "none",
    });

    animateFramesScroll(tl, frameImage3, framesVideo3, 2, "<");

    tl.to(".secao7", {
        yPercent: -100,

        duration: 0.8,

        ease: "none",
    });

    /* ========================================================
       SECTION 8
    ======================================================== */

    tl.to(
        ".secao8",
        {
            yPercent: 0,

            duration: 1,

            ease: "power2.out",
        },
        "-=1",
    );

    tl.to(".content-secao8", {
        opacity: 1,

        yPercent: 0,

        duration: 1,

        ease: "power2.out",
    });

    animateFramesScroll(tl, frameImage4, framesVideo4, 2, "<");

    tl.to(".secao8", {
        backgroundColor: "#000000",

        duration: 0.2,

        ease: "power2.out",
    });

    tl.to(
        "#scroll-frame4",
        {
            opacity: 0,

            duration: 0.8,

            ease: "power2.out",
        },
        "<",
    );

    /* ========================================================
       SECTION 9
    ======================================================== */

    tl.to(".secao9", {
        yPercent: 0,

        duration: 1,

        ease: "power3.out",
    });

    tl.fromTo(
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

    tl.fromTo(
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

    requestAnimationFrame(() => {
        ScrollTrigger.refresh();
    });

    return () => {
        tl.kill();
    };
}

/* ============================================================
   INICIALIZAÇÃO PRINCIPAL
============================================================ */

async function startApplication() {
    let assetData = null;

    try {
        /*
         * ========================================================
         * MOBILE
         * ========================================================
         */

        if (isMobile) {
            console.log("📱 Mobile: carregando frames...");

            assetData = await loadMobileAssets();
        } else {

        /*
         * ========================================================
         * DESKTOP / TABLET
         * ========================================================
         */
            console.log("🖥️ Desktop/Tablet: carregando vídeos...");

            await loadDesktopAssets();
        }

        /*
         * ========================================================
         * GARANTE 100%
         * ========================================================
         */

        loadedAssets = totalAssets;

        if (progressBar) {
            progressBar.style.width = "100%";
        }

        if (progressText) {
            progressText.textContent = "100%";
        }

        /*
         * Pequena espera para o navegador
         * finalizar pintura do loader.
         */

        await new Promise((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(resolve)),
        );

        /*
         * ========================================================
         * GSAP
         * ========================================================
         */

        if (isMobile) {
            initMobile(assetData);
        } else {
            /*
             * Tablet
             */

            if (window.innerWidth >= 769 && window.innerWidth <= 1024) {
                initTablet();
            } else {

            /*
             * Desktop
             */
                initDesktop();
            }
        }

        /*
         * ========================================================
         * REFRESH
         * ========================================================
         */

        requestAnimationFrame(() => {
            ScrollTrigger.refresh();
        });

        /*
         * ========================================================
         * ESCONDE LOADER
         * ========================================================
         */

        setTimeout(() => {
            document.body.classList.remove("loading");

            loader.classList.add("loader-hidden");
        }, 150);
    } catch (error) {
        console.error("Erro ao inicializar aplicação:", error);

        /*
         * Mesmo se algum asset falhar,
         * não deixa o usuário preso no loader.
         */

        document.body.classList.remove("loading");

        if (loader) {
            loader.classList.add("loader-hidden");
        }
    }
}

/* ============================================================
   START
============================================================ */

startApplication();
