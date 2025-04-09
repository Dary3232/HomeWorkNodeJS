import { useFetch } from "../../hooks/useFetch";
import { EditTodoItem } from "../EditTodoItem";

export const TodoList = ({ todoList, updateTodoList }) => {
    const { fetchData } = useFetch();

    const deleteTodoItem = async (title) => {
        const body = { title };
        const res = await fetchData('http://localhost:3002/api/todos/delete', 'DELETE', body);
        if (res) {
            updateTodoList();
        }
    };

    return (
        <>
            {!todoList.length ? (
                <div>Loading...</div>
            ) : (
                todoList.map((item) => (
                    <div key={item._id} className="todo-item">
                        <EditTodoItem
                            todo={item} 
                            updateTodoList={updateTodoList} 
                        />
                        <button 
                            className="edit-button" 
                            onClick={() => deleteTodoItem(item.title)}
                        >
                            Удалить
                        </button>
                    </div>
                ))
            )}
        </>
    );
};


