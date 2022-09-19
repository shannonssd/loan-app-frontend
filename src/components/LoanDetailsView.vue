<template>
  Loan Details
  <div>
    <span>ID:</span>{{ " " }} {{ " " }} <span>{{ loanDetails.id }}</span>
    {{ " " }}<br />
    <span>Loan Amount:</span>{{ " " }} {{ " " }}
    <span>{{ Number(loanDetails.loan_amount).toFixed(2) }} ฿</span>{{ " "
    }}<br />
    <span>Loan Term:</span>{{ " " }} {{ " " }}
    <span>{{ loanDetails.loan_term }} Years</span> {{ " " }}<br />
    <span>Interest Rate:</span>{{ " " }} {{ " " }}
    <span>{{ Number(loanDetails.interest_rate).toFixed(2) }}%</span> {{ " "
    }}<br />
    <span>Created At:</span>{{ " " }} {{ " " }}
    <span
      >{{ DateTime.fromISO(loanDetails.created_at).toISODate() }}
      {{ DateTime.fromISO(loanDetails.created_at).toFormat("HH:MM:ss") }}</span
    >{{ " " }}<br />
  </div>
  <button @click="goToHomePage">Back</button><br /><br />
  Repayment Schedules<br />
  <div>
    <span>Payment No</span>
    <span>Date</span>
    <span>Payment Amount</span>
    <span>Principal</span>
    <span>Interest</span>
    <span>Balance</span>
  </div>
  <div v-for="repayment in repaymentList">
    <span>{{ repayment.payment_no }}</span> {{ " " }}
    <span>{{ DateTime.fromISO(repayment.date).toFormat("MMM yyyy") }}</span
    >{{ " " }} <span>{{ Number(repayment.payment_amount).toFixed(2) }}</span>
    <span>{{ Number(repayment.principal).toFixed(2) }}</span>
    {{ " " }} <span>{{ Number(repayment.interest).toFixed(2) }}</span>
    {{ " " }} <span>{{ Number(repayment.balance).toFixed(2) }}</span> {{ " " }}
  </div>
  <button @click="goToHomePage">Back</button>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { DateTime } from "luxon";

export default {
  name: "LoanDetailsView",
  setup() {
    const loanDetails = ref({});
    const repaymentList = ref([]);
    const getLoanDetails = async () => {
      try {
        let urlParams = window.location;
        const id = urlParams.pathname.split("/").slice(-1)[0];
        const loanDetailsObj = await axios.get(
          `${process.env.VUE_APP_BACKEND_URL}/loans/${id}/`
        );
        console.log(loanDetailsObj.data);
        loanDetails.value = loanDetailsObj.data.loan;
        repaymentList.value = loanDetailsObj.data["repayment list"];
        // loanList.value = loanListObj.data;
      } catch (err) {
        console.log(err);
      }
    };
    const goToHomePage = () => {
      window.location = "/";
    };
    getLoanDetails();
    return { loanDetails, repaymentList, goToHomePage, DateTime };
  },
};
</script>
