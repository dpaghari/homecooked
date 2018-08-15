import axios from 'axios';
import jwtDecode from 'jwt-decode';

const httpClient = axios.create();

httpClient.getToken = function() {
  return localStorage.getItem('token');
};

httpClient.setToken = function(token) {
  localStorage.setItem('token', token);
  return token;
};

httpClient.getCurrentUser = function() {
  const token = this.getToken();
  // console.log(token)
  if (token) return jwtDecode(token);
  return null;
};

httpClient.logIn = function(credentials) {
  return this({
    method: 'post',
    url: '/api/users/authenticate',
    data: credentials
  }).then(serverResponse => {
    const token = serverResponse.data.token;
    if (token) {
      // sets token as an included header for all subsequent api requests
      this.defaults.headers.common.token = this.setToken(token);
      return jwtDecode(token);
    } else {
      return false;
    }
  });
};

// logIn and signUp functions could be combined into one since the only difference is the url we're sending a request to..
httpClient.signUp = function(userInfo) {
  return this({ method: 'post', url: '/api/users', data: userInfo }).then(
    serverResponse => {
      const token = serverResponse.data.token;
      if (token) {
        // sets token as an included header for all subsequent api requests
        this.defaults.headers.common.token = this.setToken(token);
        return jwtDecode(token);
      } else {
        return false;
      }
    }
  );
};

httpClient.logOut = function() {
  localStorage.removeItem('token');
  delete this.defaults.headers.common.token;
  return true;
};

// #######################
// #HTTPCLIENT FOR RECIPE#
// #######################

httpClient.newRecipe = function(data) {
  return this({ method: 'post', url: '/api/recipe/add_recipe', data: data });
};

httpClient.allRecipes = function() {
  return this({ method: 'get', url: '/api/recipe/get_recipes' });
};

httpClient.allRecipesExceptUser = function(id) {
  let filteredRecipes = new Promise((resolve, reject) => {
    this({ method: 'get', url: `/api/recipe/get_recipes` }).then((res) => {
      let allRecipes = res.data;
      resolve(allRecipes.filter((el) => el.user !== id));
    })
    .catch((err) => reject(err));
  });

  return filteredRecipes;
};

httpClient.userRecipes = function(id) {
  return this({ method: 'get', url: `/api/recipe/get_users_recipe/${id}` });
};

httpClient.deleteRecipe = function(id) {
  return this({ method: 'delete', url: `/api/recipe/delete_recipe/${id}` });
};

export default httpClient;
