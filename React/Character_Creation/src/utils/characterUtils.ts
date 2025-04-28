import { CharacterData, Gender, Race, Profession, VoiceType } from "../types/characterTypes";

/**
 * Generates a default character with placeholder values
 */
export const generateDefaultCharacter = (): CharacterData => {
  return {
    // Basic Information
    name: "",
    age: 25,
    gender: Gender.Other,
    race: Race.Human,
    profession: Profession.Other,
    appearanceKeywords: ["", "", "", "", ""],
    
    // Background
    birthplace: "",
    faith: "",
    childhoodExperience: "",
    currentStanding: "",
    
    // Personality & Behavior
    personalityKeywords: ["", "", "", "", ""],
    speakingStyle: "Casual",
    
    // Skills & Abilities
    combatAbilities: "",
    specialSkills: "",
    socialSkills: "",
    
    // Generated Content
    avatarUrl: null,
    voiceType: VoiceType.Deep,
    characterDescription: "",
    sampleDialogue: [],
  };
};

/**
 * Generates a random character for demonstration or inspiration
 */
export const generateRandomCharacter = (): CharacterData => {
  // Names based on fantasy/sci-fi tropes
  const names = [
    "Aria Nightshade", "Thorne Blackwood", "Lyra Stardust", "Zephyr Steelsong",
    "Echo Moonshadow", "Orion Flametongue", "Nova Frostbane", "Kael Stormbringer",
    "Seraphina Whisperwind", "Draven Ironheart", "Celeste Dawnbreaker", "Vex Shadowwalker"
  ];
  
  // Random age between 18-500 (for fantasy races)
  const age = Math.floor(Math.random() * 482) + 18;
  
  // Random gender
  const genders = Object.values(Gender);
  const gender = genders[Math.floor(Math.random() * genders.length)];
  
  // Random race
  const races = Object.values(Race);
  const race = races[Math.floor(Math.random() * races.length)];
  
  // Random profession
  const professions = Object.values(Profession);
  const profession = professions[Math.floor(Math.random() * professions.length)];
  
  // Random appearance keywords
  const appearanceOptions = [
    "silver hair", "golden eyes", "scarred face", "tattooed arms", "mechanical limb", 
    "glowing runes", "pointed ears", "scaled skin", "tall and slender", "short and stocky",
    "hooded figure", "masked face", "ethereal glow", "dark aura", "gem-embedded skin"
  ];
  const appearanceKeywords = shuffleAndPick(appearanceOptions, 5);
  
  // Random birthplaces
  const birthplaces = [
    "Arcadia", "Elysium Fields", "The Floating Cities", "The Underdark", 
    "Celestial Spires", "The Iron Kingdoms", "Nethervale", "The Crystal Forest",
    "Neo Tokyo", "The Wasteland", "The Cloud Citadel", "The Bottomless Sea"
  ];
  const birthplace = birthplaces[Math.floor(Math.random() * birthplaces.length)];
  
  // Random faiths
  const faiths = [
    "The Eternal Light", "The Ancient Ones", "The Code of Steel", "The Void's Whisper",
    "The Digital Consciousness", "The Elemental Balance", "None (Atheist)", "The Universal Song",
    "The Blood Moon Covenant", "The Techno-Organic Symbiosis", "The Celestial Order"
  ];
  const faith = faiths[Math.floor(Math.random() * faiths.length)];
  
  // Random childhood experiences
  const childhoods = [
    "Raised by wolves in the wilderness",
    "Trained from birth in a secret academy",
    "Orphaned during the Great War",
    "Grew up in luxury but felt trapped",
    "Lived as a street urchin, surviving by wit alone",
    "Raised in a monastery, studying ancient texts",
    "Experimented on as a child, gaining unusual powers",
    "Born into slavery, fought for freedom",
    "Child prodigy, educated by the realm's finest scholars"
  ];
  const childhoodExperience = childhoods[Math.floor(Math.random() * childhoods.length)];
  
  // Random current standings
  const standings = [
    "Seeking revenge against those who destroyed their homeland",
    "On a quest to find a legendary artifact",
    "Hiding from authorities for a crime they didn't commit",
    "Leading a rebellion against the tyrannical empire",
    "Searching for a cure to a mysterious illness",
    "Working as a mercenary to pay off an enormous debt",
    "Hunting down dangerous monsters that threaten innocent people",
    "Investigating a conspiracy that reaches to the highest powers"
  ];
  const currentStanding = standings[Math.floor(Math.random() * standings.length)];
  
  // Random personality keywords
  const personalityOptions = [
    "loyal", "cunning", "honorable", "reckless", "calculating", 
    "compassionate", "vengeful", "stoic", "curious", "arrogant", 
    "humble", "pragmatic", "idealistic", "mysterious", "charismatic"
  ];
  const personalityKeywords = shuffleAndPick(personalityOptions, 5);
  
  // Random speaking styles
  const speakingStyles = [
    "Formal", "Casual", "Stoic", "Energetic", "Sarcastic",
    "Mysterious", "Robotic", "Poetic", "Aggressive", "Timid"
  ];
  const speakingStyle = speakingStyles[Math.floor(Math.random() * speakingStyles.length)];
  
  // Random combat abilities
  const combatAbilities = [
    "Master swordsman with lightning-fast reflexes",
    "Powerful elemental mage specializing in fire magic",
    "Stealthy assassin proficient with poisons and daggers",
    "Techno-organic enhancements granting superhuman strength",
    "Psionic powers allowing mind control and telekinesis",
    "Expert marksman with modified energy weapons",
    "Martial artist who can harness their inner chi energy",
    "Necromancer commanding an army of undead servants"
  ][Math.floor(Math.random() * 8)];
  
  // Random special skills
  const specialSkills = [
    "Can communicate with animals and plants",
    "Photographic memory and rapid learning capabilities",
    "Can manipulate technology with a touch",
    "Has prophetic visions of possible futures",
    "Can create small interdimensional portals",
    "Immune to most poisons and diseases",
    "Can temporarily copy the abilities of others",
    "Skilled craftsman able to forge magical items"
  ][Math.floor(Math.random() * 8)];
  
  // Random social skills
  const socialSkills = [
    "Silver-tongued negotiator who can talk their way out of anything",
    "Intimidating presence that makes others comply through fear",
    "Empathic abilities to sense others' emotions and desires",
    "Master of disguise who can blend into any social situation",
    "Charismatic leader who inspires loyalty and devotion",
    "Expert at reading body language and detecting lies",
    "Manipulative schemer who plays people against each other",
    "Networking genius with contacts in every level of society"
  ][Math.floor(Math.random() * 8)];
  
  // Random voice type
  const voiceTypes = Object.values(VoiceType);
  const voiceType = voiceTypes[Math.floor(Math.random() * voiceTypes.length)];
  
  // Generate sample dialogue
  const dialogueOptions = [
    "I walk my own path, regardless of what destiny may claim.",
    "In the shadows lies truth that the light refuses to reveal.",
    "Honor isn't what others bestow upon you—it's what you demand of yourself.",
    "The difference between the impossible and possible lies in determination.",
    "Sometimes survival requires becoming what you once despised.",
    "Power without wisdom is the quickest path to destruction.",
    "I've seen worlds rise and fall. Your threats mean nothing to me.",
    "Trust is a luxury I can no longer afford.",
    "We are all just stars waiting for our moment to shine.",
    "The code is absolute. I will not compromise, even in death."
  ];
  const sampleDialogue = shuffleAndPick(dialogueOptions, 3);
  
  // Create description based on selected attributes
  const characterDescription = generateCharacterDescription({
    name: names[Math.floor(Math.random() * names.length)],
    age,
    gender,
    race,
    profession,
    appearanceKeywords,
    birthplace,
    faith,
    childhoodExperience,
    currentStanding,
    personalityKeywords,
    speakingStyle,
    combatAbilities,
    specialSkills,
    socialSkills,
    voiceType,
    avatarUrl: null,
    characterDescription: "",
    sampleDialogue
  });
  
  return {
    name: names[Math.floor(Math.random() * names.length)],
    age,
    gender,
    race,
    profession,
    appearanceKeywords,
    birthplace,
    faith,
    childhoodExperience,
    currentStanding,
    personalityKeywords,
    speakingStyle,
    combatAbilities,
    specialSkills,
    socialSkills,
    avatarUrl: null,
    voiceType,
    characterDescription,
    sampleDialogue
  };
};

/**
 * Helper function to shuffle an array and pick n elements
 */
const shuffleAndPick = <T>(array: T[], n: number): T[] => {
  // Create a copy of the array to avoid modifying the original
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};

/**
 * Generate a formatted character description based on the character data
 */
export const generateCharacterDescription = (character: CharacterData): string => {
  // Filter out empty appearance and personality keywords
  const validAppearance = character.appearanceKeywords.filter(k => k.trim() !== "");
  const validPersonality = character.personalityKeywords.filter(k => k.trim() !== "");
  
  // Generate the description using available data
  const description = `
# ${character.name}

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
  
  return description;
};

/**
 * Exports character data to JSON format for saving
 */
export const exportCharacterToJson = (character: CharacterData): string => {
  return JSON.stringify(character, null, 2);
};

/**
 * Exports character data to Markdown format
 */
export const exportCharacterToMarkdown = (character: CharacterData): string => {
  return generateCharacterDescription(character);
};

/**
 * Attempts to parse a character from JSON
 */
export const importCharacterFromJson = (jsonText: string): CharacterData | null => {
  try {
    const data = JSON.parse(jsonText) as Partial<CharacterData>;
    
    // Validate required fields
    if (!data.name || data.age === undefined) {
      return null;
    }
    
    // Fill in any missing fields with defaults
    const defaultChar = generateDefaultCharacter();
    return { ...defaultChar, ...data };
  } catch (e) {
    console.error("Failed to parse character JSON:", e);
    return null;
  }
};

/**
 * Saves a character to local storage
 */
export const saveCharacterToLocalStorage = (character: CharacterData): void => {
  try {
    // Get current saved characters
    const savedCharactersJson = localStorage.getItem('savedCharacters') || '[]';
    const savedCharacters = JSON.parse(savedCharactersJson) as CharacterData[];
    
    // Check if character with same name exists
    const existingIndex = savedCharacters.findIndex(c => c.name === character.name);
    
    if (existingIndex >= 0) {
      // Update existing character
      savedCharacters[existingIndex] = character;
    } else {
      // Add new character
      savedCharacters.push(character);
    }
    
    // Save back to localStorage
    localStorage.setItem('savedCharacters', JSON.stringify(savedCharacters));
  } catch (e) {
    console.error('Failed to save character to localStorage:', e);
  }
};

/**
 * Gets all saved characters from local storage
 */
export const getSavedCharactersFromLocalStorage = (): CharacterData[] => {
  try {
    const savedCharactersJson = localStorage.getItem('savedCharacters') || '[]';
    return JSON.parse(savedCharactersJson) as CharacterData[];
  } catch (e) {
    console.error('Failed to get saved characters from localStorage:', e);
    return [];
  }
};

/**
 * Deletes a character from local storage
 */
export const deleteSavedCharacterFromLocalStorage = (characterName: string): void => {
  try {
    const savedCharactersJson = localStorage.getItem('savedCharacters') || '[]';
    const savedCharacters = JSON.parse(savedCharactersJson) as CharacterData[];
    
    // Filter out the character to delete
    const updatedCharacters = savedCharacters.filter(c => c.name !== characterName);
    
    // Save back to localStorage
    localStorage.setItem('savedCharacters', JSON.stringify(updatedCharacters));
  } catch (e) {
    console.error('Failed to delete character from localStorage:', e);
  }
};