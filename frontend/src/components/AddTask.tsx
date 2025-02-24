interface AddTaskProps {
    numTasks: number;
    onClick: () => void;
}

function AddTask({ numTasks, onClick }: AddTaskProps) {
    return (
        <div className="flex-none w-1/4 p-4">
            <div className="stat stat-lg">
                <div className="stat-title text-2xl">Remaining Tasks</div>
                <div className="stat-value text-4xl">{numTasks}</div>
                <br />
                <div className="stat-actions">
                    <button className="btn btn-lg btn-success" onClick={onClick}>
                        Add Task
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddTask;
