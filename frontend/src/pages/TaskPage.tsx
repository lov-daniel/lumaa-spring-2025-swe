// Package imports
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useAuth } from "../context/AuthContext.tsx";

// Component Imports
import AddTask from "../components/AddTask";
import TaskList from "../components/TaskList";
import ViewTaskModal from "../components/ViewTaskModal";
import NewTaskModal from "../components/NewTaskModal";
import EditTaskModal from "../components/EditTaskModal.tsx"; // Import EditTaskModal

// Import Types
import { Task } from "../types/task.ts";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const TaskPage: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState<boolean>(false);
    const [isNewModalOpen, setIsNewModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [editTaskIndex, setEditTaskIndex] = useState<number | null>(null);

    const { userID } = useAuth();

    // ✅ Load tasks from the server
    useEffect(() => {
        const loadTasks = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/tasks/${userID}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
                setTasks(response.data.map((entry: any) => ({
                    title: entry.title,
                    description: entry.description,
                    completed: entry.iscomplete,
                    taskId: entry.id,
                })));
            } catch (error) {
                console.error("Error loading tasks:", error);
            }
        };

        if (userID) loadTasks();
    }, [userID]);

    // ✅ Toggle task completion status
    const toggleTaskCompletion = async (index: number): Promise<void> => {
        const taskToUpdate = tasks[index];
        if (!taskToUpdate.taskId) return console.error("Task ID is missing for update");

        const updatedTask: Task = { ...taskToUpdate, completed: !taskToUpdate.completed };
        setTasks(prevTasks =>
            prevTasks.map((task, i) => (i === index ? updatedTask : task))
        );

        try {
            await axios.put(`${BACKEND_URL}/tasks/${taskToUpdate.taskId}`, updatedTask, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    // ✅ Delete a task
    const deleteTask = async (index: number): Promise<void> => {
        const taskToDelete = tasks[index];
        if (!taskToDelete.taskId) return console.error("Task ID is missing for deletion");

        try {
            setTasks(prevTasks => prevTasks.filter((_, i) => i !== index));
            await axios.delete(`${BACKEND_URL}/tasks/${taskToDelete.taskId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    // ✅ Add a new task
    const addTask = async (title: string, description: string): Promise<void> => {
        try {
            const result = await axios.post(`${BACKEND_URL}/tasks`, {
                title,
                description,
                isComplete: false,
                userId: userID,
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });

            const newTask: Task = { 
                title: result.data.title, 
                description: result.data.description, 
                completed: result.data.completed, 
                taskId: result.data.id 
            };
            setTasks(prevTasks => [...prevTasks, newTask]);
            closeNewModal(); // Close modal after adding the task
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

    // ✅ Edit an existing task
    const updateTask = async (title: string, description: string): Promise<void> => {
        if (editTaskIndex !== null) {
            setTasks(prevTasks => {
                const updatedTask: Task = { ...prevTasks[editTaskIndex], title, description };
                if (!updatedTask.taskId) {
                    console.error("Task ID missing, unable to update.");
                    return prevTasks;
                }

                axios.put(`${BACKEND_URL}/tasks/${updatedTask.taskId}`, updatedTask, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                }).catch(error => {
                    console.error("Error updating task:", error);
                });

                return prevTasks.map((task, i) => i === editTaskIndex ? updatedTask : task);
            });
        }
        closeEditModal();
    };

    const remainingTasks: number = tasks.filter(task => !task.completed).length;

    const handleTaskClick = (task: Task): void => {
        setSelectedTask(task);
        setIsViewModalOpen(true);
    };

    const closeViewModal = (): void => setIsViewModalOpen(false);
    const openNewModal = (): void => setIsNewModalOpen(true);
    const closeNewModal = (): void => setIsNewModalOpen(false);
    const handleEditTask = (index: number): void => {
        setEditTaskIndex(index);
        setIsEditModalOpen(true);
    };
    const closeEditModal = (): void => {
        setIsEditModalOpen(false);
        setEditTaskIndex(null);
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
                        onEditTask={handleEditTask}
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
