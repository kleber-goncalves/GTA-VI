gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();

const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
).matches;

const loader = document.getElementById("page-loader");
const progressBar = document.getElementById("loader-progress-bar");
const progressText = document.getElementById("loader-progress-text");

const video = document.getElementById("scroll-video");
const video2 = document.getElementById("scroll-video2");
const video3 = document.getElementById("scroll-video3");
const video4 = document.getElementById("scroll-video4");


const siteNav = document.getElementById("siteNav");
const navToggle = document.getElementById("navToggle");
const navOverlay = document.getElementById("navOverlay");
const navLinks = document.querySelectorAll(".nav-link");

const isMobile = window.matchMedia("(max-width: 768px)").matches;

const navSections = ["hero", "JasonDuval", "lucia", "leonida", "footer"];

 const imagens = document.querySelectorAll(
     ".jason-1 img, .jason-2 img, .jason-3 img, .lucia-1 img, .lucia-2 img, .lucia-3 img, .overlay img, .logo img, .ps-logo img, .xbox-logo img, .hero-bg img, .hero-text img",
 );

 imagens.forEach((img) => {

     img.addEventListener("contextmenu", (event) => {
         event.preventDefault();
     });
 });

// ============================================================
// NAVIGATION MENU
// ============================================================

// ============================================================
// CONTROLE DA NAV
// ============================================================


function setActiveNav(section) {

    navLinks.forEach((link) => {

        link.classList.toggle(
            "active",
            link.dataset.section === section
        );

    });

}



function updateActiveNavFromTimeline(timeline) {
    if (!timeline) return;

    const currentTime = timeline.time();
    const labels = timeline.labels;

    let activeSection = navSections[0];

    for (let i = 0; i < navSections.length; i++) {
        const currentSection = navSections[i];
        const currentLabelTime = labels[currentSection];

        if (currentLabelTime === undefined) {
            continue;
        }

        const nextSection = navSections[i + 1];

        const nextLabelTime = nextSection
            ? labels[nextSection]
            : timeline.duration();

        if (currentTime >= currentLabelTime && currentTime < nextLabelTime) {
            activeSection = currentSection;
            break;
        }
    }

    setActiveNav(activeSection);
}

 
// ============================================================
// ABRIR / FECHAR
// ============================================================

function toggleNavigation() {
    if (!siteNav || !navToggle) {
        return;
    }

    const isOpen = siteNav.classList.contains("menu-open");

    if (isOpen) {
        closeNavigation();
    } else {
        openNavigation();
    }
}

function openNavigation() {
    if (!siteNav || !navToggle) {
        return;
    }

    

    siteNav.classList.add("menu-open");

    document.body.classList.add("menu-open");

    navToggle.setAttribute("aria-expanded", "true");

    navToggle.setAttribute("aria-label", "Fechar menu");
}

function closeNavigation() {
    if (!siteNav || !navToggle) {
        return;
    }

        siteNav.classList.remove("menu-open");

        document.body.classList.remove("menu-open");

    navToggle.setAttribute("aria-expanded", "false");

    navToggle.setAttribute("aria-label", "Abrir menu");
}


// ============================================================
// BOTÃO
// ============================================================

if (navToggle) {

    navToggle.addEventListener(
        "click",
        toggleNavigation
    );

}



// ============================================================
// LINKS
// ============================================================

navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const section = link.dataset.section;

        if (!section) {
            return;
        }


        closeNavigation();

        const timeline = window.mainTimeline;

        if (!timeline) {
            console.warn("Timeline principal ainda não foi criada.");
            return;
        }

        const targetTime = timeline.labels[section];

        if (targetTime === undefined) {
            console.warn(`Label "${section}" não encontrada na timeline.`);
            return;
        }

        const progress = targetTime / timeline.duration();

        const trigger = timeline.scrollTrigger;

        if (!trigger) {
            console.warn("ScrollTrigger da timeline não encontrado.");
            return;
        }

        const targetScroll =
            trigger.start + (trigger.end - trigger.start) * progress;

        window.scrollTo({
            top: targetScroll,
            behavior: "smooth",
        });
    });
});


// ============================================================
// ESC
// ============================================================

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeNavigation();

    }

});


// ============================================================
// CLICAR FORA DO MENU
// ============================================================

if (navOverlay) {

    navOverlay.addEventListener("click", (event) => {

        if (event.target === navOverlay) {

            closeNavigation();

        }

    });

}
/* ============================================================
   LOADING
============================================================ */

document.body.classList.add("loading");

let totalAssets = 0;
let loadedAssets = 0;

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
                console.warn("Erro ao carregar imagem:", src);
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
   IMAGENS ESTÁTICAS IMPORTANTES PARA O CARREGAMENTO
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
     * No mobile NÃO colocamos src nos vídeos porque ja deu ruim com o cache.
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
   ANIMAÇÃO DE CADA FRAMES
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

    const tlDesktop = gsap.timeline({
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
    
    window.mainTimeline = tlDesktop;

    tlDesktop.eventCallback("onUpdate", () => {
        updateActiveNavFromTimeline(tlDesktop);
    });

    /* ========================================================
       SECTION 1
    ======================================================== */

    tlDesktop.addLabel("hero");

    tlDesktop.to(".secao1", {
        maskSize: "20vw",

        duration: 2,
    });

    tlDesktop.to(
        ".LogoBg",
        {
            opacity: 0,

            duration: 0.5,
        },
        "-=1.8",
    );

    tlDesktop.to(
        ".secBrac",
        {
            backgroundColor: "white",

            duration: 1,
        },
        "-=1",
    );

    tlDesktop.to(".secao1", {
        opacity: 0,

        duration: 1,
    });

    /* ========================================================
       SECTION 2
    ======================================================== */

    tlDesktop.fromTo(
        ".secao2 img",
        {
            filter: "blur(10px)",
            opacity: 0,
            duration: 1,
        },
        {
            filter: "blur(0px)",
            opacity: 1,
            duration: 1,
        },
        "-=1",
    );

    tlDesktop.to(".secao2 ", {
        opacity: 0,
        duration: 1,
    });

    /* ========================================================
       VIDEO 1
    ======================================================== */
    
    tlDesktop.fromTo(
        "#scroll-video",
        {
            opacity: 1,
            filter: "blur(20px)",
        },
        {
            filter: "blur(0px)",
            duration: 1,
        },
        "-=0.5",
    );
    
    if (video) {
        tlDesktop.to(
            video,
            {
                currentTime: () => video.duration || 1,
                duration: 2,
                ease: "power2.inOut",
            },
            "<",
        );
    }


    tlDesktop.to(
        "#scroll-video",
        {
            scale: 1.1,
            opacity: 0,

            duration: 1,

            ease: "power2.inOut",
        },
        "-=0.5",
    );
    
    /* ========================================================
       JASON
    ======================================================== */

    tlDesktop.addLabel("JasonDuval");

    tlDesktop.to(
        ".secao4",
        {
            backgroundColor: "rgba(0, 0, 0, 0)",

            duration: 1,

            ease: "power1.in",
        },
        "<",
    );
    
    tlDesktop.fromTo(
        ".jason-content",

        {
            yPercent: 180,

            opacity: 1,
        },

        {
            yPercent: 0,

            opacity: 1,

            duration: 2,

            ease: "power1.out",
        },

        "-=1.5",
    );

    tlDesktop.fromTo(
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

    tlDesktop.to(".coluna-parallax", {
        yPercent: -130,

        duration: 3,

        ease: "none",
    });

    tlDesktop.to(
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
    tlDesktop.addLabel("lucia");

    tlDesktop.to(
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
        tlDesktop.to(
            video2,
            {
                currentTime: () => video2.duration || 1,

                duration: 2,

                ease: "none",
            },
            "<+=1",
        );
    }
    
    tlDesktop.to(
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

    
    tlDesktop.to(
        ".secao6",
        {
            yPercent: 0,

            opacity: 1,

            duration: 1,

            ease: "power2.out",
        },
        "<",
    );

    tlDesktop.fromTo(
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

        "<-=0.5",
    );

    tlDesktop.fromTo(
        ".coluna-parallax2",

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

        "<",
    );

    tlDesktop.to(".coluna-parallax2", {
        yPercent: -100,

        duration: 2,

        ease: "none",
    });

    tlDesktop.to(
        ".lucia-content",
        {
            yPercent: -86,

            duration: 2,

            ease: "none",
        },
        "<",
    );

    /* ========================================================
       SECTION 7
    ======================================================== */

    tlDesktop.addLabel("leonida");

    tlDesktop.to(
        ".secao7",
        {
            yPercent: 0,

            duration: 2,

            ease: "none",
        },
        "<",
    );

    if (video3) {
        tlDesktop.to(
            video3,
            {
                currentTime: () => video3.duration || 1,

                duration: 2,

                ease: "none",
            },
            "<",
        );
    }

    tlDesktop.to(".secao7", {
        yPercent: -100,

        duration: 1,

        ease: "none",
    });

    /* ========================================================
       SECTION 8
    ======================================================== */

    tlDesktop.addLabel("secao8");

    tlDesktop.to(
        ".secao8",
        {
            yPercent: 0,

            duration: 1,

            ease: "none",
        },
        "<",
    );

    tlDesktop.to(".content-secao8", {
        opacity: 1,

        yPercent: 0,

        duration: 1,

        ease: "power2.out",
    });

    if (video4) {
        tlDesktop.to(
            video4,
            {
                currentTime: () => video4.duration || 1,

                duration: 2,

                ease: "none",
            },
            "<",
        );
    }

    tlDesktop.to(
        ".secao8",
        {
            backgroundColor: "rgb(22, 21, 32)",

            duration: 2,

            ease: "none",
        },
        "<",
    );

    tlDesktop.to("#scroll-video4", {
        opacity: 0,

        duration: 1,

        ease: "power4.out",
    });

    /* ========================================================
       SECTION 9
    ======================================================== */

    

    tlDesktop.to(".secao9", {
        yPercent: 0,

        duration: 1,

        ease: "power4.out",
    });

    

    tlDesktop.fromTo(
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

    tlDesktop.addLabel("footer");

    tlDesktop.fromTo(
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


return () => {
    tlDesktop.kill();

    if (window.mainTimeline === tlDesktop) {
        window.mainTimeline = null;
    }
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


    /* HERO */

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

    /* SECTION 2 */

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

    /* VIDEO 1 */

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

    /* JASON */

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

    /* VIDEO 2 */

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

    /* LUCIA */

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

    /* SECTION 7 */

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

    /* SECTION 8 */

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

    /* SECTION 9 */

    tlTablet.to(".secao9", {
        yPercent: 0,

        duration: 0.8,

        ease: "power2.out",
    });

return () => {
    tlTablet.kill();

    if (window.mainTimeline === tlTablet) {
        window.mainTimeline = null;
    }
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
       ESTADOS DE CADA SEC
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
       TIMELINE(COMO INICIARA O SCROLL)
    ======================================================== */

    const tlMobile = gsap.timeline({
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

    window.mainTimeline = tlMobile;

    tlMobile.eventCallback("onUpdate", () => {
        updateActiveNavFromTimeline(tlMobile);
    });

    /* ========================================================
       SECTION 1
    ======================================================== */

    tlMobile.addLabel("hero");

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

    /* ========================================================
       SECTION 2
    ======================================================== */

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

    /* ========================================================
       FRAME 1
    ======================================================== */

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

    /* ========================================================
       JASON
    ======================================================== */

    

    tlMobile.fromTo(
        ".jason-content",

        {
            opacity: 0,

            yPercent: 100,
        },

        {
            opacity: 1,

            yPercent: 0,

            duration: 2,

            ease: "power1.out",
        },

        "-=0.4",
    );
    tlMobile.addLabel("JasonDuval");

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
        yPercent: 0,

        duration: 1,

        ease: "power2.inOut",
    });

    tlMobile.to(
        ".jason-content",
        {
            yPercent: 0,

            duration: 1,

            ease: "power2.inOut",
        },
        "<",
    );

    /* ========================================================
       SECTION 5
    ======================================================== */

    tlMobile.to(".secao4", {
        yPercent: -100,

        duration: 2,

        ease: "power2.inOut",
    });

    tlMobile.to(
        ".secao5",
        {
            yPercent: 0,

            duration: 2,

            ease: "power2.inOut",
        },
        "<",
    );

    animateFramesScroll(tlMobile, frameImage2, framesVideo2, 5, "<+=0.9");

    tlMobile.to(
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


    tlMobile.to(
        ".secao6",
        {
            yPercent: 0,

            duration: 1.5,

            ease: "power1.out",
        },
        "<-=0.1",
    );
        tlMobile.addLabel("lucia");


    tlMobile.fromTo(
        ".coluna-parallax2",

        {
            opacity: 1,

            yPercent: 80,
        },

        {
            opacity: 1,

            yPercent: 0,

            duration: 3,

            ease: "power1.out",
        },

        "-=1",
    );

    tlMobile.fromTo(
        ".lucia-content",

        {
            opacity: 0,

            yPercent: 70,
        },

        {
            opacity: 1,

            yPercent: 0,

            duration: 3,

            ease: "power2.out",
        },

        "-=2",
    );

    tlMobile.to(".coluna-parallax2", {
        yPercent: -35,

        duration: 1,

        ease: "power2.inOut",
    });

    tlMobile.to(
        ".lucia-content",
        {
            yPercent: -25,

            duration: 1,

            ease: "power2.inOut",
        },
        "<",
    );

    tlMobile.to(".secao6", {
        yPercent: -100,

        duration: 1.5,

        ease: "none",
    });

    /* ========================================================
       SECTION 7
    ======================================================== */

    tlMobile.addLabel("leonida");

    tlMobile.to(
        ".secao7",
        {
            yPercent: 0,

            duration: 0.8,

            ease: "none",
        },
        "<+=0.6",
    );

    animateFramesScroll(tlMobile, frameImage3, framesVideo3, 0.7, "<");

    tlMobile.to(".secao7", {
        yPercent: -100,

        duration: 0.8,

        ease: "none",
    });

    /* ========================================================
       SECTION 8
    ======================================================== */

    tlMobile.to(
        ".secao8",
        {
            yPercent: 0,

            duration: 0.8,

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
        backgroundColor: "rgb(22, 21, 32)",

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

    /* ========================================================
       SECTION 9
    ======================================================== */

    tlMobile.to(".secao9", {
        yPercent: 0,

        duration: 1,

        ease: "power3.out",
    });

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
        tlMobile.addLabel("footer");


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

    requestAnimationFrame(() => {
        ScrollTrigger.refresh();
    });

return () => {
    tlMobile.kill();

    if (window.mainTimeline === tlMobile) {
        window.mainTimeline = null;
    }
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
            console.log("Mobile: carregando os frames...");

            assetData = await loadMobileAssets();
        } else {

        /*
         * ========================================================
         * DESKTOP / TABLET
         * ========================================================
         */
            console.log("Desktop/Tablet: carregando vídeos...");

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
