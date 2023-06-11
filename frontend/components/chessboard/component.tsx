'use client';

import './component.css';

import dynamic from 'next/dynamic';

import React from 'react';
import p5Types from 'p5';

const Sketch = dynamic(() => import('react-p5').then(mod => mod.default), { ssr: false })

const lightSquareColor = [255, 255, 255];
const darkSquareColor = [0, 150, 30];

export function Component() {
  let [highlighted, setHighlighted] = React.useState(Array.from({length: 64}, i => i = false));
  React.useEffect(() => {
    // define a custom handler function
    // for the contextmenu event
    const handleContextMenu = (e: Event) => {
      // prevent the right-click menu from appearing
      e.preventDefault()
    }

    // attach the event listener to 
    // the document object
    document.addEventListener("contextmenu", handleContextMenu)
    document.oncontextmenu = () => false;
    // clean up the event listener when 
    // the component unmounts
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
    }
  }, [])
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(512, 512).parent(canvasParentRef);
  }

  const mousePressed = (p5: p5Types) => {
    console.log('click');
    console.log(p5.mouseButton);
    
    if (p5.mouseButton != p5.RIGHT) return;

    let rank = Math.floor(p5.mouseX / 64);
    let file = Math.floor(p5.mouseY / 64);
    let location = rank * 8 + file;
    
    console.log(`rank ${rank} file ${file}`)

    if (rank < 0 || rank > 7 || file < 0 || file > 7) throw 'Error: mouse out of bounds';

    setHighlighted(highlighted.map((x, i) => i == location ? !x : x));
  }
 
  const draw = (p5: p5Types) => {
    p5.background(255);
    p5.strokeWeight(0);
    for (let rank = 0; rank < 8; rank ++) {
      for (let file = 0; file < 8; file ++) {
        if (rank % 2 == file % 2) {
          p5.fill(lightSquareColor[0], lightSquareColor[1], lightSquareColor[2]);
        } else {
          p5.fill(darkSquareColor[0], darkSquareColor[1], darkSquareColor[2]);
        }
        p5.rect(rank * 64, file * 64, 64, 64);

        if (highlighted[rank * 8 + file]) {
          p5.fill(255, 0, 0, 100);
          p5.rect(rank * 64, file * 64, 64, 64);
        }
      }
    }
  }

  return <Sketch setup={setup} draw={draw} mousePressed={mousePressed} />
}
