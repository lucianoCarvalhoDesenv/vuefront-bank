<template>
<div id="app">
  <v-app id="inspire">    
      <div class="header-menu-bnb">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> 
        <h4 class="mx-auto"
        style=" color:#FFF;"
      >
        BNB Bank</h4> 
      </div>
         <v-navigation-drawer
         class="side-menu"
         
        v-model="drawer"
        absolute
        top
        temporary
      >
          <v-list
            nav
          dense
          >
        
             <div class="bnb-header menu-header rounded-pill">
      <div><h1>BNB Bank</h1></div>
    </div>
          <v-list-item @click="logout" link>       
                  <v-list-item-icon> <v-icon>mdi-view-dashboard</v-icon> </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title >  
                      <router-link style="color:#FFF;"
                       class="menu-link" to="/home">  Logout  </router-link></v-list-item-title>  </v-list-item-content>
              </v-list-item> 

            <v-list-item  @click="navto('home')" link>       
                  <v-list-item-icon> <v-icon>mdi-bank</v-icon> </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title >  
                      <router-link style="color:#FFF;"
                       class="menu-link" to="/home">  Home  </router-link></v-list-item-title>  </v-list-item-content>
              </v-list-item>

                <v-list-item @click="navto('incomes')" link>       
                  <v-list-item-icon> <v-icon>mdi-debug-step-out</v-icon> </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title >  
                      <router-link style="color:#FFF;"
                      class="menu-link" to="/incomes">  Incomes  </router-link></v-list-item-title>  </v-list-item-content>
              </v-list-item>

                 <v-list-item @click="navto('expenses')" link>       
                  <v-list-item-icon> <v-icon>mdi-debug-step-into</v-icon> </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title >  
                      <router-link style="color:#FFF;"
                      class="menu-link" to="/expenses">  Expenses  </router-link></v-list-item-title>  </v-list-item-content>
              </v-list-item>

               <v-list-item @click="navto('mychecks')" link>       
                  <v-list-item-icon> <v-icon> mdi-camera-switch </v-icon> </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title >  
                      <router-link style="color:#FFF;"
                      class="menu-link" to="/mychecks">  Checks  </router-link></v-list-item-title>  </v-list-item-content>
              </v-list-item>

              <v-list-item @click="navto('depositadd')" link>       
                  <v-list-item-icon> <v-icon>mdi-cash-multiple</v-icon> </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title >  
                      <router-link style="color:#FFF;"
                      class="menu-link" to="/depositadd">  Make Deposit  </router-link></v-list-item-title>  </v-list-item-content>
              </v-list-item>

               <v-list-item @click="navto('payment')" link>       
                  <v-list-item-icon> <v-icon>mdi-weight</v-icon> </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title >  
                      <router-link style="color:#FFF;" 
                      class="menu-link" to="/payment">  Payment  </router-link></v-list-item-title>  </v-list-item-content>
              </v-list-item>

          </v-list>
        </v-navigation-drawer>
  <div>
 <v-main>
              <router-view/>
              </v-main>

  </div>
 
  </v-app>
</div>

</template>

<script>
import Cookie from 'js-cookie';

export default {
  
  name: 'App',

   data: () => ({
    drawer: false,
    group: null,
  }),

   methods: {
      logout(){ 
          Cookie.remove('bank_token');
         this.$router.push({ path: "/login" });
         },
       
      navto(path){this.$router.push({ path: "/"+path });}      
   },

  watch: {
    group () {
      this.drawer = false
    },
  },
};
</script>

<style>
.menu-header{
  background-color: rgba(189, 224, 254, 255) !important ;
}
.side-menu{
  background-color: rgb(38, 150, 241) !important ;
  color: #FFF !important ;
}
.header-menu-bnb{
  display: flex;
  height: 60px;
  align-items: center;
  flex-direction: row;
  padding: 10px;
   background-color: #2799fb;
  
}


</style>
