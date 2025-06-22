import { animate } from "motion";
import { useEffect, useState } from "react";

interface CountUpProps {
  to: number;
  duration?: number;
}

const AnimateCountUp = ({ to, duration }: CountUpProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(0, to, {
      duration,
      onUpdate(value) {
        setCount(Math.floor(value));
      },
    });

    return () => controls.stop();
  }, [to, duration]);
  return <span>{count}</span>;
};

export default AnimateCountUp;
