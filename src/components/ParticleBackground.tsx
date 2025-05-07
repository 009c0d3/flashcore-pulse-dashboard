
import React, { useMemo } from "react";

const ParticleBackground: React.FC = () => {
  const particles = useMemo(() => 
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 6 + 4,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDuration: Math.random() * 10 + 10,
      animationDelay: Math.random() * 5,
    })),
  []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white/10"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animation: `float ${particle.animationDuration}s ease-in-out ${particle.animationDelay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
