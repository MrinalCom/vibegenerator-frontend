import { useState } from "react";
export default function TagFilter({ tags, filteredTags, setFilteredTags }) {
  const [hoveredTag, setHoveredTag] = useState(null);
  const [showAllTags, setShowAllTags] = useState(false);
  const handleToggle = (tag) => {
    setFilteredTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setFilteredTags([]);
  };

  if (tags.length === 0) return null;

  // Popular tags (you can customize this logic based on your data)
  const popularTags = tags.slice(0, 8);
  const remainingTags = tags.slice(8);

  // Tags to display
  const displayTags = showAllTags ? tags : popularTags;

  return (
    <div className="text-center relative">
      <div className="relative mb-6">
        <h3 className="text-2xl font-bold text-gray-700 flex items-center justify-center gap-3">
          <span className="text-3xl animate-bounce">🎭</span>
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Filter Your Vibe
          </span>
          <span
            className="text-3xl animate-bounce"
            style={{ animationDelay: "0.2s" }}
          >
            🎨
          </span>
        </h3>
      </div>

      {/* Active Filters Display */}
      {/* {filteredTags.length > 0 && (
        <div className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl p-6 border-2 border-purple-200 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-bold text-purple-700 flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Active Filters ({filteredTags.length})
            </h4>
            <button
              onClick={clearAllFilters}
              className="text-sm bg-gradient-to-r from-red-400 to-pink-400 text-white px-4 py-2 rounded-full hover:from-red-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <span>Clear All</span>
              <span className="text-lg">🗑️</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {filteredTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleToggle(tag)}
                className="bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                <span>#{tag}</span>
                <span className="text-lg hover:animate-spin">❌</span>
              </button>
            ))}
          </div>
        </div>
      )} */}

      {/* Tags Display */}
      <div className="space-y-4">
        {/* Main Tags Grid */}
        <div className="flex flex-wrap gap-3 justify-center max-w-6xl mx-auto">
          {displayTags.map((tag, index) => (
            <button
              key={tag}
              onClick={() => handleToggle(tag)}
              onMouseEnter={() => setHoveredTag(tag)}
              onMouseLeave={() => setHoveredTag(null)}
              className={`relative px-4 py-2 rounded-full border-2 transition-all duration-300 font-semibold text-sm transform hover:scale-110 active:scale-95 ${
                filteredTags.includes(tag)
                  ? "bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 text-white border-transparent shadow-lg animate-pulse"
                  : "bg-white/80 backdrop-blur-sm border-gray-300 text-gray-700 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 hover:border-purple-400 hover:text-purple-700 shadow-md hover:shadow-lg"
              }`}
              style={{
                animationDelay: `${index * 0.05}s`,
              }}
            >
              <span className="relative z-10">#{tag}</span>
              {hoveredTag === tag && !filteredTags.includes(tag) && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
              )}
              {filteredTags.includes(tag) && (
                <div className="absolute -top-1 -right-1 text-yellow-300 text-sm animate-spin">
                  ✨
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Show More/Less Button */}
        {remainingTags.length > 0 && (
          <div className="text-center">
            <button
              onClick={() => setShowAllTags(!showAllTags)}
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full font-bold hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-3 mx-auto"
            >
              <span>
                {showAllTags
                  ? "Show Less"
                  : `Show ${remainingTags.length} More`}
              </span>
              <span
                className={`text-lg transition-transform duration-300 ${
                  showAllTags ? "rotate-180" : ""
                }`}
              >
                ⬇️
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Quick Filter Suggestions */}
      {/* {filteredTags.length === 0 && (
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-6 border-2 border-blue-200 shadow-lg">
          <h4 className="text-lg font-bold text-blue-700 mb-4 flex items-center justify-center gap-2">
            <span className="text-2xl">🌟</span>
            Quick Vibes
          </h4>
          <div className="flex flex-wrap gap-2 justify-center">
            {["cozy", "trendy", "outdoor", "romantic", "family-friendly"]
              .filter((tag) => tags.includes(tag))
              .map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleToggle(tag)}
                  className="bg-gradient-to-r from-blue-400 to-purple-400 text-white px-4 py-2 rounded-full text-sm font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  #{tag}
                </button>
              ))}
          </div>
        </div>
      )} */}

      {/* Stats */}
      {/* <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-purple-600">
            {displayTags.length}
          </span>
          vibes available
        </p>
      </div> */}
    </div>
  );
}
