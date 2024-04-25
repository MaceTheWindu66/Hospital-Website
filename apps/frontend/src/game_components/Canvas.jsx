import React, { useEffect, useState, useRef, useMemo } from "react";
import PlatformerBG from "./PlatformerBG.jsx";
import Disease from "./Disease.jsx"; // Import the generic Disease component
import JoseSprite from "./JoseSprite.jsx"; // Import the generic Disease component

const Canvas = () => {
  const viewBox = useMemo(
    () => [
      window.innerWidth / -2,
      100 - window.innerHeight,
      window.innerWidth,
      window.innerHeight,
    ],
    [],
  );

  const [position, setPosition] = useState({
    x: -25,
    y: 300 - window.innerHeight,
  });

  const [isAlive, setIsAlive] = useState(true);

  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const animationRef = useRef();
  const speed = 400;

  // Timer state
  const [elapsedTime, setElapsedTime] = useState(0);

  // Start the timer when the component mounts
  useEffect(() => {
    // Only start the timer if isAlive is true
    if (isAlive) {
      const timer = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);

      // Clear the timer when isAlive becomes false or the component unmounts
      return () => clearInterval(timer);
    }
  }, [isAlive]);

  const [gameOverDisplayed, setGameOverDisplayed] = useState(false);
  // Redirect to game over page when player dies
  useEffect(() => {
    let gameOverTimer;

    if (!isAlive && !gameOverDisplayed) {
      gameOverTimer = setTimeout(() => {
        setGameOverDisplayed(true);
      }, 3000); // Wait for 3 seconds before allowing redirection
    }

    if (!isAlive && gameOverDisplayed) {
      window.location.href = `/game-over?endTime=${elapsedTime}`;
    }
    return () => clearTimeout(gameOverTimer);
  }, [isAlive, gameOverDisplayed, elapsedTime]);

  //Sets velocity of circle upon key press
  // useEffect(() => {
  //
  // }, [velocity]);

  // Smoothly updates player position during movement
  useEffect(() => {
      const handleKeyDown = (event) => {
          // Check if the keydown event is a repeat event
          if (!event.repeat) {
              const newVelocity = { ...velocity };
              if (event.key) {
                  switch (event.key) {
                      case "ArrowUp":
                      case "w":
                      case "W":
                          if(newVelocity.y > -speed){
                              newVelocity.y -= speed;
                          }
                          break;
                      case "ArrowDown":
                      case "s":
                      case "S":
                          if(newVelocity.y < speed){
                              newVelocity.y += speed;
                          }
                          break;
                      case "ArrowLeft":
                      case "a":
                      case "A":
                          if(newVelocity.x > -speed){
                              newVelocity.x -= speed;
                          }
                          break;
                      case "ArrowRight":
                      case "d":
                      case "D":
                          if(newVelocity.x < speed){
                              newVelocity.x += speed;
                          }
                          break;
                      default:
                          break;
                  }
              }
              else {
                  newVelocity.y = 0;
                  newVelocity.x = 0;
              }

              setVelocity(newVelocity);
          }
      };

      //Stop the circle from moving when key is released
      const handleKeyUp = (event) => {
          const newVelocity = { ...velocity };
          switch (event.key) {
              case "ArrowUp":
              case "w":
              case "W":
                  newVelocity.y = newVelocity.y + speed;
                  break;
              case "ArrowDown":
              case "s":
              case "S":
                  newVelocity.y = newVelocity.y - speed;
                  break;
              case "ArrowLeft":
              case "a":
              case "A":
                  newVelocity.x = newVelocity.x + speed;
                  break;
              case "ArrowRight":
              case "d":
              case "D":
                  newVelocity.x = newVelocity.x - speed;
                  break;
              default:
                  break;
          }
          setVelocity(newVelocity);
      };

      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);

    const updatePosition = () => {
      setPosition((prevPosition) => {
        // Calculate the next position
        const nextX = prevPosition.x + velocity.x / 60; // Divide by FPS for smooth movement
        const nextY = prevPosition.y + velocity.y / 60;

        // Calculate player dimensions
        const playerWidth = 75; // Adjust this value based on the actual width of the player sprite
        const playerHeight = 100; // Adjust this value based on the actual height of the player sprite

        // Calculate the boundaries
        const minX = viewBox[0];
        const minY = viewBox[1];
        const maxX = viewBox[0] + viewBox[2] - playerWidth;
        const maxY = viewBox[1] + viewBox[3] - playerHeight;

        // Ensure the player stays within the bounds
        const adjustedX = Math.min(Math.max(nextX, minX), maxX);
        const adjustedY = Math.min(Math.max(nextY, minY), maxY);

        // Return the adjusted position
        return { x: adjustedX, y: adjustedY };
      });
      animationRef.current = requestAnimationFrame(updatePosition);
    };

    animationRef.current = requestAnimationFrame(updatePosition);

    return () => {
      cancelAnimationFrame(animationRef.current);
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
    };
  }, [velocity, viewBox]);

  const [diseases, setDiseases] = useState([]);

  // Ref to store the spawn interval
  const spawnIntervalRef = useRef(null);

  useEffect(() => {
    const spawnDisease = () => {
      const maybeJose = Math.random(); // Generate a random number between 0 and 1

      // Determine if it's a JoseSprite component (20% of the time)
      const DiseaseComponent = maybeJose <= 0.2 ? JoseSprite : Disease;

      const speed = 3 + elapsedTime / 10 / 2; // Consistent speed
      const margin = 50; // Margin to keep the disease fully visible within the viewBox

      // Calculate spawn point outside of viewBox
      const spawnX =
        Math.random() > 0.5
          ? viewBox[0] - margin
          : viewBox[0] + viewBox[2] + margin;
      const spawnY = Math.random() * viewBox[3] + viewBox[1];

      // Calculate angle towards viewBox center
      const dx = viewBox[0] + viewBox[2] / 2 - spawnX;
      const dy = viewBox[1] + viewBox[3] / 2 - spawnY;
      const angleTowardsViewBox = Math.atan2(dy, dx);

      // Adjust angle slightly for randomness
      const finalAngle =
        angleTowardsViewBox + (Math.random() - 0.5) * (Math.PI / 4);

      const newDisease = {
        x: spawnX,
        y: spawnY,
        velocityX: Math.cos(finalAngle) * speed, // X velocity based on the angle
        velocityY: Math.sin(finalAngle) * speed, // Y velocity based on the angle
        Component: DiseaseComponent,
      };

      setDiseases((prevDiseases) => [...prevDiseases, newDisease]);

      // Calculate the next spawn interval with a 5% increase every 10 seconds
      const nextSpawnInterval =
        Math.random() * (2000 - (elapsedTime / 10) * 100) +
        (1000 - (elapsedTime / 10) * 100);

      // Schedule the next spawn
      spawnIntervalRef.current = setTimeout(spawnDisease, nextSpawnInterval);
    };

    // Start spawning diseases
    spawnDisease();

    // Clean up timer when component unmounts or when the spawn interval changes
    return () => clearTimeout(spawnIntervalRef.current);
  }, [elapsedTime, viewBox]); // Add elapsedTime and viewBox as dependencies

  // Move disease components
  useEffect(() => {
    const moveDiseases = () => {
      setDiseases((prevDiseases) =>
        prevDiseases.map((disease) => ({
          ...disease,
          x: disease.x + disease.velocityX,
          y: disease.y + disease.velocityY,
        })),
      );
    };

    // Start moving diseases
    const interval = setInterval(moveDiseases, 1000 / 60); // Move diseases 60 times per second

    // Clean up interval when component unmounts
    return () => clearInterval(interval);
  }, []); // Add diseases as a dependency

  const imageRef = useRef(null);
  const [currentFrame, setCurrentFrame] = useState(0); // State to hold the current frame index
  const frames = [
    "/playerSoftEngF1.png",
    "/playerSoftEngF2.png",
    "/playerSoftEngF3.png",
  ]; // Array of frame images

  // Function to toggle between frames
  const toggleFrame = () => {
    setCurrentFrame((prevFrame) => (prevFrame === 0 ? 1 : 0));
  };

  // Automatically toggle frames with a timer (optional)
  useEffect(() => {
    const frameTimer = setInterval(toggleFrame, 200); // Switch frames every 500 milliseconds

    return () => clearInterval(frameTimer);
  }, []);

  const GameOverText = {
    fontFamily: "'Halogen by Pixel Surplus', sans-serif",
    fontSize: "5rem",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "red",
  };

  const Timer = {
    fontFamily: "'Halogen by Pixel Surplus', sans-serif",
    fontSize: "2rem",
    position: "absolute",
    bottom: "10px", // Adjust the bottom position as per your preference
    left: "50%",
    transform: "translateX(-6rem)",
    fill: "#000000",
  };

  const HPContainer = {
    position: "absolute",
    top: "10px",
    left: "10px",
    zIndex: "999",
  };

  const HPText = {
    fontFamily: "'Halogen Rough by Pixel Surplus', sans-serif",
    fontSize: "1.5rem",
    color: "white",
    background: "rgba(0, 0, 0, 0.5)",
    padding: "0.5rem",
  };

  const [playerHP, setPlayerHP] = useState(3); // State to hold the current frame index

  return (
    <>
      <PlatformerBG />
      <div>
        {!isAlive && (
          <div className="game-over text-center" style={GameOverText}>
            <p>Game Over</p>
            {/* You can add any other elements for game over here */}
          </div>
        )}
        <div style={HPContainer}>
          <div style={HPText}>HP: {playerHP}</div>
        </div>
        <svg
          id="platformer-canvas"
          preserveAspectRatio="xMaxYMax none"
          viewBox={viewBox}
        >
          {isAlive && (
            <g
              ref={imageRef}
              width={75}
              height={100}
              id={"Player"}
              transform={`translate(${position.x}, ${position.y})`}
            >
              <image
                width={75}
                height={100}
                href={frames[currentFrame]} // Render the current frame based on the currentFrame state
              />
            </g>
          )}
          {diseases.map((disease, index) => {
            const DiseaseComponent = disease.Component;
            return (
              <DiseaseComponent
                key={index}
                x={disease.x}
                y={disease.y}
                viewBox={viewBox}
                setPlayerHP={setPlayerHP}
                playerHP={playerHP}
                player={document.getElementById("Player")}
                setIsAlive={setIsAlive} // Pass the setIsAlive function as a prop
                isAlive={isAlive}
              />
            );
          })}
          <text style={Timer}>Time: {elapsedTime} seconds</text>
        </svg>
      </div>
    </>
  );
};

export default Canvas;
