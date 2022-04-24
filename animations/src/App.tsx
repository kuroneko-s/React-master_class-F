import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: linear-gradient(
    135deg,
    rgba(232, 67, 147, 1),
    rgba(253, 121, 168, 1)
  );
`;

const Box = styled(motion.div)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  width: 300px;
  top: 100px;
  height: 180px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 35px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  entry: (back: boolean) => {
    return {
      x: back ? -500 : 500,
      opacity: 0,
      scale: 0,
    };
  },
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: (back: boolean) => {
    return {
      x: back ? 500 : -500,
      opacity: 0,
      scale: 0,
    };
  },
};

function App() {
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);

  const next = () => {
    setVisible((prev) => (prev === 10 ? 1 : prev + 1));
    setBack(false);
  };
  const prev = () => {
    setVisible((prev) => (prev === 1 ? 1 : prev - 1));
    setBack(true);
  };
  return (
    <Wrapper>
      <AnimatePresence exitBeforeEnter custom={back}>
        <Box
          custom={back}
          key={visible}
          variants={boxVariants}
          initial="entry"
          animate="center"
          exit="exit"
        >
          {visible}
        </Box>
      </AnimatePresence>
      <button onClick={next}>Next</button>
      <button onClick={prev}>Prev</button>
    </Wrapper>
  );
}

export default App;
