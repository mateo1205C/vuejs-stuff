let InputCheckComp = {
    template:`
        <div class="my-3">
            {{ text }} <br class="my-3">
            <div class="form-check form-check-inline" v-for="(item, key, index) in items" :key="index">            
                <input class="form-check-input" type="checkbox" :id="codeConventions(item)" :name="codeConventions(text)" :value="codeConventions(item)">
                <label class="form-check-label" :for="codeConventions(item)">{{ item }}</label>
            </div>
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