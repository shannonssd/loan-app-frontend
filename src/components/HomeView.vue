<template>
  <div>
    All Loans
    <button>Add New Loan</button>
    <button>Advanced Search</button>
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
    <span>{{ loan.id }}</span> {{ " " }} <span>{{ loan.loan_amount }}</span>
    {{ " " }} <span>{{ loan.loan_term }}</span> {{ " " }}
    <span>{{ loan.interest_rate }}</span> {{ " " }}
    <span
      >{{ DateTime.fromISO(loan.created_at).toISODate() }}
      {{ DateTime.fromISO(loan.created_at).toFormat("HH:MM:ss") }}</span
    >
    {{ " " }} <span><button>View</button></span> {{ " " }}
    <span><button>Edit</button></span> {{ " " }}
    <span><button>Delete</button></span> {{ " " }}
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

    getLoanList();
    return { loanList, getLoanList, DateTime };
  },
};
</script>
