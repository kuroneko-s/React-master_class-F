import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { sortAndDeduplicateDiagnostics } from "typescript";
import { toDoState } from "./atoms";
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 840px;
  width: 100%;
  margin: 0 auto;

  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const { destination, source, draggableId } = info;
    if (!destination) return;
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
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board key={boardId} droppableId={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
