import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

const OFFLINE_AFFIRMATIONS = [
  {
    quote: "Life isn’t about getting and having, it’s about giving and being.",
    author: "Kevin Kruse",
  },
  {
    quote: "Whatever the mind of man can conceive and believe, it can achieve.",
    author: "Napoleon Hill",
  },
  {
    quote: "Strive not to be a success, but rather to be of value.",
    author: "Albert Einstein",
  },
  {
    quote:
      "Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.",
    author: "Robert Frost",
  },
  {
    quote: "I attribute my success to this: I never gave or took any excuse.",
    author: "Florence Nightingale",
  },
  {
    quote: "You miss 100% of the shots you don’t take.",
    author: "Wayne Gretzky",
  },
  {
    quote:
      "I’ve missed more than 9000 shots in my career. I’ve lost almost 300 games. 26 times I’ve been trusted to take the game winning shot and missed. I’ve failed over and over and over again in my life. And that is why I succeed.",
    author: "Michael Jordan",
  },
  {
    quote:
      "The most difficult thing is the decision to act, the rest is merely tenacity.",
    author: "Amelia Earhart",
  },
];

function App() {
  const colors = [
    "#5e4e9c",
    "#0080c4",
    "#0092d6",
    "#00a989",
    "#ffce0b",
    "#f941cc",
    "#ab3e8f",
    "#e83f68",
  ];

  const [index, setIndex] = useState(0);
  const [currentAff, setCurrentAff] = useState(0);
  const [affirmations, setAffirmations] = useState(OFFLINE_AFFIRMATIONS);

  const shuffleAffirmations = (array) => {
    let m = array.length,
      t,
      i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
    return array;
  };

  useEffect(() => {
    const getAffirmations = async () => {
      let response = await fetch(
        "https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
      );
      let data = await response.json();
      let tempAffirmations = await data.quotes;
      let shuffledAffirmations = shuffleAffirmations(tempAffirmations);
      setAffirmations(shuffledAffirmations);
    };
    getAffirmations();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % colors.length);
      setCurrentAff((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);

    // eslint-disable-next-line
  }, [index]);

  return (
    <div className="App" style={{ backgroundColor: colors[index] }}>
      <div className="affirmation">
        <div key={uuidv4()} className="affirmation-text">
          {affirmations[currentAff].quote}
          <span>
            {affirmations[currentAff].author.startsWith("-")
              ? affirmations[currentAff].author
              : "-" + affirmations[currentAff].author}
          </span>
        </div>
      </div>
      <iframe
        title="Soundcloud Player"
        width="25%"
        height="20%"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/805331569&color=%23ff5500&auto_play=true&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false"
      ></iframe>
    </div>
  );
}

export default App;
