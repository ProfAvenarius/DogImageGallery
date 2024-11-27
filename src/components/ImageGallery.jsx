import { useState, useEffect } from "react"
import { FaDog } from "react-icons/fa";

const ImageGallery = ({breed}) => {
    const [pictures, setPictures] = useState([]);
    const [currentindex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect (() => {
        if (!breed) return;
        const fetchPictures = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
                const data = await res.json();
                if (Array.isArray(data.message)) {
                    setPictures(data.message);
                    setCurrentIndex(0);
                }else {
                    throw new Error ("Unexpected response format.")
                }
            
            } catch (err) {
                setError(err.message);
                setPictures([]);
            }finally {
                setLoading(false);
            }
        };
        fetchPictures();
    },[breed]);

    const handleNext = () => {
    setCurrentIndex ((prevIndex)  =>
        prevIndex === pictures.length - 1 ? 0 : prevIndex + 1
     );
    }; 

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? pictures.length - 1 : prevIndex -1
     );
    };

    if (loading) return <p>Loading Images...</p>;
    if (error) return <p>Error loading images: {error}</p>;
    if (!pictures.length) return <p>No images available for this breed.</p>




  return (

    
       
        <div className="imageBox"><div className="borderBox">
           <div><button className="bLeft"  onClick={handlePrev} ><FaDog className="leftDog" /> </button></div> 
                <img
                    src={pictures[currentindex]}
                    alt={breed}
                          />
           <div><button className="bRight"  onClick={handleNext} ><FaDog className="rightDog" /></button></div> 
        </div> </div>
       
   
  );
};

export default ImageGallery
