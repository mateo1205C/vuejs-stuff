let TextAreaComp = {
    template:`
        <div class="form-group my-3">
            <div class="d-flex justify-content-between"> 
                <label :for="codeConventions(text)">{{ text }}</label>
                <span>{{ letterCounter }} / 255</span>
            </div>
            <textarea v-model="message" class="form-control my-1" :id="codeConventions(text)" rows="3" maxlength="255" v-on:keyup="countChar()"></textarea>
        </div>
    `,
    data() {
        return {
            letterCounter: 0,            
            message: '',        
        }
    },
    props: {
        text: {
            type: String,
            required: true,
        },        
    },
    methods: {
        codeConventions (value) { //Metodo para poner en mayusculas            
            value = value.toLowerCase()
            value = value.split(' ').join('_')            
            return value
        },
        countChar() {            
            this.letterCounter = this.message.length            
            if (this.letterCounter == 255) {
                return false
            }            
        },
    },
}