import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "./atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);

  const validHandler = ({ toDo }: IForm) => {
    setToDos((prev) => [...prev, { text: toDo, category, id: Date.now() }]);
    setValue("toDo", "");
  };

  return (
    <form onSubmit={handleSubmit(validHandler)}>
      <input
        {...register("toDo", { required: "write a To Do" })}
        placeholder="write a to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
