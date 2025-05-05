import { useEffect, useRef } from 'react';
import classes from './style.module.scss';

export interface IImageViewer360Props {
    imageUrl: string;
}

export default function ImageViewer360({ imageUrl }: IImageViewer360Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const previousX = useRef(0);
    const rotationDegree = useRef(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseDown = (e: MouseEvent) => {
            isDragging.current = true;
            previousX.current = e.clientX;
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging.current) return;

            const deltaX = e.clientX - previousX.current;
            rotationDegree.current = (rotationDegree.current + deltaX * 0.5) % 360;
            container.style.transform = `rotateY(${rotationDegree.current}deg)`;
            previousX.current = e.clientX;
        };

        const handleMouseUp = () => {
            isDragging.current = false;
        };

        container.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            container.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <div className={classes.viewer360Container}>
            <div
                ref={containerRef}
                className={classes.viewer360}
                style={{
                    backgroundImage: `url(${imageUrl})`,
                }}
            />
        </div>
    );
}