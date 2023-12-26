import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://pixabay.com/api/?q=${query}&page=${page}&key=40660790-5f7cdb72f419031f7c67f17de&image_type=photo&orientation=horizontal&per_page=12`
        );
        const data = await response.json();
        setImages((prevImages) => [...prevImages, ...data.hits]);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearch} />
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <Loader />}
      {images.length > 0 && !loading && <Button onClick={loadMoreImages} />}
      {selectedImage && <Modal image={selectedImage} onClose={closeModal} />}
    </div>
  );
};

export default App;
