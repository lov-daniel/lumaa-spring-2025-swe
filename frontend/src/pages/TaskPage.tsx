import React, { useState, useEffect } from "react";
import axios from 'axios';
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import ViewTaskModal from "../components/ViewTaskModal";
import NewTaskModal from "../components/NewTaskModal";
import EditTaskModal from "../components/EditTaskModal.tsx"; // Import EditTaskModal
import { useAuth } from "../context/AuthContext.tsx";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface Task {
    title: string;
    description: string;
    completed: boolean;
    taskId: number; // Optional for local tasks before they are saved
}


const TaskPage: React.FC = () => {
    const [tasks, setTasks] = useState([
        { title: "Complete the report", description: "Finish the final draft and submit by Friday", completed: false, taskId: 99 },
        { title: "Review pull requests", description: "Check pending PRs on GitHub", completed: false, taskId: 100 },
        { title: "Fix the bug in the code", description: "Resolve issue #23 from the backlog", completed: true, taskId: 101 },
        { title: "Weasel around", description: "make sure to weasel around", completed: false, taskId: 102 },
        { title: "Chomp chomp", description: "sharkies need to eat, eat lots", completed: false, taskId: 103 },
        { title: "Evolve Eevee into Vaporeon", description: "no description found", completed: true, taskId: 104 },
    ]);

    const auth = useAuth();
    const [selectedTask, setSelectedTask] = useState<{ title: string; description: string; completed: boolean } | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Add edit modal state
    const [editTaskIndex, setEditTaskIndex] = useState<number | null>(null); // Add edit task index state

    const toggleTaskCompletion = (index: number) => {
        setTasks((prevTasks) =>
            prevTasks.map((task, i) =>
                i === index ? { ...task, completed: !task.completed } : task
            )
        );
    
        const taskToUpdate = tasks[index]; // Get the task from state
    
        if (!taskToUpdate.taskId) {
            console.error("Task ID is missing for update");
            return;
        }
    
        const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
    
        axios.put(`${BACKEND_URL}/tasks/${taskToUpdate.taskId}`, updatedTask, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .catch((error) => {
                console.error("Error updating task:", error);
            });
    };
    
    useEffect(() => {
        const loadTasks = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/tasks/${auth.userID}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
    
                setTasks(response.data.map(entry => ({
                    title: entry.title, 
                    description: entry.description, 
                    completed: entry.iscomplete, 
                    taskId: entry.id
                }))); // Overwrite instead of appending
    
            } catch (error) {
                console.error("Error loading tasks:", error);
            }
        };
    
        if (auth.userID) {
            loadTasks();
        }
    }, [auth.userID]);
    
    

    const deleteTask = async (index: number) => {
        const taskToDelete = tasks[index]; // Get the task to delete
    
        if (!taskToDelete.taskId) {
            console.error("Task ID is missing for deletion");
            return;
        }
    
        try {
            // Remove task from UI first
            setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
    
            // Send delete request to backend
            await axios.delete(`${BACKEND_URL}/tasks/${taskToDelete.taskId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };
    

    const handleTaskClick = (task: { title: string; description: string; completed: boolean }) => {
        setSelectedTask(task);
        setIsViewModalOpen(true);
    };

    const closeViewModal = () => setIsViewModalOpen(false);
    const openNewModal = () => setIsNewModalOpen(true);
    const closeNewModal = () => setIsNewModalOpen(false);

    const addTask = async (title: string, description: string) => {
        try {
            const result = await axios.post(
                `${BACKEND_URL}/tasks`, 
                {
                    title: title,
                    description: description,
                    isComplete: false,
                    userId: auth.userID,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            
            // Assuming the task object returned from the backend is in result.data
            setTasks([...tasks, result.data]); // Update tasks state with the new task
    
            closeNewModal(); // Close the modal after adding the task
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                console.error('Error status:', error.response.status);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('General error:', error.message);
            }
        }
    };
    

    // ✅ Count remaining (incomplete) tasks
    const remainingTasks = tasks.filter(task => !task.completed).length;

    // ✅ Edit task
    const handleEditTask = (index: number) => {
        setEditTaskIndex(index);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setEditTaskIndex(null);
    };

    const updateTask = async (title: string, description: string) => {
        if (editTaskIndex !== null) {
            setTasks((prevTasks) => {
                const updatedTask = { ...prevTasks[editTaskIndex], title, description };
    
                // Ensure the task has an ID before updating the backend
                if (!updatedTask.taskId) {
                    console.error("Task ID missing, unable to update.");
                    return prevTasks;
                }
    
                // Send update request to the backend
                axios.put(`${BACKEND_URL}/tasks/${updatedTask.taskId}`, updatedTask, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }).catch(error => {
                    console.error("Error updating task:", error);
                });
    
                // Update the task in the frontend state
                return prevTasks.map((task, i) =>
                    i === editTaskIndex ? updatedTask : task
                );
            });
        }
        closeEditModal();
    };
    
    
    

    return (
        <div className="flex flex-col h-screen">
            <div className="flex relative">
                <AddTask numTasks={remainingTasks} onClick={openNewModal} />
                <div className="flex-1">
                    <TaskList
                        tasks={tasks}
                        onTaskClick={handleTaskClick}
                        onCompleteTask={toggleTaskCompletion}
                        onDeleteTask={deleteTask}
                        onEditTask={handleEditTask} // Pass handleEditTask
                    />
                </div>
            </div>

            {/* Modals */}
            {selectedTask && (
                <ViewTaskModal
                    isOpen={isViewModalOpen}
                    onClose={closeViewModal}
                    taskTitle={selectedTask.title}
                    taskDesc={selectedTask.description}
                    isCompleted={selectedTask.completed}
                />
            )}

            <NewTaskModal isOpen={isNewModalOpen} onClose={closeNewModal} onAddTask={addTask} />

            {editTaskIndex !== null && (
                <EditTaskModal
                    isOpen={isEditModalOpen}
                    onClose={closeEditModal}
                    task={tasks[editTaskIndex]}
                    onUpdateTask={updateTask}
                />
            )}
        </div>
    );
};

export default TaskPage;