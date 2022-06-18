import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [inputMsg, setInputMsg] = useState('');    // message in input field
  const [searchMsg, setSearchMsg] = useState('');   
  const [imageData, setImageData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);   
  const [imageElement, setImageElement] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function onInputChange(event) {
    setInputMsg(event.target.value);
  }
  
  function onSearchSubmit(e) {
    e.preventDefault();
    setSearchMsg(inputMsg);
    if(searchMsg === inputMsg) {   // if we search the same message, we do nothing 
      return;   
    }
    else {
      setImageData([]);   // set photo to zero because we don't want to show the old photos when seach new one
    }
  }

  // fetch data from your own key on unsplash api
  const key = 'yourkey';
  async function fetchImg() {
    let url;
    if(!searchMsg) {   // when page open first time
      url = `https://api.unsplash.com/photos/?client_id=${key}&page=${pageNumber}`;
    }
    else {   // when searh something
      url = `https://api.unsplash.com/search/photos/?client_id=${key}&page=${pageNumber}&query=${searchMsg}`;
    }
    try {
      const result = await fetch(url);
      const data = await result.json();
      if(!searchMsg) {
        setImageData((prev) => [...prev, ...data]);
      }
      else if(searchMsg) {
        setImageData((prev) => [...prev, ...data.results]);
      }
    }
    catch(error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchImg();
  // if we press 'search' on the different word => we get new photo
  // if we scroll down => we get more photos 
  }, [searchMsg, pageNumber]);   

  // let elements display on the screen 
  useEffect(() => {
    setImageElement(imageData.map((dataArr, index) => {
      return <img key={index} src={dataArr.urls.small} />
    }));
    setIsLoading(false);
  }, [imageData]);

  // this is what we do when scrolling
  window.addEventListener('scroll', () => {
    const {scrollTop, clientHeight, scrollHeight} = document.documentElement;
    if(scrollTop + clientHeight >= scrollHeight - 5) {
      setIsLoading(true);
      setPageNumber((prevPage) => prevPage + 1);   // go to the next page when scroll to bottom of the scene
    }
  });

  return (
    <div className="App">
      <section className='search-header'>
        <form onSubmit={onSearchSubmit}>
          <input type='text' value={inputMsg} className='search-image-input' onChange={onInputChange} />
          <button type='submit' >Search</button>
        </form>
      </section>
      <section className='image-container'>
        {imageElement}
        {isLoading && (<h3>Loding...</h3>)}
      </section>
    </div>
  );
}

export default App;
