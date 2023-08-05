import * as THREE from "https://unpkg.com/three/build/three.module.js";

let isMouseDown = false;
let lastMouseX = 0;
let lastMouseY = 0;

// cenas
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

// câmera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// Para aplicativos de alto desempenho, você pode fornecer valores menores para o setSize, como window.innerWidth/2 e window.innerHeight/2 - 1/4 ou colocar o terceiro argumento como false
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);

const material = new THREE.MeshBasicMaterial({
    color: 0x1e7e73,
    wireframe: true,
});

const cube = new THREE.Mesh(geometry, material);

scene.add(cube); // adicionado na coordenada (0, 0, 0)

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

document.body.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "a") {
        cube.rotation.y -= 0.08;
    }

    if (e.key === "ArrowRight" || e.key === "d") {
        cube.rotation.y += 0.08;
    }
    if (e.key === "ArrowUp" || e.key === "w") {
        cube.rotation.x -= 0.08;
    }

    if (e.key === "ArrowDown" || e.key === "s") {
        cube.rotation.x += 0.08;
    }
});

document.body.addEventListener("mouseup", (e) => {
    isMouseDown = false;
});

document.body.addEventListener("mousemove", (e) => {
    if (isMouseDown) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const movementX = mouseX - lastMouseX;
        const movementY = mouseY - lastMouseY;

        cube.rotation.y += movementX * 0.01;
        cube.rotation.x += movementY * 0.01;

        lastMouseX = mouseX;
        lastMouseY = mouseY;
    }
});

document.body.addEventListener("mousedown", (e) => {
    isMouseDown = true;

    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
});
