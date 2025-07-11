import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import VibeCard from "./components/VibeCard";
import TagFilter from "./components/TagFilter";
import VibeLoader from "./components/VibeLoader";

function App() {
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const [filteredTags, setFilteredTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const fetchInitialPlaces = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/vibes/getall`
        );
        const data = await res.json();
        setPlaces(data.results || []);
        setLoading(false);
      } catch (error) {
        console.error("Error loading initial places:", error);
        setError(
          "Failed to load places. Make sure your server is running on localhost:5000"
        );
        setLoading(false);
      }
    };

    fetchInitialPlaces();
  }, []);

  const handleSearch = async () => {
    try {
      setError(null);
      setSearching(true);

      // Show loading for at least 2 seconds for better UX
      const [res] = await Promise.all([
        fetch(
          `${
            process.env.REACT_APP_API_BASE_URL
          }/api/vibes/scrape?query=${encodeURIComponent(query)}`
        ),
        new Promise((resolve) => setTimeout(resolve, 2000)),
      ]);

      const data = await res.json();
      console.log(data);
      setPlaces(data.results || []);
      setSearching(false);
    } catch (error) {
      console.error("Search error:", error);
      setError("Search failed. Please check your server connection.");
      setSearching(false);
    }
  };

  const filteredPlaces = filteredTags.length
    ? places.filter((p) => filteredTags.every((tag) => p.tags?.includes(tag)))
    : places;

  const allTags = Array.from(new Set(places.flatMap((p) => p.tags || [])));

  if (loading || searching) {
    return <VibeLoader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl animate-float opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
            }}
          >
            {
              ["✨", "🌟", "💫", "🎨", "🌈", "🔥"][
                Math.floor(Math.random() * 6)
              ]
            }
          </div>
        ))}
      </div>

      <div className="relative z-10 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Epic Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-5 mr-4 relative">
              🌍 Vibe Navigator
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent opacity-30 blur-sm -z-10">
                🌍 Vibe Navigator
              </div>
            </h1>

            {/* <p className="text-2xl text-gray-700 font-medium mb-2 animate-pulse ml-[-20px]">
              Discover places that match your
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                "cosmic energy"
              </span>
              <span className="animate-pulse ml-1">✨</span>
            </p> */}
            <div className="flex justify-center">
              <p className="text-2xl text-gray-700 font-medium mb-2 animate-pulse -mr-10">
                Discover places that match your
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  "cosmic energy"
                </span>
                <span className="animate-pulse ml-1">✨</span>
              </p>
            </div>

            <p className="text-lg text-gray-600">
              Let the universe guide you to your perfect vibe
              <span className="animate-bounce inline-block ml-1">🚀</span>
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-12">
            <SearchBar
              query={query}
              setQuery={setQuery}
              onSearch={handleSearch}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-gradient-to-r from-red-100 to-pink-100 border-2 border-red-300 text-red-700 px-8 py-6 rounded-3xl mb-8 text-center shadow-xl">
              <span className="text-3xl mr-3">⚠️</span>
              <span className="text-lg font-semibold">{error}</span>
            </div>
          )}

          {/* Tag Filter */}
          <div className="mb-12">
            <TagFilter
              tags={allTags}
              filteredTags={filteredTags}
              setFilteredTags={setFilteredTags}
            />
          </div>

          {/* Clear Filters Button */}
          {filteredTags.length > 0 && (
            <div className="text-center mb-8">
              <button
                onClick={() => setFilteredTags([])}
                className="bg-gradient-to-r from-white to-purple-50 text-purple-600 hover:text-purple-800 px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all font-semibold border-2 border-purple-200 hover:border-purple-400 transform hover:scale-105"
              >
                <span className="text-xl mr-2">✨</span>
                Clear all filters
                <span className="text-xl ml-2">🔮</span>
              </button>
            </div>
          )}

          {/* Results */}
          <div className="mt-12">
            {filteredPlaces.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-8xl mb-6 animate-bounce">🔍</div>
                <p className="text-2xl text-gray-600 font-bold mb-4">
                  No vibes found matching your energy
                </p>
                <p className="text-lg text-gray-500">
                  Try adjusting your search or clearing filters to discover new
                  vibes ✨
                </p>
              </div>
            ) : (
              <>
                <div className="text-center mb-10">
                  <p className="text-2xl text-gray-700">
                    <span className="font-bold text-3xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      {filteredPlaces.length}
                    </span>
                    <span className="text-2xl ml-2">epic vibes discovered</span>
                    <span className="text-3xl ml-2">🎯✨</span>
                  </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPlaces.map((place, index) => (
                    <div
                      key={`${place.name}-${index}`}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <VibeCard {...place} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
}

export default App;
