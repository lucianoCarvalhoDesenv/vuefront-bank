<template>
    <main class="form-signin">
    <h1 class="text-primary">Balance</h1>  
    <h2 class="text-primary">USD${{balance}}</h2>

    
 
       

</main>
</template>

<script>
import endpoint_res from '../resource/endpointresouce';
import Cookie from 'js-cookie';

export default {
    name: 'Balance',
    data(){return {
                  balance: "",
                  };
    },
    methods: {
      gettransactions(){ 
         const token = Cookie.get('bank_token');    
        fetch( endpoint_res.BALANCE_ENDPOINT, { 
          method:'GET',
           headers: {
              'Content-Type':'application/json' ,
              'Access':'application/json',
              'Authorization' :'Bearer '+token
            }
            
        })
        .then(response => response.json())
        .then(res => {
          this.balance = res.balance;
          console.log(this.balance);
        }).catch(error => {
                console.log(error);
                 this.$swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error,
            });
                
                this.$router.push({path: '/login', }); 
              });
      },
  
      
    },
    
    beforeMount(){
      this.gettransactions();
     },
}; 

</script>



<style>
   .form-signin {
  width: 100%;
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
