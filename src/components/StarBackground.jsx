import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import StarField from './StarField';

export default function StarBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 1] }} gl={{ alpha: true }}>
                <Suspense fallback={null}>
                    <StarField />
                </Suspense>
            </Canvas>
        </div>
    );
}
