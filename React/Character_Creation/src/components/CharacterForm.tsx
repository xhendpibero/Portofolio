import { useState, useEffect } from "react";
import { CharacterData, Race, Profession, Gender, VoiceType, PersonalityType } from "../types/characterTypes";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Separator } from "../components/ui/separator";

interface CharacterFormProps {
  onSubmit?: (character: CharacterData) => void;
  onUpdate?: (character: CharacterData) => void;
  onReset?: () => void;
  initialData?: CharacterData;
  character?: CharacterData;
}

const CharacterForm = ({ onSubmit, onUpdate, onReset, initialData, character }: CharacterFormProps) => {
  // Use either character or initialData based on what's provided
  const defaultCharacterData: CharacterData = {
    name: '',
    age: 25,
    gender: Gender.Other,
    race: Race.Human,
    profession: Profession.Other,
    appearanceKeywords: ['', '', ''],
    personalityKeywords: ['', '', ''],
    birthplace: '',
    faith: '',
    childhoodExperience: '',
    currentStanding: '',
    speakingStyle: 'Casual',
    combatAbilities: '',
    specialSkills: '',
    socialSkills: '',
    avatarUrl: null,
    voiceType: VoiceType.Soft,
    characterDescription: '',
    sampleDialogue: [],
    personality: PersonalityType.CALM
  };
  const characterData = character || initialData || defaultCharacterData;
  const [formData, setFormData] = useState<CharacterData>(characterData);
  const [submitting, setSubmitting] = useState(false);
  
  // Update form when character/initialData changes (e.g., after tool panel changes)
  useEffect(() => {
    if (characterData) {
      setFormData(characterData);
    }
  }, [characterData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleKeywordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number, 
    field: 'appearanceKeywords' | 'personalityKeywords'
  ) => {
    const newKeywords = [...formData[field]];
    newKeywords[index] = e.target.value;
    
    setFormData(prev => ({
      ...prev,
      [field]: newKeywords,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate delay for AI processing
    setTimeout(() => {
      // Call appropriate handler
      if (onSubmit) {
        onSubmit(formData);
      } else if (onUpdate) {
        onUpdate(formData);
      }
      setSubmitting(false);
    }, 1000);
  };
  
  // Handle reset button
  const handleReset = () => {
    if (onReset) {
      onReset();
    }
  };

  return (
    <Card className="character-form-card">
      <CardHeader>
        <CardTitle>Character Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3 className="form-section-title">Basic Information</h3>
            <Separator className="mb-4" />
            
            <div className="form-group">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Character name"
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleChange}
                  min={0}
                  placeholder="Age"
                  required
                />
              </div>
              
              <div className="form-group">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleSelectChange("gender", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={Gender.Male}>Male</SelectItem>
                    <SelectItem value={Gender.Female}>Female</SelectItem>
                    <SelectItem value={Gender.Other}>Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <Label htmlFor="race">Race</Label>
                <Select
                  value={formData.race}
                  onValueChange={(value) => handleSelectChange("race", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select race" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={Race.Human}>Human</SelectItem>
                    <SelectItem value={Race.Elf}>Elf</SelectItem>
                    <SelectItem value={Race.Dwarf}>Dwarf</SelectItem>
                    <SelectItem value={Race.Orc}>Orc</SelectItem>
                    <SelectItem value={Race.Android}>Android</SelectItem>
                    <SelectItem value={Race.Alien}>Alien</SelectItem>
                    <SelectItem value={Race.Other}>Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="form-group">
                <Label htmlFor="profession">Profession</Label>
                <Select
                  value={formData.profession}
                  onValueChange={(value) => handleSelectChange("profession", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select profession" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={Profession.Warrior}>Warrior</SelectItem>
                    <SelectItem value={Profession.Mage}>Mage</SelectItem>
                    <SelectItem value={Profession.Rogue}>Rogue</SelectItem>
                    <SelectItem value={Profession.Healer}>Healer</SelectItem>
                    <SelectItem value={Profession.Merchant}>Merchant</SelectItem>
                    <SelectItem value={Profession.Noble}>Noble</SelectItem>
                    <SelectItem value={Profession.Scientist}>Scientist</SelectItem>
                    <SelectItem value={Profession.Engineer}>Engineer</SelectItem>
                    <SelectItem value={Profession.Soldier}>Soldier</SelectItem>
                    <SelectItem value={Profession.Pilot}>Pilot</SelectItem>
                    <SelectItem value={Profession.Other}>Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="form-group">
              <Label>Appearance Keywords</Label>
              <div className="keywords-grid">
                {formData.appearanceKeywords.map((keyword, index) => (
                  <Input
                    key={`appearance-${index}`}
                    value={keyword}
                    onChange={(e) => handleKeywordChange(e, index, 'appearanceKeywords')}
                    placeholder={`Appearance trait ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="form-section">
            <h3 className="form-section-title">Background</h3>
            <Separator className="mb-4" />
            
            <div className="form-group">
              <Label htmlFor="birthplace">Birthplace</Label>
              <Input
                id="birthplace"
                name="birthplace"
                value={formData.birthplace}
                onChange={handleChange}
                placeholder="Character's place of birth"
              />
            </div>
            
            <div className="form-group">
              <Label htmlFor="faith">Faith/Belief System</Label>
              <Input
                id="faith"
                name="faith"
                value={formData.faith}
                onChange={handleChange}
                placeholder="Character's faith or belief system"
              />
            </div>
            
            <div className="form-group">
              <Label htmlFor="childhood">Childhood Experience</Label>
              <Textarea
                id="childhood"
                name="childhoodExperience"
                value={formData.childhoodExperience}
                onChange={handleChange}
                placeholder="Brief description of character's childhood"
                rows={3}
              />
            </div>
            
            <div className="form-group">
              <Label htmlFor="currentStanding">Current Standing</Label>
              <Textarea
                id="currentStanding"
                name="currentStanding"
                value={formData.currentStanding}
                onChange={handleChange}
                placeholder="Character's current position and goals"
                rows={3}
              />
            </div>
          </div>
          
          <div className="form-section">
            <h3 className="form-section-title">Personality & Behavior</h3>
            <Separator className="mb-4" />
            
            <div className="form-group">
              <Label>Personality Keywords</Label>
              <div className="keywords-grid">
                {formData.personalityKeywords.map((keyword, index) => (
                  <Input
                    key={`personality-${index}`}
                    value={keyword}
                    onChange={(e) => handleKeywordChange(e, index, 'personalityKeywords')}
                    placeholder={`Personality trait ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            <div className="form-group">
              <Label htmlFor="speakingStyle">Speaking Style</Label>
              <Select
                value={formData.speakingStyle}
                onValueChange={(value) => handleSelectChange("speakingStyle", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select speaking style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Formal">Formal</SelectItem>
                  <SelectItem value="Casual">Casual</SelectItem>
                  <SelectItem value="Stoic">Stoic</SelectItem>
                  <SelectItem value="Energetic">Energetic</SelectItem>
                  <SelectItem value="Sarcastic">Sarcastic</SelectItem>
                  <SelectItem value="Mysterious">Mysterious</SelectItem>
                  <SelectItem value="Robotic">Robotic</SelectItem>
                  <SelectItem value="Poetic">Poetic</SelectItem>
                  <SelectItem value="Aggressive">Aggressive</SelectItem>
                  <SelectItem value="Timid">Timid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="form-section">
            <h3 className="form-section-title">Skills & Abilities</h3>
            <Separator className="mb-4" />
            
            <div className="form-group">
              <Label htmlFor="combatSkills">Combat/Magic Abilities</Label>
              <Textarea
                id="combatSkills"
                name="combatAbilities"
                value={formData.combatAbilities}
                onChange={handleChange}
                placeholder="Character's combat or magical abilities"
                rows={3}
              />
            </div>
            
            <div className="form-group">
              <Label htmlFor="specialSkills">Special Skills</Label>
              <Textarea
                id="specialSkills"
                name="specialSkills"
                value={formData.specialSkills}
                onChange={handleChange}
                placeholder="Character's special skills or talents"
                rows={3}
              />
            </div>
            
            <div className="form-group">
              <Label htmlFor="socialSkills">Social Skills</Label>
              <Textarea
                id="socialSkills"
                name="socialSkills"
                value={formData.socialSkills}
                onChange={handleChange}
                placeholder="Character's social abilities (e.g., persuasion, deception)"
                rows={3}
              />
            </div>
          </div>
          
          <CardFooter className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="generate-button"
            >
              {submitting ? 'Generating...' : 'Generate Character'}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default CharacterForm;