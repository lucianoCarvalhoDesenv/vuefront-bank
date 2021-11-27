<template>
    <main class="form-signin">
  <b-form @submit.stop.prevent="submit">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

  <b-form-group
            label="E-mail"
            label-for="email"
            >
              <b-form-input
                id="email"
                type="email"
                placeholder="joaosilva@email.com"
                autocomplete="off"
                v-model.trim="$v.form.email.$model"
                :state="getValidation('email')"
              ></b-form-input>
            </b-form-group>

    <div class="form-floating">
      <input v-model="email" 
      type="email" class="form-control rounded-pill" id="floatingInput" placeholder="name@example.com">
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input v-model="password" 
      type="password" class="form-control rounded-pill" id="floatingPassword" placeholder="Password">
      <label for="floatingPassword">Password</label>
    </div>


    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
  </b-form>
</main>
</template>

<script>
import Cookie from 'js-cookie';
import endpoint_res from '../resource/endpointresouce';
import { required, minLength, email } from "vuelidate/lib/validators";
export default {
    name: 'Login',
    data(){return {
                  email:'',
                  password:'',
                  };
    },

      validations: {
    form: {
      email: {
        required,
        email
      },

      password: {
        required,
        minLength: minLength(6)
      },
    }
  },

    methods: {
      submit(){ 
        const logindata = {email: this.email, password: this.password};

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
          console.log(res)});
      },
      getValidation(field) {
      if(this.$v.form.$dirty === false) {
        return null;
      }

      return !this.$v.form[field].$error;
    }
    },
};
</script>

<style>
   .form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

</style>
