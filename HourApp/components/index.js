Vue.component('hour-app', {
    template: `
        <div class="stage" :class="backColor">
        <HourComp />
        </div>
    `,
    data() {
        return {
            backColor: '',
            styleNames: [
                'lawrecium',
                'ohhappines',
                'rainbow_blue',
                'rainbow_blue',
                'orange_fun',
                'argon',
                'purpink',
                'politics',
                'red_ocean',
                'netflix',
            ]
        }
    },
    components: {
        HourComp,
    },
    created() {
        this.randomStyle();
        this.timer = setInterval(this.randomStyle, 10000)
    },
    methods: {
        randomStyle() {
            let randomNum = Math.floor(Math.random() * (this.styleNames.length) + 0);
            this.backColor = this.styleNames[randomNum]            
        }
    },
})






