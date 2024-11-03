import React, { useState, useRef } from "react";

type Props = {
  children: React.ReactNode;
  zoomLevel?: number;
  magnifierSize?: number;
};

const ImageMagnifier = ({
  children,
  zoomLevel = 2,
  magnifierSize = 250,
}: Props) => {
  const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0 });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateMagnifierPosition = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const elem = containerRef.current;
    const { top, left, width, height } = elem.getBoundingClientRect();

    const x = e.clientX - left;
    const y = e.clientY - top;

    const magnifierHalf = magnifierSize / 2;
    const posX = Math.max(magnifierHalf, Math.min(x, width - magnifierHalf));
    const posY = Math.max(magnifierHalf, Math.min(y, height - magnifierHalf));

    setMagnifierPos({ x: posX, y: posY });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) {
      e.preventDefault();
      setIsMouseDown(true);
      updateMagnifierPosition(e);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMouseDown) {
      updateMagnifierPosition(e);
    }
  };

  return (
    <div
      className="relative inline-block m-0 p-0"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseUp={() => setIsMouseDown(false)}
      onMouseLeave={() => setIsMouseDown(false)}
      onMouseMove={updateMagnifierPosition}
      onClick={handleClick}
      style={{
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
      }}
    >
      <div
        style={{
          pointerEvents: "none",
          userSelect: "none",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          WebkitTouchCallout: "none",
        }}
      >
        {children}
      </div>

      {isMouseDown && (
        <div
          className="absolute inset-0 pointer-events-none border border-primary rounded-full overflow-hidden "
          style={{
            width: `${magnifierSize}px`,
            height: `${magnifierSize}px`,
            left: magnifierPos.x - magnifierSize / 2,
            top: magnifierPos.y - magnifierSize / 2,
          }}
        >
          <div
            className="absolute"
            style={{
              width: "100%",
              height: "100%",
              transform: `scale(${zoomLevel})`,
              transformOrigin: "center center",
              backgroundImage: `url(${
                containerRef.current
                  ?.querySelector("img")
                  ?.getAttribute("src") || ""
              })`,
              backgroundPosition: `
                ${-(magnifierPos.x * zoomLevel - magnifierSize / 2)}px 
                ${-(magnifierPos.y * zoomLevel - magnifierSize / 2)}px
              `,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${
                containerRef.current?.offsetWidth
                  ? containerRef.current.offsetWidth * zoomLevel
                  : 0
              }px 
                              ${
                                containerRef.current?.offsetHeight
                                  ? containerRef.current.offsetHeight *
                                    zoomLevel
                                  : 0
                              }px`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageMagnifier;
