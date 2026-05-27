import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  uniform float uScrollSpeed;
  uniform float uAmp;
  uniform float uLineThickness;
  uniform float uLineCount;

  float waveLine(vec2 uv, float speed, float amp, float freq, float yPos, float thickness) {
    uv.x += uTime * speed;
    float wave = sin(uv.x * freq) * amp;
    float line = smoothstep(thickness, 0.0, abs(uv.y - yPos - wave));
    return line;
  }

  void main() {
    vec2 uv = vUv;
    vec3 baseColor = vec3(0.961, 0.957, 0.945);
    vec3 lineColor = vec3(0.208, 0.463, 0.608);
    float time = uTime;
    float scrollSpeed = uScrollSpeed;
    float amp = uAmp;
    float lineCount = uLineCount;
    float thickness = uLineThickness;
    float pattern = 0.0;

    for (float i = 0.0; i < 8.0; i++) {
      if (i >= lineCount) break;
      float yPos = 0.1 + (i / lineCount) * 0.8;
      float freq = 6.0 + i * 2.0;
      float speed = scrollSpeed * (0.5 + i * 0.1);
      float amplitude = amp * (0.05 + i * 0.01);
      pattern += waveLine(uv, speed, amplitude, freq, yPos, thickness);
    }

    for (float i = 0.0; i < 12.0; i++) {
      float yPos = 0.05 + (i / 12.0) * 0.9;
      float freq = 10.0 + i;
      float speed = scrollSpeed * 0.8;
      float amplitude = amp * 0.02;
      pattern += waveLine(uv, speed, amplitude, freq, yPos, thickness * 0.5);
    }

    pattern = clamp(pattern, 0.0, 1.0);
    vec3 color = mix(baseColor, lineColor, pattern);
    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function WaveCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 2.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const geometry = new THREE.PlaneGeometry(10, 10, 100, 100);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: {
        uTime: { value: 0.0 },
        uScrollSpeed: { value: 0.3 },
        uAmp: { value: 0.5 },
        uLineThickness: { value: 0.003 },
        uLineCount: { value: 6.0 },
      },
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    const clock = new THREE.Clock();

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      if (!isVisibleRef.current) return;
      material.uniforms.uTime.value = clock.getElapsedTime() * 0.5;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Intersection Observer to pause when not visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    observer.observe(container);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
}
