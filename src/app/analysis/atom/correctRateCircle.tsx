import { Typography, useMediaQuery, useTheme } from "@mui/material";
import styled, { keyframes } from "styled-components";
import { memo, useEffect, useState } from "react";

const rotateRight = (end: string) => keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(${end});
  }
`;

const rotateLeft = (end: string) => keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(${end});
  }
`;

const fillBackground = (bgColor: string) => keyframes`
  0% {
    background-color: #fff;
  }
  99% {
    background-color: #fff;
  }
  100% {
    background-color: ${bgColor};
  }
`;

const Main = styled.div<{ size: number; disabled?: boolean; cursor?: string }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  margin: 10px 0px;
  position: relative;
  background-color: ${props => (props.disabled ? "transparent" : props.theme.bgColor)};
  border-radius: 100%;
  cursor: ${props => props.cursor};
`;

const Inner = styled.div<{ size: number; disabled?: boolean }>`
  z-index: 4;
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${props => props.size - props.theme.innerSize}px;
  height: ${props => props.size - props.theme.innerSize}px;
  margin-left: ${props => -(props.size - props.theme.innerSize) / 2}px;
  margin-top: ${props => -(props.size - props.theme.innerSize) / 2}px;
  border-radius: 100%;
  background-color: ${props => (props.disabled ? "transparent" : "#fff")};
  animation: ${props => !props.disabled && fillBackground(props.theme.innerBgColor)} 2s linear both;
`;

const HoldingRight = styled.div<{ size: number; disabled?: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  clip: rect(0px, ${props => props.size}px, ${props => props.size}px, ${props => props.size / 2}px);
  background-color: ${props => (props.disabled ? "transparent" : props.theme.emptyBgColor)};
  border-radius: 100%;
`;

const HoldingLeft = styled.div<{ size: number; disabled?: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  clip: rect(0px, ${props => props.size / 2}px, ${props => props.size}px, 0px);
  background-color: ${props => (props.disabled ? "transparent" : props.theme.emptyBgColor)};
  border-radius: 100%;
`;

const FillRight = styled.div<{ rotate: string; size: number; disabled?: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  clip: rect(0px, ${props => props.size / 2}px, ${props => props.size}px, 0px);
  background-color: ${props => (props.disabled ? "transparent" : props.theme.fillBgColor)};
  animation: ${props => !props.disabled && rotateRight(props.rotate)} 1s linear both;
`;

const FillLeft = styled.div<{ rotate: string; size: number; disabled?: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  clip: rect(0px, ${props => props.size}px, ${props => props.size}px, ${props => props.size / 2}px);
  background-color: ${props => (props.disabled ? "transparent" : props.theme.fillBgColor)};
  animation: ${props => !props.disabled && rotateLeft(props.rotate)} 1s linear both;
  animation-delay: 1s;
`;

const Middle = styled.div<{ size: number }>`
  z-index: 5;
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  transform: translate(-50%, -50%);
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.fontColor};
`;

type CorrectRateCircleProps = {
  data: string;
  rotateRightDegree: string;
  rotateLeftDegree: string;
  fillBorderColor: string;
  emptyBorderColor: string;
  innerBackgroundColor: string;
  disabled?: boolean;
  isXs?: boolean;
  isSm?: boolean;
  achive: boolean;
};

const CorrectRateCircle = memo(
  ({
    data,
    rotateRightDegree,
    rotateLeftDegree,
    fillBorderColor,
    emptyBorderColor,
    innerBackgroundColor,
    disabled = false,
    achive = false,
  }: CorrectRateCircleProps) => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down("sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const [fontColor, setFontColor] = useState(disabled ? "grey" : "black");
    const [size, setSize] = useState(isXs ? 30 : isSm ? 48 : 64);
    const [innerSize, setInnerSize] = useState(isXs ? 6 : isSm ? 8 : 10);
    // useEffect(() => {
    //   if (!disabled && parseFloat(rotateRightDegree) + parseFloat(rotateLeftDegree) === 360) {
    //     const timeout = setTimeout(() => {
    //       setFontColor("white");
    //     }, 2010);
    //     return () => clearTimeout(timeout);
    //   }
    // }, [disabled, rotateRightDegree, rotateLeftDegree]);

    return (
      <Main size={size} disabled={disabled || achive} theme={{ bgColor: emptyBorderColor }}>
        <Inner
          size={size}
          disabled={disabled || achive}
          theme={{ innerBgColor: innerBackgroundColor, innerSize: innerSize }}
        />
        <HoldingRight
          size={size}
          disabled={disabled || achive}
          theme={{ emptyBgColor: emptyBorderColor }}
        >
          <FillRight
            rotate={rotateRightDegree}
            size={size}
            disabled={disabled || achive}
            theme={{ fillBgColor: fillBorderColor }}
          />
        </HoldingRight>
        <HoldingLeft
          size={size}
          disabled={disabled || achive}
          theme={{ emptyBgColor: emptyBorderColor }}
        >
          <FillLeft
            rotate={rotateLeftDegree}
            size={size}
            disabled={disabled || achive}
            theme={{ fillBgColor: fillBorderColor }}
          />
        </HoldingLeft>
        <Middle size={size - innerSize} theme={{ fontColor }}>
          <Typography
            fontSize={isXs ? "10px" : isSm ? "14px" : "18px"}
            variant="h4"
            style={{ color: disabled ? "grey" : fontColor }}
          >
            {data}
          </Typography>
        </Middle>
      </Main>
    );
  }
);

export default CorrectRateCircle;
