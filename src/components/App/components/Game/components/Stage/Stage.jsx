import Placement from "./components/Placement";
import Robot from "./components/Robot";
import Board from "./components/Board";

const Stage = ({ position, direction }) => {
  return (
    <div className="relative">
      <Placement position={position} direction={direction}>
        <Robot />
      </Placement>
      <div className="absolute">
        <Board />
      </div>
    </div>
  );
};

export default Stage;
