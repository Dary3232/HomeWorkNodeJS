import { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';

export const EditTodoItem = ({ todo, updateTodoList }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(todo.title);
    const [isLoading, setIsLoading] = useState(false);
    const { fetchData } = useFetch();

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setNewTitle(todo.title);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetchData('http://localhost:3002/api/todos/edit', 'PUT', {
                oldTitle: todo.title,
                newTitle: newTitle
            });

            if (response) {
                setIsEditing(false);
                updateTodoList();
            }
        } catch (err) {
            console.error('Edit error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="edit-todo-item">
            {!isEditing ? (
                <div>
                    <span>{todo.title}</span>
                    <button className="edit-button" onClick={handleEditClick}>
                        Редактировать
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="todo-form">
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="input"
                        required
                    />
                    <div className="button-group">
                        <button 
                            type="submit" 
                            className="save-button"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Сохранение...' : 'Сохранить'}
                        </button>
                        <button 
                            type="button" 
                            onClick={handleCancel}
                            className="cancel-button"
                        >
                            Отмена
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};
