<template>
  <main>
    <div class="bnb-total-amount" style="flex-direction: column">
      <h3 class="mx-auto">CHECKS DETAIL</h3>
    </div>

    <div id="app">
      <div class="check-detail">
        <label class="mdi mdi-tag-facese"> &nbsp;&nbsp;Custumer</label>
      </div>
      <div class="check-detail">&nbsp;&nbsp; &nbsp;&nbsp;{{ user.name }}</div>

      <div class="check-detail">
        <label class="mdi mdi-email"> &nbsp;&nbsp;Email</label>
      </div>
      <div class="check-detail">&nbsp;&nbsp; &nbsp;&nbsp;{{ user.email }}</div>

      <div class="check-detail">
        <label class="mdi mdi-human"> &nbsp;&nbsp;Account</label>
      </div>
      <div class="check-detail">
        &nbsp;&nbsp; &nbsp;&nbsp;00001-00{{ user.ID }}
      </div>

      <div class="check-detail">
        <label class="mdi mdi-cash-multiple"
          >&nbsp;&nbsp; Reported Amount</label
        >
      </div>
      <div class="check-detail">
        &nbsp;&nbsp; &nbsp;&nbsp;{{ transaction.amount }}
      </div>

      <img v-bind:src="`${transaction.imgurl}`" />
    </div>



    <div class="mx-auto">
      <v-btn  @click="reject" 
       
       class="ma-3" color="primary" dark>
        
        <v-icon dark> mdi-close-circle </v-icon>
        &nbsp;&nbsp;REJECT &nbsp;&nbsp;
      </v-btn>

      <v-btn @click="accpet"
       
       class="ma-3" color="primary" dark>
        <v-icon light> mdi-check </v-icon>
         &nbsp;&nbsp;ACCEPT &nbsp;&nbsp;
      </v-btn>
    </div>
  </main>
</template>

<script>
import endpoint_res from "../../resource/endpointresouce";
import Cookie from "js-cookie";

export default {
  name: "DepositApprove",
  data() {
    return {
      transaction: "",
      approved: "",
      user: "",
    };
  },
  methods: {
    gettransactions() {
      const token = Cookie.get("bank_token");

      fetch(endpoint_res.TRANSACTION_BY_ID_ENDPOINT + this.$route.params.id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Access: "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          this.transaction = res.transaction;
          this.transaction.imgurl =
            endpoint_res.BASE_SERVER + this.transaction.imgurl;
          this.user = res.user;
          console.log(this.transaction);
        });

      this.getuser();
    },

    submit() {
      const approvedata = {
        transaction: this.transaction,
        approved: this.approved,
      };
      const token = Cookie.get("bank_token");
      fetch(endpoint_res.TRANSACTION_APPROVE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Access: "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(approvedata),
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
        });
    },
    accpet() {
      this.transaction = this.$route.params.id;
      this.approved = "Y";
      this.submit();
      this.$router.push({ path: "/checkscontrol" });
    },
    reject() {
      this.transaction = this.$route.params.id;
      this.approved = "N";
      this.submit();
      this.$router.push({ path: "/checkscontrol" });
    },
  },

  async mounted() {
    await this.gettransactions();
  },
};
</script>

<style>
.check-detail {
  color: rgba(39, 153, 251, 255);
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
