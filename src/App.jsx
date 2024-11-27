import React from "react";
import {useState, useEffect} from 'react'
import BreedTracker from "./components/BreedTracker";
import ImageGallery from "./components/ImageGallery";
import ImageScroller from "./components/ImageScroller";
import BottomScroll from "./components/BottomScroll"
function App() {

  const [selectedBreed, setSelectedBreed] = useState("")


  return (  
    <div className="threeRows">
      <div className="topRow">
        <div><ImageScroller /></div>
      </div>

    <div className="middleRow">
    <div className="middleLeft">
      <header>
        <h1>Dog Breeds of the World</h1>
        <p>A visual tour of mans best friend.</p>
      </header>
      <div><BreedTracker onBreedSelect={setSelectedBreed}  /></div>
      <h2>{selectedBreed ? `Images of ${selectedBreed}` : "Select a breed to view."}</h2>
   </div>

   <div className="middleRight">
      <div><ImageGallery breed={selectedBreed} /></div>
   </div>
   </div>

   <div className="bottomRow">
   <div><BottomScroll /></div>
   </div>

   
    </div>
  )
};

export default App;
