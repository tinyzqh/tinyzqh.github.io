import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

/**
 * Sakana / Liquid-AI inspired flowing gradient mesh.
 * - Domain-warped fbm noise for an organic "liquid" feel
 * - Anchored on the electric-blue accent color
 * - Reacts gently to cursor (parallax in noise space)
 * - Pauses when off-screen and respects prefers-reduced-motion
 */
const FRAG = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uMouse;
  uniform float uReduced;
  uniform float uTheme; // 1.0 dark, 0.0 light

  // hash + value noise + fbm
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 res = uResolution;
    vec2 uv = (gl_FragCoord.xy - 0.5 * res) / min(res.x, res.y);
    float t = uTime * 0.05;
    vec2 m = (uMouse - 0.5) * 0.3;

    // Domain warp x2 — gives organic fluid look
    vec2 q = vec2(fbm(uv + t), fbm(uv + vec2(2.3, 1.7) + t));
    vec2 r = vec2(
      fbm(uv + 4.0 * q + vec2(1.7, 9.2) + t * 1.2 + m),
      fbm(uv + 4.0 * q + vec2(8.3, 2.8) + t * 1.4 + m)
    );
    float n = fbm(uv + 4.0 * r);

    // Color anchors derived from the site palette
    // Electric blue 6366f1, deeper indigo 4338ca, cyan accent 06b6d4, near-black bg
    vec3 c1 = vec3(0.388, 0.400, 0.945);  // #6366f1
    vec3 c2 = vec3(0.149, 0.388, 0.922);  // #2563eb
    vec3 c3 = vec3(0.024, 0.714, 0.831);  // cyan-ish
    vec3 c4 = vec3(0.345, 0.227, 0.937);  // violet
    vec3 bgDark  = vec3(0.035, 0.045, 0.065);
    vec3 bgLight = vec3(0.97, 0.97, 0.99);

    vec3 col = mix(c4, c1, smoothstep(0.2, 0.7, n));
    col = mix(col, c3, smoothstep(0.55, 0.95, n));
    col = mix(col, c2, smoothstep(0.75, 1.0, r.x));

    // Vignette toward background, much stronger so foreground text reads
    float d = length(uv);
    float vignette = smoothstep(0.0, 1.2, d);
    vec3 bg = mix(bgLight, bgDark, uTheme);
    col = mix(col, bg, vignette * (0.55 + 0.30 * uReduced));

    // Subtle grain to break up banding
    float grain = (hash(gl_FragCoord.xy + t * 100.0) - 0.5) * 0.04;
    col += grain;

    gl_FragColor = vec4(col, 1.0);
  }
`;

const VERT = /* glsl */ `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

export default function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const renderer = new Renderer({ alpha: false, dpr: Math.min(window.devicePixelRatio, 2) });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);
    gl.canvas.style.width = '100%';
    gl.canvas.style.height = '100%';
    gl.canvas.style.display = 'block';

    const geometry = new Triangle(gl);

    const getTheme = () => (document.documentElement.classList.contains('dark') ? 1 : 0);

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [1, 1] },
        uMouse: { value: [0.5, 0.5] },
        uReduced: { value: reduced ? 1 : 0 },
        uTheme: { value: getTheme() },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      program.uniforms.uResolution.value = [w, h];
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      program.uniforms.uMouse.value = [
        (e.clientX - rect.left) / rect.width,
        1 - (e.clientY - rect.top) / rect.height,
      ];
    };
    container.addEventListener('mousemove', onMouseMove);

    const themeObserver = new MutationObserver(() => {
      program.uniforms.uTheme.value = getTheme();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    let raf = 0;
    let isVisible = true;
    const io = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0.01 }
    );
    io.observe(container);

    const start = performance.now();
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!isVisible) return;
      program.uniforms.uTime.value = (performance.now() - start) / 1000;
      renderer.render({ scene: mesh });
    };
    if (reduced) {
      // single render — static frame
      program.uniforms.uTime.value = 7.3;
      renderer.render({ scene: mesh });
    } else {
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      themeObserver.disconnect();
      container.removeEventListener('mousemove', onMouseMove);
      gl.canvas.remove();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />;
}
