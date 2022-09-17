<template>
  <div>
    All Loans
    <button @click="goToNewForm">Add New Loan</button>
    <button @click="goToSearchPage">Advanced Search</button>
  </div>
  <div>
    <span>ID</span>
    <span>Loan Amount</span>
    <span>Loan Term</span>
    <span>Interest Rate</span>
    <span>Created At</span>
    <span>Edit</span>
  </div>
  <div v-for="loan in loanList">
    <span>{{ loan.id }}</span> {{ " " }}
    <span>{{ Number(loan.loan_amount).toFixed(2) }} ฿</span>{{ " " }}
    <span>{{ loan.loan_term }} Years</span> {{ " " }}
    <span>{{ Number(loan.interest_rate).toFixed(2) }}%</span> {{ " " }}
    <span
      >{{ DateTime.fromISO(loan.created_at).toISODate() }}
      {{ DateTime.fromISO(loan.created_at).toFormat("HH:MM:ss") }}</span
    >{{ " " }}
    <span><button @click="goToLoanDetails(loan.id)">View</button></span>
    {{ " " }} <span><button @click="goToEditForm(loan.id)">Edit</button></span>
    {{ " " }} <span><button>Delete</button></span> {{ " " }}
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { DateTime } from "luxon";

export default {
  name: "HomeView",
  setup() {
    const loanList = ref([]);
    const getLoanList = async () => {
      try {
        const loanListObj = await axios.get(
          `${process.env.VUE_APP_BACKEND_URL}/loans/`
        );
        loanList.value = loanListObj.data;
      } catch (err) {
        console.log(err);
      }
    };
    const goToNewForm = () => {
      window.location = "/new-loan/";
    };
    const goToEditForm = (id) => {
      window.location = `/edit-loan/${id}`;
    };
    const goToLoanDetails = (id) => {
      window.location = `/loan-details/${id}`;
    };
    const goToSearchPage = () => {
      window.location = "/advanced-search/";
    };

    getLoanList();
    return {
      loanList,
      getLoanList,
      DateTime,
      goToNewForm,
      goToEditForm,
      goToLoanDetails,
      goToSearchPage,
    };
  },
};
</script>
