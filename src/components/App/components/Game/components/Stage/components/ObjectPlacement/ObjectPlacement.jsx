const ObjectControl = ({ position, direction, children }) => {
  return (
    <div
      className="relative h-[60px] w-[60px]"
      style={{
        top: `${60 * position.y + 60}px`,
        left: `${60 * position.x}px`,
        transform: `rotate(${direction}deg)`,
      }}
    >
      {children}
    </div>
  );
};

export default ObjectControl;
