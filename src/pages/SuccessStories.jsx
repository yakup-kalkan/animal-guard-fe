import React, { useEffect, useState } from "react";
import { storyService } from "../services/api-service";
import "../assets/css/pages/Page.css";
const SuccessStories = () =>
{
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() =>
  {
    const fetchStories = async () =>
    {
      try
      {
        const response = await storyService.getAll();
        console.log(response);
        if (response && Array.isArray(response))
        {
          setStories(response);
        } else
        {
          setStories([]);
        }
      } 
      catch (err)
      {
        setError("Fehler beim Laden der Geschichten");
      } 
      finally
      {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) return <p>Laden...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="stories-container">
      <h2>Success Stories</h2>
      <p>Meet the amazing animals who found their forever homes!</p>
      <div className="stories-grid">
        {stories.length > 0 ? (
          stories.map((storyItem) => (
            <div key={storyItem.id} className="story-card">
              <img
                src={storyItem.imageUrls?.[0] || "default.jpg"}
                alt={storyItem.title}
                className="story-image"
              />
              <div className="story-content">
                <h3>{storyItem.title}</h3>
                <p>{storyItem.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No stories found.</p>
        )}
      </div>
    </div>
  );
};

export default SuccessStories;