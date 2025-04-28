import React from "react";
import { motion } from "framer-motion";
import { CharacterData, Gender, PersonalityType, VoiceType } from "../types/characterTypes";
import { AnimatedCard } from "./animated/AnimatedCard";
import { AnimatedAvatar } from "./animated/AnimatedAvatar";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { containerVariants, listItemVariants } from "../types/animationTypes";
import tinycolor from "tinycolor2";

// Type for props
interface EnhancedCharacterCardProps {
  character: CharacterData;
  onVoiceChange?: (voiceType: VoiceType) => void;
}

// Map personality types to colors
const personalityColors = {
  [PersonalityType.CHEERFUL]: "#10b981", // Emerald
  [PersonalityType.CALM]: "#3b82f6", // Blue
  [PersonalityType.ENIGMATIC]: "#8b5cf6", // Violet
  [PersonalityType.PROFESSIONAL]: "#6366f1", // Indigo
  [PersonalityType.QUIRKY]: "#ec4899", // Pink
  [PersonalityType.SERIOUS]: "#64748b", // Slate
  [PersonalityType.WITTY]: "#f59e0b", // Amber
  [PersonalityType.PLAYFUL]: "#f43f5e", // Rose
};

// Map gender to colors
const genderColors = {
  [Gender.Male]: "#0284c7", // Sky
  [Gender.Female]: "#d946ef", // Fuchsia
  "Non-Binary": "#8b5cf6", // Violet
  [Gender.Other]: "#10b981", // Emerald
};

export const EnhancedCharacterCard: React.FC<EnhancedCharacterCardProps> = ({
  character,
  onVoiceChange,
}) => {
  // Generate a color palette based on the character's personality
  const baseColor = character.personality && personalityColors[character.personality] ? personalityColors[character.personality] : "#6366f1";
  const secondaryColor = character.gender && genderColors[character.gender] ? genderColors[character.gender] : "#8b5cf6";
  const accentColor = character.age < 30 
    ? tinycolor(baseColor).spin(30).brighten(10).toString() 
    : tinycolor(baseColor).darken(10).desaturate(10).toString();

  // Generate avatar URL based on character properties
  // Using a placeholder avatar for now, should be replaced with dynamically generated avatars
  const getAvatarUrl = () => {
    if (character.avatarUrl) return character.avatarUrl;
    
    // Default avatar if none is set
    const gender = character.gender?.toLowerCase();
    if (gender === 'male') {
      return "https://api.dicebear.com/7.x/avataaars/svg?seed=" + encodeURIComponent(character.name || "male") + "&backgroundColor=b6e3f4,c0aede,d1d4f9";
    } else if (gender === 'female') {
      return "https://api.dicebear.com/7.x/avataaars/svg?seed=" + encodeURIComponent(character.name || "female") + "&backgroundColor=ffdfbf,ffd5dc,c0aede";
    } else {
      return "https://api.dicebear.com/7.x/avataaars/svg?seed=" + encodeURIComponent(character.name || "nonbinary") + "&backgroundColor=d1d4f9";
    }
  };

  // Get animation configuration based on character personality
  const getAvatarAnimation = () => {
    switch (character.personality) {
      case PersonalityType.PLAYFUL:
      case PersonalityType.CHEERFUL:
        return { 
          type: "bounce" as const, 
          intensity: "medium" as const, 
          highlight: true 
        };
      case PersonalityType.CALM:
      case PersonalityType.PROFESSIONAL:
      case PersonalityType.SERIOUS:
        return { 
          type: "pulse" as const, 
          intensity: "low" as const, 
          highlight: true 
        };
      case PersonalityType.ENIGMATIC:
        return { 
          type: "glow" as const, 
          intensity: "medium" as const, 
          highlight: true 
        };
      case PersonalityType.QUIRKY:
      case PersonalityType.WITTY:
        return { 
          type: "float" as const, 
          intensity: "medium" as const, 
          highlight: true 
        };
      default:
        return { 
          type: "pulse" as const, 
          intensity: "medium" as const, 
          highlight: true 
        };
    }
  };

  // Voice sample buttons
  const voiceSamples = [
    { type: VoiceType.Melodic, icon: "😄", label: "Cheerful" },
    { type: VoiceType.Soft, icon: "😌", label: "Calm" },
    { type: VoiceType.Commanding, icon: "🧑‍💼", label: "Professional" },
    { type: VoiceType.Ethereal, icon: "🔮", label: "Mysterious" },
  ];

  return (
    <AnimatedCard
      title="Character Profile"
      animationConfig={{
        elevation: "medium",
        animation: "fade",
        gradient: true,
        interactive: true,
        colorScheme: baseColor
      }}
      className="w-full max-w-md mx-auto"
    >
      <div className="flex flex-col items-center gap-4">
        {/* Character avatar with animation */}
        <AnimatedAvatar
          src={getAvatarUrl()}
          alt={character.name || "Character"}
          fallback={character.name?.charAt(0) || "?"}
          size="xl"
          borderColor={baseColor}
          animationConfig={getAvatarAnimation()}
          className="mt-2"
        />
        
        {/* Character name with animated text */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-600" 
              style={{ backgroundImage: `linear-gradient(to right, ${baseColor}, ${secondaryColor})` }}>
            {character.name || "Unnamed Character"}
          </h2>
          
          <div className="flex items-center justify-center gap-2 mt-1">
            <Badge 
              variant="outline" 
              className="font-medium"
              style={{ borderColor: tinycolor(accentColor).setAlpha(0.5).toString() }}
            >
              {character.age || "?"} years
            </Badge>
            <Badge 
              style={{ 
                backgroundColor: tinycolor(character.gender && genderColors[character.gender] ? genderColors[character.gender] : "#8b5cf6").setAlpha(0.2).toString(),
                color: character.gender && genderColors[character.gender] ? genderColors[character.gender] : "#8b5cf6",
                borderColor: tinycolor(character.gender && genderColors[character.gender] ? genderColors[character.gender] : "#8b5cf6").setAlpha(0.3).toString()
              }}
            >
              {character.gender || "Unspecified gender"}
            </Badge>
            <Badge 
              style={{ 
                backgroundColor: tinycolor(character.personality && personalityColors[character.personality] ? personalityColors[character.personality] : "#6366f1").setAlpha(0.2).toString(),
                color: character.personality && personalityColors[character.personality] ? personalityColors[character.personality] : "#6366f1",
                borderColor: tinycolor(character.personality && personalityColors[character.personality] ? personalityColors[character.personality] : "#6366f1").setAlpha(0.3).toString()
              }}
            >
              {character.personality || "Unspecified personality"}
            </Badge>
          </div>
        </motion.div>
        
        <Separator className="my-2" style={{ backgroundColor: tinycolor(baseColor).setAlpha(0.2).toString() }} />
        
        {/* Character background with animated reveal */}
        <motion.div 
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h3 className="text-md font-semibold mb-2" style={{ color: baseColor }}>Background</h3>
          <p className="text-sm opacity-90 leading-relaxed">
            {character.background || "This character doesn't have a background story yet."}
          </p>
        </motion.div>
        
        {/* Character speech patterns */}
        <motion.div 
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h3 className="text-md font-semibold mb-2" style={{ color: accentColor }}>Speech Pattern</h3>
          <div className="bg-black/5 rounded-md p-3 text-sm italic">
            "{character.speechPattern || "This character doesn't have a defined speech pattern."}"
          </div>
        </motion.div>
        
        {/* Sample dialogues with animation */}
        <motion.div 
          className="w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h3 className="text-md font-semibold mb-2" style={{ color: secondaryColor }}>Sample Dialogues</h3>
          
          {character.sampleDialogues && character.sampleDialogues.length > 0 ? (
            <div className="space-y-2">
              {character.sampleDialogues.map((dialogue, index) => (
                <motion.div
                  key={index}
                  className="bg-black/5 rounded-md p-2 text-sm"
                  variants={listItemVariants}
                  custom={index}
                  whileHover="hover"
                >
                  "{dialogue}"
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-sm opacity-70 italic">No sample dialogues available.</p>
          )}
        </motion.div>
        
        {/* Voice selector with animated buttons */}
        {onVoiceChange && (
          <motion.div 
            className="w-full mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-md font-semibold mb-2">Voice Type</h3>
            <div className="grid grid-cols-2 gap-2">
              {voiceSamples.map((voice, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Button
                    variant={character.voiceType === voice.type ? "default" : "outline"}
                    onClick={() => onVoiceChange(voice.type)}
                    className="w-full flex items-center gap-2 justify-center"
                    style={character.voiceType === voice.type ? {
                      backgroundColor: baseColor,
                      borderColor: baseColor
                    } : {}}
                  >
                    <span>{voice.icon}</span>
                    {voice.label}
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </AnimatedCard>
  );
};

export default EnhancedCharacterCard;