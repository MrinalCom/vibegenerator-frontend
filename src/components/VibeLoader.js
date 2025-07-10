import { useState, useEffect } from "react";
export default function VibeLoader() {
  const [currentEmoji, setCurrentEmoji] = useState(0);
  const [currentText, setCurrentText] = useState(0);
  const [particles, setParticles] = useState([]);

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
  ];

  useEffect(() => {
    const emojiInterval = setInterval(() => {
      setCurrentEmoji((prev) => (prev + 1) % vibeEmojis.length);
    }, 200);

    const textInterval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % loadingTexts.length);
    }, 2000);

    // Generate floating particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
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

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-pink-600 flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-pink-900/30 animate-pulse"></div>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute text-2xl animate-float opacity-30"
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

      {/* Main Loading Content */}
      <div className="text-center relative z-10 max-w-md mx-auto px-8">
        <div className="relative mb-12">
          <div className="text-9xl mb-6 animate-bounce transform hover:scale-110 transition-transform duration-300">
            {vibeEmojis[currentEmoji]}
          </div>
          <div className="absolute inset-0 text-9xl opacity-20 animate-ping">
            {vibeEmojis[(currentEmoji + 1) % vibeEmojis.length]}
          </div>
          <div className="absolute inset-0 text-9xl opacity-10 animate-pulse">
            {vibeEmojis[(currentEmoji + 2) % vibeEmojis.length]}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-5xl font-bold text-white mb-4 animate-pulse">
            🌍 Vibe Navigator
          </h2>
          <p className="text-2xl text-white/90 animate-pulse leading-relaxed">
            {loadingTexts[currentText]}
          </p>

          {/* Enhanced Loading Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-4 h-4 bg-white rounded-full animate-bounce shadow-lg"
                style={{
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: "1s",
                }}
              />
            ))}
          </div>

          {/* Pulsing Ring */}
          <div className="relative mt-8">
            <div className="w-32 h-32 mx-auto rounded-full border-4 border-white/30 animate-ping"></div>
            <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full border-4 border-white/20 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
