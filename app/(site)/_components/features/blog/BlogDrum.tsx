"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { BlogPost } from "@content/blogPosts";

interface BlogDrumProps {
  posts: BlogPost[];
}

interface Sphere {
  angle: number; // Position on circle (radians)
  angularVelocity: number; // Rotation speed
  radius: number;
  mass: number;
  post: BlogPost;
  color: { start: string; end: string };
  // For realistic physics
  stuckToWall: boolean; // Whether sphere is pressed against wall
  wallFriction: number; // Friction with drum wall
}

export default function BlogDrum({ posts }: BlogDrumProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);
  const router = useRouter();

  // Physics state
  const animationRef = useRef<number | undefined>(undefined);
  const spheresRef = useRef<Sphere[]>([]);
  const drumRotationRef = useRef(0);
  const drumAngularVelocityRef = useRef(0.015); // Auto-rotation speed
  const mouseRef = useRef({ x: 0, y: 0, isDown: false, lastX: 0, dragStartTime: 0 });
  const lastTimeRef = useRef(Date.now());
  const autoRotateRef = useRef(true); // Auto-rotate when not dragging

  // Drum parameters
  const DRUM_RADIUS = 250;
  const SPHERE_RADIUS = 50;
  const GRAVITY = 0.0012; // Gravity strength
  const DRUM_FRICTION = 0.992; // Drum rotation friction
  const SPHERE_FRICTION = 0.97; // Sphere movement friction
  const WALL_FRICTION = 0.85; // Friction when sphere touches wall
  const BOUNCE_DAMPING = 0.6; // Energy loss on collision
  const CENTRIFUGAL_THRESHOLD = 0.03; // Speed needed to stick to wall

  // Category colors
  const categoryColors: Record<string, { start: string; end: string }> = {
    Tutorial: { start: "#60a5fa", end: "#3b82f6" },
    "Deep Dive": { start: "#a78bfa", end: "#8b5cf6" },
    Performance: { start: "#34d399", end: "#10b981" },
    Architecture: { start: "#f59e0b", end: "#d97706" },
    CSS: { start: "#ec4899", end: "#db2777" },
    Opinion: { start: "#6366f1", end: "#4f46e5" },
  };

  // Initialize spheres
  const initializeSpheres = useCallback(() => {
    const spheres: Sphere[] = [];

    posts.forEach((post, index) => {
      const angle = (index / posts.length) * Math.PI * 2;
      
      spheres.push({
        angle: angle,
        angularVelocity: (Math.random() - 0.5) * 0.01,
        radius: SPHERE_RADIUS,
        mass: 1.0,
        post,
        color: categoryColors[post.category] || { start: "#60a5fa", end: "#3b82f6" },
        stuckToWall: false,
        wallFriction: 0.9,
      });
    });

    spheresRef.current = spheres;
  }, [posts]);

  // Check collision between two spheres
  const checkCollision = useCallback((s1: Sphere, s2: Sphere) => {
    // Calculate angular distance
    let angleDiff = s2.angle - s1.angle;
    
    // Normalize angle difference to [-PI, PI]
    while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
    while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
    
    // Convert to arc length
    const arcDistance = Math.abs(angleDiff) * (DRUM_RADIUS - SPHERE_RADIUS);
    const minDistance = s1.radius + s2.radius;

    if (arcDistance < minDistance) {
      // Collision detected!
      
      // Calculate relative velocity
      const relativeVelocity = s2.angularVelocity - s1.angularVelocity;
      
      // Only resolve if spheres are approaching
      if ((angleDiff > 0 && relativeVelocity < 0) || (angleDiff < 0 && relativeVelocity > 0)) {
        // Elastic collision with damping
        const totalMass = s1.mass + s2.mass;
        const v1 = s1.angularVelocity;
        const v2 = s2.angularVelocity;
        
        // Conservation of momentum with energy loss
        s1.angularVelocity = ((s1.mass - s2.mass) * v1 + 2 * s2.mass * v2) / totalMass * BOUNCE_DAMPING;
        s2.angularVelocity = ((s2.mass - s1.mass) * v2 + 2 * s1.mass * v1) / totalMass * BOUNCE_DAMPING;
        
        // Separate spheres to prevent overlap
        const overlap = minDistance - arcDistance;
        const separationAngle = overlap / (DRUM_RADIUS - SPHERE_RADIUS) / 2;
        
        if (angleDiff > 0) {
          s1.angle -= separationAngle;
          s2.angle += separationAngle;
        } else {
          s1.angle += separationAngle;
          s2.angle -= separationAngle;
        }
        
        // Both spheres lose wall contact on collision
        s1.stuckToWall = false;
        s2.stuckToWall = false;
      }
    }
  }, []);

  // Physics update
  const updatePhysics = useCallback((deltaTime: number) => {
    const spheres = spheresRef.current;
    const drumAngularVelocity = drumAngularVelocityRef.current;
    const drumSpeed = Math.abs(drumAngularVelocity);

    spheres.forEach((sphere) => {
      // Current position in world space (relative to ground)
      const worldAngle = sphere.angle + drumRotationRef.current;
      
      // === GRAVITY FORCE ===
      // Gravity pulls down (toward bottom of screen)
      // sin(worldAngle) gives vertical component: 1 at bottom, -1 at top, 0 at sides
      const gravityForce = Math.sin(worldAngle) * GRAVITY * deltaTime;
      
      // === CENTRIFUGAL FORCE ===
      // When drum spins fast, spheres are pushed outward (stick to wall)
      const centrifugalForce = drumSpeed * drumSpeed * 100;
      
      // Check if sphere should stick to wall
      if (centrifugalForce > CENTRIFUGAL_THRESHOLD) {
        sphere.stuckToWall = true;
        sphere.wallFriction = WALL_FRICTION;
      } else {
        sphere.stuckToWall = false;
        sphere.wallFriction = 0.95;
      }
      
      // === DRUM FRICTION ===
      // When stuck to wall, sphere rotates with drum (high friction)
      // When falling, less friction
      let drumFriction;
      if (sphere.stuckToWall) {
        // High friction - sphere moves with drum
        drumFriction = (drumAngularVelocity - sphere.angularVelocity) * 0.15;
      } else {
        // Low friction - sphere can slide/fall
        drumFriction = (drumAngularVelocity - sphere.angularVelocity) * 0.03;
      }
      
      // === APPLY FORCES ===
      sphere.angularVelocity += gravityForce;
      sphere.angularVelocity += drumFriction;
      
      // === UPDATE POSITION ===
      sphere.angle += sphere.angularVelocity * deltaTime;
      
      // === APPLY FRICTION ===
      if (sphere.stuckToWall) {
        // High friction when stuck to wall
        sphere.angularVelocity *= sphere.wallFriction;
      } else {
        // Normal friction when falling
        sphere.angularVelocity *= SPHERE_FRICTION;
      }
      
      // === NORMALIZE ANGLE ===
      while (sphere.angle > Math.PI * 2) sphere.angle -= Math.PI * 2;
      while (sphere.angle < 0) sphere.angle += Math.PI * 2;
    });

    // === CHECK COLLISIONS ===
    for (let i = 0; i < spheres.length; i++) {
      for (let j = i + 1; j < spheres.length; j++) {
        checkCollision(spheres[i], spheres[j]);
      }
    }

    // === UPDATE DRUM ROTATION ===
    drumRotationRef.current += drumAngularVelocityRef.current * deltaTime;
    
    // Auto-rotate when not being dragged
    if (autoRotateRef.current && !mouseRef.current.isDown) {
      // Gradually return to auto-rotation speed
      const targetSpeed = 0.015;
      const diff = targetSpeed - drumAngularVelocityRef.current;
      drumAngularVelocityRef.current += diff * 0.01;
    } else if (!autoRotateRef.current) {
      // Apply friction when manually spun
      drumAngularVelocityRef.current *= DRUM_FRICTION;
    }
  }, [checkCollision]);

  // Draw drum
  const drawDrum = useCallback((ctx: CanvasRenderingContext2D, centerX: number, centerY: number) => {
    // Outer circle (drum wall)
    ctx.strokeStyle = "rgba(150, 150, 150, 0.6)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(centerX, centerY, DRUM_RADIUS, 0, Math.PI * 2);
    ctx.stroke();

    // Inner circle (for depth effect)
    ctx.strokeStyle = "rgba(100, 100, 100, 0.3)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, DRUM_RADIUS - 10, 0, Math.PI * 2);
    ctx.stroke();

    // Drum lines (spokes)
    const numSpokes = 12;
    for (let i = 0; i < numSpokes; i++) {
      const angle = (i / numSpokes) * Math.PI * 2 + drumRotationRef.current * 0.5;
      const x1 = centerX + Math.cos(angle) * (DRUM_RADIUS - 10);
      const y1 = centerY + Math.sin(angle) * (DRUM_RADIUS - 10);
      const x2 = centerX + Math.cos(angle) * 30;
      const y2 = centerY + Math.sin(angle) * 30;

      ctx.strokeStyle = "rgba(120, 120, 120, 0.2)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // Center hub
    const hubGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 30);
    hubGradient.addColorStop(0, "rgba(180, 180, 180, 0.8)");
    hubGradient.addColorStop(1, "rgba(100, 100, 100, 0.6)");
    ctx.fillStyle = hubGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(80, 80, 80, 0.8)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }, []);

  // Draw sphere
  const drawSphere = useCallback((
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    sphere: Sphere,
    isHovered: boolean
  ) => {
    const radius = sphere.radius;

    // Visual indicator when stuck to wall (subtle glow)
    if (sphere.stuckToWall) {
      const stuckGradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 1.2);
      stuckGradient.addColorStop(0, "rgba(255, 255, 255, 0.1)");
      stuckGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = stuckGradient;
      ctx.beginPath();
      ctx.arc(x, y, radius * 1.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Glow effect on hover
    if (isHovered) {
      const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 1.5);
      glowGradient.addColorStop(0, "rgba(59, 130, 246, 0.5)");
      glowGradient.addColorStop(1, "rgba(59, 130, 246, 0)");
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(x, y, radius * 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Sphere gradient
    const gradient = ctx.createRadialGradient(
      x - radius * 0.3,
      y - radius * 0.3,
      0,
      x,
      y,
      radius
    );

    gradient.addColorStop(0, sphere.color.start);
    gradient.addColorStop(1, sphere.color.end);

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Highlight
    const highlightGradient = ctx.createRadialGradient(
      x - radius * 0.4,
      y - radius * 0.4,
      0,
      x - radius * 0.4,
      y - radius * 0.4,
      radius * 0.6
    );
    highlightGradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
    highlightGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.fillStyle = highlightGradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Border
    ctx.strokeStyle = isHovered ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.5)";
    ctx.lineWidth = isHovered ? 4 : 2;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Text
    ctx.fillStyle = "white";
    ctx.font = `bold ${Math.max(11, radius / 3.5)}px Inter, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
    ctx.shadowBlur = 6;

    // Word wrap
    const words = sphere.post.title.split(" ");
    const maxWidth = radius * 1.7;
    let line = "";
    const lines: string[] = [];

    words.forEach((word) => {
      const testLine = line + word + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && line !== "") {
        lines.push(line);
        line = word + " ";
      } else {
        line = testLine;
      }
    });
    lines.push(line);

    const lineHeight = radius / 3;
    const startY = y - ((lines.length - 1) * lineHeight) / 2;

    lines.slice(0, 3).forEach((line, i) => {
      let displayLine = line.trim();
      if (i === 2 && lines.length > 3) {
        displayLine += "...";
      }
      ctx.fillText(displayLine, x, startY + i * lineHeight);
    });

    ctx.shadowBlur = 0;

    // Category badge
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.font = `${Math.max(9, radius / 5)}px Inter, sans-serif`;
    const badgeText = sphere.post.category;
    const badgeMetrics = ctx.measureText(badgeText);
    const badgePadding = 6;
    const badgeX = x;
    const badgeY = y + radius * 0.65;

    ctx.beginPath();
    ctx.roundRect(
      badgeX - badgeMetrics.width / 2 - badgePadding,
      badgeY - 8,
      badgeMetrics.width + badgePadding * 2,
      16,
      8
    );
    ctx.fill();

    ctx.fillStyle = "white";
    ctx.fillText(badgeText, badgeX, badgeY);
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Calculate delta time
    const currentTime = Date.now();
    const deltaTime = Math.min((currentTime - lastTimeRef.current) / 16, 2); // Cap at 2x speed
    lastTimeRef.current = currentTime;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Update physics
    updatePhysics(deltaTime);

    // Draw drum
    drawDrum(ctx, centerX, centerY);

    // Draw spheres (sorted by angle for proper layering)
    const spheresWithPos = spheresRef.current.map((sphere) => {
      const angle = sphere.angle + drumRotationRef.current;
      const x = centerX + Math.cos(angle) * (DRUM_RADIUS - sphere.radius);
      const y = centerY + Math.sin(angle) * (DRUM_RADIUS - sphere.radius);
      
      return { sphere, x, y, angle };
    });

    // Sort by y position (top to bottom)
    spheresWithPos.sort((a, b) => a.y - b.y);

    spheresWithPos.forEach(({ sphere, x, y }) => {
      const isHovered = hoveredPost === sphere.post.slug;
      drawSphere(ctx, x, y, sphere, isHovered);
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [updatePhysics, drawDrum, drawSphere, hoveredPost]);

  // Handle mouse move
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Control drum rotation with drag
    if (mouseRef.current.isDown) {
      const dx = x - mouseRef.current.lastX;
      const dragSpeed = dx * 0.002; // Increased sensitivity
      drumAngularVelocityRef.current = dragSpeed;
      autoRotateRef.current = false; // Disable auto-rotate while dragging
    }

    mouseRef.current.x = x;
    mouseRef.current.y = y;
    mouseRef.current.lastX = x;

    // Check hover (only when not dragging)
    if (!mouseRef.current.isDown) {
      let foundHover = false;
      spheresRef.current.forEach((sphere) => {
        const angle = sphere.angle + drumRotationRef.current;
        const sx = centerX + Math.cos(angle) * (DRUM_RADIUS - sphere.radius);
        const sy = centerY + Math.sin(angle) * (DRUM_RADIUS - sphere.radius);
        
        const distance = Math.sqrt(Math.pow(x - sx, 2) + Math.pow(y - sy, 2));

        if (distance < sphere.radius) {
          setHoveredPost(sphere.post.slug);
          foundHover = true;
        }
      });

      if (!foundHover) {
        setHoveredPost(null);
      }
    }
  }, []);

  // Handle mouse down/up
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    mouseRef.current.isDown = true;
    mouseRef.current.dragStartTime = Date.now();
    mouseRef.current.lastX = e.clientX - canvasRef.current!.getBoundingClientRect().left;
    setHoveredPost(null); // Clear hover when dragging
  }, []);

  const handleMouseUp = useCallback(() => {
    const dragDuration = Date.now() - mouseRef.current.dragStartTime;
    mouseRef.current.isDown = false;
    
    // If drag was very short (< 200ms), treat as click
    // Otherwise, enable auto-rotate after a delay
    if (dragDuration > 200) {
      setTimeout(() => {
        if (!mouseRef.current.isDown) {
          autoRotateRef.current = true;
        }
      }, 2000); // Resume auto-rotate after 2 seconds
    }
  }, []);

  // Handle click
  const handleClick = useCallback(() => {
    const dragDuration = Date.now() - mouseRef.current.dragStartTime;
    
    // Only navigate if it was a quick click (not a drag)
    if (hoveredPost && dragDuration < 200) {
      router.push(`/blog/${hoveredPost}`);
    }
  }, [hoveredPost, router]);

  // Handle resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
  }, []);

  // Initialize
  useEffect(() => {
    initializeSpheres();
    handleResize();
    window.addEventListener("resize", handleResize);

    lastTimeRef.current = Date.now();
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initializeSpheres, handleResize, animate]);

  return (
    <div ref={containerRef} className="relative w-full h-[600px] md:h-[700px] lg:h-[800px]">
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleClick}
        className="w-full h-full cursor-pointer"
        style={{ touchAction: "none" }}
      />

      {/* Hover tooltip */}
      {hoveredPost && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full
                      bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl
                      border border-gray-200 dark:border-white/20
                      shadow-xl animate-fadeInUp pointer-events-none z-10">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            Click to read article
          </p>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          🎯 Drag to spin faster/slower • Click sphere to read
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500">
          Watch the physics in action!
        </p>
      </div>
    </div>
  );
}
