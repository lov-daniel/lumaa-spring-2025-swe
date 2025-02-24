interface ViewTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    taskTitle: string;
    taskDesc: string;
    isCompleted: boolean;
}

function ViewTaskModal({ isOpen, onClose, taskTitle, taskDesc, isCompleted }: ViewTaskModalProps) {
    return (
        <dialog className={`modal ${isOpen ? 'block' : 'hidden'}`} open={isOpen}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">{taskTitle}</h3>
                <p className="py-2">{taskDesc}</p>
                <p className="py-2 text-sm text-gray-500">
                    Status: {isCompleted ? "✅ Completed" : "❌ Not Completed"}
                </p>

                <div className="modal-action">
                    <button className="btn" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </dialog>
    );
}

export default ViewTaskModal;
