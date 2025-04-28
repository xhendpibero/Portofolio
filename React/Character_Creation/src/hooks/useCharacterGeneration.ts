import { useState, useCallback } from "react";
import { CharacterData } from "../types/characterTypes";
import { generateDefaultCharacter } from "../utils/characterUtils";

/**
 * Hook for handling character generation functionality
 */
export const useCharacterGeneration = () => {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [character, setCharacter] = useState<CharacterData>(generateDefaultCharacter());
  const [generationHistory, setGenerationHistory] = useState<CharacterData[]>([]);
  const [error, setError] = useState<string | null>(null);

  /**
   * Generate a character description and other properties based on user inputs
   */
  const generateCharacter = useCallback(async (characterData: CharacterData) => {
    if (!characterData.name) {
      setError("Character name is required");
      return null;
    }

    setIsGenerating(true);
    setError(null);

    // In a real implementation, we would call an API to generate more character details
    // Here we'll simulate this with a timeout
    return new Promise<CharacterData>((resolve) => {
      setTimeout(() => {
        try {
          // Generate character description from input data
          const enhancedCharacter: CharacterData = {
            ...characterData,
            characterDescription: generateCharacterDescription(characterData),
            // If no sample dialogue was provided, generate some
            sampleDialogue: characterData.sampleDialogue.length === 0 
              ? generateSampleDialogue(characterData)
              : characterData.sampleDialogue
          };

          // Update state
          setCharacter(enhancedCharacter);
          setGenerationHistory(prev => [enhancedCharacter, ...prev]);
          setIsGenerating(false);
          
          resolve(enhancedCharacter);
        } catch {
          setError("Failed to generate character");
          setIsGenerating(false);
          resolve(characterData);
        }
      }, 1500);
    });
  }, []);

  /**
   * Clear current character and start fresh
   */
  const resetCharacter = useCallback(() => {
    setCharacter(generateDefaultCharacter());
    setError(null);
  }, []);

  /**
   * Load a previously generated character
   */
  const loadCharacter = useCallback((savedCharacter: CharacterData) => {
    setCharacter(savedCharacter);
    setError(null);
  }, []);

  return {
    character,
    isGenerating,
    error,
    generationHistory,
    generateCharacter,
    resetCharacter,
    loadCharacter,
  };
};

/**
 * Helper function to generate character description
 */
function generateCharacterDescription(character: CharacterData): string {
  // Filter out empty appearance and personality keywords
  const validAppearance = character.appearanceKeywords.filter(k => k.trim() !== "");
  const validPersonality = character.personalityKeywords.filter(k => k.trim() !== "");
  
  // Generate a description based on available character data
  return `# ${character.name}

## Overview
${character.name} is a ${character.age}-year-old ${character.gender} ${character.race} ${character.profession}. 
${validAppearance.length > 0 ? `They are known for their ${validAppearance.join(", ")}.` : ""}

## Background
${character.birthplace ? `Originally from ${character.birthplace}, ` : ""}${character.childhoodExperience ? character.childhoodExperience : ""}
${character.faith ? `They follow the teachings of ${character.faith}.` : ""}

${character.currentStanding ? `## Current Situation\n${character.currentStanding}` : ""}

## Personality
${validPersonality.length > 0 ? `${character.name} is ${validPersonality.join(", ")}.` : ""}
They typically speak in a ${character.speakingStyle.toLowerCase()} manner.

## Abilities
${character.combatAbilities ? `### Combat\n${character.combatAbilities}\n` : ""}
${character.specialSkills ? `### Special Skills\n${character.specialSkills}\n` : ""}
${character.socialSkills ? `### Social Aptitude\n${character.socialSkills}` : ""}
  `.trim();
}

/**
 * Helper function to generate sample dialogue based on character traits
 */
function generateSampleDialogue(character: CharacterData): string[] {
  const style = character.speakingStyle.toLowerCase();
  
  // Map speaking styles to appropriate dialogue templates
  const templates: Record<string, string[]> = {
    formal: [
      "I must consider the implications carefully before proceeding.",
      "One does not simply disregard the established protocols.",
      "It would be most prudent to evaluate all available options."
    ],
    casual: [
      "Hey, that's just how things go sometimes, you know?",
      "I'm totally up for whatever comes next!",
      "No big deal, we'll figure it out as we go."
    ],
    stoic: [
      "Such is the way of things.",
      "I accept what must be done.",
      "Emotions cloud judgment. Focus on what matters."
    ],
    energetic: [
      "Let's go! No time to waste!",
      "I can't WAIT to see what happens next!",
      "This is going to be AMAZING!"
    ],
    sarcastic: [
      "Oh sure, because THAT always works out well.",
      "Fantastic. Another brilliant plan that can't possibly fail.",
      "What could possibly go wrong? Besides everything."
    ],
    mysterious: [
      "There are layers to this you have yet to perceive.",
      "The truth hides in the shadows between words.",
      "Some secrets are best left undiscovered... for now."
    ]
  };
  
  // Default to casual if style not found
  const styleKey = style in templates ? style : 'casual';
  
  // Apply personality traits to modify the dialogue if possible
  const personality = character.personalityKeywords.filter(k => k.trim() !== "");
  const hasTraits = personality.length > 0;
  if (hasTraits) {
    // In a real implementation, we would use an AI model to incorporate personality traits
    // Here we'll just return the template dialogues
    return templates[styleKey];
  }
  
  return templates[styleKey];
}

export default useCharacterGeneration;