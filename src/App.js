import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const colors = ["#ffce0b", "#e83f68", "#ab3e8f", "#0092d6", "#00a989"];
  const [index, setIndex] = useState(0);
  const [currentAff, setCurrentAff] = useState(0);
  const [affirmations, setAffirmations] = useState([
    "Everything has cracks - that's how the light gets in",
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % 5);
      setCurrentAff((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
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
      <div key={uuidv4()} className="affirmation-text">
        {affirmations[currentAff].phrase}
      </div>
    </div>
  );
}

export default App;
