import React, { useState } from "react";
import "../assets/css/pages/SuccessStory.css";

// Generate random width and height for images
const getRandomSize = () => {
  const randomWidth = Math.floor(Math.random() * (400 - 150 + 1)) + 150;
  const randomHeight = Math.floor(Math.random() * (400 - 150 + 1)) + 150;
  return `https://picsum.photos/${randomWidth}/${randomHeight}`;
};

// Static success stories with details
const successStories = [
  {
    id: 1,
    image: getRandomSize(),
    title: "Bella's New Home",
    description:
      "Bella found a loving family after being rescued. She now enjoys daily walks and cuddles! Her new owners love her and can't imagine life without her.",
    size: "collage-0",
  },
  {
    id: 2,
    image: getRandomSize(),
    title: "Max’s Second Chance",
    description:
      "After months in the shelter, Max finally met his perfect owner. Now they are inseparable, going on adventures together every day.",
    size: "collage-1",
  },
  {
    id: 3,
    image: getRandomSize(),
    title: "Luna’s Happy Ending",
    description:
      "Luna was adopted by a family with kids who adore her. She now plays in the backyard every day, enjoying the love and care of her new home.",
    size: "collage-2",
  },
  {
    id: 4,
    image: getRandomSize(),
    title: "Rocky's Transformation",
    description:
      "From a shy rescue to a confident, happy dog, Rocky’s journey is truly inspiring! His new family takes him on hikes and gives him all the attention he deserves.",
    size: "collage-3",
  },
  {
    id: 5,
    image: getRandomSize(),
    title: "Milo’s Forever Home",
    description:
      "Milo was found as a stray, but now he sleeps in a warm bed with his new owner. His life has changed completely, and he couldn't be happier.",
    size: "collage-4",
  },
  {
    id: 6,
    image: getRandomSize(),
    title: "Daisy’s New Beginning",
    description:
      "Daisy overcame a tough start in life and is now a joyful, energetic dog with a caring family. Her story is one of resilience and love.",
    size: "collage-5",
  },
  {
    id: 1,
    image: getRandomSize(),
    title: "Bella's New Home",
    description:
      "Bella found a loving family after being rescued. She now enjoys daily walks and cuddles! Her new owners love her and can't imagine life without her.",
    size: "collage-0",
  },
  {
    id: 2,
    image: getRandomSize(),
    title: "Max’s Second Chance",
    description:
      "After months in the shelter, Max finally met his perfect owner. Now they are inseparable, going on adventures together every day.",
    size: "collage-1",
  },
  {
    id: 3,
    image: getRandomSize(),
    title: "Luna’s Happy Ending",
    description:
      "Luna was adopted by a family with kids who adore her. She now plays in the backyard every day, enjoying the love and care of her new home.",
    size: "collage-2",
  },
  {
    id: 4,
    image: getRandomSize(),
    title: "Rocky's Transformation",
    description:
      "From a shy rescue to a confident, happy dog, Rocky’s journey is truly inspiring! His new family takes him on hikes and gives him all the attention he deserves.",
    size: "collage-3",
  },
  {
    id: 5,
    image: getRandomSize(),
    title: "Milo’s Forever Home",
    description:
      "Milo was found as a stray, but now he sleeps in a warm bed with his new owner. His life has changed completely, and he couldn't be happier.",
    size: "collage-4",
  },
  {
    id: 6,
    image: getRandomSize(),
    title: "Daisy’s New Beginning",
    description:
      "Daisy overcame a tough start in life and is now a joyful, energetic dog with a caring family. Her story is one of resilience and love.",
    size: "collage-5",
  },
  {
    id: 1,
    image: getRandomSize(),
    title: "Bella's New Home",
    description:
      "Bella found a loving family after being rescued. She now enjoys daily walks and cuddles! Her new owners love her and can't imagine life without her.",
    size: "collage-0",
  },
  {
    id: 2,
    image: getRandomSize(),
    title: "Max’s Second Chance",
    description:
      "After months in the shelter, Max finally met his perfect owner. Now they are inseparable, going on adventures together every day.",
    size: "collage-1",
  },
  {
    id: 3,
    image: getRandomSize(),
    title: "Luna’s Happy Ending",
    description:
      "Luna was adopted by a family with kids who adore her. She now plays in the backyard every day, enjoying the love and care of her new home.",
    size: "collage-2",
  },
  {
    id: 4,
    image: getRandomSize(),
    title: "Rocky's Transformation",
    description:
      "From a shy rescue to a confident, happy dog, Rocky’s journey is truly inspiring! His new family takes him on hikes and gives him all the attention he deserves.",
    size: "collage-3",
  },
  {
    id: 5,
    image: getRandomSize(),
    title: "Milo’s Forever Home",
    description:
      "Milo was found as a stray, but now he sleeps in a warm bed with his new owner. His life has changed completely, and he couldn't be happier.",
    size: "collage-4",
  },
  {
    id: 6,
    image: getRandomSize(),
    title: "Daisy’s New Beginning",
    description:
      "Daisy overcame a tough start in life and is now a joyful, energetic dog with a caring family. Her story is one of resilience and love.",
    size: "collage-5",
  },
  {
    id: 1,
    image: getRandomSize(),
    title: "Bella's New Home",
    description:
      "Bella found a loving family after being rescued. She now enjoys daily walks and cuddles! Her new owners love her and can't imagine life without her.",
    size: "collage-0",
  },
  {
    id: 2,
    image: getRandomSize(),
    title: "Max’s Second Chance",
    description:
      "After months in the shelter, Max finally met his perfect owner. Now they are inseparable, going on adventures together every day.",
    size: "collage-1",
  },
  {
    id: 3,
    image: getRandomSize(),
    title: "Luna’s Happy Ending",
    description:
      "Luna was adopted by a family with kids who adore her. She now plays in the backyard every day, enjoying the love and care of her new home.",
    size: "collage-2",
  },
  {
    id: 4,
    image: getRandomSize(),
    title: "Rocky's Transformation",
    description:
      "From a shy rescue to a confident, happy dog, Rocky’s journey is truly inspiring! His new family takes him on hikes and gives him all the attention he deserves.",
    size: "collage-3",
  },
  {
    id: 5,
    image: getRandomSize(),
    title: "Milo’s Forever Home",
    description:
      "Milo was found as a stray, but now he sleeps in a warm bed with his new owner. His life has changed completely, and he couldn't be happier.",
    size: "collage-4",
  },
  {
    id: 6,
    image: getRandomSize(),
    title: "Daisy’s New Beginning",
    description:
      "Daisy overcame a tough start in life and is now a joyful, energetic dog with a caring family. Her story is one of resilience and love.",
    size: "collage-5",
  },
];

const SuccessStory = () => {
  const [selectedStory, setSelectedStory] = useState(null);

  return (
    <div className="success-story-container">
      {!selectedStory ? (
        <>
          <h1 className="story-title">Success Stories</h1>
          <div className="story-collage">
            {successStories.map((story) => (
              <div
                key={story.id}
                className={`story-collage-card ${story.size}`}
                onClick={() => setSelectedStory(story)}
              >
                <img src={story.image} alt={story.title} />
                <div className="story-overlay">
                  <h2>{story.title}</h2>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        // Detail Page View
        <div className="story-detail">
          <button
            className="back-button"
            onClick={() => setSelectedStory(null)}
          >
            ← Back to Stories
          </button>
          <img
            src={selectedStory.image}
            alt={selectedStory.title}
            className="story-detail-image"
          />
          <div className="story-detail-content">
            <h2>{selectedStory.title}</h2>
            <p>{selectedStory.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessStory;
