const TodosModel = require('../models/TodosModel')

class TodosController {

    async getTodos (req, res) {
        try {
            const result = await TodosModel.find({}, 'title').exec();
            res.status(200).json({ todos: result });
        } catch (e) {
            res.status(400).json({ message: 'Произошла ошибка при получении' })
        }
    }

    async addTodo (req, res) {
        try {
            if (!req.body.title) {
                return res.status(400).json({ message: 'Пожалуйста, добавьте заголовок' })
            }

            const  todoModel = new TodosModel({ title: req.body.title })

            await todoModel.save()

            return res.status(200).json({ message: 'Элемент успешно добавлен' })
        } catch (e) {
            return res.status(400).json({ message: 'Произошла ошибка при добавлении' })
        }
    }

    async deleteTodo (req, res) {
        try {
            if (!req.body.title) {
                return res.status(400).json({ message: 'Пожалуйста, укажите заголовок' })
            }

            const { deletedCount} = await TodosModel.deleteOne({ title: req.body.title })

            if (deletedCount === 0) {
                return res.status(400).json({ message: 'Удаление не произошло, пожалуйста, проверьте заголовок' })
            }

            return res.status(200).json({ message: 'Элемент был успешно удалён' })
        } catch (e) {
            return res.status(400).json({ message: 'Произошла ошибка при удалении' })
        }
    }

    async editTodo(req, res) {
        try {
            const { oldTitle, newTitle } = req.body
    
            if (!oldTitle || !newTitle) {
                return res.status(400).json({ message: 'Пожалуйста, укажите старый и новый заголовок' })
            }
    
            const updatedTodo = await TodosModel.findOneAndUpdate(
                { title: oldTitle }, 
                { title: newTitle }, 
                { new: true } 
            )
    
            if (!updatedTodo) {
                return res.status(400).json({ message: 'Задача не найдена, проверьте старый заголовок' })
            }
    
            return res.status(200).json({ message: 'Элемент успешно обновлён', todo: updatedTodo })
        } catch (e) {
            return res.status(400).json({ message: 'Произошла ошибка при редактировании' })
        }
    }    
}

module.exports = new TodosController()