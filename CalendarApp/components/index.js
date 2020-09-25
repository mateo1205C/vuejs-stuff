Vue.component('calendar-app', {
    template: `
    <div class="positionContainer">
    <div class="mini-container">
    <!--
    <vuejs-datepicker/>
    
        <v-calendar 
            nav-visibility="visible" 
            :rows="2" :step="1"
        />
        -->
        <v-date-picker                
            mode='range'
            v-model='range'  
            is-dark 
            color="green"            
            />
        <!--<FormComp />-->   
        </div>
        </div>
    `,
    components: {
        FormComp,
        vuejsDatepicker
    },
    methods: {

    },
})