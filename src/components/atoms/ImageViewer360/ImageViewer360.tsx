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
    const rotationAngle = useRef(0);

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

        // Setup renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Load HDRI environment
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(imageUrl, () => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            scene.background = texture;
        });

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            camera.rotation.y = THREE.MathUtils.degToRad(rotationAngle.current);
            renderer.render(scene, camera);
        };
        animate();

        // Event handlers
        const handleMouseDown = (e: MouseEvent) => {
            isDragging.current = true;
            previousX.current = e.clientX;
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging.current) return;

            const deltaX = e.clientX - previousX.current;
            rotationAngle.current = (rotationAngle.current + deltaX * 0.5) % 360;
            previousX.current = e.clientX;
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