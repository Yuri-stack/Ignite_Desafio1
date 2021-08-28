import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
  function handleCreateNewTask() {
    if(!newTaskTitle) return                      // Verifica se o Título não está vazio

    const newTask = {                             // Cria um nova Task
      id: Math.random(),                          // Gera um Id aleatório
      title: newTaskTitle,                        // Pega o valor do Input e atribui a Props Title
      isComplete: false                           // Inicia a Task como não concluída
    }

    setTasks(oldState => [...oldState, newTask])  // Atualiza o antigo State das Tasks e Adiciona a nova Task
    setNewTaskTitle('')                           // Deixa o Input vazio
  }

  // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
  function handleToggleTaskCompletion(id: number) {
    const newTasks = tasks.map(tasks => tasks.id == id ? {  // Percorre as Tasks procurando a com o ID informado e entra no IF 
      ...tasks,                                             // Cria um novo Array com as Tasks anteriores 
      isComplete: !tasks.isComplete                         // Inverte o valor do valor isComplete
    } : tasks)                                              // Retorna as Tasks já cadastradas caso o ID não foi encontrado

    setTasks(newTasks)                                      // Cria uma nova instância com as atualizações 
  }

  // Remova uma task da listagem pelo ID
  function handleRemoveTask(id: number) {
    const filteredTasks = tasks.filter(tasks => tasks.id != id) // Faz um Filtro e cria um novo Array com as Tasks com ID diferente informado
    setTasks(filteredTasks)                                     // Cria uma nova instância com as atualizações 
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}