"use client";

import React, { useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Komponen untuk satu Gelembung/Partikel
function Bubble({ accentColor }: { accentColor: string }) {
  const { viewport } = useThree(); // Hook untuk mendapatkan ukuran viewport

  // [PERBAIKAN] Partikel disebar di area yang lebih luas untuk efek kedalaman yang lebih baik
  const initialPosition = useMemo(
    () =>
      new THREE.Vector3(
        (Math.random() - 0.5) * viewport.width * 1.5,
        (Math.random() - 0.5) * viewport.height * 1.5,
        (Math.random() - 0.5) * 25 - 10
      ),
    [viewport]
  );

  // Material dengan shader kustom untuk efek 3D dan gradasi
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uColor1: { value: new THREE.Color(accentColor).multiplyScalar(0.8) },
        uColor2: { value: new THREE.Color(accentColor).multiplyScalar(1.2) },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          vec3 color = mix(uColor1, uColor2, intensity);
          // [PERBAIKAN] Opacity dikurangi agar gelembung lebih samar dan profesional
          gl_FragColor = vec4(color, intensity * 0.8);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, [accentColor]);

  return (
    <mesh position={initialPosition} material={material}>
      {/* [PERBAIKAN] Ukuran gelembung diperkecil dan detail geometri dikurangi untuk performa */}
      <sphereGeometry args={[0.2, 16, 16]} />
    </mesh>
  );
}

// Komponen utama untuk Scene 3D
function Scene() {
  const [accentColor, setAccentColor] = useState("#03dac6");

  useEffect(() => {
    // Fungsi ini tetap sama, untuk mendeteksi perubahan tema light/dark
    const rootStyle = getComputedStyle(document.documentElement);
    const color = rootStyle.getPropertyValue("--accent-color").trim();
    if (color) setAccentColor(color);

    const observer = new MutationObserver(() => {
      const newColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent-color")
        .trim();
      if (newColor) setAccentColor(newColor);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  // Jumlah gelembung dikurangi agar tidak terlalu ramai
  const bubbles = useMemo(() => Array.from({ length: 80 }), []);

  //  Efek paralaks dibuat lebih halus dan kalem
  useFrame((state) => {
    // agar pergerakan kamera jauh lebih subtil.
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      state.mouse.x * 0.5, // Nilai ini diperkecil
      0.03 // Sedikit percepat lerp untuk respons yang lebih terasa tapi tetap halus
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      state.mouse.y * 0.5,
      0.03
    );
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {bubbles.map((_, i) => (
        <Bubble key={i} accentColor={accentColor} />
      ))}
    </>
  );
}

// Komponen utama yang akan diekspor
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
        background: "transparent", // Pastikan tidak ada warna latar di sini
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 25], fov: 75 }}
        gl={{ alpha: true }} // Membuat background canvas transparan
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default Background3D;
