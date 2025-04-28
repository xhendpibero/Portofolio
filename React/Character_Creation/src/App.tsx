import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CharacterForm from "./components/CharacterForm";
import EnhancedCharacterCard from "./components/EnhancedCharacterCard";
import ToolsPanel from "./components/ToolsPanel";
import { CharacterData } from "./types/characterTypes";
import { generateDefaultCharacter } from "./utils/characterUtils";
import "./App.css";

function App() {
  const [character, setCharacter] = useState<CharacterData>(generateDefaultCharacter());
  const [currentTab, setCurrentTab] = useState<"form" | "card" | "tools">("form");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showWelcome, setShowWelcome] = useState(true);
  
  // Handle window resize for responsive layout
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCharacterSubmit = (characterData: CharacterData) => {
    setCharacter(characterData);
    
    // On mobile, switch to character card view after form submission
    if (windowWidth < 768) {
      setCurrentTab("card");
    }
  };

  const handleCharacterUpdate = (characterData: CharacterData) => {
    setCharacter(characterData);
  };
  
  // Welcome screen renderer
  const renderWelcomeScreen = () => (
    <div className="welcome-screen">
      <motion.div 
        className="animated-bg welcome-bg" 
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear", repeatType: "reverse" }}
      />

      <motion.div 
        className="welcome-content"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="welcome-title-container"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
        >
          <h1 className="welcome-title">AI Character Generator</h1>
          <motion.div 
            className="title-underline"
            initial={{ width: 0 }}
            animate={{ width: "180px" }}
            transition={{ delay: 1, duration: 0.8 }}
          />
        </motion.div>

        <motion.div
          className="welcome-avatar-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <motion.div 
            className="floating-avatar avatar-1"
            animate={{ y: ["-10px", "10px"] }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 3, ease: "easeInOut" }}
          />
          <motion.div 
            className="floating-avatar avatar-2"
            animate={{ y: ["10px", "-10px"] }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 2.5, ease: "easeInOut" }}
          />
          <motion.div 
            className="floating-avatar avatar-3"
            animate={{ y: ["-15px", "15px"] }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 3.5, ease: "easeInOut" }}
          />
        </motion.div>

        <motion.p 
          className="welcome-tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          Create, customize, and bring your characters to life
        </motion.p>

        <motion.div
          className="welcome-features"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <div className="feature-item">
            <div className="feature-icon">✏️</div>
            <div className="feature-text">Detailed Profiles</div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🎭</div>
            <div className="feature-text">Unique Personalities</div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🔊</div>
            <div className="feature-text">Voice Selection</div>
          </div>
          <div className="feature-item">
            <div className="feature-icon">💾</div>
            <div className="feature-text">Save Characters</div>
          </div>
        </motion.div>

        <motion.button
          className="welcome-cta-button"
          onClick={() => setShowWelcome(false)}
          whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(99, 102, 241, 0.4)" }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  );
  
  // Determine layout based on screen width
  const renderDesktopLayout = () => (
    <motion.div 
      className="app-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Background */}
      <motion.div 
        className="animated-bg" 
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear", repeatType: "reverse" }}
      />
      <motion.div 
        className="app-left-panel"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <CharacterForm onSubmit={handleCharacterSubmit} initialData={character} />
      </motion.div>
      <motion.div 
        className="app-middle-panel"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <EnhancedCharacterCard 
          character={character} 
          onVoiceChange={(voiceType) => {
            setCharacter(prev => ({ ...prev, voiceType }));
          }} 
        />
      </motion.div>
      <motion.div 
        className="app-right-panel"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <ToolsPanel character={character} onCharacterUpdate={handleCharacterUpdate} />
      </motion.div>
    </motion.div>
  );

  const renderTabletLayout = () => (
    <motion.div 
      className="app-container tablet-layout"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Background */}
      <motion.div 
        className="animated-bg" 
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear", repeatType: "reverse" }}
      />
      <motion.div 
        className="app-left-panel"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <CharacterForm onSubmit={handleCharacterSubmit} initialData={character} />
      </motion.div>
      <motion.div 
        className="app-right-container"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="tab-buttons">
          <motion.button 
            className={`tab-button ${currentTab === "card" ? "active" : ""}`}
            onClick={() => setCurrentTab("card")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Character Card
          </motion.button>
          <motion.button 
            className={`tab-button ${currentTab === "tools" ? "active" : ""}`}
            onClick={() => setCurrentTab("tools")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Tools
          </motion.button>
        </div>
        <motion.div 
          className="tab-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          key={currentTab} // This forces re-animation when tab changes
        >
          {currentTab === "card" ? (
            <EnhancedCharacterCard 
              character={character} 
              onVoiceChange={(voiceType) => {
                setCharacter(prev => ({ ...prev, voiceType }));
              }} 
            />
          ) : (
            <ToolsPanel character={character} onCharacterUpdate={handleCharacterUpdate} />
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );

  const renderMobileLayout = () => (
    <motion.div 
      className="app-container mobile-layout"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Background */}
      <motion.div 
        className="animated-bg" 
        animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear", repeatType: "reverse" }}
      />
      <div className="tab-buttons">
        <motion.button 
          className={`tab-button ${currentTab === "form" ? "active" : ""}`}
          onClick={() => setCurrentTab("form")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="tab-icon">✏️</span>
          Form
        </motion.button>
        <motion.button 
          className={`tab-button ${currentTab === "card" ? "active" : ""}`}
          onClick={() => setCurrentTab("card")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="tab-icon">👥</span>
          Character
        </motion.button>
        <motion.button 
          className={`tab-button ${currentTab === "tools" ? "active" : ""}`}
          onClick={() => setCurrentTab("tools")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="tab-icon">🛠️</span>
          Tools
        </motion.button>
      </div>
      <motion.div 
        className="tab-content"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        key={currentTab} // This forces re-animation when tab changes
      >
        {currentTab === "form" && (
          <CharacterForm onSubmit={handleCharacterSubmit} initialData={character} />
        )}
        {currentTab === "card" && (
          <EnhancedCharacterCard 
            character={character} 
            onVoiceChange={(voiceType) => {
              setCharacter(prev => ({ ...prev, voiceType }));
            }} 
          />
        )}
        {currentTab === "tools" && (
          <ToolsPanel character={character} onCharacterUpdate={handleCharacterUpdate} />
        )}
      </motion.div>
    </motion.div>
  );
  
  // Select layout based on screen width
  let layoutToRender;
  if (windowWidth >= 1024) {
    layoutToRender = renderDesktopLayout();
  } else if (windowWidth >= 768) {
    layoutToRender = renderTabletLayout();
  } else {
    layoutToRender = renderMobileLayout();
  }

  return (
    <div className="app-wrapper">
      {showWelcome ? (
        renderWelcomeScreen()
      ) : (
        <>
          {/* Animated Background */}
          <motion.div 
            className="animated-bg" 
            animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear", repeatType: "reverse" }}
          />
          <motion.header 
            className="app-header"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.h1 
              className="app-title"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              AI Character Generator
            </motion.h1>
            <motion.p 
              className="app-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Create detailed characters for your stories, games, and roleplay
            </motion.p>
          </motion.header>
          {layoutToRender}
        </>
      )}
    </div>
  );
}

export default App;