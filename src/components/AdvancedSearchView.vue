<template>
  <div>Advanced Search</div>
  <form>
    Loan Amount(THB)<br />
    <label for="loan_amount_lower">Min:</label><br />
    <input v-model="loan_amount_lower" placeholder="1000" /><br />
    <label for="loan_amount_upper">Max:</label><br />
    <input v-model="loan_amount_upper" placeholder="100000000" /><br />

    Loan Term(Years)<br />
    <label for="loan_term_lower">Min:</label><br />
    <input v-model="loan_term_lower" placeholder="1" /><br />
    <label for="loan_term_upper">Max:</label><br />
    <input v-model="loan_term_upper" placeholder="50" /><br />

    Interest Rate(%)<br />
    <label for="interest_rate_lower">Min:</label><br />
    <input v-model="interest_rate_lower" placeholder="1" /><br />
    <label for="interest_rate_upper">Max:</label><br />
    <input v-model="interest_rate_upper" placeholder="100" /><br />
  </form>
  <button>Search</button>
  <button>Reset</button>
  <button>Close</button>
</template>

<script>
// import axios from "axios";
import { ref } from "vue";

export default {
  name: "NewLoanView",
  setup() {
    // const loanList = ref([]);
    // const getLoanDetails = async () => {
    //   try {
    //     const loanDetailsObj = await axios.get(
    //       `${process.env.VUE_APP_BACKEND_URL}/loans/`
    //     );
    //     loanList.value = loanListObj.data;
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // const goToForm = () => {};
    const yearsArr = [];
    const populateYears = () => {
      for (let i = 2017; i <= 2050; i += 1) {
        yearsArr.push(i);
      }
    };

    const goToHomePage = () => {
      window.location = "/";
    };

    populateYears();
    return { yearsArr, goToHomePage };
  },
};
</script>
