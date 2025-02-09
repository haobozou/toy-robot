import ObjectPlacement from "./components/ObjectPlacement";
import Robot from "./components/Robot";
import Board from "./components/Board";

const Stage = ({ position, direction }) => {
  return (
    <div className="relative">
      <ObjectPlacement position={position} direction={direction}>
        <Robot />
      </ObjectPlacement>
      <div className="absolute">
        <Board />
      </div>
    </div>
  );
};

export default Stage;
