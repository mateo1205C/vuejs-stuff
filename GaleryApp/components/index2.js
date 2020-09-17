Vue.component('galery-app', {
    template: `
        <div class="positionContainer">
            <div class="mini-container">                    
                <div>
                    <img id="image" :src="source" alt="">
                </div>
                <div class="py-3 d-flex justify-content-between">
                    <button class="btn btn-primary" @click="prev()" :class="{
                        'btn-disabled' : !btnStateLeft
                    }">Anterior</button>
                    <button class="btn btn-success" @click="start()">Iniciar</button>
                    <button class="btn btn-primary" @click="next()" :class="{
                        'btn-disabled' : !btnStateRigth
                    }">Siguiente</button>
                </div>
            </div>    
        </div>
    `,
    data() {
        return {
            imgArray: [],
            imgArray5: [],
            position: 0,
            source: '',
            btnStateLeft: false,
            btnStateRigth: true,
            showModal: false            
        }
    },
    mounted() {
        this.start()
    },
    methods: {
        start() {
            for (let i = 0; i < 10; i++) {
                this.imgArray[i] = new Image();
                this.imgArray[i].src = "img/" + (i + 1) + ".jpg";
            }
            var arrayNums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            var randomNums = [];
            i = arrayNums.length;
            j = 0;
            while (i--) {
                j = Math.floor(Math.random() * (i + 1));
                randomNums.push(arrayNums[j]);
                arrayNums.splice(j, 1);
            }
            for (var n = 0; n < 5; n++) {
                this.imgArray5[n] = randomNums[n];
            }      
            this.btnStateLeft = false
            this.btnStateRigth = true
            this.position = 0
            this.source = this.imgArray[this.imgArray5[this.position]].src
        },
        next() {
            if (this.position < 4) {
                this.btnStateLeft = true               
                this.position++;
                this.source = this.imgArray[this.imgArray5[this.position]].src
            }
            if (this.position == 4) {
                this.btnStateRigth = false
            }
        },
        prev() {
            if (this.position > 0) {
                this.btnStateRigth = true
                this.position--;
                this.source = this.imgArray[this.imgArray5[this.position]].src
            }
            if (this.position == 0) {
                this.btnStateLeft = false
            }
        }
    },
})