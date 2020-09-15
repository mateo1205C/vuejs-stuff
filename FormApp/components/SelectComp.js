let SelectComp = {
    template:`
        <div class="form-group">
            <label :for="codeConventions(text)"> {{ text }} </label>            
            <select class="form-control" :id="codeConventions(text)" :name="codeConventions(text)">                
                <option :value="codeConventions(item)" v-for="(item, key, index) in items" :key="index">
                {{ item }}
                </option>
            </select>
        </div>
    `,
    props: {        
        text: {
            type: String,
            required: true,
        },
        items: [],
    },
    methods: {
        codeConventions (value) { //Metodo para poner en mayusculas            
            value = value.toLowerCase()
            value = value.split(' ').join('_')            
            return value
        },
    },
}