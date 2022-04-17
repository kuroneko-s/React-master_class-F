import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import ToDos from "./ToDos";

const Wrapper = styled.div<{ isDragging: boolean }>`
  background-color: red;
  width: 320px;
  height: 320px;
  margin-right: 10px;
  padding: 10px;
  border-radius: 5px;

  box-shadow: ${(props) =>
    props.isDragging
      ? "2px 9px 9px rgba(0, 0, 0, 0.4)"
      : "1px 3px 3px rgba(0, 0, 0, 0.2)"}; ;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.span`
  font-weight: 600;
  font-size: 24px;
  text-align: center;
`;

const MoveBtn = styled.span`
  font-size: 24px;
  cursor: move !important;
`;

interface IBoardProps {
  boardName: string;
  index: number;
}

function Board({ boardName, index }: IBoardProps) {
  return (
    <Draggable key={boardName} draggableId={boardName} index={index}>
      {(magic, snapshot) => (
        <Wrapper
          key={boardName}
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
        >
          <TitleBox>
            <Title>{boardName}</Title>
            <MoveBtn {...magic.dragHandleProps}>☢️</MoveBtn>
          </TitleBox>
          <ToDos boardName={boardName} />
        </Wrapper>
      )}
    </Draggable>
  );
}

export default Board;
