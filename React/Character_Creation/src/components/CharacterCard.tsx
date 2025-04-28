import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Avatar } from "../components/ui/avatar";
import { Separator } from "../components/ui/separator";
import VoicePlayer from "./VoicePlayer";
import { CharacterData } from "../types/characterTypes";
import { exportCharacterToJson, exportCharacterToMarkdown } from "../utils/characterUtils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";

// Define placeholder avatar URLs for different races/genders
const placeholderAvatars: Record<string, string> = {
  "Human-Male": "/assets/avatars/human-male.png",
  "Human-Female": "/assets/avatars/human-female.png",
  "Elf-Male": "/assets/avatars/elf-male.png",
  "Elf-Female": "/assets/avatars/elf-female.png",
  "default": "/assets/avatars/default.png",
};

interface CharacterCardProps {
  character: CharacterData;
  onCharacterUpdate: (characterData: CharacterData) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, onCharacterUpdate }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isGeneratingAvatar, setIsGeneratingAvatar] = useState(false);
  const [dialogText, setDialogText] = useState("");
  
  // Get appropriate placeholder based on character race and gender
  const getPlaceholderAvatar = () => {
    const key = `${character.race}-${character.gender}`;
    return placeholderAvatars[key] || placeholderAvatars.default;
  };
  
  // Generate a new avatar for the character
  const generateAvatar = async () => {
    if (!character.name) return;
    
    setIsGeneratingAvatar(true);
    
    try {
      // In a real implementation, this would call an API to generate an image
      // For now we'll simulate this with a timeout
      setTimeout(() => {
        // Update character with the "generated" avatar
        onCharacterUpdate({
          ...character,
          avatarUrl: getPlaceholderAvatar()
        });
        setIsGeneratingAvatar(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to generate avatar:", err);
      setIsGeneratingAvatar(false);
    }
  };
  
  // Handle exporting character to JSON
  const handleExportJson = () => {
    const json = exportCharacterToJson(character);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${character.name || 'character'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // Handle exporting character to Markdown
  const handleExportMarkdown = () => {
    const markdown = exportCharacterToMarkdown(character);
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${character.name || 'character'}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  // Handle copying character voice style
  const handleCopyVoiceStyle = () => {
    const style = `Voice: ${character.voiceType}, Style: ${character.speakingStyle}, Personality: ${character.personalityKeywords.filter(k => k.trim() !== "").join(", ")}`;
    navigator.clipboard.writeText(style);
    // In a real app, you'd add a toast notification here
  };
  
  // Render message if no character data is available
  if (!character || !character.name) {
    return (
      <Card className="character-card-empty">
        <CardContent className="flex flex-col items-center justify-center h-full p-8 text-center">
          <p>Fill out the form and generate your character to see the results here.</p>
          <Button 
            variant="outline" 
            onClick={() => onCharacterUpdate({...character, ...{name: "Example Character"}})}
            className="mt-4"
          >
            Generate Example Character
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="character-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {character.name}
          <div className="text-sm font-normal">
            {character.race} • {character.profession}
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start mb-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="background">Background</TabsTrigger>
            <TabsTrigger value="abilities">Abilities</TabsTrigger>
            <TabsTrigger value="dialogue">Dialogue</TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <div className="flex items-start gap-4 flex-col sm:flex-row">
              {/* Avatar section */}
              <div className="character-avatar-container">
                <Avatar className="character-avatar w-32 h-32">
                  <img 
                    src={character.avatarUrl || getPlaceholderAvatar()} 
                    alt={character.name}
                    className="object-cover"
                  />
                </Avatar>
                <Button 
                  size="sm" 
                  onClick={generateAvatar} 
                  disabled={isGeneratingAvatar}
                  className="mt-2"
                >
                  {isGeneratingAvatar ? 'Generating...' : 'Generate Avatar'}
                </Button>
              </div>
              
              {/* Basic info section */}
              <div className="character-info-container flex-1">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <h4 className="text-sm font-semibold">Age</h4>
                    <p>{character.age}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Gender</h4>
                    <p>{character.gender}</p>
                  </div>
                </div>
                
                <div className="mt-3">
                  <h4 className="text-sm font-semibold">Appearance</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {character.appearanceKeywords.filter(k => k.trim() !== "").map((keyword, idx) => (
                      <div key={idx} className="appearance-tag">
                        {keyword}
                      </div>
                    ))}
                    {character.appearanceKeywords.filter(k => k.trim() !== "").length === 0 && (
                      <p className="text-sm italic">No appearance details provided</p>
                    )}
                  </div>
                </div>
                
                {/* Voice player */}
                <div className="mt-3">
                  <h4 className="text-sm font-semibold">Voice</h4>
                  <div className="voice-container">
                    <VoicePlayer 
                      voiceType={character.voiceType} 
                      character={character} 
                      onVoiceChange={(newVoice) => onCharacterUpdate({...character, voiceType: newVoice})}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Personality */}
            <div className="mt-4">
              <h4 className="text-sm font-semibold">Personality</h4>
              <div className="flex flex-wrap gap-1 mt-1">
                {character.personalityKeywords.filter(k => k.trim() !== "").map((keyword, idx) => (
                  <div key={idx} className="personality-tag">
                    {keyword}
                  </div>
                ))}
                {character.personalityKeywords.filter(k => k.trim() !== "").length === 0 && (
                  <p className="text-sm italic">No personality traits provided</p>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold">Speaking Style</h4>
              <p>{character.speakingStyle}</p>
            </div>
          </TabsContent>
          
          {/* Background Tab */}
          <TabsContent value="background" className="space-y-4">
            {/* Birthplace and Faith */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold">Birthplace</h4>
                <p>{character.birthplace || "Unknown"}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold">Faith/Belief</h4>
                <p>{character.faith || "None specified"}</p>
              </div>
            </div>
            
            <Separator />
            
            {/* Childhood Experience */}
            <div>
              <h4 className="text-sm font-semibold">Childhood</h4>
              <p className="mt-1">{character.childhoodExperience || "No childhood details provided."}</p>
            </div>
            
            <Separator />
            
            {/* Current Standing */}
            <div>
              <h4 className="text-sm font-semibold">Current Situation</h4>
              <p className="mt-1">{character.currentStanding || "No current situation details provided."}</p>
            </div>
          </TabsContent>
          
          {/* Abilities Tab */}
          <TabsContent value="abilities" className="space-y-4">
            {/* Combat Abilities */}
            <div>
              <h4 className="text-sm font-semibold">Combat/Magic Abilities</h4>
              <p className="mt-1">{character.combatAbilities || "No combat abilities specified."}</p>
            </div>
            
            <Separator />
            
            {/* Special Skills */}
            <div>
              <h4 className="text-sm font-semibold">Special Skills</h4>
              <p className="mt-1">{character.specialSkills || "No special skills specified."}</p>
            </div>
            
            <Separator />
            
            {/* Social Skills */}
            <div>
              <h4 className="text-sm font-semibold">Social Skills</h4>
              <p className="mt-1">{character.socialSkills || "No social skills specified."}</p>
            </div>
          </TabsContent>
          
          {/* Dialogue Tab */}
          <TabsContent value="dialogue" className="space-y-4">
            {/* Sample dialogue from the character */}
            <div>
              <h4 className="text-sm font-semibold">Sample Dialogue</h4>
              {character.sampleDialogue && character.sampleDialogue.length > 0 ? (
                <div className="space-y-2 mt-2">
                  {character.sampleDialogue.map((line, idx) => (
                    <div key={idx} className="dialogue-line">
                      "{line}"
                    </div>
                  ))}
                </div>
              ) : (
                <p className="italic mt-1">No dialogue samples available.</p>
              )}
            </div>
            
            <Separator />
            
            {/* Chat with character simulation */}
            <div>
              <h4 className="text-sm font-semibold">Chat with Character</h4>
              <p className="text-xs text-muted-foreground mb-2">
                Type a message to see how this character might respond
              </p>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    Start Conversation
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Conversation with {character.name}</DialogTitle>
                  </DialogHeader>
                  <div className="chat-container h-64 overflow-y-auto border rounded-md p-4 mb-4">
                    <div className="chat-message system-message">
                      {`You are now speaking with ${character.name}, a ${character.age}-year-old ${character.gender} ${character.race} ${character.profession}.`}
                    </div>
                    
                    {dialogText && (
                      <>
                        <div className="chat-message user-message">
                          <strong>You:</strong> {dialogText}
                        </div>
                        <div className="chat-message character-message">
                          <strong>{character.name}:</strong> {generateCharacterResponse(character)}
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <input
                      className="flex-1 px-3 py-2 border rounded-md"
                      value={dialogText}
                      onChange={(e) => setDialogText(e.target.value)}
                      placeholder="Type your message..."
                    />
                    <Button onClick={() => setDialogText("")}>Send</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex flex-wrap gap-2 justify-end">
        <Button variant="outline" size="sm" onClick={handleCopyVoiceStyle}>
          Copy Voice Style
        </Button>
        <Button variant="outline" size="sm" onClick={handleExportMarkdown}>
          Export Markdown
        </Button>
        <Button variant="outline" size="sm" onClick={handleExportJson}>
          Export JSON
        </Button>
      </CardFooter>
    </Card>
  );
};

// Helper function to generate a simple response based on character's speaking style
function generateCharacterResponse(character: CharacterData): string {
  const style = character.speakingStyle.toLowerCase();
  
  // Simple response mapping based on speaking style
  const responses: Record<string, string[]> = {
    formal: [
      "I must consider your words carefully before responding.",
      "Indeed, your observation warrants attention.",
      "One would be remiss to dismiss such a statement."
    ],
    casual: [
      "Hey, that's a good point!",
      "Yeah, I get what you're saying.",
      "Cool, let's talk about that."
    ],
    stoic: [
      "So it is.",
      "Fate has many paths.",
      "Words matter less than actions."
    ],
    energetic: [
      "Absolutely incredible question!",
      "Oh wow! I was just thinking about that!",
      "Let's dive right into this exciting topic!"
    ],
    sarcastic: [
      "Oh, how wonderfully original...",
      "Brilliant observation. Whatever would I do without your insight?",
      "Sure, because that's definitely how things work."
    ],
    mysterious: [
      "Perhaps the answer lies not in what is said, but what remains silent...",
      "There are forces at work beyond your understanding.",
      "The truth has many layers, many faces."
    ],
    robotic: [
      "Processing input. Generating appropriate response.",
      "Your statement has been analyzed. Conclusion: Requires further data.",
      "Affirmative. This unit acknowledges your communication."
    ],
    poetic: [
      "Like whispers on the wind, your words touch my soul.",
      "In the garden of conversation, your thoughts bloom like rare flowers.",
      "The tapestry of fate weaves our dialogue into something greater."
    ],
    aggressive: [
      "Is that supposed to impress me?",
      "Get to the point already!",
      "I've heard better from far lesser beings."
    ],
    timid: [
      "Um... I hope it's okay that I say this...",
      "I'm not entirely sure, but maybe...",
      "I don't want to cause trouble with my answer..."
    ]
  };
  
  // Default to casual if style not found
  const styleKey = style.toLowerCase() in responses ? style.toLowerCase() : 'casual';
  const possibleResponses = responses[styleKey];
  
  // Pick a random response from the appropriate style
  return possibleResponses[Math.floor(Math.random() * possibleResponses.length)];
}

export default CharacterCard;