import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Board from "./Board";

const Wrapper = styled.div`
  width: 1920px;
  height: 720px;
`;

const InnerWrapper = styled.div`
  background-color: "yellow";
  max-width: 100%;
  max-height: 720px;
  width: 85%;
  height: 100%;
  padding: 5px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;

  background-color: bisque;
`;

const Trash = styled.div<IInnerWrapperParams>`
  position: fixed;
  right: 220px;
  bottom: 50px;
  z-index: 99;
  background-color: ${(props) => (props.isDraggingOver ? "red" : "yellow")};
  font-size: ${(props) => (props.draggingFromThisWith ? "150px" : "50px")};
`;

interface IInnerWrapperParams {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}

interface IBoardsProps {
  boards: string[];
}

function Boards({ boards }: IBoardsProps) {
  return (
    <Wrapper>
      <Droppable droppableId="boards" direction="horizontal" type="BOARD">
        {(magic, snapshot) => (
          <InnerWrapper ref={magic.innerRef} {...magic.droppableProps}>
            {boards.map((boardName, index) => {
              return (
                <Board key={boardName} boardName={boardName} index={index} />
              );
            })}
            {magic.placeholder}
          </InnerWrapper>
        )}
      </Droppable>
      <Droppable droppableId="trash" type="BOARD">
        {(magic, snapshot) => (
          <Trash
            ref={magic.innerRef}
            {...magic.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            draggingFromThisWith={Boolean(
              snapshot.draggingFromThisWith === "To Do" ||
                snapshot.draggingFromThisWith === "Done" ||
                snapshot.draggingFromThisWith === "Doing"
            )}
          >
            🗑️
          </Trash>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Boards;
