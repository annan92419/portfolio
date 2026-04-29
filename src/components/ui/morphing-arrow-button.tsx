'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

type MorphingArrowButtonProps = {
  direction: 'left' | 'right';
  onClick?: () => void;
};

export function MorphingArrowButton({ direction, onClick }: MorphingArrowButtonProps) {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight;

  return (
    <button
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 bg-transparent text-zinc-500 transition-colors hover:border-zinc-500 hover:text-zinc-300 cursor-pointer"
    >
      <Icon size={16} />
    </button>
  );
}
