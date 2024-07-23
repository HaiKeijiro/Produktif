import { useState } from "react";
import { Id, Task } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash } from "./Icons";
import "../assets/kanban.css";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

const TaskCard = ({ task, deleteTask, updateTask }: Props) => {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: { type: "Task", task },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
    setMouseIsOver(false);
  };

  const handleMouseEnter = () => setMouseIsOver(true);
  const handleMouseLeave = () => setMouseIsOver(false);
  const handleDeleteTask = () => deleteTask(task.id);
  const handleUpdateTask = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateTask(task.id, event.target.value);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-neutral-black text-white opacity-30 p-2.5 h-[100px] min-h-[100px] flex items-center text-left rounded-xl border-2 border-accent-main cursor-grab relative"
      />
    );
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="bg-neutral-black text-white p-2.5 h-[100px] min-h-[100px] flex items-center text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-accent-main cursor-grab relative"
      >
        <textarea
          className="h-[90%] w-full resize-none border-none rounded bg-transparent text-white focus:outline-none"
          value={task.content}
          autoFocus
          placeholder="Task content here"
          onBlur={toggleEditMode}
          onKeyDown={(event) => {
            if (event.key === "Enter" && event.shiftKey) {
              toggleEditMode();
            }
          }}
          onChange={handleUpdateTask}
        />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="bg-neutral-black text-white p-2.5 h-[100px] min-h-[100px] flex items-center text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-accent-main cursor-grab relative"
    >
      <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        {task.content}
      </p>
      {mouseIsOver && (
        <button
          onClick={handleDeleteTask}
          className="bg-accent-main stroke-white absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded opacity-60 hover:opacity-100"
        >
          <div className="w-[4vh]">
            <Trash />
          </div>
        </button>
      )}
    </div>
  );
};

export default TaskCard;
