<template>
    <main class="form-signin">
        
             <h1 class="">Home</h1>

    <div id="app">
      <div v-for="(item) in tickets" :key="item.id">
           
        {{item.id}}
        {{item.description}}
         {{item.date}}
         {{item.type}}
         {{item.amount}}
     
      </div>    
    </div>
       

</main>
</template>

<script>
import endpoint_res from '../resource/endpointresouce';
import Cookie from 'js-cookie';

export default {
    name: 'Home',
    data(){return {
                  tickets: "valor",
                  };
    },
    methods: {
      gettransactions(){ 
         const token = Cookie.get('bank_token');
    
        fetch( endpoint_res.TRANSACTION_ENDPOINT, { 
          method:'GET',
           headers: {
              'Content-Type':'application/json' ,
              'Access':'application/json',
              'Authorization' :'Bearer '+token
            }
            
        })
        .then(response => response.json())
        .then(res => {
          this.tickets = res.data;
          console.log(this.tickets);
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
