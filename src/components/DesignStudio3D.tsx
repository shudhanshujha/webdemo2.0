import React, { useState, useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Decal, useTexture, Center, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { createTShirtGeometry } from '../lib/geometry';
import { motion, AnimatePresence } from 'motion/react';
import { Palette, Upload, Type, Move, Maximize, RotateCw, Trash2 } from 'lucide-react';

// --- 3D Components ---

function TShirtMesh({ color, decals, onPointerDown }: any) {
  const geometry = useMemo(() => createTShirtGeometry(), []);
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      onPointerDown={onPointerDown}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color={color}
        roughness={0.8}
        metalness={0.1}
        envMapIntensity={1.5}
      />
      {decals.map((decal: any, index: number) => (
        <Decal
          key={decal.id}
          position={decal.position}
          rotation={decal.rotation}
          scale={decal.scale}
        >
          <meshStandardMaterial
            map={decal.texture}
            transparent
            polygonOffset
            polygonOffsetFactor={-1}
            roughness={0.5}
            metalness={0.1}
          />
        </Decal>
      ))}
    </mesh>
  );
}

function Scene({ color, decals, onAddDecal }: any) {
  const { camera } = useThree();

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    if (onAddDecal && e.face) {
      // Calculate position and normal
      const position = e.point.clone();
      const normal = e.face.normal.clone();
      // Transform normal to world space
      const n = new THREE.Matrix3().getNormalMatrix(e.object.matrixWorld);
      normal.applyMatrix3(n).normalize();
      
      // Calculate rotation to face the normal
      const dummy = new THREE.Object3D();
      dummy.position.copy(position);
      dummy.lookAt(position.clone().add(normal));
      
      onAddDecal(position, dummy.rotation);
    }
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <Environment preset="studio" />
      
      <Center>
        <TShirtMesh color={color} decals={decals} onPointerDown={handlePointerDown} />
      </Center>
      
      <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
      <OrbitControls makeDefault minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.5} enablePan={false} />
    </>
  );
}

// --- UI Components ---

const COLORS = [
  { name: 'Onyx Black', value: '#1a1a1a' },
  { name: 'Arctic White', value: '#f5f5f5' },
  { name: 'Neon Purple', value: '#b026ff' },
  { name: 'Electric Blue', value: '#00f0ff' },
  { name: 'Crimson Red', value: '#ff264a' },
];

export function DesignStudio3D() {
  const [color, setColor] = useState(COLORS[0].value);
  const [decals, setDecals] = useState<any[]>([]);
  const [activeTool, setActiveTool] = useState<'color' | 'upload' | 'text' | null>('color');
  const [pendingTexture, setPendingTexture] = useState<THREE.Texture | null>(null);
  const [isPlacing, setIsPlacing] = useState(false);

  const handleAddText = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'transparent';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = 'bold 80px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 10;
      ctx.fillText('INK.CO', canvas.width / 2, canvas.height / 2);
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      setPendingTexture(texture);
      setIsPlacing(true);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const loader = new THREE.TextureLoader();
      loader.load(url, (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        setPendingTexture(texture);
        setIsPlacing(true);
      });
    }
  };

  const handleAddDecal = (position: THREE.Vector3, rotation: THREE.Euler) => {
    if (isPlacing && pendingTexture) {
      setDecals([
        ...decals,
        {
          id: Date.now(),
          position,
          rotation,
          scale: [2, 2, 2], // default scale
          texture: pendingTexture,
        },
      ]);
      setIsPlacing(false);
      setPendingTexture(null);
    }
  };

  const removeDecal = (id: number) => {
    setDecals(decals.filter(d => d.id !== id));
  };

  return (
    <section id="design" className="relative h-screen w-full bg-ink-bg overflow-hidden flex flex-col md:flex-row">
      {/* 3D Canvas Area */}
      <div className="relative flex-1 h-full cursor-grab active:cursor-grabbing">
        <Canvas camera={{ position: [0, 0, 12], fov: 40 }} shadows>
          <Suspense fallback={null}>
            <Scene color={color} decals={decals} onAddDecal={handleAddDecal} />
          </Suspense>
        </Canvas>
        
        {isPlacing && (
          <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-accent-purple text-white px-6 py-3 rounded-full font-medium shadow-lg animate-pulse pointer-events-none z-10">
            Click on the T-Shirt to place your design
          </div>
        )}
      </div>

      {/* Sidebar Controls */}
      <div className="w-full md:w-96 bg-ink-surface border-l border-ink-border h-full flex flex-col z-10">
        <div className="p-8 border-b border-ink-border">
          <h2 className="text-3xl font-display font-bold uppercase tracking-tight mb-2">
            Design <span className="text-gradient">Studio</span>
          </h2>
          <p className="text-ink-text-muted text-sm">Customize your apparel in real-time 3D.</p>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-10">
          {/* Colors */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Palette className="w-5 h-5 text-accent-purple" />
              <h3 className="text-xl font-display font-semibold">Fabric Color</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {COLORS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.value)}
                  className={`w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                    color === c.value
                      ? 'border-white scale-110 shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                      : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.value }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* Upload & Text */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Upload className="w-5 h-5 text-accent-blue" />
              <h3 className="text-xl font-display font-semibold">Add Graphics</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-ink-border rounded-2xl hover:border-accent-blue hover:bg-white/5 transition-colors cursor-pointer group">
                <Upload className="w-6 h-6 text-ink-text-muted group-hover:text-accent-blue mb-2 transition-colors" />
                <span className="text-sm font-medium">Upload Image</span>
                <input type="file" className="hidden" accept="image/png, image/jpeg" onChange={handleFileUpload} />
              </label>
              
              <button
                onClick={handleAddText}
                className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-ink-border rounded-2xl hover:border-accent-purple hover:bg-white/5 transition-colors group"
              >
                <Type className="w-6 h-6 text-ink-text-muted group-hover:text-accent-purple mb-2 transition-colors" />
                <span className="text-sm font-medium">Add Text</span>
              </button>
            </div>
            <p className="text-xs text-ink-text-muted">Click a tool, then click on the T-shirt to place it.</p>
          </div>

          {/* Active Decals */}
          {decals.length > 0 && (
            <div>
              <h3 className="text-xl font-display font-semibold mb-4">Applied Designs</h3>
              <div className="space-y-3">
                {decals.map((decal, i) => (
                  <div key={decal.id} className="flex items-center justify-between p-4 rounded-xl bg-ink-bg border border-ink-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-ink-surface flex items-center justify-center overflow-hidden">
                        {decal.texture && <img src={decal.texture.image.src} alt="Decal" className="w-full h-full object-contain" />}
                      </div>
                      <span className="text-sm font-medium">Design {i + 1}</span>
                    </div>
                    <button
                      onClick={() => removeDecal(decal.id)}
                      className="p-2 text-ink-text-muted hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-8 border-t border-ink-border bg-ink-bg">
          <button className="w-full py-4 rounded-full bg-gradient-accent text-white font-display font-bold text-lg shadow-[0_0_30px_rgba(176,38,255,0.3)] hover:shadow-[0_0_50px_rgba(0,240,255,0.5)] transition-shadow duration-300">
            Finalize Design
          </button>
        </div>
      </div>
    </section>
  );
}
