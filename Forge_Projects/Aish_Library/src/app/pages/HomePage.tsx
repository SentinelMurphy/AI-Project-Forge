import StartButton from "../components/StartButton/StartButton";
//const bgImg = require('../../assets/libpic.jpeg');

export function HomePage() {

  return (
    <div className="flex justify-center items-center min-h-screen w-dvw">

      {/* Main Content */}
        <div className="flex items-center flex-col max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-2">
              Library
            </h2>
            <p className="text-zinc-400">
             Aish Library
            </p>
            <StartButton/>
        </div>
    </div>
  );
}