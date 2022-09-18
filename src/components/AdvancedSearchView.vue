<template>
  <div id="advanced-search">
    <div>Advanced Search</div>
    <form>
      Loan Amount(THB)<br />
      <label for="loan-amount-lower">Min:</label><br />
      <input v-model="loanAmountLower" placeholder="1000" /><br />
      <label for="loan-amount-upper">Max:</label><br />
      <input v-model="loanAmountUpper" placeholder="100000000" /><br />

      Loan Term(Years)<br />
      <label for="loan-term-lower">Min:</label><br />
      <input v-model="loanTermLower" placeholder="1" /><br />
      <label for="loan-term-upper">Max:</label><br />
      <input v-model="loanTermUpper" placeholder="50" /><br />

      Interest Rate(%)<br />
      <label for="interest-rate-lower">Min:</label><br />
      <input v-model="interestRateLower" placeholder="1" /><br />
      <label for="interest-rate-upper">Max:</label><br />
      <input v-model="interestRateUpper" placeholder="100" /><br />
    </form>
    <button @click="filterLoans">Search</button>
    <button @click="filterLoans">Reset</button>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

export default {
  name: "NewLoanView",
  props: ["loanList"],
  setup(props) {
    console.log(props);
    const loanAmountLower = ref("");
    const loanAmountUpper = ref("");
    const loanTermLower = ref("");
    const loanTermUpper = ref("");
    const interestRateLower = ref("");
    const interestRateUpper = ref("");

    const yearsArr = [];
    const populateYears = () => {
      for (let i = 2017; i <= 2050; i += 1) {
        yearsArr.push(i);
      }
    };

    const filterLoans = async (e) => {
      e.preventDefault();
      const data = {
        params: {
          loan_amount_lower: loanAmountLower.value || "null",
          loan_amount_upper: loanAmountUpper.value || "null",
          loan_term_lower: loanTermLower.value || "null",
          loan_term_upper: loanTermUpper.value || "null",
          interest_rate_lower: interestRateLower.value || "null",
          interest_rate_upper: interestRateUpper.value || "null",
        },
      };
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_BACKEND_URL}/loans/advanced-search/`,
          data
        );
        console.log(response.data);
        props.loanList.value = response.data;
      } catch (err) {
        console.log(err);
      }
    };

    const goToHomePage = () => {
      window.location = "/";
    };

    populateYears();
    return {
      yearsArr,
      goToHomePage,
      loanAmountLower,
      loanAmountUpper,
      loanTermLower,
      loanTermUpper,
      interestRateLower,
      interestRateUpper,
      filterLoans,
    };
  },
};
</script>
