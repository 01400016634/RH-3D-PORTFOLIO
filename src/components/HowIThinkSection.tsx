import React, { useRef, useMemo, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { AlertCircle, User, Lightbulb, Palette, Cpu, Code2, Layers, LucideIcon } from 'lucide-react';

interface Stage {
  id: string;
  subheadline: string;
  description: string;
  Icon: LucideIcon;
}

const stages: Stage[] = [
  {
    id: 'PROBLEM',
    subheadline: 'Identifying the Core Friction',
    description: 'Analyzing user pain points and business logic bottlenecks before writing a single line of code.',
    Icon: AlertCircle
  },
  {
    id: 'USER',
    subheadline: 'Mapping the Journey',
    description: 'Designing intuitive, accessible flows to ensure high conversion and retention rates.',
    Icon: User
  },
  {
    id: 'IDEA',
    subheadline: 'Conceptualizing Solutions',
    description: 'Brainstorming scalable, robust architectures leveraging modern full-stack paradigms.',
    Icon: Lightbulb
  },
  {
    id: 'DESIGN',
    subheadline: 'Glassmorphic & 3D Prototyping',
    description: 'Crafting premium dark-mode UI/UX using Tailwind CSS, Framer Motion, and Three.js.',
    Icon: Palette
  },
  {
    id: 'AI',
    subheadline: 'Integrating Intelligence',
    description: 'Embedding OpenAI API engines to automate logic, content generation, and smart features.',
    Icon: Cpu
  },
  {
    id: 'BUILD',
    subheadline: 'Performant Engineering',
    description: 'Executing clean, scalable MERN/React Three Fiber codebases with rigorous testing.',
    Icon: Code2
  },
  {
    id: 'PRODUCT',
    subheadline: 'Deployment & Scaling',
    description: 'Shipping zero-downtime releases optimized for speed, SEO, and cross-device compatibility.',
    Icon: Layers
  }
];

function PipelineScene({ scrollYProgress }: { scrollYProgress: any }) {
  const { camera } = useThree();
  const orbGroupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  // Total length of pipeline
  const pipelineLength = 300;
  const startZ = pipelineLength / 2;
  
  useFrame((state) => {
    // scroll goes from 0 to 1
    const progress = scrollYProgress.get();
    
    // camera moves from startZ to endZ
    const currentZ = startZ - progress * pipelineLength;
    camera.position.z = currentZ;
    
    // Add smooth cinematic wobble to camera
    const time = state.clock.getElapsedTime();
    camera.position.y = Math.sin(time * 0.5) * 0.5;
    camera.position.x = Math.cos(time * 0.3) * 0.5;
    
    // orb moves slightly ahead of the camera and wobbles more actively
    if (orbGroupRef.current) {
      orbGroupRef.current.position.z = currentZ - 25; // 25 units ahead
      orbGroupRef.current.position.y = Math.sin(time * 1.5) * 1.5;
      orbGroupRef.current.position.x = Math.cos(time * 1.2) * 1.5;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.z = time * 0.05;
    }
  });

  // Generate particles
  const [positions] = useMemo(() => {
    const count = 3000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // random position inside the tube (radius 15)
      const radius = 2 + Math.random() * 12; // spread from center to wall
      const theta = Math.random() * Math.PI * 2;
      const x = Math.cos(theta) * radius;
      const y = Math.sin(theta) * radius;
      const z = (Math.random() - 0.5) * pipelineLength * 1.2; // spread along z
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
    }
    return [pos];
  }, [pipelineLength]);

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[0, 10, 0]} intensity={0.5} />
      
      {/* The glowing orb and its trail */}
      <group ref={orbGroupRef}>
        <mesh>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshBasicMaterial color="#f97316" transparent opacity={0.9} />
          <pointLight color="#f97316" intensity={10} distance={40} />
        </mesh>
        {/* Trail bubbles */}
        {[1, 2, 3, 4].map((i) => (
          <mesh key={i} position={[0, 0, i * 2.5]}>
            <sphereGeometry args={[0.8 - i * 0.15, 16, 16]} />
            <meshBasicMaterial color="#f97316" transparent opacity={0.6 - i * 0.1} />
          </mesh>
        ))}
      </group>

      {/* The Pipeline Tube */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[15, 15, pipelineLength * 1.2, 32, 1, true]} />
        <meshPhysicalMaterial 
          color="#000000"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.3}
          wireframe={false}
          emissive="#f97316"
          emissiveIntensity={0.05}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Neon grid lines along the tube */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[14.8, 14.8, pipelineLength * 1.2, 16, Math.floor(pipelineLength / 10), true]} />
        <meshBasicMaterial color="#f97316" wireframe transparent opacity={0.1} side={THREE.BackSide} />
      </mesh>
      
      {/* Particles */}
      <Points ref={particlesRef} positions={positions}>
        <PointMaterial transparent color="#f97316" size={0.15} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
      </Points>

      {/* The Stages as floating 3D HTML */}
      {stages.map((stage, i) => {
        // distribute them along the Z axis from startZ to endZ
        // keeping some margin at start and end
        const segment = pipelineLength / (stages.length + 1);
        const zPos = startZ - segment * (i + 1);
        
        return (
          <group key={stage.id} position={[0, 0, zPos]}>
            {/* The actual HTML overlay for the step */}
            <Html center transform zIndexRange={[100, 0]} distanceFactor={15}>
              <div className="flex flex-col items-center justify-center text-center w-[90vw] max-w-2xl pointer-events-none transition-opacity duration-500 opacity-90">
                <div className="mb-4 p-4 rounded-full bg-orange-500/10 border border-orange-500/30 backdrop-blur-md shadow-[0_0_40px_rgba(249,115,22,0.4)]">
                  <stage.Icon className="w-10 h-10 text-orange-400" />
                </div>
                <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] mb-2">
                  {stage.id}
                </h3>
                <p className="text-xl md:text-3xl font-bold text-orange-400 mb-4 tracking-wide drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]">
                  {stage.subheadline}
                </p>
                <p className="text-slate-200 text-lg md:text-xl font-medium leading-relaxed bg-black/60 p-6 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl">
                  {stage.description}
                </p>
              </div>
            </Html>
          </group>
        );
      })}
    </>
  );
}

const HowIThinkSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      // Calculate which step we are on based on scroll
      const step = Math.min(stages.length, Math.max(1, Math.ceil(latest * stages.length)));
      setCurrentStep(step);
    });
  }, [scrollYProgress]);

  return (
    <section ref={containerRef} id="pipeline" className="relative w-full h-[600vh] bg-transparent">
      <div className="sticky top-0 h-screen w-full bg-transparent overflow-hidden">
        
        {/* Fixed Header overlay */}
        <div className="absolute top-8 left-8 md:top-16 md:left-16 z-50 pointer-events-none">
          <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight drop-shadow-md">
            How I <span className="italic text-orange-500">Think</span>
          </h2>
        </div>

        {/* Step Progress Indicator overlay */}
        <div className="absolute bottom-8 right-8 md:bottom-16 md:right-16 z-50 pointer-events-none flex flex-col items-end gap-2">
          <div className="text-orange-500 font-mono text-xl md:text-3xl font-bold tracking-widest drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]">
            {currentStep.toString().padStart(2, '0')} <span className="text-white/30">/ {stages.length.toString().padStart(2, '0')}</span>
          </div>
          <div className="w-32 md:w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]"
              style={{ width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
            />
          </div>
        </div>

        {/* The 3D Journey Canvas */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 150], fov: 60 }} gl={{ alpha: true }}>
            <fog attach="fog" args={['#000000', 10, 80]} />
            <PipelineScene scrollYProgress={scrollYProgress} />
          </Canvas>
        </div>

      </div>
    </section>
  );
};

export default HowIThinkSection;
