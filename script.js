// Create the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Change background to black

// Create a camera, which determines what we'll see when we render the scene
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer and attach it to our document
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add a basic light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10).normalize();
scene.add(light);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);

// Create materials
const whiteMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

// Function to create the rook
function createRook() {
    const rookGroup = new THREE.Group();

    // Base
    const baseGeometry = new THREE.CylinderGeometry(1, 1, 0.3, 32);
    const base = new THREE.Mesh(baseGeometry, whiteMaterial);
    rookGroup.add(base);

    // Lower body
    const lowerBodyGeometry = new THREE.CylinderGeometry(0.8, 1, 0.5, 32);
    const lowerBody = new THREE.Mesh(lowerBodyGeometry, whiteMaterial);
    lowerBody.position.y = 0.4;
    rookGroup.add(lowerBody);

    // Middle body
    const middleBodyGeometry = new THREE.CylinderGeometry(0.7, 0.8, 1.5, 32);
    const middleBody = new THREE.Mesh(middleBodyGeometry, whiteMaterial);
    middleBody.position.y = 1.4;
    rookGroup.add(middleBody);

    // Top
    const topGeometry = new THREE.CylinderGeometry(0.8, 0.7, 0.2, 32);
    const top = new THREE.Mesh(topGeometry, whiteMaterial);
    top.position.y = 2.5;
    rookGroup.add(top);

    // Crown
    const crownGeometry = new THREE.CylinderGeometry(0.9, 0.8, 0.3, 32, 1, true);
    const crown = new THREE.Mesh(crownGeometry, whiteMaterial);
    crown.position.y = 2.75;
    rookGroup.add(crown);

    // Notches on the crown
    const notchGeometry = new THREE.BoxGeometry(0.2, 0.3, 0.1);
    for (let i = 0; i < 6; i++) {
        const notch = new THREE.Mesh(notchGeometry, whiteMaterial);
        notch.position.set(Math.cos(i * Math.PI / 3) * 0.75, 2.9, Math.sin(i * Math.PI / 3) * 0.75);
        notch.rotation.y = i * Math.PI / 3;
        rookGroup.add(notch);
    }

    return rookGroup;
}

// Add the rook to the scene
const rook = createRook();
scene.add(rook);

// Create a platform
const platformGeometry = new THREE.CylinderGeometry(1.5, 1.5, 0.1, 32);
const platformMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
const platform = new THREE.Mesh(platformGeometry, platformMaterial);
platform.position.y = -0.15;
scene.add(platform);

// Ensure the rook is above the platform
rook.position.y = 0.05; // This ensures the base of the rook sits on the platform

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
