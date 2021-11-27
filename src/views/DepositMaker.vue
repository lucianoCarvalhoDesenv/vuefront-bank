<template>
    <div>
        <h1>Deposit</h1>
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
                <div v-if="!image">
                    <h2>Select an image</h2>
                </div>
                <div v-else>
                    <img :src="image"/>
                    <button @click="removeImage">Remove check</button>
                </div>
                <input name="image" type="file" @change="onFileChange">
            </div>
            <button class="btn btn-primary" type="submit">DEPOSIT CHECK</button>
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
import endpoint_res from '../resource/endpointresouce';
import Cookie from 'js-cookie';

    export default{
         name: 'DepositMaker',
        data(){
            return{
                image:"",
                amount:"",
                description:""             
            }
        },
        methods: {
        onFileChange(e) {
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)
        return;
        this.createImage(files[0]);
        },
        createImage(file) {
        var reader = new FileReader();
        var vm = this;
        reader.onload = (e) => {
        vm.image = e.target.result;
        };
        reader.readAsDataURL(file);
        },

        removeImage: function ( ) {
        this.image = '';
        },

         submit(){ 
                const depositdata = {amount: this.amount, description: this.description, imgurl:this.image};
                const token = Cookie.get('bank_token');
                   fetch( endpoint_res.DEPOSIT_ENDPOINT, { 
          method:'POST',
           headers: {
              'Content-Type':'application/json' ,
              'Access':'application/json',
              'Authorization' :'Bearer '+token
            },
            body: JSON.stringify(depositdata)
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