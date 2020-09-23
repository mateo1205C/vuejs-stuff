const MovieApp = Vue.component('movie-app', {
    template: `
        <div>
            <MovieFav ref="movieFav" :show.sync="showLike" /> 
            <SearchComp ref="searchComp" v-model="searchMovies" 
                @input="onInput"
            />                                  
            <div v-if="! Object.keys(searchMovies).length">                
                <div class="container">                                
                    <div class="row">
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
                    <div class="row">
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
                        <li v-if="! Object.keys(searchMovies).length" class="page-item" v-show="paginationVIF(n)" v-for="(n, index) in total_pages" :key="index">
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
                        <li v-if="Object.keys(searchMovies).length" v-show="paginationVIF(n)" class="page-item" v-for="(n, index) in searchMovies.total_pages" :key="index">
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
            paginationMovies: 5,
            paginationSearchMovies: 5,
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
            this.getLatestMovies()
            this.numPagination = this.page + 4
        },
        beforePage() {
            if (Object.keys(this.searchMovies).length == 0) {
                if (this.page == (this.numPagination - 4)) {
                    this.numPagination -= 5
                    this.paginationMovies = this.numPagination
                }
                this.page = this.page - 1
                this.getPopularMovies()
                    //this.getLatestMovies()
            } else {
                if (this.searchMovies.page == (this.numPagination - 4)) {
                    this.numPagination -= 5
                    this.paginationSearchMovies = this.numPagination
                }
                let searchPage = this.searchMovies.page
                this.$refs.searchComp.setPage(searchPage - 1)
            }
        },
        prevPage() {
            if (Object.keys(this.searchMovies).length == 0) {
                if (this.page == this.numPagination) {
                    this.numPagination += 5
                    this.paginationMovies = this.numPagination
                }
                this.page = this.page + 1
                this.getPopularMovies()
                    //this.getLatestMovies()
            } else {
                if (this.searchMovies.page == this.numPagination) {
                    this.numPagination += 5
                    this.paginationSearchMovies = this.numPagination
                }
                let searchPage = this.searchMovies.page
                this.$refs.searchComp.setPage(searchPage + 1)
            }
        },
        paginationVIF(value) {
            if ((value <= this.numPagination) && (value + 4) >= this.numPagination) {
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
            //https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1
            const URL = `${BASEURL}/movie/popular?api_key=${APIKEY}&page=${this.page}`
                //const URL = `${BASEURL}/discover/movie?sort_by=popularity.desc&api_key=${APIKEY}&page=${this.page}`
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
        getLatestMovies() {
            //https://api.themoviedb.org/3/movie/latest?api_key=<<api_key>>&language=en-US
            const URL = `${this.apiBaseURL}/genre/movie/list${this.apiConfig}`
            fetch(URL)
                .then(response => response.json())
                .then( /* ({ results, page, total_pages }) */ data => {
                    console.log(data)
                        /* this.page = page
                        this.total_pages = total_pages
                        this.movies = results.map(m => {
                            m.like = false
                            return m
                        }) */
                })
        },
        onInput() {
            if (Object.keys(this.searchMovies).length == 0) {
                this.numPagination = this.paginationMovies
                this.paginationSearchMovies = 5
            } else {
                this.numPagination = this.paginationSearchMovies
            }

        },
        setPage(page) {
            this.page = page
            this.getPopularMovies()
                //this.getLatestMovies()
        },
        ...Vuex.mapMutations({ //Esto sirve para usar solo la variable favMovies directamente en ves de estar llamandolo con $store.state, El MUTATIONS tiene que ir en los metodos
            storeFavoritas: 'toggleFavMovie'
        })
    },
    mounted() {
        this.start()
    },
})