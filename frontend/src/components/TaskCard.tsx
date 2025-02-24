import React from "react";

interface TaskCardProps {
    task: { title: string; description: string; completed: boolean, taskId: Number };
    onTaskClick: () => void;
    onComplete: () => void;
    onDelete: () => void;
    onEdit: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onTaskClick, onComplete, onDelete, onEdit }) => {
    return (
        <div
            className={`relative w-40 h-40 p-4 rounded-md shadow-lg cursor-pointer 
                ${task.completed ? 'bg-gray-300 text-gray-600' : 'bg-yellow-300 text-gray-900'} 
                flex flex-col justify-between overflow-hidden`}
            onClick={onTaskClick}
        >
            {/* Task Content */}
            <div className="flex-1 overflow-y-auto">
                <h4 className={`font-bold ${task.completed ? 'line-through' : ''}`}>{task.title}</h4>
                <p className={`text-sm ${task.completed ? 'line-through' : ''}`}>
                    {task.description}
                </p>
            </div>

            {/* Delete button (X) */}
            <button
                className="absolute top-2 right-2 text-red-600 font-bold"
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                }}
            >
                ✖
            </button>

            {/* Checkbox for marking as completed */}
            <div className="absolute bottom-2 left-2 flex items-center gap-2">
                <input
                    type="checkbox"
                    className="w-4 h-4 cursor-pointer"
                    checked={task.completed}
                    onClick={(e) => e.stopPropagation()}
                    onChange={onComplete}
                />
                <span className="text-xs">Done</span>
            </div>

            {/* Edit button (Pencil Icon) */}
            <button
                className="absolute bottom-2 right-2 text-blue-600 font-bold"
                onClick={(e) => {
                    e.stopPropagation();
                    onEdit();
                }}
            >
                ✏️ {/* Replace "Edit" with pencil icon */}
            </button>
        </div>
    );
};

export default TaskCard;