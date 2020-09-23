let SearchComp = {
    template: `
        <div>
            <nav  class="navbar navbar-expand-lg navbar navbar-dark bg-dark m-0 p-0" :class="{
                'fixed-top': valorReturn
            }">
                <div class="container">
                    <a class="navbar-brand">
                        <img class="m-0 p-1" src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="Movies.logo" height="50">
                    </a>                      
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item">
                                <a class="nav-link">
                                    <router-link :to="{name: 'home'}">Home</router-link>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Link</a>
                            </li>                        
                        </ul>
                        <form @submit.prevent="search" class="form-inline my-2 my-lg-0 ml-5">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" v-model="query">
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav> 
            <!-- Search form 
            <form @submit.prevent="search" class="form-inline md-form form-sm mt-0">
                <div class="input-group md-form form-sm form-2 pl-0 w-100">
                    <div v-show="query" class="input-group-append">
                        <span @click="resetSearch" class="btn btn-danger" id="basic-text1">
                            <i class="fas fa-times"></i>
                        </span>
                    </div>
                    <input class="form-control my-0 py-1 green-border"
                        type="text"
                        placeholder="Buscar"
                        aria-label="Buscar" v-model="query">
                    <div class="input-group-append">
                        <button class="input-group-text green">
                            <i class="fas fa-search text-grey"
                            aria-hidden="true">
                            </i>
                        </button>
                    </div>
                </div>
            </form> -->
        </div>
    `,
    data() {
        return {
            query: '',
            page: 1,
            valorReturn: false,
        }
    },
    methods: {
        scrollDirection() {
            var lastScrollTop = 0;
            $(window).scroll(function(event) {
                var st = $(this).scrollTop();
                if (st > lastScrollTop) {
                    console.log('bajando')
                    this.valorReturn = false
                } else {
                    console.log('subiendo')
                    this.valorReturn = true
                }
                lastScrollTop = st;
            });
        },
        search() {
            let URL = `${BASEURL}/search/movie?api_key=${APIKEY}&language=es-ES&query=${this.query}&page=${this.page}`
            fetch(URL)
                .then(res => res.json())
                .then(data => {
                    this.$emit('input', data)
                })
        },
        setPage(page) {
            this.page = page
            this.search()
        },
        resetSearch() {
            this.query = ''
            this.page = 1
            this.$emit('input', {})
        }
    },
    mounted() {
        this.scrollDirection()
    },
}