// Optimized icon components with tree-shaking
// This reduces bundle size by only importing used icons

import { 
  // Navigation
  ChevronRight,
  ChevronLeft, 
  ChevronDown,
  Menu,
  X,
  
  // Social
  Linkedin,
  Instagram,
  Youtube,
  
  // Actions
  ArrowRight,
  CheckCircle2,
  Star,
  Play,
  
  // Business
  Users,
  Target,
  Zap,
  Flame,
  Gem,
  TrendingUp,
  Clock,
  Calendar,
  BarChart3,
  
  // Communication
  MessageCircle,
  Mail,
  MessageSquare,
  User,
  MapPin,
  
  // Status
  Loader2,
  AlertCircle,
  Shield,
  QrCode,
  Trophy,
  Sparkles,
} from 'lucide-react';

// Export all icons for tree-shaking
export {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Menu,
  X,
  Linkedin,
  Instagram,
  Youtube,
  ArrowRight,
  CheckCircle2,
  Star,
  Play,
  Users,
  Target,
  Zap,
  Flame,
  Gem,
  TrendingUp,
  Clock,
  Calendar,
  BarChart3,
  MessageCircle,
  Mail,
  MessageSquare,
  User,
  MapPin,
  Loader2,
  AlertCircle,
  Shield,
  QrCode,
  Trophy,
  Sparkles,
};

// Icon mapping for dynamic usage
export const iconMap = {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Menu,
  X,
  Linkedin,
  Instagram,
  Youtube,
  ArrowRight,
  CheckCircle2,
  Star,
  Play,
  Users,
  Target,
  Zap,
  Flame,
  Gem,
  TrendingUp,
  Clock,
  Calendar,
  BarChart3,
  MessageCircle,
  Mail,
  MessageSquare,
  User,
  MapPin,
  Loader2,
  AlertCircle,
  Shield,
  QrCode,
  Trophy,
  Sparkles,
} as const;

export type IconName = keyof typeof iconMap;
