"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useDragControls } from "framer-motion";
import { X, Scaling, RotateCw } from "lucide-react";

interface DraggableStickerProps {
  id: string;
  url: string;
  initialX: number;
  initialY: number;
  initialScale: number;
  initialRotation: number;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: (id: string) => void;
  onChange: (id: string, updates: { x?: number; y?: number; scale?: number; rotation?: number }) => void;
  boundsRef: React.RefObject<HTMLDivElement | null>;
}

export default function DraggableSticker({
  id,
  url,
  initialX,
  initialY,
  initialScale,
  initialRotation,
  isSelected,
  onSelect,
  onDelete,
  onChange,
  boundsRef,
}: DraggableStickerProps) {
  const controls = useAnimation();
  const dragControls = useDragControls();
  const stickerRef = useRef<HTMLDivElement>(null);

  // We keep local state for rapid updates during drag/resize,
  // then push to parent (onChange) on end.
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [scale, setScale] = useState(initialScale);
  const [rotation, setRotation] = useState(initialRotation);
  
  // Sync if parent overrides
  useEffect(() => {
    setPosition({ x: initialX, y: initialY });
    setScale(initialScale);
    setRotation(initialRotation);
  }, [initialX, initialY, initialScale, initialRotation]);

  useEffect(() => {
    controls.set({ x: position.x, y: position.y, scale, rotate: rotation });
  }, [controls, position, scale, rotation]);

  return (
    <motion.div
      ref={stickerRef}
      drag
      dragControls={dragControls}
      dragConstraints={boundsRef}
      dragElastic={0}
      dragMomentum={false}
      onDragStart={onSelect}
      onDragEnd={(e, info) => {
        if (!stickerRef.current) return;
        
        // Framer Motion automatically applies a transform matrix.
        // We can parse the computed style to get the final X/Y offset from the 50%/50% center.
        const style = window.getComputedStyle(stickerRef.current);
        const matrix = new DOMMatrixReadOnly(style.transform);
        
        const newX = matrix.m41;
        const newY = matrix.m42;
        
        setPosition({ x: newX, y: newY });
        onChange(id, { x: newX, y: newY });
      }}
      animate={controls}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        // Offset by -50% to center it based on x, y coordinates
        x: position.x,
        y: position.y,
        scale,
        rotate: rotation,
        touchAction: "none",
        zIndex: isSelected ? 50 : 10,
        marginLeft: -50, // Assuming base width 100px
        marginTop: -50,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      className={`group w-[100px] h-[100px] flex items-center justify-center cursor-move ${
        isSelected ? "ring-2 ring-[#4F46E5] ring-offset-2 ring-offset-transparent" : ""
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt="Sticker"
        className="w-full h-full object-contain pointer-events-none drop-shadow-sm"
      />

      {/* Controls (Only visible when selected) */}
      {isSelected && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            className="absolute -top-3 -right-3 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          
          {/* Note: Full resize/rotate handles require complex math in React without a library.
              For this implementation, we will use simple buttons to step scale/rotation 
              to avoid adding heavy dragging math dependencies, keeping it lightweight and bug-free. */}
          <div className="absolute -bottom-8 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 shadow-md border border-black/5">
            <button 
              className="p-1 hover:bg-black/5 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                const newScale = Math.max(0.5, scale - 0.1);
                setScale(newScale);
                onChange(id, { scale: newScale });
              }}
            >
              <Scaling className="w-3.5 h-3.5 text-gray-700" />
            </button>
            <div className="w-px h-3 bg-gray-300" />
            <button 
              className="p-1 hover:bg-black/5 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                const newScale = Math.min(2.5, scale + 0.1);
                setScale(newScale);
                onChange(id, { scale: newScale });
              }}
            >
              <Scaling className="w-3.5 h-3.5 text-gray-700" style={{ transform: 'scale(1.2)' }} />
            </button>
            <div className="w-px h-3 bg-gray-300" />
            <button 
              className="p-1 hover:bg-black/5 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                const newRot = (rotation + 15) % 360;
                setRotation(newRot);
                onChange(id, { rotation: newRot });
              }}
            >
              <RotateCw className="w-3.5 h-3.5 text-gray-700" />
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
}
