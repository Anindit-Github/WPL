import WPL from "../Images/wpll.png";
import Wipro from "../Images/wiprologo.png";
import League from "../Images/League.png";
import { useNavigate } from 'react-router-dom';
//import Batsman from "./Images/batsman.png";
import { useSprings, animated, config } from "@react-spring/web";

export const LandingPage = () => {
  const navigate = useNavigate();

  const handleNavigateToUserDetails = () => {
    navigate("/user-details");
  };
  const headings = ["THE", "WIPRO", "PREMIERE LEAGUE", "Register as a Player"];
  const translateFrom = [130, -30, 130, -50];

  const springs = useSprings(
    headings.length,
    headings.map((_, idx) => ({
      from: { transform: `translateX(${translateFrom[idx]}%)`, opacity: 0 },
      to: { transform: "translateX(0%)", opacity: 1 },
      delay: (idx + 1) * 500,
      config: config.wobbly,
    }))
  );
  return (
    <main className="landing-page md:flex h-full w-full drop-shadow-2xl shadow-xl bg-gray-800 rounded-xl">
      <section className="poster-wpl w-full md:w-1/2 h-full bg-black flex justify-center content-center items-center rounded-l-lg flex-col">
        <img
          className="cricket-image h-full w-full"
          src={WPL}
          alt={"Cricket Image"}
        />
        <img
          className="cricket-image h-20 w-24  absolute top-4 left-4"
          src={Wipro}
          alt={"Wipro Logo"}
        />
      </section>
      <section
        style={{
          backgroundImage: `url(${League})`,
          backgroundSize: "auto 100%",
          backgroundPosition: "center",
        }}
        className="register w-full md:w-1/2 h-3/4 md:h-full flex bg-black rounded-r-lg flex-col justify-center content-center items-center bg-cover bg-no-repeat"
      >
        <div
          className="absolute inset-0 bg-black opacity-30 z-0 h-full"
          style={{ mixBlendMode: "overlay" }}
        ></div>
        <animated.h2 style={springs[0]} className="text-5xl font-ultra w-full">
          {headings[0]}
        </animated.h2>
        <animated.h2
          style={springs[1]}
          className="wipro text-9xl font-ultra text-yellow-300 w-full"
        >
          {headings[1]}
        </animated.h2>
        <animated.h2 style={springs[2]} className="text-5xl font-ultra w-full">
          {headings[2]}
        </animated.h2>
        <animated.button
          style={springs[3]}
          className="text-xl p-3 bg-sky-500 hover:bg-sky-700 w-1/2 text-white rounded-lg mt-10"
          onClick={handleNavigateToUserDetails}
        >
          {headings[3]}
        </animated.button>
      </section>
    </main>
  );
};
