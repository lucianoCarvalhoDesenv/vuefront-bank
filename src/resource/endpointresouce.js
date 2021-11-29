// const baseserver='http://127.0.0.1:8000'
const baseserver='https://turnvoverbnb-bank-api.herokuapp.com'
const baseurl=baseserver+'/api';

const endpoint_res = {
    BASE_API: baseurl,
    BASE_SERVER: baseserver,
    LOGIN_ENDPOINT: baseurl+"/login",
    AUTH_ENDPOINT: baseurl+"/me",
    REGISTER_ENDPOINT: baseurl+"/register",
    TRANSACTION_ENDPOINT: baseurl+"/transaction",
    CHECKS_CONTROL_ENDPOINT: baseurl+"/pendingapproval",
    TRANSACTION_BY_ID_ENDPOINT: baseurl+"/transactionbyid?id=",
    TRANSACTION_APPROVE_ENDPOINT: baseurl+"/approve",
    EXPENSES_ENDPOINT: baseurl+"/expenses",
    INCOMES_ENDPOINT: baseurl+"/incomes",
    MY_CHECKS_ENDPOINT: baseurl+"/mychecks",
    DEPOSIT_ENDPOINT: baseurl+"/deposit",
    PAYMENT_ENDPOINT: baseurl+"/payment",
    BALANCE_ENDPOINT: baseurl+"/balance",
    USER_BY_ID_ENDPOINT: baseurl+"/user/"
};
export default endpoint_res