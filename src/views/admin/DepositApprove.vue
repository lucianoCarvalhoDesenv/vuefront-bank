<template>
    <main class="form-signin">
        
             <h1 class="">Deposit to Aprrove</h1>

    <div id="app">
   
        {{transaction.id}}
        {{transaction.description}}
         {{transaction.date}}
         {{transaction.type}}
         {{transaction.amount}}
         {{transaction.imgurl}}

         <img v-bind:src="`${transaction.imgurl}`">
        
    </div>

    <div> 
       
    <v-btn @click="reject"
    class="ma-2"
      color="primary"
      dark
    >
     REJECT
    </v-btn>

    <v-btn @click="accpet"
    class="ma-2"
      color="primary"
      dark
    >
     ACCEPT
    </v-btn>

    
    <button @click="reject">REJECT</button>
    <button @click="accpet">ACCEPT</button>
    </div>
       
<div class="nav">
    <router-link to="/login"> addpayment </router-link>
</div>
</main>
</template>

<script>
import endpoint_res from '../../resource/endpointresouce';
import Cookie from 'js-cookie';

export default {
    name: 'DepositApprove',
    data(){return {
                  transaction: "",
                  approved:"",
                  };
    },
    methods: {
      gettransactions(){ 
         const token = Cookie.get('bank_token');
    
        fetch( endpoint_res.TRANSACTION_BY_ID_ENDPOINT + this.$route.params.id, { 
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
          this.transaction.imgurl = endpoint_res.BASE_SERVER+this.transaction.imgurl;
          console.log(this.transaction);
        }); 
      },

      submit(){
        const approvedata = {transaction: this.transaction, approved: this.approved};
        const token = Cookie.get('bank_token');
        fetch( endpoint_res.TRANSACTION_APPROVE_ENDPOINT, { 
          method:'POST',
           headers: {
              'Content-Type':'application/json' ,
              'Access':'application/json',
              'Authorization' :'Bearer '+token
            },
            body: JSON.stringify(approvedata)
        })
        .then(response => response.json())
        .then( res => { 
          console.log(res)});
      },
      accpet(){
          this.transaction =this.$route.params.id;
          this.approved='Y';
          this.submit();
          this.$router.push({path: '/checkscontrol', }); 
      },
      reject(){
          this.transaction =this.$route.params.id;
          this.approved='N';
          this.submit();
          this.$router.push({path: '/checkscontrol', }); 
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
