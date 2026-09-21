import React from 'react';
import { Flame, Building2, Laptop, IceCream, Trees, Wine, Sparkles } from 'lucide-react';
import { Category } from '../types';

interface FilterCarouselProps {
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

interface FilterItem {
  key: Category;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const FILTERS: FilterItem[] = [
  { key: 'Specialty Coffee', label: 'Specialty Coffee', icon: Flame },
  { key: 'Rooftops', label: 'Rooftops', icon: Building2 },
  { key: 'Quiet Work Spots', label: 'Quiet Work Spots', icon: Laptop },
  { key: 'Gelato', label: 'Gelato', icon: IceCream },
  { key: 'Hidden Patios', label: 'Hidden Patios', icon: Trees },
  { key: 'Aperitivo Bars', label: 'Aperitivo Bars', icon: Wine },
  { key: 'All', label: 'All Checkpoints', icon: Sparkles },
];

export const FilterCarousel: React.FC<FilterCarouselProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section className="w-full overflow-x-auto no-scrollbar py-2 pl-4 pr-4 sm:pl-5 sm:pr-5 max-w-4xl mx-auto flex items-center gap-2">
      {FILTERS.map((item) => {
        const IconComponent = item.icon;
        const isSelected = selectedCategory === item.key;
        return (
          <button
            key={item.key}
            id={`filter-chip-${item.key.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => onSelectCategory(item.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-semibold tracking-wide flex-shrink-0 transition-all active:scale-95 font-['Inter'] ${
              isSelected
                ? 'bg-[#b61a00] text-white shadow-[0_4px_14px_rgba(182,26,0,0.3)]'
                : 'bg-[#ffffff] text-[#1a1c1c] border border-[#eeeeee] shadow-sm hover:bg-[#f3f3f3]'
            }`}
          >
            <IconComponent
              className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#5f5e5e]'}`}
            />
            <span className="whitespace-nowrap">{item.label}</span>
          </button>
        );
      })}
    </section>
  );
};
