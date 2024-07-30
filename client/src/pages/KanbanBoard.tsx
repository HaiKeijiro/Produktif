import React, { useMemo, useState } from "react";
import { Plus } from "../components/Icons";
import { Column, Id, Task } from "../types";
import ColumnContainer from "../components/ColumnContainer";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import "../assets/kanban.css";
import TaskCard from "../components/TaskCard";

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 3 },
    })
  );

  const generateId = () => crypto.randomUUID();

  const createTask = (columnId: Id) => {
    const newTask: Task = {
      id: generateId(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const deleteTask = (id: Id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: Id, content: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, content } : task))
    );
  };

  const createNewColumn = () => {
    const newColumn: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };
    setColumns((prevColumns) => [...prevColumns, newColumn]);
  };

  const deleteColumn = (id: Id) => {
    setColumns((prevColumns) => prevColumns.filter((col) => col.id !== id));
    setTasks((prevTasks) => prevTasks.filter((task) => task.columnId !== id));
  };

  const updateColumn = (id: Id, title: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) => (col.id === id ? { ...col, title } : col))
    );
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { type, task, column } = event.active.data.current || {};
    if (type === "Task") setActiveTask(task);
    if (type === "Column") setActiveColumn(column);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      setColumns((prevColumns) => {
        const activeIndex = prevColumns.findIndex(
          (col) => col.id === active.id
        );
        const overIndex = prevColumns.findIndex((col) => col.id === over.id);
        return arrayMove(prevColumns, activeIndex, overIndex);
      });
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeType = active.data.current?.type;
    const overType = over.data.current?.type;

    if (activeType === "Task") {
      const activeIndex = tasks.findIndex((task) => task.id === active.id);
      const overIndex = tasks.findIndex((task) => task.id === over.id);

      if (overType === "Task") {
        setTasks((prevTasks) => {
          const updatedTasks = [...prevTasks];
          updatedTasks[activeIndex].columnId = updatedTasks[overIndex].columnId;
          return arrayMove(updatedTasks, activeIndex, overIndex);
        });
      } else if (overType === "Column") {
        setTasks((prevTasks) => {
          const updatedTasks = [...prevTasks];
          updatedTasks[activeIndex].columnId = over.id;
          return updatedTasks;
        });
      }
    }
  };

  return (
    <div className="m-auto min-h-screen w-full overflow-x-auto overflow-y-hidden p-[3rem]">
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        sensors={sensors}
      >
        <div className="m-auto flex gap-4">
          <SortableContext items={columnsId}>
            {columns.map((col) => (
              <ColumnContainer
                key={col.id}
                column={col}
                deleteColumn={deleteColumn}
                deleteTask={deleteTask}
                updateColumn={updateColumn}
                updateTask={updateTask}
                createTask={createTask}
                tasks={tasks.filter((task) => task.columnId === col.id)}
              />
            ))}
          </SortableContext>
          <button
            onClick={createNewColumn}
            className="h-[60px] w-[250px] min-w-[250px] cursor-pointer rounded-lg border-2 p-4 bg-[#272727] text-white outline-none flex gap-2 items-center"
          >
            <div className="w-[4vh]">
              <Plus />
            </div>
            Add Column
          </button>
        </div>
        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                deleteTask={deleteTask}
                updateColumn={updateColumn}
                updateTask={updateTask}
                createTask={createTask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
};

export default KanbanBoard;
