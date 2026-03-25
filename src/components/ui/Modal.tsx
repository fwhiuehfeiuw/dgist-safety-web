'use client';

import { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  // ESC 키로 닫기
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // 배경 스크롤 방지
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* 배경 오버레이 (클릭 시 닫기) */}
          <motion.div
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* 모달 본체 */}
          <motion.div
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            {/* 헤더 */}
            {title && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-[#003876]">{title}</h3>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-[#666666]" />
                </button>
              </div>
            )}

            {/* 타이틀 없을 때 X 버튼만 표시 */}
            {!title && (
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors z-10"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-[#666666]" />
              </button>
            )}

            {/* 콘텐츠 */}
            <div className="px-6 py-5">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
