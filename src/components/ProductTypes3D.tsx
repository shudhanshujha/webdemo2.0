import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Center } from '@react-three/drei';
import * as THREE from 'three';
import { createTShirtGeometry } from '../lib/geometry';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const products = [
  { id: 1, title: 'T-Shirts', desc: 'Premium cotton blends', color: '#1a1a1a' },
  { id: 2, title: 'Hoodies', desc: 'Heavyweight fleece', color: '#f5f5f5' },
  { id: 3, title: 'Oversized Tees', desc: 'Relaxed modern fit', color: '#b026ff' },
  { id: 4, title: 'Corporate', desc: 'Professional apparel', color: '#00f0ff' },
];

function MiniModel({ color, hovered }: { color: string; hovered: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometry = useMemo(() => createTShirtGeometry(), []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      if (hovered) {
        meshRef.current.rotation.y += delta * 2;
      } else {
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.1);
      }
    }
  });

  return (
    <Float speed={hovered ? 4 : 2} rotationIntensity={hovered ? 1 : 0.5} floatIntensity={hovered ? 2 : 1}>
      <Center>
        <mesh ref={meshRef} geometry={geometry} scale={0.6}>
          <meshStandardMaterial
            color={color}
            roughness={0.7}
            metalness={0.2}
            envMapIntensity={1.5}
          />
        </mesh>
      </Center>
    </Float>
  );
}

export function ProductTypes3D() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="products" className="py-32 px-6 bg-ink-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight">
              Our <span className="text-gradient">Collections</span>
            </h2>
            <p className="text-ink-text-muted mt-4 max-w-md text-lg">
              Discover our range of premium apparel designed to elevate your brand identity.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onHoverStart={() => setHoveredId(product.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer bg-ink-bg border border-ink-border"
            >
              {/* 3D Canvas Background */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                  <Environment preset="city" />
                  <MiniModel color={product.color} hovered={hoveredId === product.id} />
                </Canvas>
                <div className="absolute inset-0 bg-gradient-to-t from-ink-bg via-ink-bg/40 to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end">
                <motion.div
                  animate={{
                    y: hoveredId === product.id ? -10 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <h3 className="text-2xl font-display font-bold mb-2">{product.title}</h3>
                  <p className="text-sm text-ink-text-muted mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {product.desc}
                  </p>
                  
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-white group-hover:text-black transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </motion.div>
              </div>

              {/* Glowing Border Effect */}
              <div
                className={`absolute inset-0 rounded-2xl border-2 border-transparent transition-colors duration-300 pointer-events-none ${
                  hoveredId === product.id ? "border-accent-purple/50 shadow-[0_0_30px_rgba(176,38,255,0.3)]" : ""
                }`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
