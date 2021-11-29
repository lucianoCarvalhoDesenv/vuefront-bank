<template>
  <main>
    <div class="bnb-total-amount" style="flex-direction: column ;">
      <div><p>Current Balance</p></div>
      <div>
        <h1>${{ parseFloat($v.form.balance.$model).toFixed(2) }}</h1>
      </div>
    </div>
    <b-form @submit.stop.prevent="submit">
      <div class="form-floating no-border">
        <b-form-input
          v-model.trim="$v.form.amount.$model"
          :state="getValidation('amount')"
          type="text"
          class="form-control no-border"
          id="floatingInput"
          placeholder="Amount"
          style="color: #2799fb !important"
        >
        </b-form-input>
        <hr class="solid no-border" />

        <label class="mdi mdi-cash-multiple" for="floatingInput">
          &nbsp;&nbsp; Amount</label
        >
      </div>

      <div style="margin-bottom: 30px"></div>

      <div class="form-floating no-border">
        <b-form-input
          v-model.trim="$v.form.description.$model"
          :state="getValidation('description')"
          type="text"
          class="form-control no-border"
          id="floatingDescription"
          placeholder="Description"
          style="color: #2799fb !important"
        >
        </b-form-input>
        <hr class="solid no-border" />
        <label class="mdi mdi-star-outline" for="floatingDescription"
          >&nbsp;&nbsp; Description</label
        >
      </div>

      <div style="margin-bottom: 30px"></div>

      <div class="form-floating no-border">
        <b-form-input
          v-model.trim="$v.form.date.$model"
          :state="getValidation('description')"
          type="text"
          class="form-control no-border"
          id="floatingDate"
          placeholder="Description"
          style="color: #2799fb !important"
        >
        </b-form-input>
        <hr class="solid no-border" />
        <label class="mdi mdi-calendar-today" for="floatingDate">
          &nbsp;&nbsp;date</label
        >
      </div>

      <div style="margin-bottom: 30px"></div>

      <button class="btn btn-primary" type="submit"
      style="
      margin-left: 7%;
      margin-right: -7%;
      width:86% "
      >
        &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;  ADD PURCHASE&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; </button>
    </b-form>
  </main>
</template>

<script>
import Cookie from "js-cookie";
import endpoint_res from "../resource/endpointresouce";
import { required, minLength, helpers } from "vuelidate/lib/validators";
import { VMoney } from "v-money";

const regnum = helpers.regex("regnum", /^[0-9]*\.[0-9]{2}$/);

export default {
    name: "DepositMaker",
  data() {
    return {
      form: {
        amount: "",
        description: "",
        balance: "",
        date: new Date().toLocaleString("en-US"),
      },
    };
  },
  directives: { money: VMoney },

  validations: {
    form: {
      amount: {
        regnum,
      },

      description: {
        required,
        minLength: minLength(3),
      },

      date: {},
      balance: 0,
    },
  },

  methods: {
    getValidation(field) {
      if (this.$v.form.$dirty === false) {
        return null;
      }
      return !this.$v.form[field].$error;
    },

    submit() {
      this.$v.$touch();
      if (this.$v.$error) {
        console.log(this.$v.$error);
        return;
      }
      const paymentdata = {
        amount: this.$v.form.amount.$model,
        description: this.$v.form.description.$model,
        date: this.date,
      };
      console.log(paymentdata);
      const token = Cookie.get("bank_token");
      fetch(endpoint_res.PAYMENT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Access: "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(paymentdata),
      })
        .then((response) => response.json())
        .then((res) => {
           this.$swal.fire({
              icon: 'success',
            });
          console.log(res);
          this.$router.push({ path: "/home" });
        })
        .catch((error) => {
          console.log(error);
           this.$swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error,
            });
          this.$router.push({ path: "/login" });
        });
    },

    getbalance() {
      const token = Cookie.get("bank_token");

      fetch(endpoint_res.BALANCE_ENDPOINT, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Access: "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          this.$v.form.balance.$model =  parseFloat(res.balance).toFixed(2) ;
          console.log(res.balance);
        })
        .catch((error) => {
          console.log(error);
           this.$swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error,
            });
          //alert("Unauthorized!");
          //this.$router.push({ path: "/login" });
        });
    },

   

    register() {},
  },

   mounted() {  
      this.getbalance();
    },
};
</script>

<style>
.no-border {
  border-style: none !important;
  margin: 0px;
  color: #2799fb;
  text-emphasis-color: #2799fb;
}

.icon {
  width: 30px;
  height: 30px;
  background: mdi-plus;
}
</style>
