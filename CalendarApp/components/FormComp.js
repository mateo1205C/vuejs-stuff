let FormComp = {
    template: `
        <div>
            <InputDatePicker />
            <MounthHeaderComp />
            <MounthComp />
        </div>
    `,
    data() {
        return {

        }
    },
    components: {
        MounthHeaderComp,
        InputDatePicker,
        MounthComp,
    }
}