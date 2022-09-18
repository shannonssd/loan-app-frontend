<template>
  <div>Create Loan</div>
  <form>
    <label for="loan-amount">Loan Amount:</label><br />
    <input v-model="loanAmount" placeholder="1000" required /><br />
    <label for="loan-term">Loan Term:</label><br />
    <input v-model="loanTerm" placeholder="1" required /><br />
    <label for="interest-rate">Interest Rate:</label><br />
    <input v-model="interestRate" placeholder="1" required /><br />
    <label for="loan-date">Start Date:</label><br />
    <select name="month" id="month" v-model="month">
      <option value="01">January</option>
      <option value="02">February</option>
      <option value="03">March</option>
      <option value="04">April</option>
      <option value="05">May</option>
      <option value="06">June</option>
      <option value="07">July</option>
      <option value="08">August</option>
      <option value="09">September</option>
      <option value="10">October</option>
      <option value="11">November</option>
      <option value="12">December</option>
    </select>
    <select name="year" id="year" v-model="year">
      <option v-for="year in yearsArr" :value="year">{{ year }}</option>
    </select>
    <button type="submit" @click="submitForm">Create</button>
    <button @click="goToHomePage">Back</button>
  </form>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

export default {
  name: "NewLoanView",
  setup() {
    const loanAmount = ref("");
    const loanTerm = ref("");
    const interestRate = ref("");
    const month = ref("");
    const year = ref("");

    const yearsArr = [];
    const populateYears = () => {
      for (let i = 2017; i <= 2050; i += 1) {
        yearsArr.push(i);
      }
    };

    const goToHomePage = () => {
      window.location = "/";
    };

    const submitForm = async (e) => {
      e.preventDefault();
      const data = {
        loan_amount: loanAmount.value,
        loan_term: loanTerm.value,
        interest_rate: interestRate.value,
        loan_month: month.value,
        loan_year: year.value,
      };
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_BACKEND_URL}/loans/`,
          data
        );
        const id = response.data;
        window.location = `/loan-details/${id}`;
      } catch (err) {
        console.log(err);
      }
    };

    populateYears();
    return {
      yearsArr,
      goToHomePage,
      submitForm,
      loanAmount,
      loanTerm,
      interestRate,
      month,
      year,
    };
  },
};
</script>
