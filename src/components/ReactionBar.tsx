import { useState } from "react";

const ReactionBar = () => {
  const [likes, setLikes] = useState(24);
  const [liked, setLiked] = useState(false);

  const [saved, setSaved] = useState(false);

  const handleLikes = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    }
  };

  return (
    <div className="flex gap-5 mt-10">
      <button
        onClick={handleLikes}
        className="bg-red-500 text-white px-6 py-3
             rounded-lg"
      >
        ❤️{likes}
      </button>

      <button
        onClick={() => setSaved(!saved)}
        className="bg-gray-800 text-white 
               px-6 py-3 rounded-lg"
      >
        {saved ? " 🔖saved " : " 💾Save"}
      </button>
    </div>
  );
};
export default ReactionBar;
