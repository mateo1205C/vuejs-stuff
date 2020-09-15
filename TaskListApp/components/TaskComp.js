let TaskComp = {
    template: `
        <div class="container">
            <div class="form-check form-check-inline taskLABEL">
                <input type="checkbox" class="taskMARGIN" v-model="checkedState" @change="changeStateTask">
                <p class="taskP taskMARGIN" :class="{
                    'checkedTask': checkedState                    
                }">{{ messageTask }}</p>
                <button class="btn btn-success taskMARGIN" @click="editTask">
                    <i class="far fa-edit"></i>
                </button>
                <button class="btn btn-danger taskMARGIN" @click="deleteTask">
                    <i class="fas fa-trash-alt"></i>
                </button>            
            </div>
            <hr>
        </div>
    `,
    data() {
        return {
            checkedState: this.stateTask
        }
    },
    props: {
        id: {
            type: Number,
            required: true,
        },
        messageTask: {
            type: String,
            required: true,
        },
        stateTask: {
            type: Boolean,
            required: true,
            default() {
                return false
            }
        }
    },    
    methods: {
        editTask() {
            let data = {
                id: this.id,
                messageTask: this.messageTask, 
                stateTask: this.checkedState,               
            }
            this.$emit('editTask', data)
        },
        deleteTask() {            
            this.$emit('deleteTask', this.id)            
        }, 
        changeStateTask() {   
            let data = {
                id: this.id,
                messageTask: this.messageTask, 
                stateTask: this.checkedState,                
            }
            this.$emit('changeStateTask', data)         
        }         
    }, 
    updated() {
        this.checkedState = this.stateTask
    }, 
}