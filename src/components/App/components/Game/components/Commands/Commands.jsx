import { useState, useRef } from "react";
import Button from "./components/Button";

const TIMEOUT_DURATION = 600;

const PLEASE_FILL_ALL_FIELDS_TEXT = "Please fill all fields";
const INVALID_POSITION_TEXT = "Invalid position!";
const OUT_OF_BOUNDS_TEXT = "Out of bounds!";
const PLACE_TEXT = "Place";
const MOVE_TEXT = "Move";
const REPORT_TEXT = "Report";
const NORTH_TEXT = "North";
const EAST_TEXT = "East";
const SOUTH_TEXT = "South";
const WEST_TEXT = "West";

const Commands = ({ position, setPosition, direction, setDirection }) => {
  const [xInput, setXInput] = useState("");
  const [yInput, setYInput] = useState("");
  const [directionInput, setDirectionInput] = useState("");

  const [placeText, setPlaceText] = useState(PLACE_TEXT);
  const [moveText, setMoveText] = useState(MOVE_TEXT);
  const [reportText, setReportText] = useState(REPORT_TEXT);

  const placeTimeoutRef = useRef(null);
  const moveTimeoutRef = useRef(null);
  const reportTimeoutRef = useRef(null);

  const scheduleTimeout = (callback, ref) => {
    ref.current = setTimeout(() => {
      callback();
      ref.current = null;
    }, TIMEOUT_DURATION);
  };

  const clearAllTimeouts = () => {
    if (placeTimeoutRef.current) {
      clearTimeout(placeTimeoutRef.current);
      setPlaceText(PLACE_TEXT);
      placeTimeoutRef.current = null;
    }
    if (moveTimeoutRef.current) {
      clearTimeout(moveTimeoutRef.current);
      setMoveText(MOVE_TEXT);
      moveTimeoutRef.current = null;
    }
    if (reportTimeoutRef.current) {
      clearTimeout(reportTimeoutRef.current);
      setReportText(REPORT_TEXT);
      reportTimeoutRef.current = null;
    }
  };

  const isInBounds = (x, y) => {
    return x >= 0 && x < 5 && y >= 0 && y < 5;
  };

  const place = () => {
    clearAllTimeouts();

    if (xInput === "" || yInput === "" || directionInput === "") {
      setPlaceText(PLEASE_FILL_ALL_FIELDS_TEXT);
      scheduleTimeout(() => setPlaceText(PLACE_TEXT), placeTimeoutRef);
      return;
    }

    const integerRegex = /^\d+$/;
    if (!integerRegex.test(xInput) || !integerRegex.test(yInput)) {
      setPlaceText(INVALID_POSITION_TEXT);
      scheduleTimeout(() => setPlaceText(PLACE_TEXT), placeTimeoutRef);
      return;
    }

    const newX = parseInt(xInput);
    const newY = parseInt(yInput);
    const newDirection = parseInt(directionInput);
    if (!isInBounds(newX, newY)) {
      setPlaceText(INVALID_POSITION_TEXT);
      scheduleTimeout(() => setPlaceText(PLACE_TEXT), placeTimeoutRef);
      return;
    }

    setPosition({ x: newX, y: newY });
    setDirection(newDirection);
  };

  const move = () => {
    clearAllTimeouts();

    const deltas = {
      0: { dx: 0, dy: -1 },
      90: { dx: 1, dy: 0 },
      180: { dx: 0, dy: 1 },
      270: { dx: -1, dy: 0 },
    };

    const { dx, dy } = deltas[direction];
    const newX = position.x + dx;
    const newY = position.y + dy;
    if (!isInBounds(newX, newY)) {
      setMoveText(OUT_OF_BOUNDS_TEXT);
      scheduleTimeout(() => setMoveText(MOVE_TEXT), moveTimeoutRef);
      return;
    }

    setPosition({ x: newX, y: newY });
  };

  const rotateLeft = () => {
    clearAllTimeouts();

    setDirection((prev) => (prev + 270) % 360);
  };

  const rotateRight = () => {
    clearAllTimeouts();

    setDirection((prev) => (prev + 90) % 360);
  };

  const report = () => {
    clearAllTimeouts();

    const directionNames = {
      0: NORTH_TEXT,
      90: EAST_TEXT,
      180: SOUTH_TEXT,
      270: WEST_TEXT,
    };

    setReportText(
      `X: ${position.x}, Y: ${position.y}, Direction: ${directionNames[direction]}`
    );
    scheduleTimeout(() => setReportText(REPORT_TEXT), reportTimeoutRef);
  };

  return (
    <div className="p-4 font-bold">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-row space-x-4">
          <div className="flex items-center flex-1">
            <label htmlFor="pos-x" className="mr-2 whitespace-nowrap">
              X:
            </label>
            <input
              id="pos-x"
              type="number"
              className="w-full text-right border-b-2 border-gray-600"
              value={xInput}
              onChange={(e) => setXInput(e.target.value)}
            />
          </div>
          <div className="flex items-center flex-1">
            <label htmlFor="pos-y" className="mr-2 whitespace-nowrap">
              Y:
            </label>
            <input
              id="pos-y"
              type="number"
              className="w-full text-right border-b-2 border-gray-600"
              value={yInput}
              onChange={(e) => setYInput(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center">
          <label htmlFor="dir" className="mr-2 whitespace-nowrap">
            Direction:
          </label>
          <select
            id="dir"
            className="flex-grow text-right border-b-2 border-gray-600"
            value={directionInput}
            onChange={(e) => setDirectionInput(e.target.value)}
          >
            <option value="" disabled>
              -- Please select here --
            </option>
            <option value="0">{NORTH_TEXT}</option>
            <option value="90">{EAST_TEXT}</option>
            <option value="180">{SOUTH_TEXT}</option>
            <option value="270">{WEST_TEXT}</option>
          </select>
        </div>

        <Button className="mt-4" handler={place}>
          {placeText}
        </Button>
      </div>
      <ul className="space-y-4 mt-4">
        <li className="flex space-x-4">
          <Button handler={rotateLeft}>Left</Button>
          <Button handler={rotateRight}>Right</Button>
        </li>
        <li>
          <Button handler={move}>{moveText}</Button>
        </li>
        <li>
          <Button handler={report}>{reportText}</Button>
        </li>
      </ul>
    </div>
  );
};

export default Commands;
