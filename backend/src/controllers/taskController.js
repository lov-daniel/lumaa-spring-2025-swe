import {
    createTask,
    findTaskByTitle,
    findTasks,
    updateTask,
    removeTask,
} from "../models/taskModel.js";

const addTask = async (req, res) => {
    try {
        const { title, description, completed, userId } = req.body;

        console.log(`Incoming task:`);
        console.log(req.body);

        if (!title || !description) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const existingTask = await findTaskByTitle(title, userId);

        if (existingTask) {
            return res.status(400).json({ error: "User has a task of the same title already" });
        }

        const newTask = await createTask(title, description, completed, userId);

        res.status(201).json(newTask); // Send the entire task object
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" }); // Send error response
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params; // Get taskId from req.params
        const userId = req.user.id; // Get userId from req.user (assuming authenticateJWT middleware)

        const deletedTask = await removeTask(id, userId); // Use removeTask and correct parameters

        if (!deletedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.status(204).send(); // 204 No Content for successful deletion
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateTaskByUser = async (req, res) => {
    try {
        const { id } = req.params; // Get taskId from req.params
        const userId = req.user.id; // Get userId from req.user
        const { title, description, completed } = req.body;

        console.log("Updating task:")
        console.log(completed);

        const updatedTask = await updateTask(id, title, description, completed, userId);

        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.status(200).json(updatedTask); // Send the updated task object
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const findTasksByUser = async (req, res) => {
    try {
        const { id } = req.params; // Get userId from req.params

        console.log(`looking for user ${id}`)

        const tasks = await findTasks(id);

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ error: "No tasks found for this user" });
        }

        res.status(200).json(tasks); // Send the tasks array
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const findTasksByTitle = async (req, res) => {
    try {
        const { title } = req.body;
        const userId = req.user.id;

        const task = await findTaskByTitle(title, userId);

        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.status(200).json(task); // Send the task object
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export {
    addTask,
    deleteTask,
    updateTaskByUser,
    findTasksByUser,
    findTasksByTitle,
};
