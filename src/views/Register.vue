<template>
    <main class="form-signin">
        <div class="bnb-logo">
             <h1 class="">BNB</h1>
        </div>
  <form @submit.stop.prevent="submit">
    <div class="form-floating">
      <input v-model="name" 
      type="text" class="form-control" id="username" placeholder="name@example.com">
      <label for="floatingInput">Username</label>
    </div>
    <div class="form-floating ">
      <input v-model="email" 
      type="email" class="form-control" id="email" placeholder="name@example.com">
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating ">
      <input v-model="password" 
      type="password" class="form-control" id="Password" placeholder="Password">
      <label for="floatingPassword">Password</label>
    </div>


    <button class="w-100 btn btn-lg btn-primary" type="submit">SIGN UP</button>
  
  </form>
<div class="nav">
    <router-link to="/login"> Already have an account? </router-link>
</div>
    
</main>
</template>

<script>
import endpoint_res from '../resource/endpointresouce';

export default {
    name: 'Register',
    data(){return {
                  name:'',
                  email:'',
                  password:'',
                  password_confirmation:'',
                  };
    },
    methods: {
      submit(){ 
        const logindata = {name:this.name, email: this.email, password: this.password , password_confirmation:this.password};

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
                alert(res.message); 
                this.$router.push({path: '/login', });                
            }
            else
            {
                alert("Error: "+res);
            }

          });
      },
  
      
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
