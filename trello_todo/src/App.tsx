import styled from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Boards from "./components/Boards";
import { useRecoilState } from "recoil";
import { boardState, toDoState } from "./atoms";
import { useEffect } from "react";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

function App() {
  const [boards, setBoards] = useRecoilState(boardState);
  const [toDos, setToDos] = useRecoilState(toDoState);

  useEffect(() => {
    const keyArr = Object.keys(toDos);
    keyArr.map((key) => {
      if (!boards.includes(key)) setBoards([key, ...boards]);
      return null;
    });
  }, [toDos, boards, setBoards]);

  const onDragEnd = (args: DropResult) => {
    console.log(args);
    const { destination, source, draggableId } = args;
    if (destination?.droppableId === undefined) return null;

    if (
      source.droppableId === "boards" &&
      destination.droppableId !== "trash"
    ) {
      // board가 움직인 것
      setBoards((oldBoards) => {
        let newBoards = [...oldBoards];
        newBoards.splice(source.index, 1);
        newBoards.splice(destination.index, 0, draggableId);
        return [...newBoards];
      });
      return null;
    }

    if (
      source.droppableId === "boards" &&
      destination.droppableId === "trash"
    ) {
      setToDos((oldToDos) => {
        let newToDos = {};
        const keys = Object.keys(oldToDos);
        console.log(...keys);
        keys
          .filter((key) => key !== draggableId)
          .forEach((key) => {
            console.log("key - ", key);
            newToDos = { ...newToDos, [key]: oldToDos[key] };
            return;
          });
        return newToDos;
      });

      const keyArr = Object.keys(toDos);
      let newBoards: string[] = [];
      keyArr.map((key) => {
        if (!newBoards.includes(key)) setBoards([key, ...boards]);
        return null;
      });

      setBoards(newBoards);
      return null;
    }

    if (destination?.droppableId === source.droppableId) {
      // 한곳에서 움직이는 중
      setToDos((allBoards) => {
        let newToDos = [...allBoards[source.droppableId]];
        let keep = newToDos[source.index];
        newToDos.splice(source.index, 1);
        newToDos.splice(destination?.index, 0, keep);
        return {
          ...allBoards,
          [source.droppableId]: newToDos,
        };
      });
      return null;
    }

    if (destination?.droppableId !== source.droppableId) {
      // 다른 곳 간의 이동
      setToDos((allBoards) => {
        const deleteToDos = [...allBoards[source.droppableId]];
        const appendToDos = [...allBoards[destination.droppableId]];
        const keep = deleteToDos[source.index];
        deleteToDos.splice(source.index, 1);
        appendToDos.splice(destination.index, 0, keep);
        return {
          ...allBoards,
          [source.droppableId]: deleteToDos,
          [destination.droppableId]: appendToDos,
        };
      });
      return null;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <Boards boards={boards} />
      </Container>
    </DragDropContext>
  );
}

export default App;
