// https://vizhub.com/curran/32dfc8d2393844c6a5b9d199d9a35946?f90a6c7a=ta
// https://www.youtube.com/watch?v=5bPF-lTvs5E&list=RDCMUCSwd_9jyX4YtDYm9p9MxQqw&index=14
// https://observablehq.com/@d3/d3-scaletime
import { Box, Button } from "@chakra-ui/react";
import { useSize } from "@chakra-ui/react-use-size";
import { ZoomTransform, axisBottom, extent, scaleTime, select, zoom } from "d3";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AxisBottom from "./AxisBottom";

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
  {
    date: new Date("2024-01-12T13:00:00.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-12T13:30:00.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-12T14:00:00.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-12T14:30:00.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-12T15:00:00.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-12T15:30:00.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-12T16:00:00.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-12T16:30:00.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-12T17:00:00.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-12T17:30:00.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-12T18:00:00.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-12T18:30:00.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-12T19:00:00.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-12T19:30:00.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-12T20:00:00.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-12T20:30:00.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-12T21:00:00.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-12T21:30:00.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-12T22:00:00.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-12T22:30:00.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-12T23:00:00.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-12T23:30:00.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-12T24:00:00.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-13T13:00:30.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-13T01:00:30.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-13T01:30:30.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-13T02:00:30.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-13T02:30:30.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-13T03:00:30.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-13T04:00:30.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-13T04:30:30.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-13T05:00:30.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-13T05:30:30.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-13T06:00:30.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-13T06:30:30.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-13T07:00:30.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-13T07:30:30.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-13T08:00:30.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-13T08:0:30.000Z"),
    units: 10,
    type: "bandwidth",
  },
  {
    date: new Date("2024-01-13T09:00:30.000Z"),
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
const margin: Margin = {
  top: 20,
  bottom: 20,
  left: 20,
  right: 20,
};
const theme = {
  pixelsPerTick: 100,
};

function TimeLine() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState(initialData);
  const { width, height } = useSize(targetRef) ?? {
    width: 10,
    height: 10,
  };
  const { innerWidth, innerHeight } = useMemo(() => {
    return {
      innerWidth: Math.floor(width - margin.left - margin.right),
      innerHeight: Math.floor(height - margin.top - margin.bottom),
    };
  }, [width, height]);

  const xScale = useMemo(() => {
    return scaleTime()
      .domain(extent(data.map((d) => d.date)) as [Date, Date])
      .rangeRound([margin.left, innerWidth])
      .nice();
  }, [data, innerWidth]);
  const numberOfTicksTarget = useMemo(() => {
    Math.max(1, Math.floor(innerWidth / theme.pixelsPerTick));
  }, [innerWidth]);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const selection = select(svgRef.current);
  useEffect(() => {
    // const selection = select(svgRef.current);
    selection.call(
      zoom()
        .scaleExtent([1 / 16, 4])
        .translateExtent([
          [margin.left, margin.top],
          [innerWidth, innerHeight],
        ])
        .on("zoom", (event: { transform: ZoomTransform }) => {
          const { transform } = event;
          console.log(transform);
          const newXScale = transform.rescaleX(xScale).nice();
          selection
            .select<SVGGElement>("g.x-axis")
            .call(
              axisBottom(newXScale)
                .ticks(numberOfTicksTarget)
                .tickSize(-innerHeight)
            );
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }) as any
    );
    selection.on("dblclick.zoom", null);
    return () => {
      selection.on("zoom", null);
    };
  }, [innerWidth, innerHeight, selection, xScale, numberOfTicksTarget]);

  useEffect(() => {
    const selection = select(svgRef.current);

    // selection
    //   .selectAll("g.x-axis")
    //   .data([null])
    //   .join("g")
    //   .attr("class", "x-axis")
    //   .attr("transform", `translate(0, ${innerHeight})`)
    //   .call(
    //     axisBottom(xScale)
    //       .ticks(numberOfTicksTarget)
    //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //       .tickSize(-innerHeight) as any
    //   );
  }, [xScale, numberOfTicksTarget, innerHeight]);

  const addData = useCallback(() => {
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
  }, [data]);

  const removeData = useCallback(() => {
    if (data.length === 0) {
      return;
    }
    setData([...data.slice(0, data.length - 1)]);
  }, [data]);
  return (
    <Box ref={targetRef} m={0} p={0} height={"100%"}>
      <svg
        ref={svgRef}
        width={"100%"}
        height={"100%"}
        style={{
          border: "2px solid orange",
        }}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          innerWidth={innerWidth}
          marginLeft={margin.left}
        />
      </svg>
      <Button onClick={addData}>Add Data</Button>
      <Button onClick={removeData}>Remove Data</Button>
    </Box>
  );
}

export default TimeLine;
