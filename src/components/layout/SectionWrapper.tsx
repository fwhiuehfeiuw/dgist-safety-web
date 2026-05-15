'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
  bgColor?: string;
  /** 섹션 상단에 왼→오 와이프 컬러 라인. B스타일 챕터 전환감 부여. */
  accentColor?: string;
}

export default function SectionWrapper({
  id,
  children,
  className = '',
  bgColor = 'bg-white',
  accentColor,
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 72, scale: 0.97, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
      className={`relative py-6 md:py-8 lg:py-10 ${bgColor} ${className}`}
    >
      {/* 섹션 진입 시 왼→오 컬러 라인 와이프 */}
      {accentColor && (
        <motion.div
          className="absolute top-0 left-0 right-0 h-[3px] origin-left"
          style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}60)` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </motion.section>
  );
}

export function SectionTitle({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-2xl md:text-3xl font-bold text-[#003876] mb-6 md:mb-8 text-center ${className}`}
    >
      {children}
    </h2>
  );
}
