
<template>
    <div>
        <h1>Payment</h1>
        <form @submit.stop.prevent="submit"  method="post" enctype="multipart/form-data">
            <div class="form-group">
                <input v-model="amount" 
                class="form-control title" type="number" name="amount" placeholder="Amount" >
            </div>
            <div class="form-group">
                <input v-model="description"
                class="form-control title" type="text" name="description" placeholder="Description" >
            </div>
            <div class="form-group">
                <datetime v-model="date"></datetime>
            </div>
            <button class="btn btn-primary" type="submit">ADD PURCHASE</button>
        </form>
    </div>
</template>
<style>
img {
    width: 30%;
    margin: auto;
    display: block;
    margin-bottom: 10px;
}
</style>
<script>
//import { Datetime } from 'vue-datetime';
import endpoint_res from '../resource/endpointresouce';
import Cookie from 'js-cookie';



    export default{
         name: 'Payment',
        data(){
            return{
                date:Date.now(),
                amount:"",
                description:""             
            }
        },
        methods: {
         submit(){ 
                const paymentdata = {amount: this.amount, description: this.description, date:this.date };
                const token = Cookie.get('bank_token');
                   fetch( endpoint_res.PAYMENT_ENDPOINT, { 
          method:'POST',
           headers: {
              'Content-Type':'application/json' ,
              'Access':'application/json',
              'Authorization' :'Bearer '+token
            },
            body: JSON.stringify(paymentdata)
        })
        .then(response => response.json())
        .then( res => { 
         // this.$router.push({path: '/login', });
          console.log(res) ;  
          } ); 
         }
        }
        
    }
</script>