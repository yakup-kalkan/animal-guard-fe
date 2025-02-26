import React, { useEffect, useState } from 'react';
import { getAllAdoptionPosts } from '../../services/api-service';

const Adoption = () =>
{
  const [adoptions, setAdoptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() =>
  {
    const fetchAdoptions = async () =>
    {
      try
      {
        const data = await getAllAdoptionPosts();
        setAdoptions(data);
      } catch (err)
      {
        setError(err.message);
      } finally
      {
        setLoading(false);
      }
    };
    fetchAdoptions();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Adoption Posts</h1>
      <ul>
        {adoptions.map((adoption) => (
          <li key={adoption.id}>
            <h2>{adoption.title}</h2>
            <p>{adoption.description}</p>
            {adoption.images && adoption.images.map((img, index) => (
              <img key={`${adoption.id}-${index}`} src={img} alt={adoption.title} width="200" />
            ))}
          </li>
        ))}
      </ul>

    </div>
  );
};

export default Adoption;