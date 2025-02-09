import Stage from "./components/Stage";
import Commands from "./components/Commands";

import { useState } from "react";

const Game = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState(0);

  return (
    <main className="p-6 flex justify-between">
      <div className="pl-2">
        <Stage position={position} direction={direction} />
      </div>
      <div className="pt-2 max-w-[50%]">
        <Commands
          position={position}
          setPosition={setPosition}
          direction={direction}
          setDirection={setDirection}
        />
      </div>
    </main>
  );
};

export default Game;
