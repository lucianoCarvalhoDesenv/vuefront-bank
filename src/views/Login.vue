<template>

   <main class="">
    <div class="bnb-header">
      <div><h1>BNB Bank</h1></div>
    </div>
     
  <b-form @submit.stop.prevent="submit"
  class="form-signin login-width">
 

      

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

    


    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
      <div style="margin-top:50px;
      justify-text: center;
  align-items: center;">

    <router-link to="/register">   [  ]->   or create an account </router-link>
    </div>
  </b-form>


</main>
</template>

<script>
import Cookie from 'js-cookie';
import endpoint_res from '../resource/endpointresouce';
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      form: {
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
        const logindata = {email: this.$v.form.email.$model, password: this.$v.form.password.$model };
        console.log(logindata);
        fetch( endpoint_res.LOGIN_ENDPOINT, { 
          method:'POST',
           headers: {
              'Content-Type':'application/json' ,
              'Access':'application/json',
            },
            body: JSON.stringify(logindata)
        })
        .then(response => response.json())
        .then( res => { 
                Cookie.set('bank_token', res.access_token);
                console.log(res.access_token);
                if(res.user.type == 'customer'){
                      this.$router.push({path: '/home', });} 
                else if (res.user.type == 'admin'){ 
                  this.$router.push({path: '/checkscontrol', });}
                }
              );
                
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
