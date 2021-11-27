<template>
    <main class="form-signin">
    <h1 class="h3 mb-3 fw-normal">
build a simplified banking system

the system has 2 types of users

a customer

an admin

customer user stories:

a user can create a new account with username and password

a user starts with 0 balance

a user can deposit more money to his account by uploading a picture of a check and entering the amount of the check. if the check is approved by an admin, the money is added to the bank account.

/**

The picture can be of anything, you don't need to parse it or validate it in any way
*/

to buy something, the user enters the amount and description; a user can only buy something if she has enough money to cover the cost.

a user can see a list of balance changes including time and description.

admin user stories:

an admin account is already created with a hard coded username and password.

an admin can see a list of pending check deposit pictures with amount and picture and click to approve or deny the deposit.

    </h1>

</main>
</template>

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
