let MovieComp = {
    template: `
        <div :id="id | formatId" class="card sizeBOX">
            <img :src="cover | coverURL" class="card-img-top">
            <div class="card-body">                
                <h2 class="card-title">{{ title | uppercase }}</h2>            
                <p class="card-text">{{ synopsis | forthyLetters}}</p>
                <button class="btn" :class="btnStatus" @click="toggleLike">
                    <span v-text="isFav ? 'Favorita' : 'Agregar a Favoritos'"></span>
                    <i class="fa-heart" :class="{
                        'far': !isFav,
                        'fas': isFav
                    }"></i>                    
                </button>
                <router-link :to="{name: 'pelicula', params: {id}}" class="btn btn-primary">Detalle</router-link>
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
            return value.substring(0, 100) + '...'
        }
    },
    computed: {
        btnStatus() {
            return this.isFav ? 'btn-like' : 'btn-light'
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