"use client"

import React from 'react';
import { motion, AnimatePresence } from "framer-motion";

interface ExpandableGridProps {
  children: React.ReactNode[];
  expandedIndex: number | null;
}

export function ExpandableGrid({ children, expandedIndex }: ExpandableGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full relative">
      {React.Children.map(children, (child, index) => {
        const rowPosition = Math.floor(index / 3);
        const isExpanded = expandedIndex === index;
        
        return (
          <motion.div
            style={{
              gridRow: isExpanded 
                ? `${rowPosition + 1}` 
                : expandedIndex !== null && Math.floor(expandedIndex / 3) === rowPosition 
                  ? `${rowPosition + 2}`
                  : expandedIndex !== null && Math.floor(expandedIndex / 3) < rowPosition
                    ? `${rowPosition + 2}`
                    : `${rowPosition + 1}`,
              gridColumn: isExpanded ? '1 / -1' : 'auto',
            }}
            className={`relative ${isExpanded ? 'z-20' : 'z-0'}`}
            layout
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div
              layout
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              animate={{ 
                width: isExpanded ? '100%' : '100%'
              }}
            >
              {child}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}