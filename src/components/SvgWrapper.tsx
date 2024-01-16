import React from "react";

function SvgWrapper(props: { width: number; height: number }) {
  const { width, height } = props;
  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill="blue.100" />
    </svg>
  );
}

export default SvgWrapper;
