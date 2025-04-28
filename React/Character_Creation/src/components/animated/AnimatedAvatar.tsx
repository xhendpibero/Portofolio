import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import tinycolor from 'tinycolor2';
import { AvatarAnimationConfig } from '../../types/animationTypes';
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar';

interface AnimatedAvatarProps {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  borderColor?: string;
  animationConfig?: AvatarAnimationConfig;
  className?: string;
}

export const AnimatedAvatar: React.FC<AnimatedAvatarProps> = ({
  src,
  alt = 'Avatar',
  fallback,
  size = 'md',
  borderColor = '#6366f1',
  animationConfig = {
    type: 'pulse',
    intensity: 'medium',
    highlight: false
  },
  className = '',
}) => {
  // State for animation controls
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Set loaded state when component mounts or src changes
  useEffect(() => {
    if (src) {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoaded(true);
    } else {
      setIsLoaded(true);
    }
  }, [src]);
  
  // Get size dimensions
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { width: '64px', height: '64px' };
      case 'md':
        return { width: '96px', height: '96px' };
      case 'lg':
        return { width: '128px', height: '128px' };
      case 'xl':
        return { width: '160px', height: '160px' };
      default:
        return { width: '96px', height: '96px' };
    }
  };
  
  // Get animation variants based on animation type and intensity
  const getAnimationVariants = () => {
    const getIntensityValue = () => {
      switch (animationConfig.intensity) {
        case 'low': return 0.3;
        case 'high': return 1;
        case 'medium':
        default: return 0.6;
      }
    };
    
    const intensity = getIntensityValue();
    
    switch (animationConfig.type) {
      case 'float':
        return {
          animate: {
            y: [-3 * intensity, 3 * intensity],
            transition: {
              repeat: Infinity,
              repeatType: "reverse" as const,
              duration: 2,
              ease: "easeInOut"
            }
          }
        };
      case 'bounce':
        return {
          animate: {
            y: [0, -5 * intensity, 0],
            transition: {
              repeat: Infinity,
              duration: 1.2,
              ease: "easeInOut"
            }
          }
        };
      case 'glow':
        return {
          animate: {
            boxShadow: [
              `0 0 2px ${tinycolor(borderColor).setAlpha(0.3).toString()}`,
              `0 0 8px ${tinycolor(borderColor).setAlpha(0.6).toString()}`,
              `0 0 2px ${tinycolor(borderColor).setAlpha(0.3).toString()}`
            ],
            transition: {
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut"
            }
          }
        };
      case 'shake':
        return {
          animate: {
            x: [0, -2 * intensity, 2 * intensity, -2 * intensity, 0],
            transition: {
              repeat: Infinity,
              duration: 0.8,
              ease: "easeInOut",
              repeatDelay: 2
            }
          }
        };
      case 'spin':
        return {
          animate: {
            rotate: [0, 360],
            transition: {
              repeat: Infinity,
              duration: 3 / intensity,
              ease: "linear"
            }
          }
        };
      case 'pulse':
      default:
        return {
          animate: {
            scale: [1, 1 + 0.03 * intensity, 1],
            transition: {
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut"
            }
          }
        };
    }
  };
  
  // Get highlight animation
  const getHighlightAnimation = () => {
    if (!animationConfig.highlight) return {};
    
    return {
      initial: { boxShadow: `0 0 0px ${tinycolor(borderColor).setAlpha(0).toString()}` },
      animate: {
        boxShadow: [
          `0 0 0px ${tinycolor(borderColor).setAlpha(0).toString()}`,
          `0 0 15px ${tinycolor(borderColor).setAlpha(0.5).toString()}`,
          `0 0 0px ${tinycolor(borderColor).setAlpha(0).toString()}`
        ],
        transition: {
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        }
      }
    };
  };
  
  return (
    <motion.div
      className={`animated-avatar ${className}`}
      {...getHighlightAnimation()}
      style={{ 
        ...getSizeStyles(),
        borderRadius: '50%',
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: isLoaded ? 1 : 0.8, 
          opacity: isLoaded ? 1 : 0 
        }}
        transition={{ duration: 0.5 }}
        variants={getAnimationVariants()}
        style={{ 
          width: '100%',
          height: '100%',
        }}
      >
        <Avatar 
          style={{ 
            ...getSizeStyles(),
            border: `3px solid ${borderColor}`,
            backgroundColor: tinycolor(borderColor).setAlpha(0.1).toString(),
            overflow: 'hidden',
          }}
        >
          {src && <AvatarImage src={src} alt={alt} />}
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
      </motion.div>
    </motion.div>
  );
};