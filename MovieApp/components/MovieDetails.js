let MovieDetails = {
    name: 'MovieDetails',
    template: `
        <div v-if="Object.keys(movie).length">
            <div class="heroMovie text-white py-5" :style="{
                'background': 'linear-gradient(rgba(59, 168, 119, 0.45), rgba(59, 168, 119, 1)), url(https://image.tmdb.org/t/p/w1400_and_h450_face'+movie.backdrop_path+')',
                'background-size': 'cover'
            }">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-12 col-md-4 col-lg-3">
                            <img :src="movie.poster_path | coverURL" class="w-100" />
                        </div>
                        <div class="col-1 col-md-8 col-lg-9">
                            <h2>Detalles: {{ movie.title }}</h2>
                            <p v-text="movie.overview"></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="my-2 mx-5">
                    <iframe class="videoMovie " :src="'https://www.youtube.com/embed/'+videoMovie"></iframe>             
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            movie: {},
            videoMovie: {}
        }
    },
    methods: {
        getMovie() {
            fetch(`${this.apiBaseURL}/movie/${this.$route.params.id}${this.apiConfig}`)
                .then(res => res.json())
                .then(data => {
                    //debugger
                    console.log(data.genres[0].name)
                    this.movie = data
                })
        },
        getVideoMovie() {
            const URL = `${this.apiBaseURL}/movie/${this.$route.params.id}/videos${this.apiConfig}`
            fetch(URL)
                .then(res => res.json())
                .then(data => {
                    this.videoMovie = data.results[0].key
                })
        }
    },
    mounted() {
        this.getMovie()
        this.getVideoMovie()
    },
}