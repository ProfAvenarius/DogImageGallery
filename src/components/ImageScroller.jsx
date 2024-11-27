import {useState, useEffect} from 'react'

const ImageScroller = () => {
    const [ranImages, setRanImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRanImages = async () => {
          try {
            const res = await fetch('https://dog.ceo/api/breeds/image/random/50');
            const data = await res.json();
            if (Array.isArray(data.message)) {
                setRanImages(data.message);
                setCurrentIndex(0);
            }else {
                throw new Error ("Unexpected response format.")
            }
          } catch (err) {
            setError(err.message);
            setRanImages([]);
        }finally {
            setLoading(false);
        }; 
        }; 
        fetchRanImages();
    },[]);  

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % ranImages.length);
        }, 2000);
        return () => clearInterval(interval); 
    }, [ranImages]);


    if (loading) return <p>Loading Images...</p>;
    if (error) return <p>Error loading images: {error}</p>;
    if (!ranImages.length) return <p>No images available.</p>

  return (
    <div className="pathWay">
      {ranImages.map((img, index) => (
        <div
          key={index}
          className="frame"
          style={{ animationDelay: `${index * 1}s` }} 
        >
          <img src={img} alt={`Random Dog ${index}`} />
        </div>
      ))}
    </div>
  );
};

export default ImageScroller
