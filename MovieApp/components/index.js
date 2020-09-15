const MovieApp = Vue.component('movie-app', {
    template: `
        <div class="container">
            <h5>Bienvenido {{ user.name }} {{ user.lastName }}</h5>
            <SearchComp ref="searchComp" v-model="searchMovies" />
            <div v-show="! Object.keys(searchMovies).length">
                <h1>Peliculas App {{ $store.state.count }}</h1>                
                <!-- <button @click="$store.commit('increment')">+</button> -->
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-4 py-3" v-for="(movie, key) in movies" 
                    :key="key">
                        <MovieComp
                        :id="movie.id"
                        :title="movie.title"
                        :synopsis="movie.overview"
                        :cover="movie.poster_path"
                        :like="movie.like"
                        @toggleLike="onToggleLike"
                        />
                    </div>                
                </div>
                
                <div class="row">
                    <button @click="setPage(n)" class="btn m-1" :class="{
                        'btn-light': n != page,
                        'btn-primary': n == page
                    }" v-for="(n, index) in total_pages" :key="index" @click="setPage(n)">{{ n }}</button>
                </div> 
            </div>

            <div v-show="Object.keys(searchMovies).length">
                <h1>Resultados de Busqueda</h1>
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-4 py-3" v-for="(movie, key) in searchMovies.results" 
                    :key="key"
                    v-if="movie.poster_path">
                        <MovieComp
                        :id="movie.id"
                        :title="movie.title"
                        :synopsis="movie.overview"
                        :cover="movie.poster_path"
                        :like="movie.like"
                        @toggleLike="onToggleLike"
                        />
                    </div>                
                </div>
                <div class="row">
                    <button @click="$refs.searchComp.setPage(n)" class="btn m-1" :class="{
                        'btn-light': n != searchMovies.page,
                        'btn-primary': n == searchMovies.page
                    }" v-for="(n, index) in searchMovies.total_pages" :key="index">{{ n }}</button>
                </div>
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
        }) 
    },
    methods: {
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
                    console.log(page, total_pages)
                    this.total_pages = total_pages
                    this.movies = results.map(m => {                        
                        m.like = false
                        return m
                    })
                })
        },
        setPage (page) {
            this.page = page
            this.getPopularMovies()
        },
        ...Vuex.mapMutations({ //Esto sirve para usar solo la variable favMovies directamente en ves de estar llamandolo con $store.state, El MUTATIONS tiene que ir en los metodos
            storeFavoritas: 'toggleFavMovie'
        })
    },
    mounted() {
        let locationURL = new URL(window.location.href)
        this.page = locationURL.searchParams.get('page') || 1
        this.getPopularMovies()
    },
})