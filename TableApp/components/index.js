Vue.component('table-app', {
    template: `
        <div class="positionContainer">
            <div class="w-100 d-flex align-items-center flex-column">
                <div class="mini-container overflow-auto mb-5">                        
                    <div class="table-responsive block">
                        <table class="table">
                            <thead class="thead-dark">
                            <tr>
                                <th scope="col"><input type="checkbox"/></th>
                                <th scope="col">Index</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                            </thead>
                            <tbody>
                                <TableBodyComp v-if="PaginationVIF(number)" v-for="(number, key) in 200" 
                                    :key="key"                            
                                    :numberID="number"
                                />
                            </tbody>
                        </table>
                    </div>  
                </div>                        
                <div>                            
                    <nav aria-label="Page navigation example" class="d-flex justify-content-center">
                        <ul class="pagination">
                            <li class="page-item" :class="{'disabled': page == 1}">
                                <a @click="page = page - 1" class="btn d-inline page-link" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <li class="page-item" v-for="(n, index) in pagination" :key="index">
                                <a @click="page = n" class="btn d-inline page-link active" :class="{
                                    'btn-light': n != page,
                                    'btn-primary': n == page
                                }">{{ n }}</a>
                            </li>
                            <li class="page-item" :class="{'disabled': page == pagination}">
                                <a @click="page = page + 1" class="btn d-inline page-link" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>                        
                        </ul>
                    </nav>
                </div>
                <div class="mt-1">
                    <select v-model="numberRows" @change="page = 1">                
                        <option :value="10">10/rows</option>
                        <option :value="20">20/rows</option>
                        <option :value="50">50/rows</option>
                        <option :value="100">100/rows</option>
                    </select> 
                </div>
            </div>            
        </div>
    `,
    components: {
        TableBodyComp,
    },
    data() {
        return {
            numberRows: 10,
            page: 1,
            pagination: 20,
        }
    },
    methods: {
        PaginationVIF(value) {
            for (let i = ((this.page * this.numberRows) - (this.numberRows - 1)); i <= this.page * this.numberRows; i++) {
                if (value == i)
                    return true
            }
        }
    },
    updated() {
        this.pagination = 200 / this.numberRows
    },
})