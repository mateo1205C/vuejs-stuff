Vue.component('login-app',{
    template:`
        <div class="positionContainer">
            <div class="mini-container">
                <h2 v-text="infoForm.title" class="text-center text-uppercase mb-4"></h2>            
                <form @submit.prevent>
                    <div class="form-group">
                        <label for="email1">Email address</label>
                        <input type="email" class="form-control" id="email1" v-model="user.email">
                        <small v-text="infoForm.small" id="emailHelp" class="form-text text-muted"></small>
                    </div>
                    <div class="form-group">
                        <label v-text="infoForm.password" for="password1"></label>
                        <input type="password" class="form-control" id="password1" v-model="user.password">
                    </div>
                    <div class="form-group form-check">
                        <input type="checkbox" class="form-check-input" id="check1" v-model="infoForm.stateCheck">
                        <label v-text="infoForm.check" class="form-check-label" for="check1"></label>
                    </div>
                    <div class="d-flex justify-content-center" >                
                        <button v-text="infoForm.button" class="btn btn-primary" @click="createJson()"></button>
                    </div>
            </form>
            </div>
        </div>
    `,
    data() {
        return {
            infoForm: {
                title: 'Sign in',
                email: 'Email address',
                small: 'We will never share your email with anyone else.',
                password:'Password',
                check:'Accept the Conditions',
                button:'Submit',
                stateCheck: false
            },
            user: {
                email:'',
                password: '',
            }
        }
    },
    methods: {
        validateForm () {
            if (this.user.email == '' || this.user.password == '') {
                alert('No dejar campos vacios')
            } else if (this.infoForm.stateCheck == false ) {
                alert('Aceptar las condiciones')
            } else {
                return true
            }
            return false
        },
        createJson () {
            let validate = this.validateForm()
            if (validate) {
                var obj = new Object();                
                obj.email = this.user.email
                obj.password = this.user.password
                console.log(obj)
            }
        },
    },
})