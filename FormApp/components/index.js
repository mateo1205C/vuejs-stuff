Vue.component('form-app', {
    template:`
        <form>
            <div class="principal-container container">
                <InputTextComp 
                    :text="textReturn('Name')" 
                    :type="textReturn('text')" />                  
                <InputTextComp 
                    :text="textReturn('Email')" 
                    :type="textReturn('email')" />                     
                <SelectComp 
                    :text="textReturn('Team Member')"
                    :items="itemsSelect1" />
                <InputRadioComp 
                    :text="textReturn('Frameworks')"
                    :items="itemsRadio1" />
                <InputCheckComp 
                    :text="textReturn('Features')"
                    :items="itemsCheck1" />
                <TextAreaComp 
                    :text="textReturn('Message with Counter')"/>
                
                <div class="d-flex justify-content-center">
                    <input type="submit" value="Submit">
                </div>
            </div>
        </form>
    `,
    data() {
        return {
            objectSubmit:{},            
            itemsSelect1: [
                'John Doe',
                'Sarah Reymond',
                'Vladimir Hoffman'
            ],
            itemsRadio1: [
                'Angular JS',
                'React JS',
                'Vue JS'
            ],
            itemsCheck1: [
                'Reactivity',
                'Encapsulation',
                'Data Binding',
                'Check All'
            ],
        }
    },
    methods: {
        textReturn(value) {
            return value
        },       
    },
    components: {        
        InputTextComp,
        SelectComp,
        InputRadioComp,
        InputCheckComp,
        TextAreaComp,
    }
})