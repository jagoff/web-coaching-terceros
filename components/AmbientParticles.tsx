"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const particlesConfig: ISourceOptions = {
  fullScreen: { enable: false },
  fpsLimit: 60,
  detectRetina: true,
  pauseOnBlur: true,
  pauseOnOutsideViewport: true,
  particles: {
    number: {
      value: 28,
      density: { enable: true, width: 1920, height: 1080 },
    },
    color: { value: ["#D4AF37", "#F59E0B", "#E8C94A"] },
    opacity: {
      value: { min: 0.02, max: 0.1 },
      animation: {
        enable: true,
        speed: 0.3,
        startValue: "random",
        sync: false,
      },
    },
    size: {
      value: { min: 1, max: 2.5 },
      animation: {
        enable: true,
        speed: 0.4,
        startValue: "random",
        sync: false,
      },
    },
    move: {
      enable: true,
      speed: { min: 0.08, max: 0.35 },
      direction: "none" as const,
      random: true,
      straight: false,
      outModes: { default: "out" as const },
    },
    links: {
      enable: false,
    },
    shape: {
      type: "circle",
    },
    wobble: {
      enable: true,
      distance: 6,
      speed: { min: -0.4, max: 0.4 },
    },
  },
  interactivity: {
    events: {
      onHover: { enable: false },
      onClick: { enable: false },
    },
  },
};

export default function AmbientParticles() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  if (!ready) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      <Particles
        id="ambient-particles"
        options={particlesConfig}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
