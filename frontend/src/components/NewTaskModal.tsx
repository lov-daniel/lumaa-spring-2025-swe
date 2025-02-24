import React, { useState } from "react";

interface NewTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddTask: (title: string, description: string) => void;
}

function NewTaskModal({ isOpen, onClose, onAddTask }: NewTaskModalProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() && description.trim()) {
            onAddTask(title, description);
            setTitle("");
            setDescription("");
        }
    };

    return (
        <dialog className={`modal ${isOpen ? "block" : "hidden"}`} open={isOpen}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">New Task</h3>
                <form onSubmit={handleSubmit}>
                    <label className="block my-2">Title</label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <label className="block my-2">Description</label>
                    <textarea
                        className="textarea textarea-bordered w-full"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />

                    <div className="modal-action">
                        <button type="submit" className="btn btn-success">Add Task</button>
                        <button type="button" className="btn" onClick={onClose}>Close</button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}

export default NewTaskModal;
