<template>
 <main>
   
      <div class="bnb-total-amount" style="flex-direction: column ;">
       <h3 class="mx-auto">Incomes</h3>
    </div>
    


    


    <div id="app">
      <div class="my-3 p-3 bg-body rounded shadow-sm">
        <div
          v-for="item in transaction"
          :key="item.id"
          class="d-flex text-muted pt-3 itemdisp"
        >
          <svg v-if="item.type == 'P'" class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#e83e8c"/><text x="50%" y="50%" fill="#e83e8c" dy=".3em">32x32</text></svg>

  
        
          <svg v-else
            class="bd-placeholder-img flex-shrink-0 me-2 rounded"
            width="32"
            height="32"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder: 32x32"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#007bff" />
            <text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text>
          </svg>

          <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
            <div class="d-flex justify-content-between desc-text">
              <strong class="text-primary"
                > {{ item.description }}</strong
              >
              <div
                v-bind:class="{
                  ' payment': item.type == 'P',
                  deposit: item.type != 'P',
                }"
              >
                {{ item.type === "P" ? "-" : " " }} ${{
                  parseFloat(item.amount).toFixed(2)
                }}
              </div>
            </div>
            <span class="d-block text-primary date-text">{{ item.date }}</span>
          </div>
        </div>
      </div>
    </div>

        <v-card-text style="height: 100px; position: relative">
              <v-fab-transition>
                <v-btn
                @click="addpayment"
                  color="blue"
                  dark
                  absolute
                  top
                  right
                  fab
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-fab-transition>
            </v-card-text>
  </main>

   

</template>


<script>
import endpoint_res from '../resource/endpointresouce';
import Cookie from 'js-cookie';

export default {
    name: 'Incomes',
    data(){return {
                  transaction:"" ,
                  };
    },
    methods: {
      gettransactions(){ 
         const token = Cookie.get('bank_token');
       
      
        fetch( endpoint_res.INCOMES_ENDPOINT, { 
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
      addpayment(){this.$router.push({ path: "/depositadd" });}      
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

.amount-text {
  font-size: 20px !important;
  font-weight: bold;
}
.payment {
  color:rgb(238, 77, 77) !important;
}
.deposit {
  color:rgb(77, 179, 238) !important;
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