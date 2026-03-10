import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Sparkles, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { createTShirtGeometry } from '../lib/geometry';
import { motion } from 'motion/react';

function TShirtModel() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => createTShirtGeometry(), []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        (state.mouse.x * Math.PI) / 4,
        0.05
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        -(state.mouse.y * Math.PI) / 8,
        0.05
      );
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} geometry={geometry} scale={0.8}>
        <meshStandardMaterial
          color="#111111"
          roughness={0.8}
          metalness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>
    </Float>
  );
}

export function Hero3D() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-ink-bg">
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#b026ff" />
          <pointLight position={[10, -10, -10]} intensity={0.5} color="#00f0ff" />
          
          <TShirtModel />
          
          <Sparkles count={100} scale={12} size={2} speed={0.4} opacity={0.5} color="#b026ff" />
          <Sparkles count={100} scale={12} size={2} speed={0.4} opacity={0.5} color="#00f0ff" />
          
          <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center pointer-events-none px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-display font-bold tracking-tighter uppercase leading-[0.85] mb-6 text-white mix-blend-difference">
            Ink Your <br />
            <span className="text-gradient">Story</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-2xl text-ink-text-muted font-light max-w-2xl mx-auto mb-10 pointer-events-auto"
        >
          Premium Custom Apparel for Brands, Teams, and Creators.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pointer-events-auto"
        >
          <button className="group relative px-10 py-5 bg-white text-black rounded-full font-display font-bold text-lg overflow-hidden transition-transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)]">
            <span className="relative z-10">Start Designing</span>
            <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-20 transition-opacity" />
          </button>
          
          <button className="group px-10 py-5 bg-transparent text-white border border-white/20 rounded-full font-display font-bold text-lg hover:bg-white/10 transition-colors">
            Explore Products
          </button>
        </motion.div>
      </div>
    </section>
  );
}
