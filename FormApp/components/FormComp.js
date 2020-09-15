Vue.component('form2-app', {
    template: `
        <div class="principal-container container">
            <form @submit.prevent>
                <div class="form-group">
                    <label for="inputName">Name</label>
                    <input type="text" class="form-control" id="inputName" ref="inputName" placeholder="Your name..." v-model="name">
                </div>

                <div class="form-group">
                    <label for="inputEmail">Email</label>
                    <input type="email" class="form-control" id="inputEmail" ref="inputEmail" placeholder="jhondoe@gmail.com" v-model="email">
                </div>
                <div class="form-group">
                    <label for="exampleFormControlSelect1">Team Member</label>
                    <select class="form-control" id="exampleFormControlSelect1" v-model="team_member">
                    <option>John Doe</option>
                    <option>Sarah Reymond</option>
                    <option>Vladimir Hoffman</option>
                    </select>
                </div>
                
                <div class="my-3">
                    Frameworks <br class="my-3">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inputRadio" id="inputRadio1" value="Angular JS" v-model="radioOption">
                        <label class="form-check-label" for="inputRadio1">Angular JS</label>
                    </div>

                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inputRadio" id="inputRadio2" value="React JS" v-model="radioOption">
                        <label class="form-check-label" for="inputRadio2">React JS</label>
                    </div>

                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="inputRadio" id="inputRadio3" value="Vue JS" v-model="radioOption">
                        <label class="form-check-label" for="inputRadio3">Vue JS</label>
                    </div>
                </div>

                <div class="my-3">
                    Features <br class="my-3">
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" name="inputCheck" id="inputCheck1" value="Reactivity" v-model="checkOption" :checked="checkAllOption">
                        <label class="form-check-label" for="inputCheck1">Reactivity</label>
                    </div>

                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" name="inputCheck" id="inputCheck2" value="Encapsulation" v-model="checkOption" :checked="!checkAllOption">
                        <label class="form-check-label" for="inputCheck2">Encapsulation</label>
                    </div>

                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" name="inputCheck" id="inputCheck3" value="Data Binding" v-model="checkOption" :checked="!checkAllOption">
                        <label class="form-check-label" for="inputCheck3">Data Binding</label>
                    </div>

                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="checkbox" name="inputCheck" id="inputCheck4" value="Check All" v-model="checkAllOption">
                        <label class="form-check-label" for="inputCheck4">Check All</label>
                    </div>
                </div>

                <div class="form-group my-3">
                    <div class="d-flex justify-content-between"> 
                        <label for="textArea1">Message with Counter</label>
                        <span>{{ letterCounter }} / 255</span>
                    </div>
                    <textarea v-model="message" class="form-control my-1" id="textArea1" rows="3" maxlength="255" v-on:keyup="countChar()"></textarea>
                </div>    
                
                <div class="d-flex justify-content-center" >                
                    <button class="btn btn-primary" @click="createJson()">Submit</button>
                </div>
            </form>
        </div>
    `,
    data() {
        return {
            name: '',
            email: '',
            team_member: '',
            radioOption: '',
            checkOption: [],
            checkAllOption: false,
            letterCounter: 0,
            message: '',
        }
    },
    methods: {
        valdateForm() {
            if (this.name == '' || this.email == '') {
                alert('No dejar campos vacios')
            } else if (this.team_member == '') {
                alert('Seleccionar a un miembro de equipo')
            } else if (this.radioOption == '') {
                alert('Seleccionar a un framework a usar')
            } else if (this.checkOption.length == 0) {
                alert('Seleccionar al menos una caracteristica')
            } else if (this.message == '') {
                alert('No dejar el campo de mensaje vacio')
            } else {
                return true
            }
            return false
        },
        createJson() {
            let validate = this.valdateForm()
            if (validate) {
                var obj = new Object();
                obj.name = this.name
                obj.email = this.email
                obj.team_member = this.team_member
                obj.framework = this.radioOption
                obj.features = this.checkOption
                obj.message = this.message
                console.log(obj)                
            }
        },
        countChar() {
            this.letterCounter = this.message.length
            if (this.letterCounter == 255) {
                return false
            }
        },

    },
})