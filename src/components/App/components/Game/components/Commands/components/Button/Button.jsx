const Button = ({ handler, children }) => {
  return (
    <button
      onClick={handler}
      className="
      min-w-[60px] w-full h-[60px]
      border-2 border-gray-900 rounded-md
      hover:bg-gray-200 hover:cursor-pointer active:bg-gray-300
      transition-colors duration-150
      select-none
      "
    >
      {children}
    </button>
  );
};

export default Button;
