'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';
import { FiShoppingCart, FiTag } from 'react-icons/fi';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    resellerPrice: number;
    images: string[];
    rating: number;
    shop: { name: string };
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, isReseller } = useCartStore();

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group relative overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-4 backdrop-blur-md shadow-glass-card transition-shadow duration-500 hover:border-brand-glow/40 hover:shadow-premium-glow"
    >
      {/* Container Image dengan Smooth Zoom */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-zinc-800/40">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          loading="lazy"
          className="object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105"
        />
        {isReseller && (
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-brand-glow/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm shadow-md animate-pulse">
            <FiTag className="w-3.5 h-3.5" />
            Harga Reseller
          </div>
        )}
      </div>

      {/* Konten Metadata */}
      <div className="mt-4 space-y-1.5">
        <span className="text-xs font-medium tracking-wider text-zinc-500 uppercase">{product.shop.name}</span>
        <h3 className="line-clamp-1 text-sm font-semibold tracking-tight text-zinc-100 transition-colors duration-300 group-hover:text-brand-glow">
          {product.name}
        </h3>
        
        {/* Harga Dinamis Berdasarkan Tipe Akun */}
        <div className="flex flex-col pt-1">
          {isReseller ? (
            <>
              <span className="text-base font-bold text-brand-neon tracking-tight">
                {formatIDR(product.resellerPrice)}
              </span>
              <span className="text-xs text-zinc-500 line-through">
                {formatIDR(product.price)}
              </span>
            </>
          ) : (
            <span className="text-base font-bold text-zinc-100 tracking-tight">
              {formatIDR(product.price)}
            </span>
          )}
        </div>
      </div>

      {/* Button Action Tersembunyi (Akan Slide Up/Fade In di Desktop, Fleksibel di Mobile) */}
      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={() => addItem({ ...product, quantity: 1, shopId: 'shop-id-mock' })}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-zinc-100 py-2.5 text-xs font-bold text-dark-950 transition-all duration-300 active:scale-95 hover:bg-zinc-200"
        >
          <FiShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}