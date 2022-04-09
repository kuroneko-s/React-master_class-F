import React, { useState } from "react";
import { useForm } from "react-hook-form";

/* function TodoList() {
  const [toDo, setTodo] = useState("");
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTodo(e.currentTarget.value);
  };

  const onSubmit = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(toDo);
    setTodo("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={toDo} placeholder="write a to do" />
        <button>Add</button>
      </form>
    </div>
  );
} */

interface IForm {
  toDo: string;
  toDo1: string;
  toDo2: string;
  toDo3: string;
  toDo4?: string;
}

function TodoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>({
    defaultValues: {
      toDo: "test@naver.com",
    },
  });
  const onValid = (data: IForm) => {
    if (data.toDo2 !== data.toDo3) {
      setError(
        "toDo3",
        { message: "toDo2랑 값이 같아야함" },
        { shouldFocus: true }
      );
    }
  };

  console.log(errors);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onValid)}
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "500px",
        }}
      >
        <input
          {...register("toDo", {
            required: "email required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com",
            },
          })}
          placeholder="write a to do"
        />
        <span>{errors?.toDo?.message}</span>
        <input
          {...register("toDo1", {
            required: true,
            validate: {
              noNico: (v) => (v.includes("nico") ? "Don't use nico" : true),
              noReact: (v) => (v.includes("react") ? "Don't use react" : true),
            },
          })}
          placeholder="write a to do"
        />
        <span>{errors?.toDo1?.message}</span>
        <input
          {...register("toDo2", {
            required: true,
            minLength: {
              value: 10,
              message: "too short",
            },
          })}
          placeholder="write a to do"
        />
        <span>{errors?.toDo2?.message}</span>
        <input
          {...register("toDo3", { required: true })}
          placeholder="write a to do"
        />
        <span>{errors?.toDo3?.message}</span>
        <input
          {...register("toDo4", { required: true })}
          placeholder="write a to do"
        />
        <span>{errors?.toDo4?.message}</span>
        <button>Add</button>
      </form>
    </div>
  );
}

export default TodoList;
