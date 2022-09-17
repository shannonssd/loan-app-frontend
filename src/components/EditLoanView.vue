<template>
  <div>Edit Loan</div>
  <form>
    <label for="loan_amount">Loan Amount:</label><br />
    <input v-model="loan_amount" placeholder="1000" /><br />
    <label for="loan_term">Loan Term:</label><br />
    <input v-model="loan_term" placeholder="1" /><br />
    <label for="interest_rate">Interest Rate:</label><br />
    <input v-model="interest_rate" placeholder="1" /><br />
    <label for="loan_date">Start Date:</label><br />
    <select name="month" id="month">
      <option value="January">January</option>
      <option value="February">February</option>
      <option value="March">March</option>
      <option value="April">April</option>
      <option value="May">May</option>
      <option value="June">June</option>
      <option value="July">July</option>
      <option value="August">August</option>
      <option value="September">September</option>
      <option value="October">October</option>
      <option value="November">November</option>
      <option value="December">December</option>
    </select>
    <select name="year" id="year">
      <option v-for="year in yearsArr" :value="year">{{ year }}</option>
    </select>
  </form>
  <button>Update</button>
  <button @click="goToHomePage">Back</button>
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
