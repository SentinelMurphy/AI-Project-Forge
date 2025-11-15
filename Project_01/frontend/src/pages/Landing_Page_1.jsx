import ParallaxBackground from '../elements/ParallaxBackground';
import { Canvas } from "@react-three/fiber";
import { Bot } from "../elements/Bot";
import { useMediaQuery } from "react-responsive";


const Landing_Page_1 = () => {
  const isMobile = useMediaQuery({ maxWidth: 853});
  return (
    <div className="container mx-auto max-w-9xl">
      <section className="flex items-start justify-center md:items-start md:justify-start mid-h-screen overflow-hidden c-space" >
        <ParallaxBackground />
        <figure className="absolute inset-0"
                style={{width: "100vw", height: "100vh"}}
        >
          <Canvas camera={{ position: [0, 1, 3]}}>
            <Bot
              scale={isMobile && 0.23}
              position={isMobile && [0, -1.5, 0]}
            />
          </Canvas>
        </figure>
      </section>
      <section className="min-h-screen"></section>
    </div>
  );
};

export default Landing_Page_1;