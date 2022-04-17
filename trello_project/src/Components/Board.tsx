import { useForm } from "react-hook-form";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DragabbleCard from "./DragabbleCard";
import { IToDo, toDoState } from "../atoms";
import { useRecoilState, useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.carboardColor};
  padding: 10px 0px;
  border-radius: 5px;
  min-height: 220px;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  h1 {
    font-weight: 600;
    text-transform: uppercase;
  }
`;

interface IInnerWrapperParams {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}

const InnerWrapper = styled.div<IInnerWrapperParams>`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  margin: 10px 0;
  padding: 10px 0;

  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.draggingFromThisWith
      ? "#636e72"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in;
`;

const Form = styled.form`
  width: 100%;

  input {
    width: 95%;
  }
`;

interface IBoardParams {
  toDos: IToDo[];
  droppableId: string;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, droppableId }: IBoardParams) {
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [droppableId]: [...allBoards[droppableId], newToDo],
      };
    });
    setValue("toDo", "");
  };

  return (
    <Wrapper>
      <h1>{droppableId}</h1>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task a ${droppableId}`}
        />
      </Form>
      <Droppable droppableId={droppableId}>
        {(magic, snapshot) => (
          <InnerWrapper
            isDraggingOver={snapshot.isDraggingOver}
            draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DragabbleCard
                key={toDo.id}
                toDoId={toDo.id}
                toDoText={toDo.text}
                index={index}
              />
            ))}
            {magic.placeholder}
          </InnerWrapper>
        )}
      </Droppable>
    </Wrapper>
  );
}
export default Board;
