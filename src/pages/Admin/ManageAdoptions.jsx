import { useState, useEffect, useContext, useCallback } from "react";
import { ToasterContext } from "../../context/ToasterContext";
import { adoptionService } from "../../services/api-service";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useDropzone } from "react-dropzone";
import "../../assets/css/pages/Admin.css";

const specialFeatureSuggestions = [
  "Behinderungen:",
  "Kann gut mit Kindern:",
  "Kann gut mit anderen Hunden:",
  "Kann gut mit anderen Katzen:",
  "Braucht spezielles Futter:",
  "Sehr aktiv:",
  "Braucht viel Pflege:"
];

const ManageAdoptions = () =>
{
  const { toaster } = useContext(ToasterContext);
  const [adoptionPosts, setAdoptionPosts] = useState([]);
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    imageUploads: [],
    imageUrls: [],
    estimatedAge: "",
    birthDate: "",
    breed: "",
    colour: "",
    gender: "",
    specialFeatures: [],
    vaccinated: false,
    chipped: false,
    neutered: false,
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() =>
  {
    fetchAdoptionPosts();
  }, []);

  const fetchAdoptionPosts = async () =>
  {
    setLoading(true);
    try
    {
      const allPosts = await adoptionService.getAll();
      setAdoptionPosts(allPosts);
    } catch (error)
    {
      toaster.error("An error occurred while fetching adoption posts!");
      console.error(error);
    } finally
    {
      setLoading(false);
    }
  };

  const handleChange = (e) =>
  {
    const { name, type, checked, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  //* **Drag & Drop Bilder → `imageUploads[]`**
  const handleImageUpload = useCallback((acceptedFiles) =>
  {
    const validImages = acceptedFiles.filter(file =>
      file.type.startsWith("image/") && /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)
    );

    if (validImages.length !== acceptedFiles.length)
    {
      toaster.error("Invalid file type detected! Please upload only images.");
    }

    const newImageUrls = validImages.map((file) => URL.createObjectURL(file));
    setFormState((prev) => ({
      ...prev,
      imageUrls: [...prev.imageUrls, ...newImageUrls], //? Bilder hier speichern
    }));
  }, []);

  //* **Externe Bild-URLs → `imageUrls[]`**
  const handleImageUrlAdd = () =>
  {
    setFormState((prev) => ({
      ...prev,
      imageUrls: [...prev.imageUrls, ""], //? Leeres Feld hinzufügen
    }));
  };

  //* Aktualisiert eine spezifische Bild-URL
  const handleImageUrlChange = (index, value) =>
  {
    setFormState((prev) =>
    {
      if (prev.imageUrls[index] === value) return prev; //? Keine Aktualisierung nötig
      const updatedImageUrls = [...prev.imageUrls];
      updatedImageUrls[index] = value;
      return { ...prev, imageUrls: updatedImageUrls };
    });
  };


  //* Drag & Drop
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleImageUpload,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
      "image/webp": [".webp"],
    },
  });

  //* Special Features
  const handleSpecialFeatureChange = (index, field, value) =>
  {
    const updatedFeatures = [...formState.specialFeatures];
    updatedFeatures[index][field] = value;
    setFormState((prev) => ({
      ...prev,
      specialFeatures: updatedFeatures,
    }));
  };

  const addSpecialFeature = () =>
  {
    setFormState((prev) => ({
      ...prev,
      specialFeatures: [...prev.specialFeatures, { key: "", value: "" }],
    }));
  };

  const removeSpecialFeature = (index) =>
  {
    const updatedFeatures = [...formState.specialFeatures];
    updatedFeatures.splice(index, 1);
    setFormState((prev) => ({
      ...prev,
      specialFeatures: updatedFeatures,
    }));
  };

  //* Submit Form
  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    setLoading(true);
    try
    {
      if (editId)
      {
        await adoptionService.update(editId, formState);
        toaster.success("Adoption post updated successfully!");
      } else
      {
        await adoptionService.create(formState);
        toaster.success("Adoption post added successfully!");
      }
      resetForm();
      fetchAdoptionPosts();
    }
    catch (error)
    {
      toaster.error("An error occurred while saving the adoption post!");
      console.error(error);
    }
    finally
    {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="manage-form">
        <h2>Manage Adoption Posts</h2>
        {loading && <p>Loading...</p>}
        <form onSubmit={handleSubmit} className="form">
          <input type="text" name="title" placeholder="Title" value={formState.title} onChange={handleChange} required />
          <textarea name="description" placeholder="Description (Markdown supported)" value={formState.description} onChange={handleChange} required />
          <Markdown remarkPlugins={[remarkGfm]}>{formState.description}</Markdown>

          {/* **Lokale Bilder (Drag & Drop)** */}
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drag & drop images here, or click to select</p>
          </div>

          <div className="image-preview">
            {formState.imageUploads.map((img, index) => (
              <div key={index} className="image-item">
                <img src={img} alt={`Uploaded ${index}`} />
              </div>
            ))}
          </div>

          {/* **Externe Bild-URLs** */}
          <button type="button" onClick={handleImageUrlAdd}>+ Add Image URL</button>

          {formState.imageUrls.map((url, index) => (
            <div key={index} className="image-url-input">
              <input type="text" placeholder="Enter image URL" value={url} onChange={(e) => handleImageUrlChange(index, e.target.value)} />
              {url && <div className="image-url-preview"><img src={url} alt={`URL ${index}`} /></div>}
            </div>
          ))}

          <input
            type="text"
            name="estimatedAge"
            placeholder="Estimated Age"
            value={formState.estimatedAge}
            onChange={handleChange}
          />
          <input
            type="date"
            name="birthDate"
            value={formState.birthDate}
            onChange={handleChange}
          />
          <input
            type="text"
            name="breed"
            placeholder="Breed"
            value={formState.breed}
            onChange={handleChange}
          />
          <input
            type="text"
            name="colour"
            placeholder="Colour"
            value={formState.colour}
            onChange={handleChange}
          />

          <select name="gender" value={formState.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          {/* Special Features */}
          <div>
            <label>Special Features:</label>
            {formState.specialFeatures.map((feature, index) => (
              <div key={index} className="feature-item">
                <h4>Special Feature {index + 1}</h4>
                <input
                  type="text"
                  placeholder="Feature Name"
                  value={feature.key}
                  onChange={(e) => handleSpecialFeatureChange(index, "key", e.target.value)}
                  list="featureSuggestions"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={feature.value}
                  onChange={(e) => handleSpecialFeatureChange(index, "value", e.target.value)}
                />
                <button type="button" onClick={() => removeSpecialFeature(index)}>✖</button>
              </div>
            ))}
            <datalist id="featureSuggestions">
              {specialFeatureSuggestions.map((suggestion, i) => (
                <option key={i} value={suggestion} />
              ))}
            </datalist>
            <button type="button" onClick={addSpecialFeature}>+ Add Feature</button>
          </div>

          {/* Boolean Felder mit Yes/No Anzeige */}
          {["vaccinated", "chipped", "neutered"].map((field) => (
            <select key={field} name={field} value={formState[field]} onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          ))}

          <button type="submit" className="save" disabled={loading}>
            {editId ? "Update Post" : "Add Post"}
          </button>
        </form>
      </div>

      <div className="manage-list">
        {loading ? (
          <p>Loading posts...</p>
        ) : (
          <div className="list">
            {adoptionPosts.map((item) => (
              <div key={item._id} className="card">
                {/* Zeigt bevorzugt `imageUrls`, dann `images` */}
                <img src={item.imageUrls?.[0] || item.imageUrls?.[0] || "https://scontent-fra3-1.cdninstagram.com/v/t51.29350-15/472409551_559710720370933_6488124466399928968_n.heic?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE0NDAuc2RyLmYyOTM1MC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=scontent-fra3-1.cdninstagram.com&_nc_cat=101&_nc_oc=Q6cZ2AHzJBKxWSqoWgktjjJHj7lXDNRyd-MTZYniyPYor9c1xOMd_tzoc_ypr73KmKcDD20&_nc_ohc=GKoWWnGE4LgQ7kNvgH6CzCI&_nc_gid=753d2114c0c44fa68ba65385621411be&edm=AP4sbd4BAAAA&ccb=7-5&ig_cache_key=MzUzNzMwOTAxMzc3MjY4OTY0Nw%3D%3D.3-ccb7-5&oh=00_AYFFwo9_Xx8BenTRQGYEfKPvRULHlcBkqv10dxMBy6qE5g&oe=67CFE618&_nc_sid=7a9f4b"}
                  alt={item.title} className="image" />

                <h3>{item.title}</h3>
                <Markdown>{item.description}</Markdown>
                <p>Vaccinated: {item.vaccinated ? "Yes" : "No"}</p>
                <p>Chipped: {item.chipped ? "Yes" : "No"}</p>
                <p>Neutered: {item.neutered ? "Yes" : "No"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ManageAdoptions;