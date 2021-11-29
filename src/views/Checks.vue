<template>
  <main >
     <v-card  class="text-center justify-center border-taps">
     <v-tabs fixed-tabs   >
    <v-tab  @click="showAprroved">Approved</v-tab>
    <v-tab  @click="showPending">Pending</v-tab>
    <v-tab  @click="showRejected">Rejected</v-tab>
  </v-tabs>
  </v-card>



    <div id="app">
      <div class="my-3 p-3 bg-body rounded shadow-sm">
        <div
          v-for="item in transactions"
          :key="item.id"
          class="d-flex text-muted pt-3 itemdisp"
        >
          <svg
            v-if="item.approved == 'N'"
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
            <rect width="100%" height="100%" fill="#e83e8c" />
            <text x="50%" y="50%" fill="#e83e8c" dy=".3em">32x32</text>
          </svg>

          <svg
             v-if="item.approved == 'Y'"
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

          <svg
             v-if="item.approved == 'W'"
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
            <rect width="100%" height="100%" fill="#7A8184" />
            <text x="50%" y="50%" fill="#7A8184" dy=".3em">32x32</text>
          </svg>

          <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
            <div class="d-flex justify-content-between desc-text">
              <strong class="text-primary"> {{ item.description }}</strong>
              <div
                v-bind:class="{
                  ' payment': item.type == 'P',
                  deposit: item.type != 'P',
                }"
              >
                {{ item.type === "P" ? "-" : " " }} ${{
                  item.amount.toFixed(2)
                }}
              </div>
            </div>
            <span class="d-block text-primary date-text">{{ item.date }}</span>
          </div>
        </div>
         
    </div>
      </div>
<div style="margin-bottom:70px;"></div>
     
     <v-card-text style="height: 100px; position: relative">
              <v-fab-transition>
                <v-btn
                @click="addcheck"
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
import endpoint_res from "../resource/endpointresouce";
import Cookie from "js-cookie";

export default {
  name: "Checks",
  data() {
    return {
      approved: "",
      pending: "",
      rejected: "",
      transactions:"",
    };
  },
  methods: {
    addcheck(){ this.$router.push({ path: "/depositadd" });},
    showPending(){
      this.transactions= this.pending;
    },
      showRejected(){
      this.transactions= this.rejected;
    },
      showAprroved(){
       this.transactions=this.approved;
    },
    gettransactions() {
      const token = Cookie.get("bank_token");

      fetch(endpoint_res.MY_CHECKS_ENDPOINT, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Access: "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          this.approved = res.approved;
          this.pending = res.pending;
          this.rejected = res.rejected;
          this.transactions=this.approved;
        })
        .catch((error) => {
          console.log(error);
          alert("Unauthorized!");
          this.$router.push({ path: "/login" });
        });
    },
  },


  beforeMount() {
    this.gettransactions();
  },
};
</script>

<style>
.border-taps{
  border-style: none;
  visibility: ;
}
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

.itemdisp {
  display: block !important;
}
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
