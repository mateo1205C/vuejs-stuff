const MovieApp = Vue.component('movie-app', {
    template: `
        <div class="container-fluid">            
            <div class="container">
                <h5>Bienvenido {{ user.name }} {{ user.lastName }}</h5>
                <SearchComp ref="searchComp" v-model="searchMovies" />
            </div>            
            <div v-if="! Object.keys(searchMovies).length">
                <h1 class="text-center">Peliculas App</h1>
                <div class="container">                                
                    <div class="row d-flex align-content-start flex-wrap">
                        <MovieComp v-for="(movie, key) in movies" 
                            :key="key"
                            :id="movie.id"
                            :title="movie.title"
                            :synopsis="movie.overview"
                            :cover="movie.poster_path"
                            :like="movie.like"
                            @toggleLike="onToggleLike"
                        />              
                    </div>
                </div>            
            </div>            
            <div v-if="Object.keys(searchMovies).length">
                <h1 class="text-center">Resultados de Busqueda</h1>
                <div class="container">                                
                    <div class="row d-flex align-content-start flex-wrap">
                            <MovieComp v-if="movie.poster_path" v-for="(movie, key) in searchMovies.results" 
                            :key="key"                            
                            :id="movie.id"
                            :title="movie.title"
                            :synopsis="movie.overview"
                            :cover="movie.poster_path"
                            :like="movie.like"
                            @toggleLike="onToggleLike"
                            />              
                    </div>
                </div>
            </div>
            
            <div>                
                <nav aria-label="Page navigation example" class="d-flex justify-content-center">
                    <ul class="pagination">
                        <li v-if="! Object.keys(searchMovies).length" class="page-item" :class="{'disabled': page == 1}">
                            <a @click="beforePage()" class="btn d-inline page-link" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li v-if="! Object.keys(searchMovies).length" class="page-item" v-show="paginationVIF(n)" v-for="(n, index) in numPagination" :key="index">
                            <a @click="setPage(n)" class="btn d-inline page-link active" :class="{
                                'btn-light': n != page,
                                'btn-primary': n == page
                            }">{{ n }}</a>
                        </li>
                        <li v-if="! Object.keys(searchMovies).length" class="page-item" :class="{'disabled': page == total_pages}">
                            <a @click="prevPage()" class="btn d-inline page-link" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                            
                        <li v-if="Object.keys(searchMovies).length" class="page-item" :class="{'disabled': searchMovies.page == 1}">
                            <a @click="beforePage()" class="btn d-inline page-link" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li v-if="Object.keys(searchMovies).length" v-show="paginationVIF(n)" class="page-item" v-for="(n, index) in numPagination" :key="index">
                            <a @click="$refs.searchComp.setPage(n)" class="btn d-inline page-link active" :class="{
                                'btn-light': n != searchMovies.page,
                                'btn-primary': n == searchMovies.page
                            }">{{ n }}</a>
                        </li>
                        <li v-if="Object.keys(searchMovies).length" class="page-item" :class="{'disabled': searchMovies.page == searchMovies.total_pages}">
                            <a @click="prevPage()" class="btn d-inline page-link" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <MovieFav ref="movieFav" :show.sync="showLike" />
        </div>
    `,
    data() {
        return {
            user: {
                name: 'Mateo',
                lastName: 'Cordova'
            },
            oldUser: null,
            movies: [],
            showLike: false,
            page: 1,
            total_pages: null,
            numPagination: null,
            searchMovies: {},
        }
    },
    components: {
        MovieComp,
        MovieFav,
        SearchComp,
    },
    computed: {
        ...Vuex.mapState({ //Esto sirve para usar solo la variable favMovies directamente en ves de estar llamandolo con $store.state, El STATE tiene que ir en computed
            favoritas: 'favMovies' //favoritas es el renombre de la data
        }),
    },
    methods: {
        start() {
            let locationURL = new URL(window.location.href)
            this.page = locationURL.searchParams.get('page') || this.page
            this.getPopularMovies()
            this.numPagination = this.page + 4
        },
        beforePage() {
            if ((this.page || this.searchMovies.page) == (this.numPagination - 4)) { this.numPagination -= 5 }
            if (Object.keys(this.searchMovies).length == 0) {
                this.page = this.page - 1
                this.getPopularMovies()
            } else {
                let searchPage = this.searchMovies.page
                this.$refs.searchComp.setPage(searchPage - 1)
            }
        },
        prevPage() {
            if ((this.page || this.searchMovies.page) == this.numPagination) { this.numPagination += 5 }
            if (Object.keys(this.searchMovies).length == 0) {
                this.page = this.page + 1
                this.getPopularMovies()
            } else {
                let searchPage = this.searchMovies.page
                this.$refs.searchComp.setPage(searchPage + 1)
            }
        },
        paginationVIF(value) {
            if ((value + 4) >= this.numPagination) {
                return true
            }
            return false
        },
        onToggleLike(data) {
            let movieLike = this.movies.find(movie => movie.id == data.id)
            movieLike.like = data.like
                //this.$store.commit('toggleFavMovie', movieLike)
            this.storeFavoritas(movieLike)
            this.showLike = data.like
        },
        getPopularMovies() {
            const URL = `${BASEURL}/discover/movie?sort_by=popularity.desc&api_key=${APIKEY}&page=${this.page}`
            fetch(URL)
                .then(response => response.json())
                .then(({ results, page, total_pages }) => {
                    this.page = page
                    this.total_pages = total_pages
                    this.movies = results.map(m => {
                        m.like = false
                        return m
                    })
                })
        },
        setPage(page) {
            this.page = page
            this.getPopularMovies()
        },
        ...Vuex.mapMutations({ //Esto sirve para usar solo la variable favMovies directamente en ves de estar llamandolo con $store.state, El MUTATIONS tiene que ir en los metodos
            storeFavoritas: 'toggleFavMovie'
        })
    },
    mounted() {
        this.start()
    },
})