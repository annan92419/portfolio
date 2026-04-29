'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type MorphingArrowButtonProps = {
  direction: 'left' | 'right';
  onClick?: () => void;
};

export function MorphingArrowButton({ direction, onClick }: MorphingArrowButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isLeft = direction === 'left';

  const containerVariants = {
    initial: { width: '40px', x: 0 },
    hover: { width: '90px', x: isLeft ? '-50px' : 0 },
  };

  const buttonVariants = {
    initial: { borderRadius: '50%', height: '40px', padding: '0' },
    hover: {
      borderRadius: isLeft ? '50px 10px 10px 50px' : '10px 50px 50px 10px',
      height: '40px',
      padding: '0 8px',
    },
  };

  const lineVariants = {
    initial: { width: 0 },
    hover: { width: 'calc(100% - 36px)' },
  };

  const arrowVariants = {
    initial: { x: '-50%' },
    hover: { x: isLeft ? '-120%' : '20%' },
  };

  const Icon = isLeft ? ChevronLeft : ChevronRight;

  return (
    <div className="inline-block w-[90px] overflow-visible">
      <motion.div
        className={cn('flex items-center', isLeft ? 'justify-end' : 'justify-start')}
        variants={containerVariants}
        initial="initial"
        animate={isHovered ? 'hover' : 'initial'}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={onClick}
      >
        <motion.button
          className={cn(
            'w-full flex items-center justify-center border border-zinc-600',
            'relative overflow-hidden cursor-pointer bg-transparent hover:border-zinc-400 transition-colors'
          )}
          variants={buttonVariants}
          initial="initial"
          animate={isHovered ? 'hover' : 'initial'}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="relative w-full h-full flex items-center">
            <motion.div
              className={cn(
                'h-px bg-zinc-400 absolute top-1/2 -translate-y-1/2',
                isLeft ? 'right-4' : 'left-4'
              )}
              variants={lineVariants}
              initial="initial"
              animate={isHovered ? 'hover' : 'initial'}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-y-1/2"
              variants={arrowVariants}
              initial="initial"
              animate={isHovered ? 'hover' : 'initial'}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <Icon className="w-5 h-5 text-zinc-400" />
            </motion.div>
          </div>
        </motion.button>
      </motion.div>
    </div>
  );
}
