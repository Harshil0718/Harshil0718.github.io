import * as THREE from "three";


/* =========================================================
   DOM
========================================================= */

const canvas =
    document.getElementById("three-canvas");

const intro =
    document.getElementById("intro");

const portfolio =
    document.getElementById("portfolio");

const screenUI =
    document.getElementById("screen-ui");

const enterButton =
    document.getElementById("enter-button");

const progressBar =
    document.getElementById("assembly-progress");

const assemblyLabel =
    document.getElementById("assembly-label");

const systemStatus =
    document.getElementById("system-status");


/* =========================================================
   THREE.JS SCENE
========================================================= */

const scene =
    new THREE.Scene();


scene.background =
    new THREE.Color(0x050605);


/* =========================================================
   CAMERA
========================================================= */

const camera =
    new THREE.PerspectiveCamera(
        38,
        window.innerWidth /
        window.innerHeight,
        0.1,
        1000
    );


camera.position.set(
    0,
    2.2,
    14
);


camera.lookAt(
    0,
    1,
    0
);


/* =========================================================
   RENDERER
========================================================= */

const renderer =
    new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true
    });


renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);


renderer.setSize(
    window.innerWidth,
    window.innerHeight
);


renderer.outputColorSpace =
    THREE.SRGBColorSpace;


/* =========================================================
   LIGHTING
========================================================= */

const ambientLight =
    new THREE.AmbientLight(
        0x91a394,
        1.8
    );


scene.add(
    ambientLight
);


const keyLight =
    new THREE.DirectionalLight(
        0xdfffe9,
        4
    );


keyLight.position.set(
    4,
    8,
    10
);


scene.add(
    keyLight
);


const rimLight =
    new THREE.PointLight(
        0x70efae,
        10,
        25
    );


rimLight.position.set(
    -5,
    4,
    5
);


scene.add(
    rimLight
);


const sideLight =
    new THREE.PointLight(
        0x7a8b80,
        7,
        20
    );


sideLight.position.set(
    6,
    1,
    -4
);


scene.add(
    sideLight
);


/* =========================================================
   MATERIALS
========================================================= */

const bodyMaterial =
    new THREE.MeshStandardMaterial({

        color:
            0x1b201c,

        metalness:
            0.8,

        roughness:
            0.25

    });


const darkMaterial =
    new THREE.MeshStandardMaterial({

        color:
            0x0d100e,

        metalness:
            0.7,

        roughness:
            0.3

    });


const edgeMaterial =
    new THREE.MeshStandardMaterial({

        color:
            0x465149,

        metalness:
            0.9,

        roughness:
            0.2

    });


const keyboardMaterial =
    new THREE.MeshStandardMaterial({

        color:
            0x080a08,

        metalness:
            0.35,

        roughness:
            0.5

    });


const greenMaterial =
    new THREE.MeshStandardMaterial({

        color:
            0x75efb0,

        emissive:
            0x286a4b,

        emissiveIntensity:
            1.5,

        metalness:
            0.2,

        roughness:
            0.25

    });


const screenMaterial =
    new THREE.MeshStandardMaterial({

        color:
            0x08100b,

        emissive:
            0x123c27,

        emissiveIntensity:
            0.8,

        metalness:
            0.1,

        roughness:
            0.2

    });


/* =========================================================
   MAIN LAPTOP GROUP
========================================================= */

const laptop =
    new THREE.Group();


scene.add(
    laptop
);


/* =========================================================
   HELPERS
========================================================= */

function box(
    width,
    height,
    depth,
    material
) {

    return new THREE.Mesh(
        new THREE.BoxGeometry(
            width,
            height,
            depth
        ),
        material
    );

}


function cylinder(
    radius,
    height,
    material
) {

    return new THREE.Mesh(
        new THREE.CylinderGeometry(
            radius,
            radius,
            height,
            32
        ),
        material
    );

}


/* =========================================================
   LAPTOP BASE
========================================================= */

const base =
    box(
        9.6,
        .55,
        6.3,
        bodyMaterial
    );


base.position.set(
    0,
    0,
    0
);


laptop.add(
    base
);


/* bottom edge */

const bottomEdge =
    box(
        9.3,
        .12,
        6.05,
        edgeMaterial
    );


bottomEdge.position.y =
    -.32;


laptop.add(
    bottomEdge
);


/* =========================================================
   KEYBOARD DECK
========================================================= */

const deck =
    box(
        8.9,
        .12,
        4.6,
        darkMaterial
    );


deck.position.set(
    0,
    .34,
    -.2
);


laptop.add(
    deck
);


/* =========================================================
   KEYBOARD
========================================================= */

const keyboard =
    new THREE.Group();


keyboard.position.set(
    0,
    .43,
    -.85
);


laptop.add(
    keyboard
);


const keyGeometry =
    new THREE.BoxGeometry(
        .48,
        .08,
        .27
    );


for (
    let row = 0;
    row < 5;
    row++
) {


    const columns =
        row === 4
            ? 11
            : 13;


    for (
        let column = 0;
        column < columns;
        column++
    ) {


        const key =
            new THREE.Mesh(
                keyGeometry,
                keyboardMaterial
            );


        const totalWidth =
            columns * .58;


        key.position.x =
            column * .58 -
            totalWidth / 2 +
            .29;


        key.position.z =
            row * .36;


        keyboard.add(
            key
        );

    }

}


/* =========================================================
   SPACE BAR
========================================================= */

const spaceBar =
    box(
        2.5,
        .08,
        .27,
        keyboardMaterial
    );


spaceBar.position.set(
    0,
    .04,
    1.85
);


keyboard.add(
    spaceBar
);


/* =========================================================
   TRACKPAD
========================================================= */

const trackpad =
    box(
        2.5,
        .05,
        1.55,
        edgeMaterial
    );


trackpad.position.set(
    0,
    .41,
    1.7
);


laptop.add(
    trackpad
);


/* =========================================================
   SCREEN GROUP
========================================================= */

const screenGroup =
    new THREE.Group();


screenGroup.position.set(
    0,
    .55,
    -3.05
);


screenGroup.rotation.x =
    THREE.MathUtils.degToRad(
        -12
    );


laptop.add(
    screenGroup
);


/* =========================================================
   SCREEN BACK
========================================================= */

const screenBack =
    box(
        9.1,
        5.7,
        .38,
        bodyMaterial
    );


screenBack.position.set(
    0,
    2.8,
    0
);


screenGroup.add(
    screenBack
);


/* =========================================================
   SCREEN BORDER
========================================================= */

const screenBorder =
    box(
        8.6,
        5.2,
        .08,
        edgeMaterial
    );


screenBorder.position.set(
    0,
    2.8,
    -.23
);


screenGroup.add(
    screenBorder
);


/* =========================================================
   SCREEN
========================================================= */

const screen =
    box(
        8.15,
        4.75,
        .05,
        screenMaterial
    );


screen.position.set(
    0,
    2.8,
    -.29
);


screenGroup.add(
    screen
);


/* =========================================================
   SCREEN GLOW
========================================================= */

const screenGlow =
    box(
        7.8,
        4.4,
        .02,
        greenMaterial
    );


screenGlow.position.set(
    0,
    2.8,
    -.33
);


screenGlow.material =
    screenGlow.material.clone();


screenGlow.material.transparent =
    true;


screenGlow.material.opacity =
    0.04;


screenGroup.add(
    screenGlow
);


/* =========================================================
   CAMERA
========================================================= */

const cameraDot =
    cylinder(
        .06,
        .03,
        darkMaterial
    );


cameraDot.rotation.x =
    Math.PI / 2;


cameraDot.position.set(
    0,
    5.47,
    -.35
);


screenGroup.add(
    cameraDot
);


/* =========================================================
   HINGES
========================================================= */

const leftHinge =
    cylinder(
        .22,
        1.2,
        darkMaterial
    );


leftHinge.rotation.z =
    Math.PI / 2;


leftHinge.position.set(
    -3.5,
    .5,
    -3
);


laptop.add(
    leftHinge
);


const rightHinge =
    leftHinge.clone();


rightHinge.position.x =
    3.5;


laptop.add(
    rightHinge
);


/* =========================================================
   FLOATING ASSEMBLY PARTS
========================================================= */

const parts = [];


function createFloatingPart(
    size,
    color,
    position,
    rotation,
    target
) {


    const mesh =
        box(
            size.x,
            size.y,
            size.z,
            color
        );


    mesh.position.copy(
        position
    );


    mesh.rotation.set(
        rotation.x,
        rotation.y,
        rotation.z
    );


    scene.add(
        mesh
    );


    parts.push({

        mesh,

        start:
            position.clone(),

        startRotation:
            new THREE.Euler(
                rotation.x,
                rotation.y,
                rotation.z
            ),

        target:
            target.clone(),

        targetRotation:
            new THREE.Euler(
                0,
                0,
                0
            )

    });


    return mesh;

}


/* left piece */

createFloatingPart(

    new THREE.Vector3(
        1.8,
        .22,
        .45
    ),

    edgeMaterial,

    new THREE.Vector3(
        -8,
        2.5,
        -1
    ),

    new THREE.Euler(
        .7,
        0,
        -.6
    ),

    new THREE.Vector3(
        -4.9,
        .4,
        0
    )

);


/* right piece */

createFloatingPart(

    new THREE.Vector3(
        1.8,
        .22,
        .45
    ),

    edgeMaterial,

    new THREE.Vector3(
        8,
        3,
        -1
    ),

    new THREE.Euler(
        -.6,
        0,
        .7
    ),

    new THREE.Vector3(
        4.9,
        .4,
        0
    )

);


/* top piece */

createFloatingPart(

    new THREE.Vector3(
        1.4,
        .18,
        .35
    ),

    bodyMaterial,

    new THREE.Vector3(
        2,
        7,
        -1
    ),

    new THREE.Euler(
        .5,
        .2,
        .4
    ),

    new THREE.Vector3(
        3.2,
        5.5,
        0
    )

);


/* bottom piece */

createFloatingPart(

    new THREE.Vector3(
        1.5,
        .18,
        .35
    ),

    bodyMaterial,

    new THREE.Vector3(
        -2,
        -5,
        -1
    ),

    new THREE.Euler(
        -.5,
        .4,
        -.5
    ),

    new THREE.Vector3(
        -3.2,
        -.1,
        0
    )

);


/* =========================================================
   ASSEMBLY STATES
========================================================= */

const timeline = {

    chassis:
        0.0,

    floatingParts:
        0.20,

    screen:
        0.40,

    base:
        0.62,

    hinges:
        0.78,

    complete:
        0.92

};


/* =========================================================
   EASING
========================================================= */

function easeOutCubic(
    t
) {

    return 1 -
        Math.pow(
            1 - t,
            3
        );

}


function easeInOutCubic(
    t
) {

    return t < .5

        ? 4 * t * t * t

        : 1 -
          Math.pow(
              -2 * t + 2,
              3
          ) / 2;

}


/* =========================================================
   ASSEMBLY VARIABLES
========================================================= */

const startTime =
    performance.now();


const assemblyDuration =
    7000;


let assemblyFinished =
    false;


/* =========================================================
   ORIGINAL TRANSFORMS
========================================================= */

const baseFinal =
    new THREE.Vector3(
        0,
        0,
        0
    );


const screenFinal =
    new THREE.Vector3(
        0,
        .55,
        -3.05
    );


const floatingFinals =
    parts.map(
        part =>
            part.target.clone()
    );


/* =========================================================
   ANIMATE LAPTOP
========================================================= */

function updateAssembly(
    elapsed
) {


    const progress =
        Math.min(
            elapsed /
            assemblyDuration,
            1
        );


    /* ----------------------------------------------
       PROGRESS UI
    ---------------------------------------------- */

    const percent =
        Math.floor(
            progress * 100
        );


    progressBar.style.width =
        `${percent}%`;


    if (
        progress < .2
    ) {

        systemStatus.textContent =
            "ASSEMBLING CHASSIS...";

        assemblyLabel.textContent =
            `ASSEMBLING CHASSIS · ${String(percent).padStart(3,"0")}%`;

    }

    else if (
        progress < .42
    ) {

        systemStatus.textContent =
            "CONNECTING COMPONENTS...";

        assemblyLabel.textContent =
            `CONNECTING COMPONENTS · ${String(percent).padStart(3,"0")}%`;

    }

    else if (
        progress < .65
    ) {

        systemStatus.textContent =
            "ASSEMBLING DISPLAY...";

        assemblyLabel.textContent =
            `ASSEMBLING DISPLAY · ${String(percent).padStart(3,"0")}%`;

    }

    else if (
        progress < .82
    ) {

        systemStatus.textContent =
            "CALIBRATING HARDWARE...";

        assemblyLabel.textContent =
            `CALIBRATING HARDWARE · ${String(percent).padStart(3,"0")}%`;

    }

    else {

        systemStatus.textContent =
            "SYSTEM READY.";

        assemblyLabel.textContent =
            `SYSTEM ONLINE · ${String(percent).padStart(3,"0")}%`;

    }


    /* ----------------------------------------------
       BASE ENTRY
    ---------------------------------------------- */

    const baseStart =
        0;


    const baseEnd =
        .35;


    const baseProgress =
        THREE.MathUtils.clamp(
            (
                progress -
                baseStart
            ) /
            (
                baseEnd -
                baseStart
            ),
            0,
            1
        );


    const baseEase =
        easeOutCubic(
            baseProgress
        );


    base.position.y =
        THREE.MathUtils.lerp(
            -3.5,
            0,
            baseEase
        );


    base.rotation.z =
        THREE.MathUtils.lerp(
            -.25,
            0,
            baseEase
        );


    base.scale.setScalar(
        THREE.MathUtils.lerp(
            .65,
            1,
            baseEase
        )
    );


    /* ----------------------------------------------
       SCREEN ENTRY
    ---------------------------------------------- */

    const screenStart =
        .20;


    const screenEnd =
        .55;


    const screenProgress =
        THREE.MathUtils.clamp(
            (
                progress -
                screenStart
            ) /
            (
                screenEnd -
                screenStart
            ),
            0,
            1
        );


    const screenEase =
        easeOutCubic(
            screenProgress
        );


    screenGroup.position.y =
        THREE.MathUtils.lerp(
            6,
            .55,
            screenEase
        );


    screenGroup.position.z =
        THREE.MathUtils.lerp(
            -5.5,
            -3.05,
            screenEase
        );


    screenGroup.rotation.x =
        THREE.MathUtils.lerp(
            -.45,
            THREE.MathUtils.degToRad(-12),
            screenEase
        );


    /* ----------------------------------------------
       FLOATING PARTS
    ---------------------------------------------- */

    parts.forEach(
        (part, index) => {


            const delay =
                .20 +
                index * .035;


            const duration =
                .38;


            const partProgress =
                THREE.MathUtils.clamp(
                    (
                        progress -
                        delay
                    ) /
                    duration,
                    0,
                    1
                );


            const eased =
                easeOutCubic(
                    partProgress
                );


            part.mesh.position.lerpVectors(
                part.start,
                part.target,
                eased
            );


            part.mesh.rotation.x =
                THREE.MathUtils.lerp(
                    part.startRotation.x,
                    0,
                    eased
                );


            part.mesh.rotation.y =
                THREE.MathUtils.lerp(
                    part.startRotation.y,
                    0,
                    eased
                );


            part.mesh.rotation.z =
                THREE.MathUtils.lerp(
                    part.startRotation.z,
                    0,
                    eased
                );


            part.mesh.scale.setScalar(
                THREE.MathUtils.lerp(
                    .7,
                    1,
                    eased
                )
            );


            if (
                eased >= 1
            ) {

                part.mesh.visible =
                    false;

            }

        }
    );


    /* ----------------------------------------------
       HINGES
    ---------------------------------------------- */

    const hingeStart =
        .48;


    const hingeProgress =
        THREE.MathUtils.clamp(
            (
                progress -
                hingeStart
            ) /
            .25,
            0,
            1
        );


    leftHinge.position.x =
        THREE.MathUtils.lerp(
            -6,
            -3.5,
            hingeProgress
        );


    rightHinge.position.x =
        THREE.MathUtils.lerp(
            6,
            3.5,
            hingeProgress
        );


    /* ----------------------------------------------
       FINISH
    ---------------------------------------------- */

    if (
        progress >= 1 &&
        !assemblyFinished
    ) {

        assemblyFinished =
            true;


        setTimeout(
            () => {

                screenUI.classList.add(
                    "visible"
                );

            },
            350
        );

    }

}


/* =========================================================
   REAL-TIME MOUSE PARALLAX
========================================================= */

let mouseX =
    0;

let mouseY =
    0;


let targetMouseX =
    0;

let targetMouseY =
    0;


window.addEventListener(
    "pointermove",
    event => {

        targetMouseX =
            (
                event.clientX /
                window.innerWidth
                -
                .5
            );


        targetMouseY =
            (
                event.clientY /
                window.innerHeight
                -
                .5
            );

    }
);


/* =========================================================
   ANIMATION LOOP
========================================================= */

const clock =
    new THREE.Clock();


function animate() {


    requestAnimationFrame(
        animate
    );


    const elapsed =
        performance.now() -
        startTime;


    updateAssembly(
        elapsed
    );


    /* mouse smoothing */

    mouseX +=
        (
            targetMouseX -
            mouseX
        ) * .035;


    mouseY +=
        (
            targetMouseY -
            mouseY
        ) * .035;


    /* laptop subtle floating */

    laptop.rotation.y =
        mouseX * .08;


    laptop.rotation.x =
        mouseY * .025;


    laptop.position.y =
        Math.sin(
            elapsed * .001
        ) * .035;


    /* screen glow pulse */

    screenGlow.material.opacity =
        .035 +
        Math.sin(
            elapsed * .002
        ) * .015;


    /* camera movement */

    camera.position.x +=
        (
            mouseX * 1.3 -
            camera.position.x
        ) * .015;


    camera.position.y +=
        (
            2.2 -
            mouseY * .5 -
            camera.position.y
        ) * .015;


    camera.lookAt(
        0,
        1.7,
        0
    );


    renderer.render(
        scene,
        camera
    );

}


animate();


/* =========================================================
   ENTER PORTFOLIO
========================================================= */

function enterPortfolio() {


    if (
        !assemblyFinished
    ) {

        return;

    }


    enterButton.textContent =
        "OPENING PORTFOLIO...";


    enterButton.style.pointerEvents =
        "none";


    setTimeout(
        () => {

            intro.classList.add(
                "exit"
            );


            portfolio.classList.add(
                "visible"
            );


        },
        300
    );


    setTimeout(
        () => {

            window.scrollTo({
                top: 0,
                behavior: "instant"
            });

        },
        1100
    );

}


enterButton.addEventListener(
    "click",
    enterPortfolio
);


/* =========================================================
   ENTER KEY
========================================================= */

window.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter"
        ) {

            enterPortfolio();

        }

    }
);


/* =========================================================
   RESIZE
========================================================= */

function resize() {


    camera.aspect =
        window.innerWidth /
        window.innerHeight;


    camera.updateProjectionMatrix();


    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );

}


window.addEventListener(
    "resize",
    resize
);


/* =========================================================
   NAVIGATION
========================================================= */

document
    .querySelectorAll(
        ".navbar a[href^='#']"
    )
    .forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    event.preventDefault();


                    const target =
                        document.querySelector(
                            link.getAttribute(
                                "href"
                            )
                        );


                    if (
                        target
                    ) {

                        target.scrollIntoView({
                            behavior:
                                "smooth"
                        });

                    }

                }
            );

        }
    );


/* =========================================================
   PROJECT HOVER
========================================================= */

document
    .querySelectorAll(
        ".project"
    )
    .forEach(
        project => {

            project.addEventListener(
                "mouseenter",
                () => {

                    project.style.transform =
                        "translateX(10px)";

                }
            );


            project.addEventListener(
                "mouseleave",
                () => {

                    project.style.transform =
                        "translateX(0)";

                }
            );

        }
    );


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealItems =
    document.querySelectorAll(
        ".about-layout, .skill-card, .project, .education-card, .contact-content"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                    }

                }
            );

        },
        {
            threshold:
                .12
        }
    );


revealItems.forEach(
    element => {

        element.style.opacity =
            "0";

        element.style.transform =
            "translateY(35px)";

        element.style.transition =
            "opacity .8s ease, transform .8s ease";

        observer.observe(
            element
        );

    }
);
