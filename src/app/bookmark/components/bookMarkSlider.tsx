"use client`";

import FilterIcon from "@/public/icons/mage_filter.svg";
import { Box, Button, Typography } from "@mui/material";
import { useRef, useState } from "react";
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

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartPosition(clientX);
    if (scrollContainerRef.current !== null) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const dx = clientX - startPosition;
    if (scrollContainerRef.current !== null) {
      scrollContainerRef.current.scrollLeft = scrollPosition - dx;
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handleDragMove(e.clientX);
  };

  return (
    <>
      <Box
        component="div"
        ref={scrollContainerRef}
        sx={{
          display: "flex",
          gap: 2,
          mb: "28px",
          overflow: "hidden",
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleDragEnd}
        onTouchCancel={handleDragEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
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
          <FilterIcon height={20} width={20} />
        </Button>
        <Button
          disabled
          sx={{
            flexShrink: 0,
            padding: "8px 14px",
            borderRadius: "50px",
            backgroundColor: "var(--c-sub1)",
            border: "1px solid var(--c-sub3)",
            "&:hover": {
              backgroundColor: "var(--c-sub1)",
            },
          }}
        >
          <Typography
            variant="body2"
            color="var(--c-main)"
            fontSize={{
              xs: "12px",
              sm: "16px",
            }}
          >
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
            <Typography
              variant="body2"
              color="var(--c-main)"
              fontSize={{
                xs: "12px",
                sm: "16px",
              }}
            >
              {subject.sequence}과목: {subject.name}
            </Typography>
          </Button>
        ))}
      </Box>
    </>
  );
};
export default BookMarkSlider;
