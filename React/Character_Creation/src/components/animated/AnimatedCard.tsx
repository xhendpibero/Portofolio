import React from 'react';
import { motion } from 'framer-motion';
import tinycolor from "tinycolor2";
import { CardAnimationConfig, scaleInVariants } from '../../types/animationTypes';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';

interface AnimatedCardProps {
  title?: string;
  children: React.ReactNode;
  animationConfig?: CardAnimationConfig;
  className?: string;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  title,
  children,
  animationConfig = {
    elevation: 'medium',
    animation: 'fade',
    gradient: false,
    interactive: false,
    colorScheme: '#6366f1'
  },
  className = '',
}) => {
  // Generate shadow based on elevation
  const getShadow = () => {
    const color = animationConfig.colorScheme || '#6366f1';
    const shadowColor = tinycolor(color).setAlpha(0.15).toString();
    
    switch (animationConfig.elevation) {
      case 'high':
        return `0 20px 25px -5px ${shadowColor}, 0 8px 10px -6px ${shadowColor}`;
      case 'medium':
        return `0 10px 15px -3px ${shadowColor}, 0 4px 6px -4px ${shadowColor}`;
      case 'low':
      default:
        return `0 4px 6px -1px ${shadowColor}, 0 2px 4px -2px ${shadowColor}`;
    }
  };
  
  // Get animation variants based on animation type
  const getAnimationVariants = () => {
    switch (animationConfig.animation) {
      case 'slide':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: {
              type: "spring" as const,
              stiffness: 300,
              damping: 20
            }
          }
        };
      case 'zoom':
        return scaleInVariants;
      case 'bounce':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: {
              type: "spring" as const,
              stiffness: 400,
              damping: 10
            }
          }
        };
      case 'fade':
      default:
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: {
              duration: 0.5
            }
          }
        };
    }
  };
  
  // Generate gradient if enabled
  const generateGradient = () => {
    if (!animationConfig.gradient) return {};
    
    const baseColor = animationConfig.colorScheme || '#6366f1';
    const accentColor = tinycolor(baseColor).lighten(15).spin(15).toString();
    
    return {
      background: `linear-gradient(145deg, ${tinycolor(baseColor).setAlpha(0.05).toString()}, ${tinycolor(accentColor).setAlpha(0.1).toString()})`,
      borderTop: `1px solid ${tinycolor(baseColor).setAlpha(0.1).toString()}`,
      borderLeft: `1px solid ${tinycolor(baseColor).setAlpha(0.1).toString()}`,
      borderRight: `1px solid ${tinycolor(accentColor).setAlpha(0.05).toString()}`,
      borderBottom: `1px solid ${tinycolor(accentColor).setAlpha(0.05).toString()}`,
    };
  };
  
  // Get hover animations if interactive
  const getHoverAnimation = () => {
    if (!animationConfig.interactive) return {};
    
    return {
      whileHover: { 
        scale: 1.02,
        boxShadow: getShadow(), 
        transition: { duration: 0.3 }
      },
      whileTap: { 
        scale: 0.98,
        transition: { duration: 0.3 }
      }
    };
  };
  
  return (
    <motion.div
      className={`animated-card-container ${className}`}
      variants={getAnimationVariants()}
      initial="hidden"
      animate="visible"
      {...getHoverAnimation()}
    >
      <Card 
        className="animated-card overflow-hidden"  
        style={{
          ...generateGradient(),
          boxShadow: getShadow(),
          borderRadius: "12px",
        }}
      >
        {title && (
          <CardHeader className="pb-0">
            <CardTitle 
              className="text-xl font-bold"
              style={{
                color: animationConfig.colorScheme || 'inherit'
              }}
            >
              {title}
            </CardTitle>
          </CardHeader>
        )}
        <CardContent className={title ? 'pt-4' : 'pt-6'}>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
};