import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { Textarea } from "../components/ui/textarea";
import { CharacterData } from "../types/characterTypes";
import { generateRandomCharacter, importCharacterFromJson, exportCharacterToJson, exportCharacterToMarkdown } from "../utils/characterUtils";

interface ToolsPanelProps {
  character: CharacterData;
  onCharacterUpdate: (character: CharacterData) => void;
}

const ToolsPanel: React.FC<ToolsPanelProps> = ({ character, onCharacterUpdate }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState("");
  const [savedCharacters, setSavedCharacters] = useState<CharacterData[]>([]);
  
  // Generate a random characteristic or element
  const handleGenerateRandom = (type: string) => {
    setIsGenerating(true);
    
    // Simulate delay for AI processing
    setTimeout(() => {
      let updatedCharacter = { ...character };
      
      if (type === "background") {
        const backgrounds = [
          "Hidden royalty in exile, unaware of their true heritage.",
          "The last survivor of an ancient civilization with forgotten knowledge.",
          "Cursed by a deity to wander eternally, seeking redemption.",
          "A clone who gained sentience and escaped the laboratory.",
          "Possessed by a benevolent spirit that grants unusual powers.",
          "Raised by creatures of another species, struggling to fit into either world.",
          "Involved in a secret organization that controls world events.",
          "The reincarnation of a historical figure with fragmented memories.",
          "Unwillingly bonded to an extraplanar entity seeking to experience mortal life.",
          "The product of a forbidden magical/scientific experiment.",
        ];
        
        updatedCharacter = {
          ...character,
          currentStanding: backgrounds[Math.floor(Math.random() * backgrounds.length)]
        };
      }
      
      else if (type === "quotes") {
        const quotes = [
          "The shadows whisper secrets to those patient enough to listen.",
          "In a world of masks, the honest face becomes the greatest deception.",
          "I've seen too much to believe in coincidence anymore.",
          "My mercy has its limits, and you've been testing them for quite some time.",
          "Some wounds don't heal—they just stop bleeding.",
          "Trust is a currency I rarely spend.",
          "We make choices in the dark and live with them in the light.",
          "Fear is wisdom in the face of danger, not cowardice.",
          "I may walk with demons, but that doesn't mean I serve them.",
          "The difference between a hero and villain? Usually just who's telling the story.",
        ];
        
        // Select 3 random quotes
        const shuffled = [...quotes].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);
        
        updatedCharacter = {
          ...character,
          sampleDialogue: selected
        };
      }
      
      else if (type === "random") {
        // Generate a completely random character
        updatedCharacter = generateRandomCharacter();
      }
      
      onCharacterUpdate(updatedCharacter);
      setIsGenerating(false);
    }, 1500);
  };
  
  // Handle JSON import
  const handleImport = () => {
    if (!importText.trim()) {
      setImportError("Please paste JSON character data");
      return;
    }
    
    setIsImporting(true);
    setImportError("");
    
    try {
      const importedCharacter = importCharacterFromJson(importText);
      
      if (importedCharacter) {
        onCharacterUpdate(importedCharacter);
        setImportText("");
      } else {
        setImportError("Invalid character data format");
      }
    } catch (err) {
      console.error("Import error:", err);
      setImportError("Failed to parse character data");
    }
    
    setIsImporting(false);
  };
  
  // Handle saving the current character
  const handleSaveCharacter = () => {
    if (!character.name) return;
    
    try {
      // Get current saved characters from localStorage
      const savedCharactersJson = localStorage.getItem('savedCharacters') || '[]';
      const storedCharacters = JSON.parse(savedCharactersJson) as CharacterData[];
      
      // Check if character with same name exists
      const existingIndex = storedCharacters.findIndex(c => c.name === character.name);
      
      if (existingIndex >= 0) {
        // Update existing character
        storedCharacters[existingIndex] = character;
      } else {
        // Add new character
        storedCharacters.push(character);
      }
      
      // Save back to localStorage
      localStorage.setItem('savedCharacters', JSON.stringify(storedCharacters));
      
      // Update state
      setSavedCharacters(storedCharacters);
    } catch (e) {
      console.error('Failed to save character to localStorage:', e);
    }
  };
  
  // Load a saved character
  const handleLoadCharacter = (savedCharacter: CharacterData) => {
    onCharacterUpdate(savedCharacter);
  };
  
  // Load saved characters on component mount
  React.useEffect(() => {
    try {
      // Get saved characters from localStorage
      const savedCharactersJson = localStorage.getItem('savedCharacters') || '[]';
      const loadedCharacters = JSON.parse(savedCharactersJson) as CharacterData[];
      setSavedCharacters(loadedCharacters);
    } catch (e) {
      console.error('Failed to load characters from localStorage:', e);
    }
  }, []);

  return (
    <Card className="tools-panel h-full">
      <CardHeader>
        <CardTitle>Tools & Inspiration</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Random Generation Tools */}
        <div className="generation-tools">
          <h3 className="text-sm font-semibold mb-2">Generate Random Elements</h3>
          
          <div className="flex flex-col gap-2">
            <Button 
              variant="outline" 
              onClick={() => handleGenerateRandom("background")}
              disabled={isGenerating}
              className="justify-start"
            >
              <span className="mr-2">🎭</span>
              Random Mysterious Background
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => handleGenerateRandom("quotes")}
              disabled={isGenerating}
              className="justify-start"
            >
              <span className="mr-2">💬</span>
              Generate Character Quotes
            </Button>
            
            <Button 
              variant="secondary" 
              onClick={() => handleGenerateRandom("random")}
              disabled={isGenerating}
              className="justify-start mt-1"
            >
              <span className="mr-2">🎲</span>
              Generate Complete Random Character
            </Button>
          </div>
        </div>
        
        <Separator />
        
        {/* Character Import/Export */}
        <div className="import-export">
          <h3 className="text-sm font-semibold mb-2">Import Character</h3>
          <p className="text-xs text-muted-foreground mb-2">
            Paste a character JSON to import or use file import
          </p>
          
          <div className="space-y-2">
            <Textarea 
              placeholder="Paste character JSON here..."
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              rows={5}
            />
            
            {importError && (
              <p className="text-sm text-red-500">{importError}</p>
            )}
            
            <div className="flex flex-col gap-2">
              <Button 
                variant="outline" 
                onClick={handleImport}
                disabled={isImporting || !importText.trim()}
                className="w-full"
              >
                {isImporting ? "Importing..." : "Import Character"}
              </Button>
              
              <div className="flex gap-2 justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = ".json";
                    
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          try {
                            const jsonData = event.target?.result as string;
                            const importedCharacter = importCharacterFromJson(jsonData);
                            if (importedCharacter) {
                              onCharacterUpdate(importedCharacter);
                            } else {
                              setImportError("Invalid character data format");
                            }
                          } catch (error) {
                            setImportError("Failed to parse character data");
                            console.error("Import error:", error);
                          }
                        };
                        reader.readAsText(file);
                      }
                    };
                    
                    input.click();
                  }}
                >
                  Import File
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Create a downloadable json file
                    if (!character.name) {
                      alert("Please give your character a name before exporting");
                      return;
                    }
                    
                    const jsonString = exportCharacterToJson(character);
                    const blob = new Blob([jsonString], { type: "application/json" });
                    const url = URL.createObjectURL(blob);
                    
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `${character.name || "character"}.json`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                  }}
                >
                  Export File
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Create a downloadable markdown file
                    if (!character.name) {
                      alert("Please give your character a name before exporting");
                      return;
                    }
                    
                    const markdownString = exportCharacterToMarkdown(character);
                    const blob = new Blob([markdownString], { type: "text/markdown" });
                    const url = URL.createObjectURL(blob);
                    
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `${character.name || "character"}.md`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                  }}
                >
                  Export MD
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <Separator />
        
        {/* Saved Characters */}
        <div className="saved-characters">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">Saved Characters</h3>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleSaveCharacter}
              disabled={!character.name}
            >
              Save Current
            </Button>
          </div>
          
          {savedCharacters.length > 0 ? (
            <div className="space-y-2">
              {savedCharacters.map((saved, index) => (
                <div key={index} className="saved-character-item flex justify-between items-center p-2 border rounded-md">
                  <div>
                    <p className="font-medium">{saved.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {saved.race} {saved.profession}
                    </p>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleLoadCharacter(saved)}
                    >
                      Load
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        try {
                          // Get current saved characters from localStorage
                          const savedCharactersJson = localStorage.getItem('savedCharacters') || '[]';
                          const storedCharacters = JSON.parse(savedCharactersJson) as CharacterData[];
                          
                          // Filter out the character to delete
                          const updatedCharacters = storedCharacters.filter(c => c.name !== saved.name);
                          
                          // Save back to localStorage
                          localStorage.setItem('savedCharacters', JSON.stringify(updatedCharacters));
                          
                          // Update state
                          setSavedCharacters(updatedCharacters);
                        } catch (e) {
                          console.error('Failed to delete character:', e);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No saved characters yet.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolsPanel;