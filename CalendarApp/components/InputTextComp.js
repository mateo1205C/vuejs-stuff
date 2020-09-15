let InputTextComp = {
    template:`
        <div class="form-group">
            <label :for="codeConventions()"> {{ text }} </label>
            <input type="text" class="form-control" :id="codeConventions()" :name="codeConventions()" 
            :placeholder="placeHolderText()">
        </div>
    `,    
    props: {        
        text: {
            type: String,
            required: true,
        },
    },
    methods: {
        codeConventions () { //Metodo para poner en mayusculas            
            let value = this.text.toLowerCase()
            value = value.split(' ').join('_')            
            return value
        },
        placeHolderText() {
            return 'Your ' + this.text + ' ...'
        }
    },
}