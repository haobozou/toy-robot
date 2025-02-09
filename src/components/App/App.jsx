import Header from "./components/Header";
import Game from "./components/Game";

const App = () => {
  return (
    <div className="min-w-[900px] min-h-screen flex justify-center items-center">
      <div className="w-[800px] h-[600px] my-8 p-6 border-2 border-gray-900 rounded-lg">
        <Header />
        <Game />
      </div>
    </div>
  );
};

export default App;
