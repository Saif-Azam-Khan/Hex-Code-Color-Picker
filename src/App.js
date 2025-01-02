import React from "react";
import { useState, useMemo, useEffect } from 'react'

const App = () => {
  const [selction, setSelection] = useState('')
  const [ind, setInd] = useState(Math.floor(Math.random() * 3))

  const generateHexCodes = (...c) => {
    let hexNum=''
    c.forEach((color) => {
      hexNum = hexNum + color.length === 1 ? "0" + color : color;
    })
    return "#" + hexNum.join("")
  }

  const generateRGBCode = () => {
    let rgb = []
    for (let i = 0; i < 3; i++) {
      rgb.push(Math.round(Math.random() * (255)).toString(16))
    }
    return generateHexCodes(rgb)
  }

  const generateBoxesColours = () => {
    const arr = []
    for (let i = 0; i < 3; i++) {
      arr.push(generateRGBCode())
    }
    console.log(arr)
    return arr
  }

  const colourArr = useMemo(() => generateBoxesColours(), [ind]);

  const handleBoxClick = (i) => {
    if (i === ind) {
      setSelection("correct")
    } else {
      setSelection("incorrect")
    }
  }
  const handlePlayAgain = () => {
    let newInd;
    do {
      newInd = Math.floor(Math.random() * 3);
    } while (newInd === ind);
    setInd(newInd)
    setSelection("");
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Color Codes</h1>
      <h2>{colourArr[ind]}</h2>
      <h2>What color is this?</h2>
      <div data-testid="color-container">
        {colourArr.map((c, index) => {
          return <div key={index} style={{ width: "100px", height: "100px", display: "inline-block", backgroundColor: `${c}` }}
            data-testid={ind === index ? "correct-color" : "incorrect-color"}
            onClick={() => handleBoxClick(index)}>

          </div>
        })}
      </div>
      <h2>{selction === "correct" ? "Correct!" : selction === "incorrect" ? "Incorrect!" : null}</h2>
      {selction &&
        <button onClick={handlePlayAgain}>Play Again</button>}
    </div>)
};


export default App;
