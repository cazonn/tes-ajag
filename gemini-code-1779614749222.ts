'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';
import { FiShoppingBag, FiMessageSquare, FiUser } from 'react-icons/fi';

export default function FloatingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const cartItems = useCartStore((state) => state.items);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 mx-auto mt-4 w-[92%] max-w-7xl rounded-2xl border transition-all duration-500 ${
        scrolled 
          ? 'border-zinc-800/80 bg-zinc-950/70 shadow-glass-card backdrop-blur-xl' 
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="flex h-16 items-center justify-between px-6">
        <Link href="/" className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-xl font-black tracking-tighter text-transparent">
          NEXUS<span className="text-brand-glow">.</span>
        </Link>

        {/* Links Tengah (Hidden on Mobile) */}
        <div className="hidden items-center gap-8 text-sm font-medium text-zinc-400 md:flex">
          <Link href="/products" className="transition-colors hover:text-white">Explore</Link>
          <Link href="/seller/register" className="transition-colors hover:text-white">Become a Seller</Link>
          <Link href="/reseller" className="transition-colors hover:text-white">Reseller Hub</Link>
        </div>

        {/* Actions Menu Kanan */}
        <div className="flex items-center gap-4 text-zinc-300">
          <Link href="/chat" className="relative p-2 transition-colors hover:text-white">
            <FiMessageSquare className="h-5 w-5" />
          </Link>
          
          <Link href="/cart" className="relative p-2 transition-colors hover:text-white">
            <FiShoppingBag className="h-5 w-5" />
            <AnimatePresence>
              {cartItems.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-brand-glow text-[10px] font-bold text-white shadow-premium-glow"
                >
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <Link href="/dashboard" className="flex items-center gap-1.5 rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-1.5 text-xs font-semibold backdrop-blur-md transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-800">
            <FiUser className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}