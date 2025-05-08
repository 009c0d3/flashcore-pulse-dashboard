
import React, { useMemo, useEffect, useState } from "react";

const ParticleBackground: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const particles = useMemo(() => 
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 8 + 4, // Bigger particles
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDuration: Math.random() * 15 + 10,
      animationDelay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.1, // Varying opacity
      color: Math.random() > 0.7 ? "#8CBE06" : "white", // Add some green particles
    })),
  []);

  // Track mouse movement to add interactive effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            opacity: particle.opacity,
            backgroundColor: particle.color,
            boxShadow: particle.color === "#8CBE06" ? "0 0 15px #8CBE06" : "0 0 5px rgba(255,255,255,0.3)",
            animation: `float ${particle.animationDuration}s ease-in-out ${particle.animationDelay}s infinite`,
            transform: `translate(${(mousePosition.x - 0.5) * 20}px, ${(mousePosition.y - 0.5) * 20}px)`,
            transition: "transform 2s cubic-bezier(0.075, 0.82, 0.165, 1)",
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
