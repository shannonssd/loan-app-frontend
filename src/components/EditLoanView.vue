<template>
  <div>Edit Loan</div>
  <form>
    <label for="loan-amount">Loan Amount:</label><br />
    <input v-model="loanAmount" placeholder="1000" required /><br />
    <label for="loan-term">Loan Term:</label><br />
    <input v-model="loanTerm" placeholder="1" required /><br />
    <label for="interest_rate">Interest Rate:</label><br />
    <input v-model="interestRate" placeholder="1" required /><br />
    <label for="loan_date">Start Date:</label><br />
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
    <button type="submit" @click="submitForm">Update</button>
  </form>
  <button @click="goToHomePage">Back</button>
</template>

<script>
import axios from "axios";
import { onMounted, ref } from "vue";

export default {
  name: "EditLoanView",
  setup() {
    const loanAmount = ref("");
    const loanTerm = ref("");
    const interestRate = ref("");
    const month = ref("");
    const year = ref("");
    const yearsArr = [];
    let id = "";
    onMounted(async () => {
      for (let i = 2017; i <= 2050; i += 1) {
        yearsArr.push(i);
      }

      try {
        let urlParams = window.location;
        id = urlParams.pathname.split("/").slice(-1)[0];
        console.log(id);
        const response = await axios.get(
          `${process.env.VUE_APP_BACKEND_URL}/loans/get-loan-data/${id}/`
        );
        const { loanObject } = response.data;
        loanAmount.value = Math.trunc(loanObject.loan_amount);
        loanTerm.value = loanObject.loan_term;
        interestRate.value = Math.trunc(loanObject.interest_rate);
        // console.log(DateTime.fromISO(loanObject.).toFormat("MMM yyyy"));
        // year.value = ;
        // month.value = ;
      } catch (err) {
        console.log(err);
      }
    });
    console.log(id);

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
        const response = await axios.put(
          `${process.env.VUE_APP_BACKEND_URL}/loans/${id}/`,
          data
        );
        console.log(response.data);
        // const id = response.data;
        window.location = `/loan-details/${id}`;
      } catch (err) {
        console.log(err);
      }
    };

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
