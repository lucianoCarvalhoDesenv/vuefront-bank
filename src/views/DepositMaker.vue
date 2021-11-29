<template>
  <main>
    <div class="bnb-total-amount" style="flex-direction: column">
      <div><p>Current Balance</p></div>
      <div>
        <h1>${{ $v.form.balance.$model }}</h1>
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

      <div style="margin-bottom: 30px">
        <label style="color: #2799fb; font-size: 12px"
          >*The money will be deposited in your account once the check is
          accepted
        </label>
      </div>

      <div class="form-floating no-border"
      style="margin-bottom: 30px">
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

      <div class="form-group">
        <div v-if="!$v.form.image.$model">
        </div>
        <div v-else>
          <div class=".upload-img-dashed-border">
          <img  :src="$v.form.image.$model" />
          </div>
          <button  class="btn btn-primary"
          style="margin-left: 7%; "
      
           @click="removeImage">&nbsp;&nbsp;Remove Check&nbsp;&nbsp;</button>
        </div>
        <div>
          <label v-if="!$v.form.image.$model" class="mdi mdi-cloud-upload upload-helper label-upload" for="upload-photo">  &nbsp;&nbsp; &nbsp;&nbsp;Upload Image </label>
          <input
            class="upload-photo"
            id="upload-photo"
            name="image"
            type="file"
            @change="onFileChange"
          />
        </div>
      </div>

      <div style="margin-bottom: 30px"></div>

      <button
        class="btn btn-primary"
        type="submit"
        style="margin-left: 7%; margin-right: -7%; width: 86%"
      >
        &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; DEPOSIT CHECK
        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
      </button>
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
  data() {
    return {
      form: {
        amount: "",
        description: "",
        balance: "",
        image: "",
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

      balance: {},
      image: {},
    },
  },

  methods: {
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var reader = new FileReader();
      var vm = this.$v.form;
      reader.onload = (e) => {
        vm.image.$model = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    removeImage: function () {
      this.$v.form.image.$model = "";
    },
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
      const depositdata = {
        amount: this.$v.form.amount.$model,
        description: this.$v.form.description.$model,
        imgurl: this.$v.form.image.$model,
      };
      console.log(depositdata);
      const token = Cookie.get("bank_token");
      fetch(endpoint_res.DEPOSIT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Access: "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(depositdata),
      })
        .then((response) => response.json())
        .then((res) => {
           this.$router.push({path: '/home', });
          console.log(res);
        })
        .catch((error) => {
          console.log("catch works e" + error);
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
          this.$v.form.balance.$model = res.balance;
          console.log(res.balance);
        });
    },
  },

  mounted() {
    this.getbalance();
  },
};
</script>

<style>
.upload-img-dashed-border{
   color: #2799fb;
  border: steelblue;
  border-style: dashed;
}
.label-upload{
  color: #2799fb;
  border: steelblue;
  border-style: dashed;
  margin-left: 5%;
  margin-right: 5%;
  width: 90%;
  height: 20vh;
     display: flex;
   justify-content: center;
   align-items: center;
}
img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
.upload-helper {
  cursor: pointer;
  /* Style as you please, it will become the visible UI component. */
}

.upload-photo {
  opacity: 0;
  position: absolute;
  z-index: -1;
}

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
