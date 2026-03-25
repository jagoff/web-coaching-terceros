import { motion } from "framer-motion";
import { BarChart3, Clock, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface TestCardProps {
  onStart: () => void;
}

export default function TestCard({ onStart }: TestCardProps) {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card p-8 max-w-md mx-auto"
    >
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <BarChart3 size={32} className="text-white" />
        </div>
        
        <h3 className="heading-lg mb-4">
          <span className="text-gradient">{t.testCard.title}</span>
        </h3>
        
        <p className="text-text-secondary mb-6">
          {t.testCard.subtitle}
        </p>
        
        <ul className="text-left space-y-3 mb-8">
          <li className="flex items-center gap-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span className="text-sm">{t.testCard.dimensions}</span>
          </li>
          <li className="flex items-center gap-3">
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
            <span className="text-sm">{t.testCard.instantResults}</span>
          </li>
          <li className="flex items-center gap-3">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span className="text-sm">{t.testCard.personalizedRecommendations}</span>
          </li>
          <li className="flex items-center gap-3">
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
            <span className="text-sm">{t.testCard.duration}</span>
          </li>
        </ul>
        
        <button
          onClick={onStart}
          className="btn-primary w-full group"
        >
          {t.testCard.startTest}
          <ArrowRight 
            size={16} 
            className="inline ml-2 transition-transform group-hover:translate-x-1" 
          />
        </button>
        
        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-text-muted">
          <Clock size={12} />
          <span>{t.testCard.estimatedTime}</span>
        </div>
      </div>
    </motion.div>
  );
}
