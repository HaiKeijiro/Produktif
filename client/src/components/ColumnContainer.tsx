import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Column, Id, Task } from "../types";
import { Plus, Trash } from "./Icons";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import TaskCard from "./TaskCard";

interface Props {
  column: Column;
  deleteTask: (id: Id) => void;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;
  updateTask: (id: Id, content: string) => void;
  createTask: (columnId: Id) => void;
  tasks: Task[];
}

const ColumnContainer = ({
  column,
  deleteColumn,
  updateColumn,
  createTask,
  tasks,
  deleteTask,
  updateTask,
}: Props) => {
  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: { type: "Column", column },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleBlur = () => setEditMode(false);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-light w-[350px] h-fit max-h-[500px] rounded-md flex flex-col ${
        isDragging ? "opacity-40 border-2 border-accent-main" : ""
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => setEditMode(true)}
        className="bg-neutral-black text-white text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-4 flex items-center justify-between"
      >
        <div className="flex gap-2">
          <div className="flex justify-center items-center bg-light-primary px-2 py-1 text-sm rounded-full">
            {tasks.length}
          </div>
          {!editMode ? (
            column.title
          ) : (
            <input
              className="bg-transparent focus:border-accent-main border rounded outline-none px-2"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={handleBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleBlur();
              }}
            />
          )}
        </div>
        <button
          onClick={() => deleteColumn(column.id)}
          className="w-[5vh] stroke-gray-500 hover:stroke-accent-main hover:bg-black rounded px-1 py-2"
        >
          <Trash />
        </button>
      </div>
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </SortableContext>
      </div>
      <button
        onClick={() => createTask(column.id)}
        className="flex gap-2 items-center border-light-bg-light-primary border-2 rounded-md p-4 hover:bg-neutral-black hover:text-white active:bg-black"
      >
        <span className="w-[4vh]">
          <Plus />
        </span>
        Add task
      </button>
    </div>
  );
};

export default ColumnContainer;
