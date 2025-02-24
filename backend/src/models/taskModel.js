import pool from "../config/db.js";

async function  createTask(title, description, isCompleted, userId) {
    try {
        const result = await pool.query(
            "INSERT INTO tasks (title, description, isComplete, userid) VALUES ($1, $2, $3, $4) RETURNING *",
            [title, description, Boolean(isCompleted), Number(userId)]
        );
        
        // Check if a task was inserted
        if (result.rows.length > 0) {
            console.log('Task inserted successfully:', result.rows[0]);
            return result.rows[0]; // Return the inserted task
        } else {
            console.log('No task inserted');
            return null; // No task inserted
        }
    } catch (error) {
        console.error("Error creating task:", error, { title, description, isCompleted, userId });
        throw error; // Rethrow the error to be handled by the caller
    }
}


async function findTaskByTitle(title, userId) {
    try {
        const result = await pool.query(
            "SELECT * FROM tasks WHERE title = $1 AND userid = $2",
            [title, Number(userId)]
        );
        return result.rows[0]; // Return the first task found (or null if none)
    } catch (error) {
        console.error("Error finding task by title:", error);
        throw error;
    }
}

async function findTasks(userId) {
    try {
        const result = await pool.query(
            "SELECT * FROM tasks WHERE userid = $1",
            [Number(userId)]
        );
        console.log("Tasks found:", result.rows); // Log the retrieved tasks
        return result.rows; // Return all rows
    } catch (error) {
        console.error("Error finding tasks:", error);
        throw error;
    }
}


async function updateTask(taskId, title, description, isCompleted, userId) {
    try {
        const result = await pool.query(
            "UPDATE tasks SET title = $1, description = $2, iscomplete = $3, userid = $4 WHERE id = $5 RETURNING *",
            [title, description, Boolean(isCompleted), Number(userId), Number(taskId)]
        );
        return result.rows[0]; // Return the updated task
    } catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
}

async function removeTask(taskId, userId) {
    try {
        const result = await pool.query(
            "DELETE FROM tasks WHERE id = $1 AND userId = $2 RETURNING *",
            [Number(taskId), Number(userId)]
        );
        
        if (result.rows.length === 0) {
            return null; // Return null if no task is deleted
        }

        return result.rows[0]; // Return the deleted task
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
}

export { createTask, findTaskByTitle, findTasks, updateTask, removeTask };
