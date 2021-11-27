<template>
    <main class="form-signin">
        
             <h1 class="">Expenses</h1>

    <div id="app">
      <div v-for="(item) in transaction" :key="item.id">
           
        {{item.id}}
        {{item.description}}
         {{item.date}}
         {{item.type}}
         {{item.amount}}
     
      </div>    
    </div>
       
<div class="nav">
    <router-link to="/login"> addpayment </router-link>
</div>
</main>
</template>

<script>
import endpoint_res from '../resource/endpointresouce';
import Cookie from 'js-cookie';

export default {
    name: 'Expenses',
    data(){return {
                  transaction: "valor",
                  };
    },
    methods: {
      gettransactions(){ 
         const token = Cookie.get('bank_token');
       
      
        fetch( endpoint_res.EXPENSES_ENDPOINT, { 
          method:'GET',
           headers: {
              'Content-Type':'application/json' ,
              'Access':'application/json',
              'Authorization' :'Bearer '+token
            }
            
        })
        .then(response => response.json())
        .then(res => {
          this.transaction = res.data;
          console.log(this.transaction);
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
