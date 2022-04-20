import styled from "styled-components";
import {
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { useEffect } from "react";

const Wrapper = styled(motion.div)`
  height: 200vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: linear-gradient(
    135deg,
    rgba(232, 67, 147, 1),
    rgba(253, 121, 168, 1)
  );
`;

const InnerBox = styled.div`
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 35px;

  background-color: gray;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 35px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-750, 750], [-360, 360]);
  const gradient = useTransform(
    x,
    [-750, 0, 750],
    [
      `linear-gradient(135deg,#6bcfe0,#3160c7`,
      `linear-gradient(135deg,rgba(232, 67, 147, 1),rgba(253, 121, 168, 1)`,
      `linear-gradient(135deg,#e7e09a,#9adf41`,
    ]
  );
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.1, 1.8]);
  useEffect(() => {
    // x.onChange(() => console.log(x.get()));
    // scale.onChange(() => console.log(scale.get()));
    // scrollY.onChange(() => console.log(scrollY.get(), scrollYProgress.get()));
  }, [x, rotateZ, scrollYProgress]);

  return (
    <Wrapper style={{ background: gradient }}>
      <InnerBox>
        <Box style={{ x, rotateZ, scale, y: 70 }} drag="x" dragSnapToOrigin />
      </InnerBox>
    </Wrapper>
  );
}

export default App;
