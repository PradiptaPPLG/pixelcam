"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useDragControls } from "framer-motion";
import { Trash2, RotateCw } from "lucide-react";

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

  // Local state for fast rendering during drags
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [scale, setScale] = useState(initialScale);
  const [rotation, setRotation] = useState(initialRotation);
  
  // Sync if parent updates
  useEffect(() => {
    setPosition({ x: initialX, y: initialY });
    setScale(initialScale);
    setRotation(initialRotation);
  }, [initialX, initialY, initialScale, initialRotation]);

  useEffect(() => {
    controls.set({ x: position.x, y: position.y, scale, rotate: rotation });
  }, [controls, position, scale, rotation]);

  // Handle Resizing
  const handleResizeStart = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (!stickerRef.current) return;
    onSelect();

    const target = e.currentTarget;
    try {
      target.setPointerCapture(e.pointerId);
    } catch (err) {
      console.warn("Failed to set pointer capture:", err);
    }

    const rect = stickerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const initialDistance = Math.hypot(e.clientX - centerX, e.clientY - centerY);
    const startScale = scale;
    let latestScale = startScale;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const currentDistance = Math.hypot(moveEvent.clientX - centerX, moveEvent.clientY - centerY);
      // Prevent scaling too small or too large
      const newScale = Math.min(3.0, Math.max(0.3, (currentDistance / initialDistance) * startScale));
      latestScale = newScale;
      setScale(newScale);
    };

    const handlePointerUp = (upEvent: PointerEvent) => {
      try {
        target.releasePointerCapture(upEvent.pointerId);
      } catch (err) {}
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      onChange(id, { scale: parseFloat(latestScale.toFixed(2)) });
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  // Handle Rotation
  const handleRotateStart = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (!stickerRef.current) return;
    onSelect();

    const target = e.currentTarget;
    try {
      target.setPointerCapture(e.pointerId);
    } catch (err) {
      console.warn("Failed to set pointer capture:", err);
    }

    const rect = stickerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    const startRotation = rotation;
    let latestRotation = startRotation;

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const currentAngle = Math.atan2(moveEvent.clientY - centerY, moveEvent.clientX - centerX);
      const angleDiff = currentAngle - startAngle;
      const newRotation = (startRotation + angleDiff * (180 / Math.PI)) % 360;
      latestRotation = newRotation;
      setRotation(newRotation);
    };

    const handlePointerUp = (upEvent: PointerEvent) => {
      try {
        target.releasePointerCapture(upEvent.pointerId);
      } catch (err) {}
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      onChange(id, { rotation: Math.round(latestRotation) });
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

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
        x: position.x,
        y: position.y,
        scale,
        rotate: rotation,
        touchAction: "none",
        zIndex: isSelected ? 50 : 10,
        marginLeft: -50,
        marginTop: -50,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      className={`group w-[100px] h-[100px] flex items-center justify-center cursor-move transition-shadow duration-200 ${
        isSelected ? "outline outline-2 outline-[#4F46E5] outline-offset-4" : ""
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt="Sticker"
        className="w-full h-full object-contain pointer-events-none drop-shadow-sm select-none"
      />

      {/* Canva-like Controls */}
      {isSelected && (
        <>
          {/* Corner Resize Handles */}
          <div
            onPointerDown={handleResizeStart}
            className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 bg-white border-2 border-[#4F46E5] rounded-full cursor-nwse-resize z-50 shadow-sm"
          />
          <div
            onPointerDown={handleResizeStart}
            className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-white border-2 border-[#4F46E5] rounded-full cursor-nesw-resize z-50 shadow-sm"
          />
          <div
            onPointerDown={handleResizeStart}
            className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 bg-white border-2 border-[#4F46E5] rounded-full cursor-nesw-resize z-50 shadow-sm"
          />
          <div
            onPointerDown={handleResizeStart}
            className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 bg-white border-2 border-[#4F46E5] rounded-full cursor-nwse-resize z-50 shadow-sm"
          />

          {/* Delete Button (Top Middle / slightly offset) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-150 z-50"
            title="Delete Sticker"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          {/* Rotate Handle (Bottom center stem and button) */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center z-50">
            <div className="w-0.5 h-4 bg-[#4F46E5]" />
            <div
              onPointerDown={handleRotateStart}
              className="w-7 h-7 bg-white dark:bg-[#18181b] border-2 border-[#4F46E5] hover:border-[#4338CA] dark:border-[#818CF8] dark:hover:border-[#6366F1] rounded-full flex items-center justify-center cursor-alias shadow-md hover:scale-110 transition-transform active:scale-95"
              title="Drag to Rotate"
            >
              <RotateCw className="w-3.5 h-3.5 text-[#4F46E5] dark:text-[#818CF8]" />
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
}
