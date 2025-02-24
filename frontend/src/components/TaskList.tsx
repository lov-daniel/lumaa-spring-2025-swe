import React from "react";
import TaskCard from "./TaskCard";

interface TaskListProps {
    tasks: { title: string; description: string; completed: boolean, taskId: Number }[];
    onTaskClick: (task: { title: string; description: string; completed: boolean }) => void;
    onCompleteTask: (index: number) => void;
    onDeleteTask: (index: number) => void;
    onEditTask: (index: number) => void; // Add onEditTask prop
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
                    onEdit={() => onEditTask(index)} // Pass onEditTask
                />
            ))}
        </div>
    );
};

export default TaskList;
