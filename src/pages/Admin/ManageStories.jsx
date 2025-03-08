import { useState, useEffect, useContext, useCallback } from "react";
import { ToasterContext } from "../../context/ToasterContext";
import { storyService } from "../../services/api-service";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import "../../assets/css/pages/Admin.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ManageStories = () => {
  const { toaster } = useContext(ToasterContext);
  const [stories, setStories] = useState([]);
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    imageUploads: [],
    imageUrls: [],
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    setLoading(true);
    try {
      const allStories = await storyService.getAll();
      setStories(allStories);
    } catch (error) {
      toaster.error("An error occurred while fetching stories!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = useCallback((acceptedFiles) => {
    const validImages = acceptedFiles.filter(
      (file) =>
        file.type.startsWith("image/") &&
        /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)
    );

    if (validImages.length !== acceptedFiles.length) {
      toaster.error("Invalid file type detected! Please upload only images.");
    }

    setFormState((prev) => ({
      ...prev,
      imageUploads: [...prev.imageUploads, ...validImages],
    }));
  }, []);

  const handleImageUrlAdd = () => {
    setFormState((prev) => ({
      ...prev,
      imageUrls: [...prev.imageUrls, ""],
    }));
  };

  const handleImageUrlChange = (index, value) => {
    setFormState((prev) => {
      const updatedImageUrls = [...prev.imageUrls];
      updatedImageUrls[index] = value;
      return { ...prev, imageUrls: updatedImageUrls };
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleImageUpload,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
      "image/webp": [".webp"],
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let uploadedImages = [];

      if (formState.imageUploads.length > 0) {
        const formData = new FormData();
        formState.imageUploads.forEach((file) =>
          formData.append("imageUploads", file)
        );

        const response = await axios.post(`${API_BASE_URL}/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        uploadedImages = response.data;
      }

      const storyData = {
        ...formState,
        imageUploads: uploadedImages,
      };

      if (editId) {
        await storyService.update(editId, storyData);
        toaster.success("Story updated successfully!");
      } else {
        await storyService.create(storyData);
        toaster.success("Story added successfully!");
      }

      resetForm();
      fetchStories();
    } catch (error) {
      toaster.error("An error occurred while saving the story!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (story) => {
    setFormState(story);
    setEditId(story._id);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await storyService.delete(id);
      toaster.success("Story deleted successfully!");
      fetchStories();
    } catch (error) {
      toaster.error("An error occurred while deleting the story!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormState({
      title: "",
      description: "",
      imageUploads: [],
      imageUrls: [],
    });
    setEditId(null);
  };

  return (
    <div className="manage-stories">
      <h2>Manage Stories</h2>
      {loading && <p>Loading...</p>}
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formState.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description (Markdown supported)"
          value={formState.description}
          onChange={handleChange}
          required
        />
        <Markdown remarkPlugins={[remarkGfm]}>{formState.description}</Markdown>

        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Drag & drop images here, or click to select</p>
        </div>

        <button type="button" className="add-url" onClick={handleImageUrlAdd}>
          + Add Image URL
        </button>
        {formState.imageUrls.map((url, index) => (
          <div key={index} className="image-url-input">
            <input
              type="text"
              placeholder="Enter image URL"
              value={url}
              onChange={(e) => handleImageUrlChange(index, e.target.value)}
            />
          </div>
        ))}

        <button type="submit" className="save" disabled={loading}>
          {editId ? "Update Story" : "Add New Story"}
        </button>
      </form>

      <div className="story-list">
        {stories.map((story) => (
          <div key={story._id} className="card">
            <h3>{story.title}</h3>
            <Markdown>{story.description}</Markdown>
            <button onClick={() => handleEdit(story)}>Edit</button>
            <button onClick={() => handleDelete(story._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageStories;
