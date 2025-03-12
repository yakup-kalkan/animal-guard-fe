import { useState, useEffect, useContext, useCallback } from "react";
import { ToasterContext } from "../../context/ToasterContext";
import { adoptionService } from "../../services/api-service";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import moment from "moment-timezone";
import "../../assets/css/pages/Admin.css";

const specialFeatureSuggestions = [
  "Behinderungen:",
  "Kann gut mit Kindern:",
  "Kann gut mit anderen Hunden:",
  "Kann gut mit anderen Katzen:",
  "Braucht spezielles Futter:",
  "Sehr aktiv:",
  "Braucht viel Pflege:",
];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
    }
    catch (error)
    {
      toaster.error("An error occurred while fetching adoption posts!");
      console.error(error);
    }
    finally
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

  //* Drag & Drop für lokale Bilder (`imageUploads`)
  const handleImageUpload = useCallback((acceptedFiles) =>
  {
    const validImages = acceptedFiles.filter(file =>
      file.type.startsWith("image/") && /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)
    );

    if (validImages.length !== acceptedFiles.length)
    {
      toaster.error("Invalid file type detected! Please upload only images.");
    }

    setFormState((prev) => ({
      ...prev,
      imageUploads: [...prev.imageUploads, ...validImages],
    }));
  }, []);

  //* Externe Bild-URLs (`imageUrls`) hinzufügen
  const handleImageUrlAdd = () =>
  {
    setFormState((prev) => ({
      ...prev,
      imageUrls: [...prev.imageUrls, "https://"],
    }));
  };

  //* Bild-URL aktualisieren
  const handleImageUrlChange = (index, value) =>
  {
    setFormState((prev) =>
    {
      if (prev.imageUrls[index] === value) return prev;
      const updatedImageUrls = [...prev.imageUrls];
      updatedImageUrls[index] = value;
      return { ...prev, imageUrls: updatedImageUrls };
    });
  };

  //* Dropzone für lokale Bilder
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

  const removeImageUpload = (index) =>
  {
    setFormState((prev) => ({
      ...prev,
      imageUploads: prev.imageUploads.filter((_, i) => i !== index),
    }));
  };

  const removeImageUrl = (index) =>
  {
    setFormState((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    setLoading(true);

    try
    {
      let formData = new FormData();

      const newFiles = formState.imageUploads.filter(file => !file.isUploaded);
      newFiles.forEach(file => formData.append("imageUploads", file));

      const existingImageUrls = formState.imageUploads
        .filter(file => file.isUploaded)
        .map(file => file.url);

      const filteredImageUrls = formState.imageUrls.filter(url => url.trim() !== "" && url.startsWith("http"));

      const jsonData = {
        title: formState.title,
        description: formState.description,
        estimatedAge: formState.estimatedAge,
        birthDate: formState.birthDate ? new Date(formState.birthDate).toISOString() : null,
        breed: formState.breed,
        colour: formState.colour,
        gender: formState.gender,
        vaccinated: formState.vaccinated,
        chipped: formState.chipped,
        neutered: formState.neutered,
        specialFeatures: Object.fromEntries(
          formState.specialFeatures.map(({ key, value }) => [key, value])
        ),
        imageUploads: existingImageUrls, // **Bereits hochgeladene Bilder**
        imageUrls: filteredImageUrls, // **Externe URLs**
      };

      formData.append("data", JSON.stringify(jsonData));

      const response = await axios.post(`${API_BASE_URL}/adoption`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Server Response:", response.data);

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


  //* Adoptionseintrag bearbeiten
  const handleEdit = (post) =>
  {
    setFormState({
      ...post,
      birthDate: post.birthDate ? moment(post.birthDate).format("YYYY-MM-DD") : "", //? Korrigiertes Format für das Input-Feld
      specialFeatures: post.specialFeatures
        ? Object.entries(post.specialFeatures).map(([key, value]) => ({ key, value }))
        : [],
      imageUploads: post.imageUploads.map((path) => ({
        url: `${API_BASE_URL.replace('/api', '')}${path}`,
        isUploaded: true, //? Erkennungsmerkmal für existierende Bilder
      })),
      imageUrls: post.imageUrls || [],
    });

    setEditId(post._id);
  };



  //* Adoptionseintrag löschen
  const handleDelete = async (id) =>
  {
    setLoading(true);
    try
    {
      await adoptionService.delete(id);
      toaster.success("Adoption post deleted successfully!");
      fetchAdoptionPosts();
    }
    catch (error)
    {
      toaster.error("An error occurred while deleting the adoption post!");
      console.error(error);
    }
    finally
    {
      setLoading(false);
    }
  };

  const resetForm = () =>
  {
    setFormState({
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
    setEditId(null);
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

          {/* Drag & Drop für lokale Bilder */}
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drag & drop images here, or click to select</p>
          </div>

          {/* Vorschau hochgeladener Bilder */}
          <div className="image-preview">
            {formState.imageUploads.map((file, index) => (
              <div key={index} className="image-url-input">
                <img
                  src={file.isUploaded ? file.url : file ? URL.createObjectURL(file) : "/src/assets/img/default.png"}
                  alt={`Uploaded ${index}`}
                  onError={(e) => { e.target.src = "/src/assets/img/default.png"; }}
                />
                <button type="button" className="remove-image" onClick={() => removeImageUpload(index)}>❌</button>
              </div>
            ))}
          </div>

          {/* Externe Bild-URLs */}
          <button type="button" className="add-url" onClick={handleImageUrlAdd}>
            + Add Image URL (Max 5 MB)
          </button>

          {formState.imageUrls.map((url, index) => (
            <div key={index} className="image-url-input">
              <input type="text" value={url} onChange={(e) => handleImageUrlChange(index, e.target.value)} />
              <div className="image-url-preview">
                <img src={url} alt={`URL ${index}`} />
                <button type="button" className="remove-image" onClick={() => removeImageUrl(index)}>❌</button>
              </div>
            </div>
          ))}

          <input type="text" name="estimatedAge" placeholder="Estimated Age" value={formState.estimatedAge} onChange={handleChange} />
          <input type="date" name="birthDate" value={formState.birthDate} onChange={handleChange} />
          <input type="text" name="breed" placeholder="Breed" value={formState.breed} onChange={handleChange} />
          <input type="text" name="colour" placeholder="Colour" value={formState.colour} onChange={handleChange} />

          <select name="gender" value={formState.gender} onChange={handleChange} >
            <option value="" disabled>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          {/* Special Features */}
          <div>
            {formState.specialFeatures.map((feature, index) => (
              <div key={index} className="feature-item">
                <h4>Special Feature {index + 1}</h4>
                <input type="text" placeholder="Feature Name" value={feature.key} onChange={(e) => handleSpecialFeatureChange(index, "key", e.target.value)} list="featureSuggestions" />
                <input type="text" placeholder="Description" value={feature.value} onChange={(e) => handleSpecialFeatureChange(index, "value", e.target.value)} />
                <button type="button" className="remove-url" onClick={() => removeSpecialFeature(index)}>✖</button>
              </div>
            ))}
            <datalist id="featureSuggestions">
              {specialFeatureSuggestions.map((suggestion, i) => (
                <option key={i} value={suggestion} />
              ))}
            </datalist>
            <button type="button" className="add-feature" onClick={addSpecialFeature}>+ Add Feature</button>
          </div>

          {/* Boolean Felder mit Yes/No Anzeige */}
          {["vaccinated", "chipped", "neutered"].map((field) => (
            <select key={field} name={field} value={formState[field]} onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          ))}

          <button type="submit" className="save" disabled={loading}>
            {editId ? "Update Adaption Data" : "Add New Adaption"}
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

                {/* Bevorzugt imageUrls (externe Bilder), dann imageUploads (lokale Bilder), sonst Standardbild */}
                <img
                  src={
                    item.imageUrls?.length > 0 ? item.imageUrls[0] :
                      item.imageUploads?.length > 0 ? `${API_BASE_URL.replace('/api', '')}${item.imageUploads[0]}` :
                        "/src/assets/img/default.png"
                  }
                  alt={item.title || "Adoption Image"}
                  className="image"
                  onError={(e) => { e.target.src = "/src/assets/img/default.png"; }}
                />

                <h3>{item.title || "Untitled"}</h3>
                <Markdown>{item.description || "No description available."}</Markdown>

                <p><strong>Estimated Age:</strong> {item.estimatedAge || "Unknown"}</p>
                <p><strong>Birth Date:</strong> {item.birthDate ? moment(item.birthDate).format("DD.MM.YYYY") : "Unknown"}</p>
                <p><strong>Breed:</strong> {item.breed || "Unknown"}</p>
                <p><strong>Colour:</strong> {item.colour || "Unknown"}</p>
                <p><strong>Gender:</strong> {item.gender || "Unknown"}</p>

                <p><strong>Special Features:</strong></p>
                {item.specialFeatures && Object.keys(item.specialFeatures).length > 0 ? (
                  <ul>
                    {Object.entries(item.specialFeatures).map(([key, value]) => (
                      <li key={key}>
                        <strong>{key}:</strong> {value}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p><strong>No special features listed!</strong></p>
                )}

                <p><strong>Created At:</strong> {item.createdAt ? new Date(item.createdAt).toLocaleString() : "Unknown"}</p>
                <p><strong>Updated At:</strong> {item.updatedAt ? new Date(item.updatedAt).toLocaleString() : "Unknown"}</p>

                <p><strong>Vaccinated:</strong> {item.vaccinated ? "Yes" : "No"}</p>
                <p><strong>Chipped:</strong> {item.chipped ? "Yes" : "No"}</p>
                <p><strong>Neutered:</strong> {item.neutered ? "Yes" : "No"}</p>

                <div className="actions">
                  <button className="edit" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="delete" onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
                
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ManageAdoptions;