"use client";

import React, { useMemo, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/* ================================================================
   1. PARTICLE FIELD — Glowing dots scattered in 3D space
   ================================================================ */
function ParticleField({
  accentColor,
  highlightColor,
}: {
  accentColor: string;
  highlightColor: string;
}) {
  const count = 120;

  const { positions, sizes, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const c1 = new THREE.Color(accentColor);
    const c2 = new THREE.Color(highlightColor);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 35;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 8;

      sizes[i] = Math.random() * 3 + 1.5;

      const mix = Math.random();
      const c = new THREE.Color().lerpColors(c1, c2, mix);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, sizes, colors };
  }, [accentColor, highlightColor, count]);

  const shaderMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: /* glsl */ `
        attribute float size;
        attribute vec3 customColor;
        varying vec3 vColor;
        varying float vOpacity;
        uniform float uTime;

        void main() {
          vColor = customColor;

          vec3 pos = position;
          pos.y += sin(uTime * 0.25 + position.x * 0.4) * 0.6;
          pos.x += cos(uTime * 0.18 + position.y * 0.35) * 0.4;
          pos.z += sin(uTime * 0.15 + position.x * 0.2) * 0.3;

          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (280.0 / -mv.z);
          gl_Position  = projectionMatrix * mv;

          vOpacity = smoothstep(-35.0, -3.0, mv.z) * 0.9;
        }
      `,
        fragmentShader: /* glsl */ `
        varying vec3 vColor;
        varying float vOpacity;

        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;

          float glow = 1.0 - smoothstep(0.0, 0.5, d);
          glow = pow(glow, 1.8);

          gl_FragColor = vec4(vColor, glow * vOpacity);
        }
      `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  useFrame((state) => {
    shaderMaterial.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        <bufferAttribute
          attach="attributes-customColor"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <primitive object={shaderMaterial} attach="material" />
    </points>
  );
}

/* ================================================================
   2. FLOATING WIREFRAME SHAPE
   ================================================================ */
function FloatingShape({
  children,
  position,
  color,
  rotationSpeed = 0.002,
  scale = 1,
  floatSpeed = 1,
  floatIntensity = 1,
  opacity = 0.12,
}: {
  children: React.ReactNode;
  position: [number, number, number];
  color: string;
  rotationSpeed?: number;
  scale?: number;
  floatSpeed?: number;
  floatIntensity?: number;
  opacity?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed * 0.6;
      meshRef.current.rotation.z += rotationSpeed * 0.3;
    }
  });

  return (
    <Float
      speed={floatSpeed}
      rotationIntensity={0.2}
      floatIntensity={floatIntensity}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        {children}
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={opacity}
        />
      </mesh>
    </Float>
  );
}

/* ================================================================
   3. AMBIENT GLOW ORB — Large soft gradient sphere for atmosphere
   ================================================================ */
function GlowOrb({
  position,
  color,
  scale = 6,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color(color) },
          uTime: { value: 0 },
        },
        vertexShader: /* glsl */ `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
        fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        uniform float uTime;
        varying vec3 vNormal;

        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
          float pulse = 0.85 + 0.15 * sin(uTime * 0.4);
          gl_FragColor = vec4(uColor, intensity * 0.07 * pulse);
        }
      `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.BackSide,
      }),
    [color]
  );

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh position={position} scale={scale} material={material}>
      <sphereGeometry args={[1, 32, 32]} />
    </mesh>
  );
}

/* ================================================================
   4. GRID FLOOR — Subtle tech grid receding into the distance
   ================================================================ */
function GridFloor({ color }: { color: string }) {
  return (
    <mesh rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -8, -15]}>
      <planeGeometry args={[120, 80, 60, 40]} />
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={0.025}
      />
    </mesh>
  );
}

/* ================================================================
   5. MAIN SCENE
   ================================================================ */
function Scene() {
  const [accentColor, setAccentColor] = useState("#03dac6");
  const [highlightColor, setHighlightColor] = useState("#bb86fc");

  useEffect(() => {
    const getColors = () => {
      const style = getComputedStyle(document.documentElement);
      const accent = style.getPropertyValue("--accent-color").trim();
      const highlight = style.getPropertyValue("--hero-accent-color").trim();
      if (accent) setAccentColor(accent);
      if (highlight) setHighlightColor(highlight);
    };
    getColors();

    const observer = new MutationObserver(getColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  // Smooth mouse parallax
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      state.mouse.x * 1.2,
      0.02
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      state.mouse.y * 0.8,
      0.02
    );
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {/* Ambient glow orbs — layered color wash */}
      <GlowOrb position={[-10, 6, -20]} color={accentColor} scale={10} />
      <GlowOrb position={[12, -4, -25]} color={highlightColor} scale={12} />
      <GlowOrb position={[0, 2, -30]} color={accentColor} scale={14} />

      {/* Grid floor */}
      <GridFloor color={accentColor} />

      {/* Particle field */}
      <ParticleField
        accentColor={accentColor}
        highlightColor={highlightColor}
      />

      {/* Floating wireframe shapes */}
      <FloatingShape
        position={[-7, 4, -10]}
        color={accentColor}
        scale={3.5}
        rotationSpeed={0.003}
        floatSpeed={1.2}
        floatIntensity={1.5}
        opacity={0.1}
      >
        <icosahedronGeometry args={[1, 1]} />
      </FloatingShape>

      <FloatingShape
        position={[8, -3, -14]}
        color={highlightColor}
        scale={2.5}
        rotationSpeed={0.002}
        floatSpeed={0.8}
        floatIntensity={1}
        opacity={0.08}
      >
        <torusKnotGeometry args={[1, 0.3, 64, 8, 2, 3]} />
      </FloatingShape>

      <FloatingShape
        position={[6, 5, -8]}
        color={highlightColor}
        scale={1.8}
        rotationSpeed={0.004}
        floatSpeed={1.8}
        floatIntensity={2}
        opacity={0.12}
      >
        <octahedronGeometry args={[1, 0]} />
      </FloatingShape>

      <FloatingShape
        position={[-9, -5, -12]}
        color={accentColor}
        scale={2.2}
        rotationSpeed={0.0025}
        floatSpeed={1}
        floatIntensity={1.2}
        opacity={0.09}
      >
        <dodecahedronGeometry args={[1, 0]} />
      </FloatingShape>

      <FloatingShape
        position={[0, -6, -18]}
        color={highlightColor}
        scale={1.5}
        rotationSpeed={0.0015}
        floatSpeed={1.5}
        floatIntensity={1}
        opacity={0.06}
      >
        <torusGeometry args={[1, 0.3, 16, 32]} />
      </FloatingShape>
    </>
  );
}

/* ================================================================
   6. EXPORT
   ================================================================ */
const Background3D = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        background: "transparent",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 22], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default Background3D;
