import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import classes from './style.module.scss';

export interface IImageViewer360Props {
    imageUrl: string;
}

export default function ImageViewer360({ imageUrl }: IImageViewer360Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const isDragging = useRef(false);
    const previousX = useRef(0);
    const previousY = useRef(0);
    const quaternion = useRef(new THREE.Quaternion());
    const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Initialize Three.js scene
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Setup camera
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.z = 0.1;
        cameraRef.current = camera;

        // Set initial rotation to center the view
        quaternion.current.setFromEuler(new THREE.Euler(0, Math.PI + Math.PI/2, 0, 'YXZ'));

        // Setup renderer with basic settings to preserve original image quality
        const renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            powerPreference: 'high-performance',
            precision: 'highp',
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Load environment texture with minimal processing
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(imageUrl, () => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            texture.colorSpace = THREE.LinearSRGBColorSpace;
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.generateMipmaps = false;
            scene.background = texture;
        });

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            camera.quaternion.copy(quaternion.current);
            renderer.render(scene, camera);
        };
        animate();

        // Event handlers
        const handleMouseDown = (e: MouseEvent) => {
            isDragging.current = true;
            previousX.current = e.clientX;
            previousY.current = e.clientY;
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging.current) return;

            const deltaX = e.clientX - previousX.current;
            const deltaY = e.clientY - previousY.current;
            
            // Convert rotation to radians
            const rotationX = -deltaY * 0.5 * Math.PI / 180;
            const rotationY = -deltaX * 0.5 * Math.PI / 180;

            if (e.shiftKey) {
                // Z-axis rotation when holding Shift
                const rotationZ = rotationY;
                const deltaRotation = new THREE.Quaternion().setFromEuler(
                    new THREE.Euler(0, 0, rotationZ, 'YXZ')
                );
                quaternion.current.multiply(deltaRotation);
            } else {
                // Apply rotations in the correct order
                const deltaRotation = new THREE.Quaternion()
                    .setFromEuler(new THREE.Euler(rotationX, 0, 0, 'YXZ'))
                    .multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(0, rotationY, 0, 'YXZ')));
                quaternion.current.multiply(deltaRotation);
            }
            
            previousX.current = e.clientX;
            previousY.current = e.clientY;
        };

        const handleMouseUp = () => {
            isDragging.current = false;
        };

        // Handle window resize
        const handleResize = () => {
            if (!container || !camera || !renderer) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };

        container.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('resize', handleResize);

        return () => {
            container.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
            container.removeChild(renderer.domElement);
        };
    }, [imageUrl]);

    return <div ref={containerRef} className={classes.viewer360Container} />;
}