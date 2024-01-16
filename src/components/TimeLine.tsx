// https://vizhub.com/curran/32dfc8d2393844c6a5b9d199d9a35946?f90a6c7a=ta
// https://www.youtube.com/watch?v=5bPF-lTvs5E&list=RDCMUCSwd_9jyX4YtDYm9p9MxQqw&index=14
// https://observablehq.com/@d3/d3-scaletime
import { Box, Button, Flex, VStack } from "@chakra-ui/react";
import { useSize } from "@chakra-ui/react-use-size";
import { axisBottom, extent, scaleTime, scaleUtc, select } from "d3";
import { useEffect, useRef, useState } from "react";

const initialData = [
  {
    date: new Date("2024-01-12T09:00:00.000Z"),
    units: 32,
    type: "human",
  },
  {
    date: new Date("2024-01-12T09:30:00.000Z"),
    units: 67,
    type: "human",
  },
  {
    date: new Date("2024-01-12T10:00:00.000Z"),
    units: 81,
    type: "vehicle",
  },
  {
    date: new Date("2024-01-12T10:30:00.000Z"),
    units: 38,
    type: "vehicle",
  },
  {
    date: new Date("2024-01-12T11:00:00.000Z"),
    units: 28,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-12T12:30:00.000Z"),
    units: 10,
    type: "bandwidth",
  },
];
type Margin = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};
function TimeLine() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState(initialData);
  const { width, height } = useSize(targetRef) ?? {
    width: 10,
    height: 10,
  };
  const addData = () => {
    if (data === undefined) return;
    const result = new Date(
      Math.max(...data.map((d) => new Date(d.date).getTime()))
    );
    result.setMinutes(result.getMinutes() + 30);
    const types = ["human", "vehicle", "bandwidth"];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const dataToAdd = {
      date: result,
      units: Math.round(Math.random() * 80 + 20),
      type: randomType,
    };
    setData([...data, dataToAdd]);
  };

  const removeData = () => {
    if (data.length === 0) {
      return;
    }
    setData([...data.slice(0, data.length - 1)]);
  };
  const margin: Margin = {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20,
  };
  const svgRef = useRef<SVGSVGElement | null>(null);
  const theme = {
    pixelsPerTick: 30,
  };

  useEffect(() => {
    console.log(data);
    const innerDimensions = {
      width: Math.floor(width - margin.left - margin.right),
      height: Math.floor(height - margin.top - margin.bottom),
    };

    const h = innerDimensions.height;
    const w = innerDimensions.width;
    const numberOfTicksTarget = Math.max(
      1,
      Math.floor(w / theme.pixelsPerTick)
    );
    const xScale = scaleTime()
      .domain(extent(data.map((d) => d.date)) as [Date, Date])
      .rangeRound([margin.left, innerDimensions.width])
      .nice();
    const selection = select(svgRef.current);
    selection
      .selectAll("g.x-axis")
      .data([null])
      .join("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0, ${h})`)
      .call(axisBottom(xScale));
  }, [
    data,
    width,
    height,
    margin.left,
    margin.right,
    margin.top,
    margin.bottom,
  ]);
  return (
    <Box ref={targetRef} m={0} p={0} height={"100%"} background="red.100">
      <svg
        ref={svgRef}
        width={"100%"}
        height={"100%"}
        style={{
          border: "2px solid orange",
        }}></svg>
      <Button onClick={addData}>Add Data</Button>
      <Button onClick={removeData}>Remove Data</Button>
    </Box>
  );
}

export default TimeLine;
