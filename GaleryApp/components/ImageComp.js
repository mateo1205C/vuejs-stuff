let ImageComp = {
    template: `   
        <div @click="showModal()">     
            <img class="img-thumbnail
            rounded float-left" :id="'img'+(id-1)" :src="src" :alt="'Image ' + id">    
        </div>    
    `,
    props: {
        id: {
            type: Number,
            required: true,
        }, 
        src: {
            type: String,
            requierd: true
        }
    },
    methods: {
        showModal () {
            let data = {
                id: this.id,
                src: this.src,
            }
            this.$emit('showModal', data)
        }
    },
}