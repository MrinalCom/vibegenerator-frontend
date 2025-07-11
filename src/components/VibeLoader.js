import { useState, useEffect, useCallback } from "react";

export default function VibeLoader() {
  const [currentEmoji, setCurrentEmoji] = useState(0);
  const [currentText, setCurrentText] = useState(0);
  const [particles, setParticles] = useState([]);
  const [gameMode, setGameMode] = useState("loading"); // 'loading', 'catch', 'memory', 'tap'
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  // Catch Game States
  const [catchTargets, setCatchTargets] = useState([]);
  const [catchScore, setCatchScore] = useState(0);

  // Memory Game States
  const [memorySequence, setMemorySequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [showingSequence, setShowingSequence] = useState(false);
  const [memoryScore, setMemoryScore] = useState(0);

  // Tap Game States
  const [tapTargets, setTapTargets] = useState([]);
  const [tapScore, setTapScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);

  const vibeEmojis = [
    "🌟",
    "✨",
    "💫",
    "🎯",
    "🚀",
    "🌈",
    "🎨",
    "🔥",
    "💎",
    "🎭",
    "🌸",
    "🦄",
  ];

  const loadingTexts = [
    "🔮 Channeling cosmic vibes...",
    "✨ Weaving magic into reality...",
    "🌟 Discovering hidden gems...",
    "🎯 Targeting your perfect vibe...",
    "🚀 Launching into vibe space...",
    "🌈 Painting your experience...",
    "🎨 Crafting your adventure...",
    "🔥 Igniting epic discoveries...",
    "💎 Polishing rare finds...",
    "🎭 Curating theatrical moments...",
    "🌸 Blooming beautiful memories...",
    "🦄 Manifesting unicorn spots...",
    "🔍 Scanning the universe for perfection...",
    "⚡ Analyzing millions of possibilities...",
    "🌌 Finding THE BEST match for YOU...",
    "🎪 Curating your ultimate experience...",
  ];

  // Base loading animation
  useEffect(() => {
    const emojiInterval = setInterval(() => {
      setCurrentEmoji((prev) => (prev + 1) % vibeEmojis.length);
    }, 200);

    const textInterval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % loadingTexts.length);
    }, 2000);

    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      emoji: vibeEmojis[Math.floor(Math.random() * vibeEmojis.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 4,
    }));
    setParticles(newParticles);

    return () => {
      clearInterval(emojiInterval);
      clearInterval(textInterval);
    };
  }, []);

  // Catch Game Logic
  const startCatchGame = () => {
    setGameMode("catch");
    setGameActive(true);
    setCatchScore(0);
    generateCatchTargets();
  };

  const generateCatchTargets = () => {
    const targets = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      emoji: vibeEmojis[Math.floor(Math.random() * vibeEmojis.length)],
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      caught: false,
    }));
    setCatchTargets(targets);
  };

  const catchTarget = (id) => {
    setCatchTargets((prev) =>
      prev.map((target) =>
        target.id === id ? { ...target, caught: true } : target
      )
    );
    setCatchScore((prev) => prev + 1);

    setTimeout(() => {
      setCatchTargets((prev) => prev.filter((target) => target.id !== id));
      if (catchTargets.length <= 1) {
        setTimeout(generateCatchTargets, 500);
      }
    }, 300);
  };

  // Memory Game Logic
  const startMemoryGame = () => {
    setGameMode("memory");
    setGameActive(true);
    setMemoryScore(0);
    startMemorySequence();
  };

  const startMemorySequence = () => {
    const sequence = [Math.floor(Math.random() * 4)];
    setMemorySequence(sequence);
    setPlayerSequence([]);
    setShowingSequence(true);

    setTimeout(() => {
      setShowingSequence(false);
    }, sequence.length * 600 + 400);
  };

  const addToMemorySequence = () => {
    const newSequence = [...memorySequence, Math.floor(Math.random() * 4)];
    setMemorySequence(newSequence);
    setPlayerSequence([]);
    setShowingSequence(true);

    setTimeout(() => {
      setShowingSequence(false);
    }, newSequence.length * 600 + 400);
  };

  const handleMemoryClick = (index) => {
    if (showingSequence) return;

    const newPlayerSequence = [...playerSequence, index];
    setPlayerSequence(newPlayerSequence);

    if (
      newPlayerSequence[newPlayerSequence.length - 1] !==
      memorySequence[newPlayerSequence.length - 1]
    ) {
      // Wrong! Start over
      setMemoryScore(0);
      startMemorySequence();
      return;
    }

    if (newPlayerSequence.length === memorySequence.length) {
      // Correct sequence completed
      setMemoryScore((prev) => prev + 1);
      setTimeout(addToMemorySequence, 1000);
    }
  };

  // Tap Game Logic
  const startTapGame = () => {
    setGameMode("tap");
    setGameActive(true);
    setTapScore(0);
    setTimeLeft(10);
    generateTapTargets();

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const generateTapTargets = () => {
    const targets = Array.from({ length: 3 }, (_, i) => ({
      id: Date.now() + i,
      emoji: vibeEmojis[Math.floor(Math.random() * vibeEmojis.length)],
      x: Math.random() * 70 + 15,
      y: Math.random() * 70 + 15,
    }));
    setTapTargets(targets);
  };

  const tapTarget = (id) => {
    setTapTargets((prev) => prev.filter((target) => target.id !== id));
    setTapScore((prev) => prev + 1);

    if (tapTargets.length <= 1) {
      setTimeout(generateTapTargets, 200);
    }
  };

  const resetToLoading = () => {
    setGameMode("loading");
    setGameActive(false);
    setScore(0);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-pink-900/30 animate-pulse"></div>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute text-2xl animate-float opacity-30 pointer-events-none"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        >
          {particle.emoji}
        </div>
      ))}

      {/* Game Mode: Loading */}
      {gameMode === "loading" && (
        <div className="text-center relative z-10 max-w-md mx-auto px-8">
          <div className="relative mb-8">
            <div className="text-8xl mb-6 animate-bounce transform hover:scale-110 transition-transform duration-300">
              {vibeEmojis[currentEmoji]}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white mb-4 animate-pulse">
              🌍 Vibe Navigator
            </h2>
            <p className="text-xl text-white/90 animate-pulse leading-relaxed">
              {loadingTexts[currentText]}
            </p>

            <div className="flex justify-center space-x-2 mt-6">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-white rounded-full animate-bounce shadow-lg"
                  style={{
                    animationDelay: `${i * 0.15}s`,
                    animationDuration: "1s",
                  }}
                />
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
                <p className="text-white/90 text-lg font-semibold">
                  🔍 Finding the BEST for YOU!
                </p>
                <p className="text-white/80 text-sm mt-1">
                  Our AI is analyzing millions of options to find your perfect
                  match.
                </p>
                <p className="text-white/70 text-sm mt-1">
                  ⏱️ This may take 2+ minutes - but it's worth the wait!
                </p>
              </div>
              <p className="text-white/80 text-lg">
                ✨ Want to play while you wait? ✨
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={startCatchGame}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  🎯 Catch Game
                </button>
                <button
                  onClick={startMemoryGame}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  🧠 Memory Game
                </button>
                <button
                  onClick={startTapGame}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  ⚡ Speed Tap
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Game Mode: Catch */}
      {gameMode === "catch" && (
        <div className="relative z-10 w-full h-full">
          <div className="absolute top-8 left-8 text-white">
            <div className="text-2xl font-bold">🎯 Catch the Vibes!</div>
            <div className="text-lg">Score: {catchScore}</div>
            <button
              onClick={resetToLoading}
              className="mt-2 bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm"
            >
              ← Back
            </button>
          </div>

          {catchTargets.map((target) => (
            <div
              key={target.id}
              className={`absolute text-6xl cursor-pointer transform transition-all duration-300 hover:scale-125 ${
                target.caught ? "animate-ping opacity-50" : "animate-pulse"
              }`}
              style={{
                left: `${target.x}%`,
                top: `${target.y}%`,
              }}
              onClick={() => catchTarget(target.id)}
            >
              {target.emoji}
            </div>
          ))}
        </div>
      )}

      {/* Game Mode: Memory */}
      {gameMode === "memory" && (
        <div className="relative z-10 text-center">
          <div className="mb-8 text-white">
            <div className="text-2xl font-bold">🧠 Memory Challenge</div>
            <div className="text-lg">Level: {memoryScore + 1}</div>
            <button
              onClick={resetToLoading}
              className="mt-2 bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm"
            >
              ← Back
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
            {[0, 1, 2, 3].map((index) => (
              <button
                key={index}
                className={`w-20 h-20 rounded-lg text-3xl transition-all duration-300 ${
                  showingSequence &&
                  memorySequence[memorySequence.length - 1] === index
                    ? "bg-yellow-400 scale-110"
                    : showingSequence && memorySequence.includes(index)
                    ? "bg-white/40 scale-105"
                    : "bg-white/20 hover:bg-white/30"
                }`}
                onClick={() => handleMemoryClick(index)}
                disabled={showingSequence}
              >
                {["🌟", "✨", "🌈", "🔥"][index]}
              </button>
            ))}
          </div>

          {showingSequence && (
            <div className="mt-4 text-white text-lg animate-pulse">
              Watch the sequence... ✨
            </div>
          )}
        </div>
      )}

      {/* Game Mode: Tap */}
      {gameMode === "tap" && (
        <div className="relative z-10 w-full h-full">
          <div className="absolute top-8 left-8 text-white">
            <div className="text-2xl font-bold">⚡ Speed Tap!</div>
            <div className="text-lg">Score: {tapScore}</div>
            <div className="text-lg">Time: {timeLeft}s</div>
            <button
              onClick={resetToLoading}
              className="mt-2 bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm"
            >
              ← Back
            </button>
          </div>

          {gameActive &&
            tapTargets.map((target) => (
              <div
                key={target.id}
                className="absolute text-6xl cursor-pointer transform transition-all duration-300 hover:scale-125 animate-bounce"
                style={{
                  left: `${target.x}%`,
                  top: `${target.y}%`,
                }}
                onClick={() => tapTarget(target.id)}
              >
                {target.emoji}
              </div>
            ))}

          {!gameActive && timeLeft === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-8 text-center text-white">
                <div className="text-4xl mb-4">🎉</div>
                <div className="text-2xl font-bold">Game Over!</div>
                <div className="text-lg mb-4">Final Score: {tapScore}</div>
                <button
                  onClick={startTapGame}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full mr-2"
                >
                  Play Again
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
