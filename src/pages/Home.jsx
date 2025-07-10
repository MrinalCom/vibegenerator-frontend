import { useState, useEffect } from "react";
import { fetchVibes } from "../api/api";
import VibeCard from "../components/VibeCard";

export default function Home() {
  //   const [city, setCity] = useState("Delhi");
  //   const [category, setCategory] = useState("cafe");
  const city = "Delhi";
  const category = "cafe";
  const [vibes, setVibes] = useState([]);

  useEffect(() => {
    fetchVibes(city, category)
      .then((res) => {
        console.log("Fetched vibes: ", res.data); // <--- Add this
        setVibes(res.data);
      })
      .catch((err) => console.error(err));
  }, [city, category]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">
        ☕ Explore {category}s in {city}
      </h1>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {vibes.map((place) => (
          <VibeCard key={place._id} place={place} />
        ))}
      </div>
    </div>
  );
}
