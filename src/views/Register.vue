<template>

   <main class="">
    <div class="bnb-header">
      <div><h1>BNB Bank</h1></div>
    </div>
     
  <b-form @submit.stop.prevent="submit"
  class="form-signin login-width">
 

        <div class="form-floating">
      <b-form-input  v-model.trim="$v.form.name.$model"
                :state="getValidation('name')"
                style="margin-bottom:30px;"
                
      type="text"
      class="form-control rounded-pill"
      id="floatingInput"
      placeholder="name@example.com">
      </b-form-input>
      
      <label for="floatingInput" style="color:#2799fb;">Username</label>
    </div>

    <div class="form-floating">
      <b-form-input  v-model.trim="$v.form.email.$model"
                :state="getValidation('email')"
                style="margin-bottom:30px;"
                
      type="email"
      class="form-control rounded-pill"
      id="floatingInput"
      placeholder="name@example.com">
      </b-form-input>
      
      <label for="floatingInput" style="color:#2799fb;">Email address</label>
    </div>

    <div class="form-floating">
        <b-form-input
          v-model.trim="$v.form.password.$model"
                :state="getValidation('password')"
                style="margin-bottom:30px"
      type="password"
       class="form-control rounded-pill" 
       id="floatingPassword" 
       placeholder="Password">
      </b-form-input>
      <label for="floatingPassword"
      style="color:#2799fb;"
      >Password</label>
    </div>

    


    <button class="w-100 btn btn-lg btn-primary" type="submit">SIGN UP</button>
      <div style="margin-top:50px;
      justify-text: center;
  align-items: center;">

     <router-link to="/login"> Already have an account? </router-link>
    </div>
  </b-form>


</main>
</template>

<script>
import endpoint_res from '../resource/endpointresouce';
import { required, minLength, email,helpers } from "vuelidate/lib/validators";

const alphaNumAndDotValidator = helpers.regex('alphaNumAndDot', /^[a-z\d.]*$/i);


export default {
  data() {
    return {
      form: {
        name:"",
        email: "",
        password: ""
      }
    }
  },

  validations: {
    form: {
      email: {
        required,
        email
      },

      password: {
        required,
        minLength: minLength(4)
      },
       name: {
        required,
        minLength: minLength(4),
        alphaNumAndDotValidator
      },

    }
  },

  methods: {
  getValidation(field) {
      if(this.$v.form.$dirty === false) {
        return null;
      }
      return !this.$v.form[field].$error;
    },

     submit(){  
               this.$v.$touch();
              if(this.$v.$error) {
                  return;
                }
        const logindata = {name :this.$v.form.name.$model, email: this.$v.form.email.$model, password: this.$v.form.password.$model, password_confirmation:this.$v.form.password.$model };
        console.log(logindata);
        fetch( endpoint_res.REGISTER_ENDPOINT, { 
          method:'POST',
           headers: {
              'Content-Type':'application/json' ,
              'Access':'application/json',
            },
            body: JSON.stringify(logindata)
        })
        .then(response => response.json())
        .then( res => { 
            if( res.user !== undefined)
            {                
               
                 this.$swal(res.message);
                this.$router.push({path: '/login', });                
            }
          }).catch(error => {
             
            this.$swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error,
            });
                
                console.log(error);
              });
                
      },
    login() {
      this.$v.$touch();
      if(this.$v.$error) {
        return;
      }

      alert("login");
    },

    register() {},

  
  }
}
</script>

<style>
 html,
    body {
      margin: 0;
      height: 100%;
    }

    .bnb-header {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      padding-bottom: 10px;
      height: 100px;
      font-family: 20px;
      background-color: #2799fb;
      color: #ffffff;
    }

.login-width{
max-width: 330px;
}


</style>
