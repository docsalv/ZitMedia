/* =========================================================
   3AM FOUNDATION
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initializeLoader();

    initializeMobileNavigation();

    initializeStickyHeader();

    initializeCurrentYear();

});


/* =========================================================
   PAGE LOADER
========================================================= */

function initializeLoader() {

    const loader =
        document.getElementById("pageLoader");


    if (!loader) return;


    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("loaded");

        }, 500);

    });

}


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function initializeMobileNavigation() {

    const menuToggle =
        document.getElementById("mobileMenuToggle");

    const mainNav =
        document.getElementById("mainNav");

    const overlay =
        document.getElementById("mobileNavOverlay");


    if (!menuToggle || !mainNav || !overlay) {
        return;
    }


    function openMenu() {

        mainNav.classList.add("active");

        overlay.classList.add("active");

        menuToggle.classList.add("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.classList.add("menu-open");

    }


    function closeMenu() {

        mainNav.classList.remove("active");

        overlay.classList.remove("active");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove("menu-open");

    }


    menuToggle.addEventListener("click", () => {

        const isOpen =
            mainNav.classList.contains("active");


        if (isOpen) {

            closeMenu();

        } else {

            openMenu();

        }

    });


    overlay.addEventListener(
        "click",
        closeMenu
    );


    const navLinks =
        mainNav.querySelectorAll("a");


    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            closeMenu();

        });

    });


    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeMenu();

        }

    });


    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {

            closeMenu();

        }

    });

}


/* =========================================================
   STICKY HEADER
========================================================= */

function initializeStickyHeader() {

    const header =
        document.getElementById("siteHeader");


    if (!header) return;


    function updateHeader() {

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    updateHeader();


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

}


/* =========================================================
   CURRENT YEAR
========================================================= */

function initializeCurrentYear() {

    const yearElement =
        document.getElementById("currentYear");


    if (!yearElement) return;


    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   GLOBAL SMOOTH SCROLL
   Used later for homepage sections
========================================================= */

function initializeSmoothScroll() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (!target) return;


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

}


/* =========================================================
   UTILITY
   Future sections can use this function
   to safely select DOM elements.
========================================================= */

function select(selector) {

    return document.querySelector(selector);

}


function selectAll(selector) {

    return document.querySelectorAll(selector);

}



/* =========================================================
   HERO SCROLL LINK
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const heroScroll =
        document.querySelector(".hero-scroll");


    if (!heroScroll) return;


    heroScroll.addEventListener("click", event => {

        const targetId =
            heroScroll.getAttribute("href");


        if (!targetId) return;


        const target =
            document.querySelector(targetId);


        if (!target) {

            event.preventDefault();

        }

    });

});


/* =========================================================
   INDEX PART 3
   SCROLL REVEAL + COUNTERS
========================================================= */


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initializeRevealAnimations() {

    const revealElements =
        document.querySelectorAll(".reveal");


    if (!revealElements.length) return;


    /*
       Respect users who prefer reduced motion.
    */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (prefersReducedMotion) {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

        return;

    }


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;


                    entry.target.classList.add(
                        "visible"
                    );


                    revealObserver.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.15
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

}


/* =========================================================
   COUNTER ANIMATION
========================================================= */

function initializeCounters() {

    const counters =
        document.querySelectorAll(".counter");


    if (!counters.length) return;


    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    /*
       If the visitor prefers reduced motion,
       immediately show the final numbers.
    */

    if (prefersReducedMotion) {

        counters.forEach(counter => {

            const target =
                Number(
                    counter.dataset.target
                );


            counter.textContent =
                formatNumber(target);

        });

        return;

    }


    const counterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;


                    const counter =
                        entry.target;


                    animateCounter(counter);


                    counterObserver.unobserve(
                        counter
                    );

                });

            },
            {
                threshold: 0.6
            }
        );


    counters.forEach(counter => {

        counterObserver.observe(counter);

    });

}


/* =========================================================
   COUNTER ENGINE
========================================================= */

function animateCounter(counter) {

    const target =
        Number(
            counter.dataset.target
        );


    const duration = 1800;

    const startTime =
        performance.now();


    function updateCounter(currentTime) {

        const elapsed =
            currentTime - startTime;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        /*
           Ease-out effect.
        */

        const easedProgress =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const currentValue =
            Math.floor(
                easedProgress * target
            );


        counter.textContent =
            formatNumber(currentValue);


        if (progress < 1) {

            requestAnimationFrame(
                updateCounter
            );

        } else {

            counter.textContent =
                formatNumber(target);

        }

    }


    requestAnimationFrame(
        updateCounter
    );

}


/* =========================================================
   NUMBER FORMATTER
========================================================= */

function formatNumber(number) {

    return new Intl.NumberFormat(
        "en-NG"
    ).format(number);

}


/* =========================================================
   INITIALIZE PART 3
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeRevealAnimations();

        initializeCounters();

    }
);


/* =========================================================
   3AM FOUNDATION — OUR WORK JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const mobileMenuButton =
        document.getElementById("mobileMenuButton");

    const mobileNav =
        document.getElementById("mobileNav");


    if (mobileMenuButton && mobileNav) {

        mobileMenuButton.addEventListener("click", function () {

            mobileNav.classList.toggle("open");

            const icon =
                mobileMenuButton.querySelector("i");


            if (mobileNav.classList.contains("open")) {

                icon.classList.remove("fa-bars");

                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            }

        });

    }



    /* =====================================================
       CLOSE MOBILE MENU WHEN LINK IS CLICKED
    ===================================================== */

    const mobileLinks =
        document.querySelectorAll(".mobile-nav a");


    mobileLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            mobileNav.classList.remove("open");

            const icon =
                mobileMenuButton.querySelector("i");

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        });

    });



    /* =====================================================
       LOAD MORE EVENTS
    ===================================================== */

    const workCards =
        document.querySelectorAll(".work-card");

    const loadMoreButton =
        document.getElementById("loadMoreButton");


    const INITIAL_VISIBLE = 7;


    /*
        Hide everything after the first 7 events.
    */

    workCards.forEach(function (card, index) {

        if (index >= INITIAL_VISIBLE) {

            card.classList.add("hidden-event");

        }

    });


    /*
        If there are 7 or fewer events,
        hide the button completely.
    */

    if (
        workCards.length <= INITIAL_VISIBLE
        && loadMoreButton
    ) {

        loadMoreButton.style.display = "none";

    }



    /* =====================================================
       LOAD MORE CLICK
    ===================================================== */

    if (loadMoreButton) {

        loadMoreButton.addEventListener("click", function () {

            const hiddenCards =
                document.querySelectorAll(
                    ".work-card.hidden-event"
                );


            /*
                Reveal ALL remaining events.
            */

            hiddenCards.forEach(function (card, index) {

                setTimeout(function () {

                    card.classList.remove(
                        "hidden-event"
                    );

                    card.style.opacity = "0";

                    card.style.transform =
                        "translateY(30px)";


                    requestAnimationFrame(function () {

                        card.style.transition =
                            "opacity .6s ease, transform .6s ease";

                        card.style.opacity = "1";

                        card.style.transform =
                            "translateY(0)";

                    });

                }, index * 100);

            });


            /*
                Change button.
            */

            loadMoreButton.classList.add("open");


            loadMoreButton.querySelector("span").textContent =
                "All Events Loaded";


            /*
                Disable button.
            */

            loadMoreButton.disabled = true;

            loadMoreButton.style.cursor =
                "default";

            loadMoreButton.style.opacity =
                "0.6";

        });

    }



    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });



    /* =====================================================
       IMAGE FALLBACK
    ===================================================== */

    const images =
        document.querySelectorAll("img");


    images.forEach(function (image) {

        image.addEventListener("error", function () {

            /*
                If an image doesn't exist,
                give the user a clean placeholder.
            */

            image.style.display = "none";

            const parent =
                image.parentElement;

            if (parent) {

                parent.style.background =
                    "#eeeeee";

            }

        });

    });



    /* =====================================================
       SMOOTH ANCHOR SCROLL
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");


            if (
                targetId === "#"
                || !targetId
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (target) {

                event.preventDefault();


                const headerHeight =
                    document.querySelector(
                        ".work-header"
                    ).offsetHeight;


                const targetPosition =
                    target.getBoundingClientRect().top
                    + window.scrollY
                    - headerHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }

        });

    });


});




/* ==================================================
   ABOUT IMAGE CAROUSEL
================================================== */

const aboutSlides =
    document.querySelectorAll(".about-slide");

const carouselDots =
    document.querySelectorAll(".carousel-dot");

let aboutSlideIndex = 0;


if (aboutSlides.length > 1) {

    function showAboutSlide(index) {

        aboutSlides.forEach(function(slide) {

            slide.classList.remove("active");

        });


        carouselDots.forEach(function(dot) {

            dot.classList.remove("active");

        });


        aboutSlides[index]
            .classList.add("active");


        if (carouselDots[index]) {

            carouselDots[index]
                .classList.add("active");

        }

    }


    setInterval(function() {

        aboutSlideIndex =
            (aboutSlideIndex + 1)
            % aboutSlides.length;

        showAboutSlide(aboutSlideIndex);

    }, 3000);


    /* Allow dots to be clicked */

    carouselDots.forEach(function(dot, index) {

        dot.addEventListener("click", function() {

            aboutSlideIndex = index;

            showAboutSlide(aboutSlideIndex);

        });

    });

}

