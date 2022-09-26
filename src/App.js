import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const colors = [
    "#ffce0b",
    "#e83f68",
    "#f941cc",
    "#ab3e8f",
    "#0080c4",
    "#0092d6",
    "#00a989",
    "#ffce0b",
    "#5e4e9c",
  ];
  const [index, setIndex] = useState(0);
  const [currentAff, setCurrentAff] = useState(0);
  const [affirmations, setAffirmations] = useState([
    "Everything has cracks - that's how the light gets in",
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % colors.length);
      setCurrentAff((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);

    // eslint-disable-next-line
  }, [index]);

  useEffect(() => {
    const getAffirmations = async () => {
      let response = await fetch(
        "https://dulce-affirmations-api.herokuapp.com/affirmation/index"
      );
      let tempAffirmations = await response.json();
      setAffirmations(tempAffirmations);
    };
    getAffirmations();
  }, []);

  return (
    <div className="App" style={{ backgroundColor: colors[index] }}>
      <div className="affirmation">
        <div key={uuidv4()} className="affirmation-text">
          {affirmations[currentAff].phrase}
        </div>
      </div>

      <iframe
        title="Soundcloud Player"
        width="20%"
        height="20%"
        scrolling="no"
        frameborder="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/805331569&color=%23ff5500&auto_play=true&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false"
      ></iframe>
    </div>
  );
}

export default App;
