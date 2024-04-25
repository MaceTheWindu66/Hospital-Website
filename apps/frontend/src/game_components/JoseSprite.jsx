import React, { useEffect, useRef, useState } from "react";

const JoseSprite = ({
  x,
  y,
  viewBox,
  player,
  setIsAlive,
  isAlive,
  playerHP,
  setPlayerHP,
}) => {
  const position = useRef({ x: x, y: y });
  const playerRef = useRef(player);
  const imageRef = useRef(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showDisease, setShowDisease] = useState(true);

  useEffect(() => {
    const frameTimer = setInterval(() => {
      setCurrentFrame((prevFrame) => (prevFrame + 1) % 5); // Cycle between frames 0 to 4
    }, 100); // Switch frames every 200 milliseconds

    return () => clearInterval(frameTimer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!showDisease || !isAlive) {
      return () => {};
    } else {
      position.current = { x: x, y: y };

      const playerRect = playerRef.current.getBoundingClientRect();
      const imageRect = imageRef.current.getBoundingClientRect();
      playerRect.width *= 0.7;
      playerRect.height *= 0.7;
      imageRect.width *= 0.8;
      imageRect.height *= 0.8;

      if (isIntersecting(playerRect, imageRect)) {
        console.log("Collision detected!");
        setPlayerHP(playerHP - 1);
        if (playerHP <= 1) {
          setIsAlive(false); // Call the setIsAlive function to set isAlive to false
        }
        setShowDisease(false);
      }

      // Hide the disease after 3 seconds
      if (elapsedTime >= 20) {
        setShowDisease(false);
      }
    }
  }, [
    x,
    y,
    viewBox,
    player,
    setIsAlive,
    elapsedTime,
    showDisease,
    isAlive,
    playerHP,
    setPlayerHP,
  ]);

  const imageSrc = `/jose${currentFrame + 1}.png`;

  return (
    <>
      {showDisease && isAlive && (
        <image
          ref={imageRef}
          x={position.current.x}
          y={position.current.y}
          width={150}
          height={150}
          href={imageSrc}
        />
      )}
    </>
  );
};

function isIntersecting(a, b) {
  return (
    a.x <= b.x + b.width &&
    a.x + a.width >= b.x &&
    a.y <= b.y + b.height &&
    a.y + a.height >= b.y
  );
}

export default JoseSprite;
