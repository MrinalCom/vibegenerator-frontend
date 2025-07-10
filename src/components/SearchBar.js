import { useState, useEffect } from "react";

export default function SearchBar({ query, setQuery, onSearch }) {
  const [loading, setLoading] = useState(false);
  const [searchEmoji, setSearchEmoji] = useState(0);
  const searchEmojis = ["🔮", "✨", "🌟", "💫", "🎯", "🚀", "🎨", "🔥"];

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setSearchEmoji((prev) => (prev + 1) % searchEmojis.length);
      }, 150);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleClick = async () => {
    if (!query.trim()) return;
    setLoading(true);
    await onSearch();
    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div className="relative">
      {/* Floating Search Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 max-w-4xl mx-auto relative z-10">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <span className="text-gray-400 text-2xl animate-pulse">🔍</span>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="✨ What vibe are you seeking? Try 'cozy cafes', 'rooftop bars', 'beach clubs'..."
            className="w-full pl-16 pr-6 py-6 rounded-3xl shadow-2xl border-2 border-transparent bg-gradient-to-r from-white via-purple-50 to-pink-50 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-400 text-lg placeholder-gray-500 backdrop-blur-lg transition-all duration-300 hover:shadow-xl"
          />
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 opacity-0 hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
        </div>
        <button
          onClick={handleClick}
          disabled={loading || !query.trim()}
          className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white px-10 py-6 rounded-3xl hover:from-purple-700 hover:via-blue-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-3xl font-bold text-lg flex items-center gap-3 transform hover:scale-105 active:scale-95 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          {loading ? (
            <>
              <div className="text-2xl animate-spin">
                {searchEmojis[searchEmoji]}
              </div>
              <span className="animate-pulse">Vibing...</span>
            </>
          ) : (
            <>
              <span className="text-2xl animate-bounce">🚀</span>
              <span>Find My Vibe</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
