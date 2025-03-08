import React from "react";
import "../assets/css/pages/Page.css";

const stories = [
  {
    id: 1,
    name: "Olivia and Benny",
    image: "benny.jpg",
    story:
      "Olivia met Benny, a shy Beagle rescued from neglect. With patience, she gained his trust, and now they enjoy hiking adventures together!",
  },
  {
    id: 2,
    name: "Marcus and Jasper",
    image: "jasper.jpg",
    story:
      "Marcus wasn't a 'cat person' until he met Jasper, a stray black cat. Now, Jasper is his best reading companion, always curled up in his lap.",
  },
  {
    id: 3,
    name: "Aisha and Daisy",
    image: "daisy.jpg",
    story:
      "Aisha adopted Daisy, a once-abandoned rabbit. With love and care, Daisy became a playful companion who follows Aisha around the house.",
  },
  {
    id: 4,
    name: "Tom and Charlie",
    image: "charlie.jpg",
    story:
      "Tom found an unexpected friend in Charlie, a parrot who loves to talk! Now, they have endless conversations and lots of fun together.",
  },
  {
    id: 5,
    name: "Emily and Shadow",
    image: "shadow.jpg",
    story:
      "Emily gave Shadow, a 10-year-old Labrador mix, a loving home in his senior years. They enjoy peaceful walks and cozy couch cuddles.",
  },
  {
    id: 6,
    name: "Noah and Luna",
    image: "luna.jpg",
    story:
      "Noah helped Luna, a rescued horse, regain her strength. Now, she gallops freely and has found a new life full of joy and care.",
  },
];

const SuccessStories = () => {
  return (
    <div className="stories-container">
      <h2>Success Stories</h2>
      <p>Meet the amazing animals who found their forever homes!</p>
      <div className="stories-grid">
        {stories.map(({ id, name, image, story }) => (
          <div key={id} className="story-card">
            <img src={image} alt={name} className="story-image" />
            <div className="story-content">
              <h3>{name}</h3>
              <p>{story}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuccessStories;
