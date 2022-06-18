import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [inputMsg, setInputMsg] = useState('');    // message in input field
  const [searchMsg, setSearchMsg] = useState('');   
  const [imageData, setImageData] = useState([]);

  const [imageElement, setImageElement] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function onInputChange(event) {
    setInputMsg(event.target.value);
  }
  
  function onSearchSubmit(e) {
    e.preventDefault();
    setSearchMsg(inputMsg);
  }

  const key = 'wSd52RMW3COYZoc03G0sZXIQ9WACIUsLGlKC4VRToHs';
  const pageNumber = 1;
  async function fetchImg() {
    let url;
    if(!searchMsg) {
      url = `https://api.unsplash.com/photos/?client_id=${key}&page=${pageNumber}`;
    }
    else {
      url = `https://api.unsplash.com/search/photos/?client_id=${key}&page=${pageNumber}&query=${searchMsg}`;
    }
    try {
      console.log(url);    // => url
      const result = await fetch(url);
      const data = await result.json();
      !searchMsg ? setImageData(data) : setImageData(data.results);
    }
    catch(error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchImg();
  }, [searchMsg]);


  


  // get small photo
  useEffect(() => {
    console.log('image data :', imageData);
    setImageElement(imageData.map((dataArr) => {
      return <img src={dataArr.urls.small} />
    }));
  }, [imageData]);


  // const letShow = imageElement.map((div) => {
  //   return div;
  // })

  // useEffect(() => {
  //   if(!searchMsg) {
  //     console.log(imageData)
  //   }
  //   else if(searchMsg) {
  //     console.log('else :', imageData.results)
  //   }
  // }, [imageData]);






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
        {/* {isLoading && (<div>Loding...</div>)} */}
      </section>

    </div>
  );
}

export default App;
