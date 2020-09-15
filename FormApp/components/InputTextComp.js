let InputTextComp = {
    template:`
        <div class="form-group">
            <label :for="codeConventions()"> {{ text }} </label>
            <input :type="type" class="form-control" :id="codeConventions()" :name="codeConventions()" 
            :placeholder="placeHolderText()">
        </div>
    `,
    props: {        
        text: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
    },
    methods: {
        codeConventions () {
            switch(this.type){
                case 'email':                                
                    return 'inputEmail0'
                case 'text':                                        
                    return 'inputText0'
            }
        },
        placeHolderText () {

            if(this.type == 'email' ){
                return 'jhondoe@gmail.com'
            }
            return 'Your ' + this.text + ' ...'
        },
    },
}