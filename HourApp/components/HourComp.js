let HourComp = {
    template: `
        <div class="stage-caption"> 
            <p  class="text-center">{{ d }}</p>                           
        </div>
    `,
    data() {
        return {
            d: '',
        }
    },
    created() {
        this.getHour();
        this.timer = setInterval(this.getHour, 1000)
    },
    methods: {
        getHour() {
            let now = new Date()
            let time
            if ((now.getSeconds()) < 10) {
                time = now.getHours() + ':' + now.getMinutes() + ':' + '0' + now.getSeconds()
            } else if (now.getMinutes() < 10) {
                time = now.getHours() + ':' + '0' + now.getMinutes() + ':' + now.getSeconds()
            } else if (now.getHours() < 10) {
                time = '0' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
            } else {
                time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
            }
            this.d = time
        },
    }
}