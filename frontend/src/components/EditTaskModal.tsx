import React, { useState } from "react";

interface EditTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdateTask: (title: string, description: string) => void;
    task: { title: string; description: string; completed: boolean };
}

function EditTaskModal({ isOpen, onClose, onUpdateTask, task }: EditTaskModalProps) {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim() && description.trim()) {
            onUpdateTask(title, description);
            onClose(); // Close the modal after update
        }
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
                        <button type="submit" className="btn btn-success">Save Changes</button>
                        <button type="button" className="btn" onClick={onClose}>Close</button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}

export default EditTaskModal;