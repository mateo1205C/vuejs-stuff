Vue.component('calendar-app', {
    template:`
        <div class="principal-container container">
            <InputTextComp 
                :text="textReturn('Name')" />
            <InputTextComp 
                :text="textReturn('Email')" />
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
            
            <div class="d-flex align-content-end">
                <input type="submit" value="Submit">
            </div>
        </div>
    `,
    data() {
        return {            
            itemsSelect1: [
                'John Doe',
                'Sarah Reymond',
                'Vladimir Hoffman',
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
                'Check All',
            ],
        }
    },
    methods: {
        textReturn(value) {
            return value
        }
    },
    components: {        
        InputTextComp,
        SelectComp,
        InputRadioComp,
        InputCheckComp,
        TextAreaComp,
    }
})