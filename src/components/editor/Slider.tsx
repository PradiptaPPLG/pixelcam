"use client";

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  onChange: (value: number) => void;
  onBegin?: () => void;
  onEnd?: () => void;
}

/**
 * Labeled range input. Focus/blur bound a history transaction so a whole
 * drag (pointer or keyboard) collapses to one undo step.
 */
export default function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  suffix = "",
  onChange,
  onBegin,
  onEnd,
}: SliderProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium text-[#111111]">{label}</span>
        <span className="text-[12px] tabular-nums text-[#6B7280]">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onFocus={onBegin}
        onBlur={onEnd}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-[#E5E7EB] accent-[#4F46E5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2"
      />
    </label>
  );
}
