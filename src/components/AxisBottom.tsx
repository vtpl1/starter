// import { axisBottom, select } from "d3";
// import { useEffect, useMemo, useRef } from "react";

// type XAxisProps = {
//   xScale: any;
//   innerHeight: number;
//   innerWidth: number;
// };

// const theme = {
//   pixelsPerTick: 100,
// };

// function AxisBottom({ xScale, innerHeight, innerWidth }: XAxisProps) {
//   const xAxisRef = useRef<SVGSVGElement>(null);

//   const numberOfTicksTarget = useMemo(() => {
//     return Math.max(1, Math.floor(innerWidth / theme.pixelsPerTick));
//   }, [innerWidth]);

//   useEffect(() => {
//     console.log(numberOfTicksTarget);
//     const selection = select<SVGSVGElement, unknown>(xAxisRef.current!);
//     selection
//       .selectAll("g.x-axis")
//       .data([null])
//       .join("g")
//       .attr("class", "x-axis")
//       .attr("transform", `translate(0, ${innerHeight})`)
//       .call(
//         axisBottom(xScale)
//           .ticks(numberOfTicksTarget)
//           .tickSize(-innerHeight) as any
//       );
//   }, [xScale, innerHeight, numberOfTicksTarget]);

//   return <g ref={xAxisRef} />;
// }

// export default AxisBottom;

import { useColorModeValue, useTheme } from "@chakra-ui/react";
import { ScaleTime } from "d3";
import { useMemo } from "react";

interface XAxisProps {
  xScale: ScaleTime<number, number>;
  innerHeight: number;
  innerWidth: number;
  marginLeft: number;
}
function AxisBottom({
  xScale,
  innerHeight,
  innerWidth,
  marginLeft,
}: XAxisProps) {
  const theme = useTheme();
  const textColor = useColorModeValue(
    theme.colors.gray[600],
    theme.colors.gray[300]
  );
  const timeFormatter = xScale.tickFormat();
  const themes = {
    pixelsPerTick: 100,
  };
  const numberOfTicksTarget = useMemo(() => {
    return Math.max(1, Math.floor(innerWidth / themes.pixelsPerTick));
  }, [innerWidth, themes.pixelsPerTick]);

  return (
    <>
      <line
        x1={marginLeft}
        x2={innerWidth}
        y1={innerHeight}
        y2={innerHeight}
        stroke={textColor}
      />
      {xScale.ticks(numberOfTicksTarget).map((tickValue: Date) => (
        <g
          className="x-axis"
          key={tickValue.getTime()}
          transform={`translate(${xScale(tickValue)},0)`}>
          <line y2={innerHeight} stroke={textColor} strokeWidth="1" />

          <text
            key={`label-${tickValue.getTime()}`}
            y={innerHeight + 10}
            textAnchor="middle"
            style={{ fontSize: "10px", fill: textColor }}>
            {timeFormatter(tickValue)}
          </text>
        </g>
      ))}
    </>
  );
}

export default AxisBottom;
