"use client`";

import { Box, Button } from "@mui/material";
import { useRef, useState } from "react";

const SubjectSlider: React.FC<{ props: Subject[] }> = ({ props }) => {
  const subjects = props;
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartPosition(e.clientX);
    if (scrollContainerRef.current !== null) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const dx = e.clientX - startPosition;
    if (scrollContainerRef.current !== null) {
      scrollContainerRef.current.scrollLeft = scrollPosition - dx;
    }
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <>
      <Box
        component="div"
        ref={scrollContainerRef}
        sx={{
          display: "flex",
          gap: 2,
          mb: 2,
          overflow: "hidden",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {subjects.map(subject => (
          <Button
            key={subject.subjectId}
            sx={{
              flexShrink: 0,
            }}
          >
            {subject.name}
          </Button>
        ))}
      </Box>
    </>
  );
};
export default SubjectSlider;
