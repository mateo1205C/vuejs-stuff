let MounthComp = {
    template: `
        <div class="d-flex justify-content-center">
            <p class="d-inline-block text-center m-3" 
            v-for="(week, key) in weekArray" :key="key">
            {{week}}
        </p> 
        </div>

    `,
    data() {
        return {
            weekArray: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            dayArray: [],
        }
    },
}