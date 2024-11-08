const app = new Vue({
  el: "#login",
  data: {
    email: "",
    password: "",
    isPasswordVisible: false,
  },
  methods: {
    togglePassword: function () {
      this.isPasswordVisible = !this.isPasswordVisible;
      console.log(this.isPasswordVisible);
    },
    submitForm: function (e) {
        e.preventDefault();
      if (!this.email || !this.password) {
        console.log("error");
      }
    },
  },
});
