// Package imports
import React, { useState } from "react";

// Type imports
import { Task } from "../types/task";

interface EditTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdateTask: (title: string, description: string) => void;
    task: Task;
}

function EditTaskModal({ isOpen, onClose, onUpdateTask, task }: EditTaskModalProps) {
    const [title, setTitle] = useState<string>(task.title);
    const [description, setDescription] = useState<string>(task.description)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() && description.trim()) {
            onUpdateTask(title, description);
            onClose();
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    return (
        <dialog className={`modal ${isOpen ? "block" : "hidden"}`} open={isOpen}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">Edit Task</h3>
                <form onSubmit={handleSubmit}>
                    <label className="block my-2">Title</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={title}
                        onChange={handleTitleChange}
                        required
                    />

                    <label className="block my-2">Description</label>
                    <textarea
                        className="textarea textarea-bordered w-full"
                        value={description}
                        onChange={handleDescriptionChange}
                        required
                    />

                    <div className="modal-action">
                        <button type="submit" className="btn btn-success">Save Changes</button>
                        <button type="button" className="btn" onClick={onClose}>Close</button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}

export default EditTaskModal;
