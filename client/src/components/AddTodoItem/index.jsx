import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";

export const AddTodoItem = ({ updateTodoList }) => {
    const [title, setTitle] = useState('');
    const { fetchData } = useFetch();

    const onSubmit = async (e) => {
        e.preventDefault();
        const body = { title };
        const res = await fetchData('http://localhost:3002/api/todos/add', 'POST', body);
        if (res) {
            updateTodoList();
        }
    };

    return (
        <form onSubmit={onSubmit} className="todo-form">
            <input 
                type="text" 
                placeholder="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="input"
                required
            />
            <div className="button-group">
                <button type="submit" className="add-button">Добавить</button>
            </div>
        </form>
    );
};
