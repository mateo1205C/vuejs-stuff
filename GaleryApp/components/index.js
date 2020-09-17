Vue.component('galery-app', {
    template: `
    <div @keyup.esc="showModal = false" tabindex="0">
        <div class="principalContainer">            
            <div class="imgDIV d-inline-block col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4" 
               v-for="(image, key) in imgArray" :key="key">
                <ImageComp
                    :id="image.id"
                    :src="image.src"
                    @showModal="onShowModal"
                />
            </div>               
        </div>
        <div v-if="showModal" class="modalDIV positionContainer">
            <ModalComp
                :index="idModal"
                :imgObject="imgArray"                
            />
        </div>
    </div>
    `,
    data() {
        return {
            imgArray: [],
            showModal: false,
            idModal: 0,
        }
    },
    components: {
        ImageComp,
        ModalComp,
    },
    mounted() {
        this.start()        
    },
    methods: {
        start() {
            let data
            for (let i = 0; i < 10; i++) {
                data = {
                    id: i,
                    src: "img/" + (i + 1)+".jpg"
                }                
                this.imgArray.push(data)
            }
        },
        onShowModal (data) {
            this.showModal = true
            this.idModal = data.id            
        },
    },    
})