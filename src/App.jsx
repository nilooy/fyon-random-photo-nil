import { useEffect, useState } from "react";
import React from "react";
import party from "party-js";
import HoldMyUi from "holdmyui";

function App() {
  const [image, setImage] = useState(); // to save fetched image url
  const [loading, setLoading] = useState(true); // to show loading state

  useEffect(() => {
    // will run as soon as all our dom element have downloaded on client
    getRandomPhoto();
    slowlyFadePreloader(1000);
  }, []);

  const slowlyFadePreloader = (timeout) => {
    setTimeout(() => {
      // fake it till you make it
      setLoading(false);
    }, timeout);
  };

  const getRandomPhoto = (e) => {
    setLoading(true);
    if (e) party.confetti(e.target);

    fetch("https://source.unsplash.com/random/1600x900").then((res) => {
      setImage(res.url);
      slowlyFadePreloader(600);
    });
  };

  // Here we have to force browser to download the image, as by default it will try to preview the imgage.
  const downloadPhoto = async (e) => {
    setLoading(true);
    if (e) party.sparkles(e.target);

    const imageObj = await fetch(image);
    const imageBlog = await imageObj.blob();
    const imageURL = URL.createObjectURL(imageBlog);

    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "image file name here";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    slowlyFadePreloader(800);
  };

  const btnClass = (
    color // btn class with color param
  ) =>
    `py-4 font-md bg-${color}-200 hover:bg-${color}-100 text-${color}-600 w-full border-4 border-${color}-300 mx-2 mb-2 shadow-lg rounded-2xl text-sm md:text-2xl`;

  return (
    <HoldMyUi // this package i built almost a year back, still shines :)
      when={loading}
      preloader="Gif"
      preloaderTop="50%"
      bgColor="#000000"
      color="#22f44b"
      padding="0px"
    >
      <div className="App bg-gray-400 h-screen overflow-hidden">
        <div className="h-screen flex justify-center items-center">
          <div className="rounded-3xl h-11/12 overflow-hidden shadow-2xl flex justify-center">
            <img src={image} alt="image-unsplash-random-2" />
          </div>
        </div>

        {/* Fixed bottom navbar */}
        <div className="flex justify-around w-full absolute left-0 bottom-0">
          <button className={btnClass("indigo")} onClick={getRandomPhoto}>
            Change Image
          </button>
          <button className={btnClass("purple")} onClick={downloadPhoto}>
            Download
          </button>
          <a
            className={btnClass("blue")}
            href={`https://twitter.com/intent/tweet?text=${image}&hashtags=fyon-challange`} // sharing image might take a bit more work
            target="_blank"
          >
            Share on twitter
          </a>
        </div>
        {/* Fixed bottom navbar */}
      </div>
    </HoldMyUi>
  );
}

export default App;
