import { animated, useTrail } from "@react-spring/web";
import React from "react";

const Trail = ({ children }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 10, tension: 5000, friction: 500 },
    opacity: 1,
    x: 0,
    height: 110,
    from: { opacity: 0, x: 20, height: 0 },
    delay: 300,
  });

  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <animated.div key={index} style={style}>
          <animated.div style={{ height }}>{items[index]}</animated.div>
        </animated.div>
      ))}
    </div>
  );
};

export default Trail;
