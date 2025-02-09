import Logo from "./components/Logo";

const Header = () => {
  return (
    <header className="border-b-2 border-gray-900 pb-4">
      <div className="flex justify-between items-center">
        <Logo />
      </div>
    </header>
  );
};

export default Header;
