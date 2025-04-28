export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other"
}

export enum Race {
  Human = "Human",
  Elf = "Elf",
  Dwarf = "Dwarf",
  Orc = "Orc",
  Android = "Android",
  Alien = "Alien",
  Other = "Other"
}

export enum Profession {
  Warrior = "Warrior",
  Mage = "Mage",
  Rogue = "Rogue",
  Healer = "Healer",
  Merchant = "Merchant",
  Noble = "Noble",
  Scientist = "Scientist",
  Engineer = "Engineer",
  Soldier = "Soldier",
  Pilot = "Pilot",
  Other = "Other"
}

export enum VoiceType {
  Deep = "Deep",
  Melodic = "Melodic",
  Rough = "Rough",
  Soft = "Soft",
  Robotic = "Robotic",
  Ethereal = "Ethereal",
  Commanding = "Commanding",
  Whispering = "Whispering",
  Growling = "Growling",
  Childlike = "Childlike",
  // New voice types for EnhancedCharacterCard
  CHEERFUL = "CHEERFUL",
  CALM = "CALM",
  PROFESSIONAL = "PROFESSIONAL",
  MYSTERIOUS = "MYSTERIOUS"
}

export enum PersonalityType {
  CHEERFUL = "CHEERFUL",
  CALM = "CALM",
  ENIGMATIC = "ENIGMATIC",
  PROFESSIONAL = "PROFESSIONAL",
  QUIRKY = "QUIRKY",
  SERIOUS = "SERIOUS",
  WITTY = "WITTY",
  PLAYFUL = "PLAYFUL"
}

export interface CharacterData {
  // Basic Information
  name: string;
  age: number;
  gender: Gender;
  race: Race;
  profession: Profession;
  appearanceKeywords: string[]; // e.g. ["silver hair", "one eye", "mechanical arm"]
  
  // Background
  birthplace: string;
  faith: string;
  childhoodExperience: string;
  currentStanding: string; // current position, goals, conflicts
  background?: string; // Full background story
  
  // Personality & Behavior
  personalityKeywords: string[]; // e.g. ["stoic", "loyal", "curious", "reckless", "compassionate"]
  speakingStyle: string; // e.g. "formal", "casual", "sarcastic", "mysterious"
  personality?: PersonalityType; // Overall personality type
  speechPattern?: string; // Pattern of speech/dialect
  
  // Skills & Abilities
  combatAbilities: string; // combat skills or magic abilities
  specialSkills: string; // special talents or abilities
  socialSkills: string; // social skills like persuasion, deception, etc.
  
  // Generated Content
  avatarUrl: string | null; // URL for the generated avatar image
  voiceType: VoiceType;
  characterDescription: string; // AI-generated full character description
  sampleDialogue: string[]; // Sample dialogue lines in the character's style
  sampleDialogues?: string[]; // Alternative name for sample dialogue lines
}