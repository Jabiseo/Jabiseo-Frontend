"use client`";

import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { useRef, useState } from "react";
import FilterIcon from "@/public/icons/mage_filter.svg";
interface BookMarkSliderProps {
  selectedExam: string;
  selectedSubjects: Subject[];
  handleSliderOpen: () => void;
}

const BookMarkSlider: React.FC<BookMarkSliderProps> = ({
  selectedExam,
  selectedSubjects,
  handleSliderOpen,
}) => {
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
        <Button
          sx={{
            flexShrink: 0,
            padding: "5px 10px",
            borderRadius: "50px",
            backgroundColor: "white",
            border: "1px solid var(--c-sub3)",
            "&:hover": {
              backgroundColor: "var(--c-sub1)",
            },
          }}
          onClick={handleSliderOpen}
        >
          <Image src={FilterIcon} alt={"filtericon"} height={20} width={20} />
        </Button>
        <Button
          disabled
          sx={{
            flexShrink: 0,
            padding: "8px 12px",
            borderRadius: "50px",
            backgroundColor: "var(--c-sub1)",
            border: "1px solid var(--c-sub3)",
            "&:hover": {
              backgroundColor: "var(--c-sub1)",
            },
          }}
        >
          <Typography variant="body1" color="var(--c-main)">
            {selectedExam}
          </Typography>
        </Button>
        {selectedSubjects.map(subject => (
          <Button
            key={subject.subjectId}
            disabled
            sx={{
              flexShrink: 0,
              padding: "8px 12px",
              borderRadius: "50px",
              backgroundColor: "var(--c-sub1)",
              border: "1px solid var(--c-sub3)",
              "&:hover": {
                backgroundColor: "var(--c-sub1)",
              },
            }}
          >
            <Typography variant="body1" color="var(--c-main)">
              {subject.sequence}과목: {subject.name}
            </Typography>
          </Button>
        ))}
      </Box>
    </>
  );
};
export default BookMarkSlider;
