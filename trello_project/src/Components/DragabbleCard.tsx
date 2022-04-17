import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) =>
    props.isDragging ? "#a29bfe" : props.theme.cardColor};
  padding: 5px 10px;
  border-radius: 5px;
  margin-bottom: 5px;

  width: 80%;
  box-shadow: ${(props) =>
    props.isDragging ? "2px 9px 9px rgba(0, 0, 0, 0.4)" : "none"}; ;
`;

interface IDragabbleCardParams {
  toDoText: string;
  toDoId: number;
  index: number;
}

function DragabbleCard({ toDoText, index, toDoId }: IDragabbleCardParams) {
  console.log(`${toDoText} has been rendered`);
  return (
    // key랑 draggableId가 항상 같아야한다.
    <Draggable key={toDoText} draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);
