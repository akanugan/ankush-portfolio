/* ============================================================
   DESIGN: "Collision Event" — CMS Detector 3D Scene
   Procedural Blender-style CMS cross-section with metallic
   materials, wireframe layers, beam collision particles
   ============================================================ */

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  MeshTransmissionMaterial,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";

const LAYER_COLORS = {
  tracker: "#4d9fff",
  ecal: "#f5c842",
  hcal: "#ff8c42",
  magnet: "#a78bfa",
  muon: "#34d399",
  yoke: "#6b7c93",
};

interface DetectorLayer {
  name: string;
  radius: number;
  height: number;
  color: string;
  metalness: number;
  roughness: number;
  opacity?: number;
  wireframe?: boolean;
}

const DETECTOR_LAYERS: DetectorLayer[] = [
  { name: "Beam Pipe", radius: 0.08, height: 2.4, color: "#8899aa", metalness: 0.95, roughness: 0.15 },
  { name: "Silicon Tracker", radius: 0.22, height: 2.2, color: LAYER_COLORS.tracker, metalness: 0.7, roughness: 0.25, opacity: 0.35 },
  { name: "ECAL", radius: 0.42, height: 1.9, color: LAYER_COLORS.ecal, metalness: 0.6, roughness: 0.3, opacity: 0.4 },
  { name: "HCAL", radius: 0.62, height: 1.7, color: LAYER_COLORS.hcal, metalness: 0.55, roughness: 0.35, opacity: 0.35 },
  { name: "Solenoid", radius: 0.82, height: 1.5, color: LAYER_COLORS.magnet, metalness: 0.85, roughness: 0.2, opacity: 0.3 },
  { name: "Muon Chambers", radius: 1.05, height: 1.3, color: LAYER_COLORS.muon, metalness: 0.65, roughness: 0.28, opacity: 0.32 },
  { name: "Return Yoke", radius: 1.28, height: 1.1, color: LAYER_COLORS.yoke, metalness: 0.9, roughness: 0.18, opacity: 0.25 },
];

function CollisionParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 180;

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.008 + Math.random() * 0.02;
      vel[i * 3] = Math.cos(angle) * speed;
      vel[i * 3 + 1] = (Math.random() - 0.5) * speed * 0.4;
      vel[i * 3 + 2] = Math.sin(angle) * speed;
      pos[i * 3] = (Math.random() - 0.5) * 0.05;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
    }
    return { positions: pos, velocities: vel };
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3] += velocities[i * 3];
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      pos[i * 3 + 2] += velocities[i * 3 + 2];
      const dist = Math.sqrt(
        pos[i * 3] ** 2 + pos[i * 3 + 1] ** 2 + pos[i * 3 + 2] ** 2
      );
      if (dist > 1.4) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.008 + Math.random() * 0.02;
        velocities[i * 3] = Math.cos(angle) * speed;
        velocities[i * 3 + 1] = (Math.random() - 0.5) * speed * 0.4;
        velocities[i * 3 + 2] = Math.sin(angle) * speed;
        pos[i * 3] = 0;
        pos[i * 3 + 1] = 0;
        pos[i * 3 + 2] = 0;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#f5c842"
        transparent
        opacity={0.85}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function BeamLine() {
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.opacity =
        0.5 + Math.sin(state.clock.elapsedTime * 4) * 0.2;
    }
  });
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.012, 0.012, 3.2, 16]} />
      <meshBasicMaterial
        ref={materialRef}
        color="#4d9fff"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function WireframeRing({ radius, height, color }: { radius: number; height: number; color: string }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.004, 8, 96]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </mesh>
  );
}

function DetectorLayerMesh({ layer, index }: { layer: DetectorLayer; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.y = Math.sin(t * 0.15 + index * 0.4) * 0.02;
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <cylinderGeometry args={[layer.radius, layer.radius, layer.height, 64, 1, true]} />
        <meshPhysicalMaterial
          color={layer.color}
          metalness={layer.metalness}
          roughness={layer.roughness}
          transparent
          opacity={layer.opacity ?? 0.5}
          side={THREE.DoubleSide}
          emissive={layer.color}
          emissiveIntensity={0.08}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
        />
      </mesh>
      <WireframeRing radius={layer.radius} height={layer.height} color={layer.color} />
      <WireframeRing radius={layer.radius * 0.98} height={layer.height * 0.5} color={layer.color} />
    </group>
  );
}

function EndCap({ side }: { side: 1 | -1 }) {
  return (
    <group position={[0, side * 0.55, 0]} rotation={[side === 1 ? 0 : Math.PI, 0, 0]}>
      <mesh>
        <ringGeometry args={[0.1, 1.3, 64]} />
        <meshPhysicalMaterial
          color="#2a3a4f"
          metalness={0.9}
          roughness={0.15}
          side={THREE.DoubleSide}
          emissive="#4d9fff"
          emissiveIntensity={0.05}
        />
      </mesh>
      {[0.25, 0.5, 0.75, 1.0].map((r) => (
        <mesh key={r}>
          <ringGeometry args={[r - 0.02, r, 64]} />
          <meshBasicMaterial
            color={r < 0.4 ? LAYER_COLORS.tracker : r < 0.7 ? LAYER_COLORS.ecal : LAYER_COLORS.muon}
            transparent
            opacity={0.25}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function SceneContent() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.12;
      groupRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.08) * 0.08 + 0.15;
    }
  });

  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[3, 2, 4]} intensity={1.2} color="#f5c842" />
      <pointLight position={[-3, -1, -2]} intensity={0.8} color="#4d9fff" />
      <spotLight
        position={[0, 4, 0]}
        angle={0.4}
        penumbra={0.8}
        intensity={1.5}
        color="#ffffff"
        castShadow
      />

      <Environment preset="city" />

      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
        <group ref={groupRef}>
          {DETECTOR_LAYERS.map((layer, i) => (
            <DetectorLayerMesh key={layer.name} layer={layer} index={i} />
          ))}
          <EndCap side={1} />
          <EndCap side={-1} />
          <BeamLine />
          <CollisionParticles />
        </group>
      </Float>

      <Sparkles
        count={60}
        scale={3}
        size={1.5}
        speed={0.3}
        color="#f5c842"
        opacity={0.4}
      />

      {/* Central collision core */}
      <mesh>
        <sphereGeometry args={[0.06, 32, 32]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.5}
          chromaticAberration={0.15}
          anisotropy={0.3}
          distortion={0.2}
          distortionScale={0.2}
          temporalDistortion={0.1}
          color="#f5c842"
        />
      </mesh>
    </>
  );
}

interface CMSDetector3DProps {
  className?: string;
  interactive?: boolean;
}

export default function CMSDetector3D({
  className = "",
  interactive = true,
}: CMSDetector3DProps) {
  return (
    <div className={`relative ${className}`} style={{ touchAction: "none" }}>
      <Canvas
        camera={{ position: [2.2, 1.4, 2.8], fov: 42 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>

      {/* Layer legend overlay */}
      <div
        className="absolute bottom-4 left-4 right-4 pointer-events-none"
        style={{ fontFamily: "'Fira Code', monospace" }}
      >
        <div className="flex flex-wrap gap-2 justify-center">
          {["Tracker", "ECAL", "HCAL", "Magnet", "Muon"].map((label, i) => {
            const colors = [
              LAYER_COLORS.tracker,
              LAYER_COLORS.ecal,
              LAYER_COLORS.hcal,
              LAYER_COLORS.magnet,
              LAYER_COLORS.muon,
            ];
            return (
              <span
                key={label}
                className="px-2 py-0.5 rounded text-[0.6rem] tracking-wider"
                style={{
                  background: "rgba(5, 13, 26, 0.85)",
                  border: `1px solid ${colors[i]}40`,
                  color: colors[i],
                }}
              >
                {label}
              </span>
            );
          })}
        </div>
      </div>

      {interactive && (
        <div
          className="absolute top-3 right-3 px-2 py-1 rounded text-[0.55rem] tracking-widest pointer-events-none"
          style={{
            fontFamily: "'Fira Code', monospace",
            background: "rgba(5, 13, 26, 0.8)",
            border: "1px solid rgba(245, 200, 66, 0.25)",
            color: "rgba(245, 200, 66, 0.7)",
          }}
        >
          3D · WEBGL
        </div>
      )}
    </div>
  );
}
