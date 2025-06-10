import React, { useState } from 'react';

const TodoItem = () => {
    const [task, setTask] = useState('');
    const [todos, setTodos] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [editedText, setEditedText] = useState('');
    const [filter, setFilter] = useState('all'); // new state

    const addTask = () => {
        if (task.trim()) {
            setTodos([...todos, { text: task, completed: false }]);
            setTask('');
        }
    };

    const toggleComplete = (index) => {
        const updated = [...todos];
        updated[index].completed = !updated[index].completed;
        setTodos(updated);
    };

    const deleteTask = (index) => {
        const updated = todos.filter((_, i) => i !== index);
        setTodos(updated);
    };

    const editTask = (index) => {
        setIsEditing(index);
        setEditedText(todos[index].text);
    };

    const saveEdit = (index) => {
        const updated = [...todos];
        updated[index].text = editedText;
        setTodos(updated);
        setIsEditing(null);
        setEditedText('');
    };

    const filteredTodos = todos.filter((todo) => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="p-6 max-w-md w-full bg-white rounded shadow">
                <h2 className="text-2xl font-bold text-center mb-4">To-Do App</h2>

                {/* Input */}
                <div className="flex mb-4">
                    <input
                        type="text"
                        className="flex-1 p-2 border border-gray-300 rounded-l focus:outline-none"
                        placeholder="Add new task..."
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    />
                    <button
                        onClick={addTask}
                        className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
                    >
                        Add
                    </button>
                </div>

                {/* Filter Buttons */}
                <div className="flex justify-center gap-2 mb-4">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-2 py-1 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('active')}
                        className={`px-2 py-1 rounded ${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Active
                    </button>
                    <button
                        onClick={() => setFilter('completed')}
                        className={`px-2 py-1 rounded ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        Completed
                    </button>
                </div>

                {/* Tasks */}
                {filteredTodos.length === 0 ? (
                    <p className="text-center text-gray-400">No tasks</p>
                ) : (
                    filteredTodos.map((todo, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center bg-gray-50 p-2 my-2 rounded border"
                        >
                            {isEditing === index ? (
                                <>
                                    <input
                                        value={editedText}
                                        onChange={(e) => setEditedText(e.target.value)}
                                        className="flex-1 p-1 border mr-2"
                                    />
                                    <button
                                        onClick={() => saveEdit(index)}
                                        className="text-green-600"
                                    >
                                        Save
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span
                                        onClick={() => toggleComplete(index)}
                                        className={`flex-1 cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
                                    >
                                        {todo.text}
                                    </span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => editTask(index)}
                                            className="text-yellow-500"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => deleteTask(index)}
                                            className="text-red-500"
                                        >
                                            ❌
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TodoItem;
