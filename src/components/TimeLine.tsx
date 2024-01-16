import { Box } from "@chakra-ui/react";
import { useSize } from "@chakra-ui/react-use-size";
import React, { useRef } from "react";
import SvgWrapper from "./SvgWrapper";

function TimeLine() {
  const elementRef = useRef<HTMLDivElement>(null);
  const { width, height } = useSize(elementRef) ?? {
    width: 10,
    height: 10,
  };
  console.log("Width ", width, " Height ", height);
  return (
    <Box ref={elementRef} m={0} p={0} height={"100%"} background="red.100">
      <SvgWrapper width={width} height={height} />
    </Box>
  );
}

export default TimeLine;
