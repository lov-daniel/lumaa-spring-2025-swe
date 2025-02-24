import React from "react";
import TaskCard from "./TaskCard";
import { Task } from "../types/task"; // Import Task type

interface TaskListProps {
    tasks: Task[]; // Use the Task type
    onTaskClick: (task: Task) => void; // Use the Task type for task
    onCompleteTask: (index: number) => void;
    onDeleteTask: (index: number) => void;
    onEditTask: (index: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskClick, onCompleteTask, onDeleteTask, onEditTask }) => {
    return (
        <div className="flex flex-wrap gap-4 p-4 justify-start">
            {tasks.map((task, index) => (
                <TaskCard
                    key={index}
                    task={task}
                    onTaskClick={() => onTaskClick(task)}
                    onComplete={() => onCompleteTask(index)}
                    onDelete={() => onDeleteTask(index)}
                    onEdit={() => onEditTask(index)}
                />
            ))}
        </div>
    );
};

export default TaskList;
