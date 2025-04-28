import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { CharacterData, VoiceType } from "../types/characterTypes";

interface VoicePlayerProps {
  voiceType: VoiceType;
  character: CharacterData;
  onVoiceChange?: (voice: VoiceType) => void;
}

const VoicePlayer: React.FC<VoicePlayerProps> = ({ voiceType, onVoiceChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<VoiceType>(voiceType);

  // Update local state when prop changes
  useEffect(() => {
    setSelectedVoice(voiceType);
  }, [voiceType]);
  
  // Function to play voice sample
  const playVoiceSample = () => {
    // In a real app, this would play audio from a backend service
    // For now, just simulate the playing state
    setIsPlaying(true);
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };
  
  // Handle voice type change
  const handleVoiceChange = (value: string) => {
    const newVoiceType = value as VoiceType;
    setSelectedVoice(newVoiceType);
    
    // Notify parent component about voice change
    if (onVoiceChange) {
      onVoiceChange(newVoiceType);
    }
  };

  return (
    <div className="voice-player">
      <div className="flex items-center gap-2">
        <Select 
          value={selectedVoice} 
          onValueChange={handleVoiceChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select voice type" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(VoiceType).map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={playVoiceSample}
          disabled={isPlaying}
        >
          {isPlaying ? "Playing..." : "Listen"}
        </Button>
      </div>
      
      {isPlaying && (
        <div className="mt-2">
          <div className="bg-secondary p-2 rounded-md">
            <div className="flex items-center">
              <div className="flex-1">
                <div className="text-xs">
                  <span className="animate-pulse">Playing {selectedVoice} voice sample...</span>
                  <div className="h-1 bg-primary/30 rounded mt-1">
                    <div className="h-1 bg-primary rounded animate-pulse" style={{width: '60%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoicePlayer;