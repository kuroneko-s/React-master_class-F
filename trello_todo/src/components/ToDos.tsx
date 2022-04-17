import { Draggable, Droppable } from "react-beautiful-dnd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoState } from "../atoms";

const Wrapper = styled.div`
  background-color: blue;
  width: 100%;
  min-height: 260px;
  max-height: 100%;
  flex-grow: 1;
  margin: 10px 0;
  padding: 10px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;

const ToDo = styled.div`
  background-color: tomato;
  width: 90%;
  height: 32px;
  font-size: 19px;
  font-weight: 400;
  margin-bottom: 5px;
  border-radius: 5px;
  padding: 0 7px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

interface IToDosProps {
  boardName: string;
}

function ToDos({ boardName }: IToDosProps) {
  const toDos = useRecoilValue(toDoState);

  return (
    <Droppable droppableId={boardName} type="TODO">
      {(magic) => (
        <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
          {toDos[boardName].map((toDo, index) => (
            <Draggable key={toDo.id} draggableId={toDo.id + ""} index={index}>
              {(magic) => (
                <ToDo
                  key={toDo.id}
                  ref={magic.innerRef}
                  {...magic.draggableProps}
                  {...magic.dragHandleProps}
                >
                  <h1>{toDo.text}</h1>
                  <span>delete</span>
                </ToDo>
              )}
            </Draggable>
          ))}
          {magic.placeholder}
        </Wrapper>
      )}
    </Droppable>
  );
}

export default ToDos;
