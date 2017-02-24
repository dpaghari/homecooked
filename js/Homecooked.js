const axios = require("axios");
const validator = require("validator");
const Homecooked = (function() {

  function init(callback) {
    axios.get("/get_app_state").then((res)=> {
      callback(res);
    });
  }

  function handleAddToMealPlan() {

  }


  function handleCreateRecipe() {

  }

  function handleAddIngredient() {

  }

  function handleLogin() {
    var loginForm = document.querySelector("form.loginForm");
    if(loginForm) {
      loginForm.addEventListener("submit", function(e) {

        e.preventDefault();
        let user_name = document.querySelector("form.loginForm input[name=user_name]").value;
        let password = document.querySelector("form.loginForm .l_pwd").value;

        if(!validator.isEmpty(user_name) && !validator.contains(user_name," ") && !validator.isEmpty(password)){

          let data = {
            action: "login",
            user_name,
            password
          };
          axios.post("/", data).then((response) => {

            let { redirect } = response.data;
            window.location.href = redirect;
          })
          .catch((err) => {
            console.log("error", err);
          });

        }

      });
    }
  }


  function handleRegister(){
    // Triggers the registration form
    var registerBtn = document.querySelector("form.loginForm .registerBtn");
    if(registerBtn) {
      registerBtn.addEventListener("click", function(e) {
        e.preventDefault();
        var forms = document.querySelectorAll("form.registerForm, form.loginForm");
        forms.forEach(function(el, idx) {
          el.classList.toggle("active");
        });
      });
    }
    // Completes the registration
    var registerForm = document.querySelector("form.registerForm");
    if(registerForm) {
      registerForm.addEventListener("submit", function(e) {
        e.preventDefault();
        var registerFormInputs = [].slice.call(document.querySelectorAll("form.registerForm input[type=text], form.registerForm input[type='password']"), 0);
        var userName = document.querySelector("input.r_un").value;
        var pwd = document.querySelector("input.r_pwd").value;
        var confirmPW = document.querySelector("input[name=confirm_password]").value;
        var profile_picture = document.querySelector("input.r_profile_pic").value;

        var invalidInputs = registerFormInputs.filter(function(el, idx) {
          return validator.isEmpty(el.value) || validator.contains(el.value, " ");
        });
        if(invalidInputs.length < 1 && pwd === confirmPW) {
          var data = {
            action: "register",
            name: userName,
            password: pwd,
            profile_picture : profile_picture
          };
          axios.post("/", data).then((response) => {
            let { redirect } = response.data;
            window.location.href = redirect;
          })
          .catch((err) => {
            console.log("error", err);
          });
        }
      });
    }
  }





  return {
    init,
    handleAddToMealPlan,
    handleCreateRecipe,
    handleAddIngredient,
    handleLogin,
    handleRegister
  };
})();

module.exports = Homecooked;
