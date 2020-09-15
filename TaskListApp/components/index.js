Vue.component('task-list-app', {
    template: `
        <div class="container principal-container">
            <h1 class="text-center text-uppercase mb-3">Mi lista de Tareas</h1>
            <div class="row">
                <div class="col-12" v-for="(task, key) in tasks" 
                :key="key">
                    <TaskComp v-show=" Object.keys(tasks).length" 
                        :id="task.id"
                        :messageTask="task.messageTask"
                        :stateTask="task.stateTask"
                        @editTask="onEditTask"
                        @deleteTask="onDeleteTask"      
                        @changeStateTask="onChangeStateTask"                  
                    />
                </div>
            </div>
            <form @submit.prevent>
                <input type="text" class="form-control" :value="editTaskState.task" @keyup.enter="addTask">
            </form>
        </div>
    `,
    data() {
        return {
            tasks: [],
            indexTask: 0,
            editTaskState: {
                state: false,
                id: 0,
                task: '',                          
            },
        }
    },
    components: {
        TaskComp,
    },
    methods: {
        addTask(event) {
            let data = {
                id: this.indexTask,
                messageTask: event.target.value,
                stateTask: false                
            }
            if (!this.editTaskState.state) {                
                this.tasks.push(data)
                this.indexTask++
             } else {
                let index = this.tasks.findIndex(taskObject => taskObject.id == this.editTaskState.id)
                data.id = this.editTaskState.id
                this.tasks.splice(index, 1, data)                 
            }            
            this.editTaskState.state = false
            this.editTaskState.id = 0
            this.editTaskState.task = ''            
        },
        onEditTask(taskObject) {
            this.editTaskState.state = true
            this.editTaskState.id = taskObject.id
            this.editTaskState.task = taskObject.messageTask            
        },
        onDeleteTask(idTask) {
            let index = this.tasks.findIndex(taskObject => taskObject.id == idTask)
            this.tasks.splice(index,1)
            this.indexTask--
        },
        onChangeStateTask(data) {
            let index = this.tasks.findIndex(taskObject => taskObject.id == data.id)
            this.tasks.splice(index, 1, data)
        }
    },
})