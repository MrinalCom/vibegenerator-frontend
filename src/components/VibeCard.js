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
    if (reviews.length > 1 && !showModal && !showReviewModal) {
      const interval = setInterval(() => {
        setCurrentReview((prev) => (prev + 1) % reviews.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [reviews.length, showModal, showReviewModal]);

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
        setGlowIntensity((prev) => (prev + 5) % 100);
      }, 250);
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

        {/* Image */}
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
            <div className="absolute top-4 right-4 text-4xl animate-bounce group-hover:animate-spin">
              {getCategoryEmoji(category)}
            </div>
            <div className="absolute bottom-4 left-4 text-white font-bold text-lg bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
              ✨ Click for Magic ✨
            </div>
          </div>
        )}

        {/* Info */}
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text text-transparent mb-2">
          {name}
        </h2>
        <p className="text-lg text-gray-600 flex items-center gap-2">
          <span className="text-3xl">{getCategoryEmoji(category)}</span>
          <span className="font-semibold">{category}</span>
          <span className="text-purple-400 text-xl">•</span>
          <span className="text-blue-600 font-medium">📍 {city}</span>
        </p>

        {/* Summary */}
        <p className="text-gray-700 mt-4 text-md font-medium line-clamp-3">
          {summary}
        </p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="text-sm bg-purple-100 text-purple-700 font-semibold px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-sm text-purple-600 font-bold">
                +{tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Reviews Preview */}
        {reviews.length > 0 && (
          <div className="mt-6">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-bold text-purple-700 flex items-center gap-1">
                💬 Vibe Check
              </h3>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // 🛑 Prevent triggering card's onClick
                  setShowReviewModal(true);
                }}
                className="text-sm text-white bg-purple-600 px-3 py-1 rounded-full hover:bg-purple-700 transition"
              >
                See All Reviews
              </button>
            </div>
            <p className="text-sm text-gray-700 mt-2">
              "{reviews[currentReview]?.text?.slice(0, 100) || "Amazing!"}" –{" "}
              {getStarRating(reviews[currentReview]?.rating)}
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title={`${name} - Full Vibe Experience`}
      >
        <p>{summary}</p>
      </Modal>

      <Modal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        title="All The Vibes"
      >
        {reviews.map((review, i) => (
          <div key={i} className="p-4 mb-4 border rounded-xl bg-white shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-purple-600">
                {getStarRating(review.rating)}
              </span>
              <span className="text-sm text-purple-700 bg-purple-100 px-2 py-1 rounded-full">
                {review.rating}
              </span>
            </div>
            <p className="text-gray-700 text-sm">"{review.text}"</p>
          </div>
        ))}
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
