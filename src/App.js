import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [index, setIndex] = useState(0);
  const colors = ["#ffce0b", "#e83f68", "#ab3e8f", "#0092d6", "#00a989"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="App" style={{ backgroundColor: colors[index] }}>
      Hello World
    </div>
  );
}

export default App;
