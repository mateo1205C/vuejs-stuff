let MovieComp = {
    template: `            
        <!--
        <div class="card-deck mb-5">
            <div :id="id | formatId" class="card">
                <img :src="cover | coverURL" class="card-img-top rounded-lg">
                
                <div class="card-body">                            
                    <h5 class="card-title text-left">{{ title }}</h5>
                    <p class="card-text">{{ synopsis | forthyLetters}}</p>
                    <div class="d-flex justify-content-between">
                        <router-link :to="{name: 'pelicula', params: {id}}" class="btn btn-primary">Detalle</router-link>
                        <button class="btn" :class="btnStatus" @click="toggleLike">
                            <span v-text="isFav ? 'Favorita' : 'Favoritos'"></span>
                            <i class="fa-heart" :class="{
                                'far': !isFav,
                                'fas': isFav
                            }"></i>                    
                        </button>             
                    </div>   
                </div>
            </div>
        </div>
        -->
        <div class="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-2 my-3">                
            <div class="position-relative">
                <router-link :to="{name: 'pelicula', params: {id}}" class="text-decoration-none text-dark">
                    <div class="img-hover-zoom">                        
                        <img :src="cover | coverURL" class="rounded-lg img-fluid">                                                                                        
                    </div>
                    <h5 class="text-center py-2 px-3 m-0">{{ title }}</h5>
                </router-link> 
                <div class="divBTNLIKE">
                    <button class="btn btnLIKE" :class="btnStatus" @click="toggleLike">                            
                        <i class="fa-heart" :class="{
                            'far': !isFav,
                            'fas': isFav
                        }"></i>                    
                    </button>
                </div> 
            </div>                                                          
        </div>


    `,
    props: {
        id: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        synopsis: {
            type: String,
            default: 'No posee Sinopsis',
        },
        cover: {
            type: String,
            required: true,
        },
        like: {
            type: Boolean,
            required: true,
            default () {
                return false
            }
        }
    },
    filters: {
        formatId(value) {
            return `movieCard-${value}`
        },
        uppercase(value) { //Metodo para poner en mayusculas
            return value.toUpperCase()
        },
        forthyLetters(value) { //Metodo para solo mostrar 40 caracteres
            if (value.length > 18) {
                return value.substring(0, 18) + '...'
            }
            return value
        }
    },
    computed: {
        btnStatus() {
            return this.isFav ? 'btn-danger' : 'btn-success'
        },
        isFav() {
            let favMovies = this.$store.state.favMovies
            let index = favMovies.findIndex(movie => movie.id == this.id)
            return index >= 0
        }
    },
    methods: {
        toggleLike() {
            let data = {
                    id: this.id,
                    like: !this.like
                }
                // Obtener data de hijos directamente desde el padre
                /* let movie = this.$parent.movies.find(m => m.id == this.id)
                movie.like = !this.like
                this.$parent.showLike = !this.like */

            this.$emit('toggleLike', data)
        },
    },
}