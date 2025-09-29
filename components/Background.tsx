import React, { useRef, useEffect } from 'react';

/**
 * A professional and dynamic background featuring an animated "digital plexus" network of nodes and lines,
 * rendered on a canvas for optimal performance.
 */
export const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleColor = 'rgba(34, 211, 238, 0.7)'; // Cyan-500 with opacity

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor(x: number, y: number, size: number, speedX: number, speedY: number) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = particleColor;
        ctx.fill();
      }

      update() {
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
        this.x += this.speedX;
        this.y += this.speedY;
      }
    }

    const init = () => {
      particles = [];
      const numberOfParticles = (canvas.height * canvas.width) / 9000;
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 1.5 + 1;
        const x = Math.random() * (window.innerWidth - size * 2) + size;
        const y = Math.random() * (window.innerHeight - size * 2) + size;
        const speedX = (Math.random() - 0.5) * 0.3;
        const speedY = (Math.random() - 0.5) * 0.3;
        particles.push(new Particle(x, y, size, speedX, speedY));
      }
    };

    const connect = () => {
      if (!ctx) return;
      let opacityValue = 1;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const distance = Math.sqrt(
            (particles[a].x - particles[b].x) * (particles[a].x - particles[b].x) +
            (particles[a].y - particles[b].y) * (particles[a].y - particles[b].y)
          );

          if (distance < (canvas.width / 7)) {
            opacityValue = 1 - (distance / (canvas.width/7));
            ctx.strokeStyle = `rgba(34, 211, 238, ${opacityValue * 0.15})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const particle of particles) {
        particle.update();
        particle.draw();
      }
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial setup
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-slate-950">
        <canvas ref={canvasRef} className="w-full h-full"></canvas>
    </div>
  );
};
