import { useState, useEffect } from "react";
export default function VibeCard({
  name,
  city,
  category,
  summary,
  tags = [],
  reviews = [],
  image,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [modalAnimation, setModalAnimation] = useState("");
  const [particles, setParticles] = useState([]);
  const [glowIntensity, setGlowIntensity] = useState(0);

  useEffect(() => {
    if (reviews.length > 1) {
      const interval = setInterval(() => {
        setCurrentReview((prev) => (prev + 1) % reviews.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [reviews.length]);

  useEffect(() => {
    const newParticles = [...Array(12)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10,
      speed: Math.random() * 2 + 1,
      emoji: [
        "✨",
        "🌟",
        "💫",
        "🎭",
        "🎨",
        "🔥",
        "💎",
        "🌈",
        "🦋",
        "🌺",
        "🎪",
        "🎯",
      ][Math.floor(Math.random() * 12)],
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    if (isHovered) {
      const interval = setInterval(() => {
        setGlowIntensity((prev) => (prev + 1) % 100);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const getStarRating = (rating) => {
    const numRating = parseFloat(rating);
    if (isNaN(numRating)) return "⭐";
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 >= 0.5;
    return "⭐".repeat(fullStars) + (hasHalfStar ? "✨" : "");
  };

  const getCategoryEmoji = (category) => {
    const categoryLower = category?.toLowerCase() || "";
    if (categoryLower.includes("cafe") || categoryLower.includes("coffee"))
      return "☕";
    if (categoryLower.includes("restaurant") || categoryLower.includes("food"))
      return "🍽️";
    if (categoryLower.includes("bar") || categoryLower.includes("pub"))
      return "🍺";
    if (categoryLower.includes("hotel") || categoryLower.includes("resort"))
      return "🏨";
    if (categoryLower.includes("beach")) return "🏖️";
    if (categoryLower.includes("shop") || categoryLower.includes("store"))
      return "🛍️";
    if (categoryLower.includes("gym") || categoryLower.includes("fitness"))
      return "💪";
    if (categoryLower.includes("spa") || categoryLower.includes("wellness"))
      return "🧘";
    if (categoryLower.includes("park") || categoryLower.includes("garden"))
      return "🌳";
    if (categoryLower.includes("museum") || categoryLower.includes("gallery"))
      return "🎨";
    return "📍";
  };

  const openModal = () => {
    setModalAnimation("animate-pulse");
    setShowModal(true);
    setTimeout(() => setModalAnimation(""), 500);
  };

  const closeModal = () => {
    setModalAnimation("animate-bounce");
    setTimeout(() => {
      setShowModal(false);
      setModalAnimation("");
    }, 300);
  };

  const FloatingParticles = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute text-2xl transition-all duration-1000 ${
            isHovered ? "animate-bounce opacity-80" : "opacity-0"
          }`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.id * 0.2}s`,
            animationDuration: `${particle.speed}s`,
            fontSize: `${particle.size}px`,
            transform: `rotate(${glowIntensity * 3.6}deg)`,
          }}
        >
          {particle.emoji}
        </div>
      ))}
    </div>
  );

  const Modal = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
        <div
          className={`relative max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 rounded-3xl shadow-2xl ${modalAnimation}`}
        >
          <div className="sticky top-0 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white p-6 rounded-t-3xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <span className="text-3xl animate-spin">✨</span>
                {title}
                <span className="text-3xl animate-spin">✨</span>
              </h2>
              <button
                onClick={onClose}
                className="text-3xl hover:scale-125 transition-transform duration-300 hover:rotate-90"
              >
                ❌
              </button>
            </div>
          </div>
          <div className="p-8">{children}</div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className="group relative bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-4 border-2 border-purple-200 backdrop-blur-sm overflow-hidden cursor-pointer transform hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={openModal}
        style={{
          boxShadow: isHovered
            ? `0 0 ${glowIntensity}px rgba(147, 51, 234, 0.5)`
            : "",
        }}
      >
        <FloatingParticles />

        {/* Dynamic Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-blue-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
          style={{
            background: `linear-gradient(${
              glowIntensity * 3.6
            }deg, rgba(147, 51, 234, 0.1), rgba(59, 130, 246, 0.1), rgba(236, 72, 153, 0.1))`,
          }}
        ></div>

        {/* Pulsing Border */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-sm animate-pulse"></div>

        {/* Image Section */}
        {image && (
          <div className="relative mb-6 -mx-8 -mt-8 overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-64 object-cover rounded-t-3xl group-hover:scale-110 transition-transform duration-700 group-hover:brightness-110"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-transparent"></div>
            <div className="absolute top-4 right-4 text-4xl animate-bounce group-hover:animate-spin">
              {getCategoryEmoji(category)}
            </div>
            <div className="absolute bottom-4 left-4 text-white font-bold text-lg bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
              ✨ Click for Magic ✨
            </div>
          </div>
        )}

        {/* Header */}
        <div className="relative z-10 mb-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent mb-2 leading-tight group-hover:from-purple-800 group-hover:to-pink-800 transition-all group-hover:animate-pulse">
                {name}
              </h2>
              <p className="text-lg text-gray-600 flex items-center gap-2">
                <span className="text-3xl animate-bounce">
                  {getCategoryEmoji(category)}
                </span>
                <span className="font-semibold">{category}</span>
                <span className="text-purple-400 text-xl animate-pulse">•</span>
                <span className="text-blue-600 font-medium">📍 {city}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <p className="text-gray-700 mb-6 leading-relaxed text-lg font-medium relative z-10 line-clamp-3">
          {summary}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-6 relative z-10">
            {tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="bg-gradient-to-r from-purple-200 via-blue-200 to-pink-200 text-purple-800 text-sm px-4 py-2 rounded-full font-semibold border-2 border-purple-300 hover:from-purple-300 hover:via-blue-300 hover:to-pink-300 transition-all duration-300 transform hover:scale-105 shadow-lg animate-pulse"
                style={{
                  animationDelay: `${i * 0.2}s`,
                }}
              >
                #{tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-purple-600 font-bold text-sm px-4 py-2 rounded-full bg-purple-100 animate-bounce">
                +{tags.length - 3} more ✨
              </span>
            )}
          </div>
        )}

        {/* Reviews Preview */}
        {reviews.length > 0 && (
          <div className="relative z-10 pt-6 border-t-2 border-gradient-to-r from-purple-200 to-pink-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <span className="text-yellow-500 text-2xl animate-pulse">
                  💬
                </span>
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Vibe Check
                </span>
              </h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowReviewModal(true);
                }}
                className="text-sm bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                See All Reviews 🚀
              </button>
            </div>
            <div className="bg-gradient-to-r from-white via-purple-50 to-pink-50 p-4 rounded-2xl border-2 border-purple-200 shadow-lg">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-lg">
                  {getStarRating(reviews[0].rating)}
                </span>
                <span className="text-sm text-purple-600 font-bold bg-purple-100 px-2 py-1 rounded-full">
                  {reviews[0].rating}
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed font-medium text-sm line-clamp-2">
                "{reviews[0].text?.slice(0, 100) || "Amazing vibes here!"}..."
              </p>
            </div>
          </div>
        )}

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl animate-pulse"></div>
      </div>

      {/* Main Detail Modal */}
      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title={`${name} - Full Vibe Experience`}
      >
        <div className="space-y-6">
          {image && (
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={image}
                alt={name}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          )}

          <div className="text-center">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent mb-2">
              {name}
            </h3>
            <p className="text-lg text-gray-600 flex items-center justify-center gap-2">
              <span className="text-3xl">{getCategoryEmoji(category)}</span>
              <span className="font-semibold">{category}</span>
              <span className="text-purple-400 text-xl">•</span>
              <span className="text-blue-600 font-medium">📍 {city}</span>
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-2xl border-2 border-purple-200">
            <h4 className="text-lg font-bold text-purple-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">✨</span>
              The Full Vibe Story
            </h4>
            <p className="text-gray-700 leading-relaxed text-lg">{summary}</p>
          </div>

          <div>
            <h4 className="text-lg font-bold text-purple-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">🏷️</span>
              Vibe Tags
            </h4>
            <div className="flex flex-wrap gap-3">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-gradient-to-r from-purple-200 via-blue-200 to-pink-200 text-purple-800 text-sm px-4 py-2 rounded-full font-semibold border-2 border-purple-300 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => setShowReviewModal(true)}
              className="bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-purple-600 hover:via-blue-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg animate-pulse"
            >
              🌟 Explore All Vibes 🌟
            </button>
          </div>
        </div>
      </Modal>

      {/* Reviews Modal */}
      <Modal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        title="All The Vibes"
      >
        <div className="space-y-6">
          <div className="text-center bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-2xl border-2 border-purple-200">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent mb-2">
              What People Are Saying
            </h3>
            <p className="text-gray-600">Real vibes from real people ✨</p>
          </div>

          {reviews.map((review, i) => (
            <div
              key={i}
              className="bg-gradient-to-r from-white via-purple-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{getStarRating(review.rating)}</span>
                <span className="text-lg text-purple-600 font-bold bg-purple-100 px-3 py-1 rounded-full">
                  {review.rating}
                </span>
                <span className="text-3xl animate-bounce">🎯</span>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4 font-medium text-lg">
                "{review.text}"
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-purple-600 font-bold bg-purple-100 px-4 py-2 rounded-full flex items-center gap-2">
                  <span className="text-lg">🌟</span>
                  {review.source}
                </span>
                {review.link && (
                  <a
                    href={review.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    Full Review 🚀
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </Modal>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
