<template>
  <main>
    <div class="bnb-total-amount">
      <div>
        <div><p>Current Balance</p></div>
        <div><h1>${{balance.toFixed(2)}}</h1></div>
      </div>
      <div class="action-button">
        <div>November, 2021</div>
      </div>
    </div>

    <div class="bnb-total-expense">
      <div>
        <div><p>Incomes</p></div>
        <div><h3>${{incomes.toFixed(2)}}</h3></div>
      </div>
      <div class="action-button">
        <v-icon style="color: rgba(39, 153, 251, 255)">mdi-plus</v-icon>
         <router-link to="/depositadd">Deposit a check </router-link>
      </div>
    </div>
    <div class="bnb-total-income">
      <div>
        <div><p>Expenses</p></div>
        <div><h3>${{expenses.toFixed(2)}}</h3></div>
      </div>
      <div class="action-button">
        <v-icon style="color: rgba(39, 153, 251, 255)">mdi-plus</v-icon>

        <router-link to="/payment">Purchase</router-link>
      </div>
    </div>


    


    <div id="app">
      <div class="my-3 p-3 bg-body rounded shadow-sm">
        <div
          v-for="item in transactions"
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
                  item.amount.toFixed(2)
                }}
              </div>
            </div>
            <span class="d-block text-primary date-text">{{ item.date }}</span>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import endpoint_res from "../resource/endpointresouce";
import Cookie from "js-cookie";

export default {
  name: "Home",
  data() {
    return {
      transactions: "valor",
      balance: "",
      incomes: 0,
      expenses: 0,
      today: new Date().toLocaleString("en-US"),
    };
  },

  methods: {
    gettransactions() {
      const token = Cookie.get("bank_token");

      fetch(endpoint_res.TRANSACTION_ENDPOINT, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Access: "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((res) => {
          this.transactions = res.data;
          this.balance =
            this.transactions[this.transactions.length - 1].balance_after;
          this.transactions.forEach((item) => {
            if (item.type == "P") this.expenses += item.amount;
            else if (item.type == "D") this.incomes += item.amount;
          });
          console.log(this.balance, this.expenses, this.incomes);
        }) /*.catch(error => {
                console.log(error);
                alert("Unauthorized!");
                this.$router.push({path: '/login', }); 
              })*/;
    },
  },
  getclass(property) {
    console.log("PROP>>>", property);
    const retorno = property.type === "P" ? "payment" : "deposit";
    return retorno;
  },

  beforeMount() {
    this.gettransactions();
  },
};
</script>

<style>
.balance {
  display: flex;
  flex-direction: column;
  justify-content: left;
  padding-left: 20px;
  font-family: 20px;
  background-color: #2799fb;
  color: #ffffff;
}
.amount-text {
  font-size: 5px !important;
  font-weight: bold;
}
.desc-text {
  font-size: 15px !important;
  font-weight: bold;
}
.date-text {
  font-size: 11px !important;
}
.plus {
  font-size: 24px;
}
.payment {
  color: rgb(238, 77, 77) !important;
}
.deposit {
  color: rgb(77, 179, 238) !important;
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

.bnb-total-amount {
  display: flex;
  justify-content: space-between;
  font-family: 20px;
  padding: 10px;
  padding-top: 20px;
  background-color: rgba(189, 224, 254, 255);
  color: #ffffff;
}

.bnb-total-expense {
  display: flex;
  justify-content: space-between;
  font-family: 20px;
  padding: 10px;
  padding-top: 20px;
  background-color: rgba(218, 239, 255, 255);
  color: rgba(39, 153, 251, 255);
}

.bnb-total-income {
  display: flex;
  justify-content: space-between;
  font-family: 20px;
  padding: 10px;
  padding-top: 20px;
  background-color: rgba(241, 249, 254, 255);
  color: rgba(39, 153, 251, 255);
  margin-bottom: 10px;
  font-weight: bold;
}

.bnb-total-amount p,
h1,
h2 {
  margin: 0;
}
.bnb-total-expense p,
h1,
h2 {
  margin: 0;
}
.bnb-total-income p,
h1,
h2 {
  margin: 0;
}

.action-button {
  display: flex;
  flex-direction: column;
  min-width: 150px;
  width: auto;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
</style>
