let ModalComp = {
    template:`        
            <div class="container">
                <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item" v-for="(image, key) in imgArray" :key="key" :class="{
                            'active': indexSource(key)
                        }">
                        <img :src="image.src" class="d-block w-100 img-thumbnail" alt="">
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
            </div>                   
    `,
    data() {
        return {
            imgArray: this.imgObject,
            source: this.imgObject[this.index].id,
        }
    },    
    props: {
        index: {
            type: Number,
            required: true
        },
        imgObject: {
            type: Array,
            default: []
        }
    },
    methods: {
        indexSource (value) {
            if(this.source == value) {
                return true
            }
            return false
        },
    },
}