import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

export default function PixelCard() {
  const mountRef = useRef(null);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // PARTICLE GENERATION
    const count = 6000;
    const radius = 3.5;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorA = new THREE.Color("#73f2ff"); // cyan
    const colorB = new THREE.Color("#ff76f8"); // pink

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = radius + Math.random() * 0.15;

      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);

      const mix = colorA.clone().lerp(colorB, Math.random());
      colors[i3] = mix.r;
      colors[i3 + 1] = mix.g;
      colors[i3 + 2] = mix.b;
    }

    const uniforms = {
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(999, 999) },
      u_alpha: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,

      vertexShader: `
        uniform float u_time;
        uniform vec2 u_mouse;
        uniform float u_alpha;

        varying vec3 vColor;
        varying float vGlow;

        void main() {
          vColor = color;

          vec3 pos = position;

          // 🌪 Beautiful swirl rotation
          float angle = u_time * 0.0015 + length(pos.xy) * 0.25;
          float s = sin(angle);
          float c = cos(angle);

          float x = pos.x * c - pos.y * s;
          float y = pos.x * s + pos.y * c;

          pos.x = x;
          pos.y = y;

          // ✨ Glow near cursor
          float dist = distance(pos.xy, u_mouse);
          vGlow = smoothstep(2.2, 0.2, dist);

          // ✨ Cursor distortion
          if (dist < 1.6) {
            pos.xy += normalize(u_mouse - pos.xy) * (1.6 - dist) * 0.04;
          }

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = 2.5 + vGlow * 10.0;
        }
      `,

      fragmentShader: `
        varying vec3 vColor;
        varying float vGlow;
        uniform float u_alpha;

        void main() {
          float d = length(gl_PointCoord - 0.5);
          float alpha = smoothstep(0.55, 0.2, d) * u_alpha;
          vec3 glowColor = vColor + vec3(vGlow * 0.8);

          gl_FragColor = vec4(glowColor, alpha);
        }
      `,
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 🎯 CURSOR
    const onMouseMove = (e) => {
      const rect = mountRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      uniforms.u_mouse.value.set(x * 4.0, y * 4.0);
    };

    window.addEventListener("mousemove", onMouseMove);

    // 🔍 ZOOM (scroll wheel)
    const onWheel = (e) => {
      e.preventDefault();

      let z = camera.position.z + e.deltaY * 0.01;
      z = Math.min(Math.max(z, 4), 25); // zoom limits
      camera.position.z = z;
    };

    // attach zoom listener to the canvas
    renderer.domElement.addEventListener("wheel", onWheel, { passive: false });

    // ANIMATION LOOP
    const animate = () => {
      uniforms.u_time.value++;

      // Fade in/out based on hover
      if (hover) {
        uniforms.u_alpha.value = Math.min(1, uniforms.u_alpha.value + 0.05);
      } else {
        uniforms.u_alpha.value = Math.max(0, uniforms.u_alpha.value - 0.05);
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      renderer.domElement.removeEventListener("wheel", onWheel);
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [hover]);

  return (
    <div
      ref={mountRef}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative w-full h-[420px] bg-black rounded-2xl overflow-hidden shadow-xl"
    >
      {!hover && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-3xl font-semibold">
          Hover Me.
        </div>
      )}
    </div>
  );
}
