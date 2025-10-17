import React, { useState, useRef} from 'react';
import axios from 'axios';
// image imports
import Logo from './vector3.svg';
import Splash from './website_photo.jpg';
import Cloud from './ReSoul.png';
import Title from './Title.png';
import './App.css';
// map import
import MapIframe from './MapIframe';

function App() {
  const fileInputRef = useRef(null);
  const [buttonText, setButtonText] = useState('Select Image');

  // function to handle a user-selected image
  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the first selected file
    if (file) {
      setButtonText('Image Selected');
      processImage(file);
      };
    }
  
  // function to control user interaction with file upload button
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  // Function to process the uploaded image and send it to Flask backend
  const processImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      await axios.post('http://localhost:8080/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  // webpage layout
  return (
    <div className="App">
      <header className="App-header">
        <div className="logo">
          <img className="logo" src={Logo} alt="ReSoul Logo"/>
          <img className="title" src={Title} alt="ReSoul Logo" height={"300px"} />
        </div>
        <div className='Title'>
        
        </div>
      </header>

      <div className="Splash">
        <img className="mountain-photo" src={Splash} alt={"Climber on mountain"}/>
      </div>

      <div className="Introduction">
        <h2> Welcome to ReSoul </h2>
        <p>
          ReSoul was created with three central pillars in mind: sustainability, wellness, and business integration.
          Repairing climbing shoes means less wasted equipment in landfill.
          ReSoul enables novice and experienced climbers alike to invest in their wellness through rock climbing. 
          As an excellent source of exercise that can easily be done inside or outdoors,
          rock climbing has become a crucial way for many to relax, play, and connect with others.
          By providing a digital platform for users to identify local repair services, we are providing a more seamless
          retail experience that reaches a broader customer base.
        </p>
      </div>

      <div className="Resoling">
        <div className='ResolingText'>
          <h2> What Is Resoling? </h2>
          <p>
            Over time, the rubber used to give climbing shoes their grip naturally wears down.
            Sadly, your climbing shoes won't last forever, but with ReSoul, you can make them last a little longer.
            Using ReSoul, you can upload a photo of your climbing shoes and our AI-trained image recognition model
            will identify if your shoes require resoling. Resoling is the process of replacing the worn rubber 
            on the front and/or bottom of your climbing shoes. Resoling can prolong the lifetime of your favourite 
            climbing shoes by months or even years, and is a worthwhile investment in your quality climbing apparel.
          </p>
        </div>
      </div>
        
      <div className="ResolingImage">
        <img className="before-after-image" src={"https://blog.weighmyrack.com/wp-content/uploads/2019/12/Yosemite-Bum-Resoling-before-after-Photo.jpg"} 
        alt={`Before & after resoling climbing shoes`}
        width={"1000px"} />
      </div>
      
      <div className="Upload">
        <img className='uploadcloud' src={Cloud} alt="upload symbol" width={"10%"}/>
        <h5> Drag and drop here <br></br> or </h5>
        <button onClick={handleButtonClick}>{buttonText}</button>
        <input type="file" 
        name="file"
        onChange={handleImageUpload}
        ref={fileInputRef}
        style={{ display: 'none' }}/>
      </div>

      <div className='ConfirmUpload'> 
        <button> Analyze </button>
      </div>

    <div className='Map'>
      <MapIframe />
    </div>

    <div className='Booking'>
      <h2> Book an appointment: </h2>
      <label for="fname">Name: </label>
      <input type="text" id="name" name="name" style={{ fontFamily: "Quicksand", fontSize: "20pt", width:"300px", height:"30px", padding: "10px"}}></input> <br></br>
      <label for="fname">Contact email: </label>
      <input type="text" id="email" name="email" style={{ fontFamily: "Quicksand", fontSize: "20pt", width:"300px", height:"30px", padding: "10px"}}></input> <br></br>

      <p> Select a Location: {selectedOption}</p>
      
      <select className="selectBox" onChange={(e) => handleSelect(e.target.value)}>
        <option value=""> </option>
        <option value="The Quick Cobbler">The Quick Cobbler</option>
        <option value="West Coast Resoles">West Coast Resoles</option>
        <option value="REI">REI</option>
        <option value="Gold Stop Shoes & Repair">Gold Stop Shoes & Repair</option>
      </select>
    </div>

      <div className='Buffer'> <b></b> </div>

      <footer className="Footer">
        <p> 2024 Re-Soul Your Shoes</p>
      </footer>
    </div>
  );
}

export default App;
