<template>
  <div class="connexion-user-form-container">
    <form ref="connexionUserForm">
      <label><b>Nom d'utilisateur</b></label>
      <input
        type="text"
        placeholder="Entrer le nom d'utilisateur"
        name="username"
        required
      />

      <label><b>Mot de passe</b></label>
      <input
        type="password"
        placeholder="Entrer le mot de passe"
        name="password"
      />
    </form>
    <button class="connexion-user-button" @click="connexionUser()">
      Connexion
    </button>
    <div v-if="userConnexionError">{{ userConnexionError }}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ConnexionUser",
  emits: ["connexionSuccessful"],
  data: function () {
    return {
      user: {
        username: "",
        password: "",
      },
      userConnexionError: "",
    };
  },
  methods: {
    connexionUser: function () {
      if (!this.$refs.connexionUserForm.checkValidity()) {
        this.$refs.connexionUserForm.reportValidity();
        return;
      }

      axios
        .get(`${process.env.VUE_APP_BACKEND_BASE_URL}/id/movies`, this.user)
        .then(() => {
          this.$emit("connexionSuccessful");
          this.user = {
            username: "",
            password: "",
          };
        })
        .catch((error) => {
          this.userConnexionError = "An error occured while connexion.";
          console.error(error);
        });
    },
  },
};
</script>
<style scoped>
#container {
  width: 400px;
  margin: 0 auto;
  margin-top: 10%;
}
/* Bordered form */
form {
  width: 100%;
  padding: 30px;
  border: 1px solid #f1f1f1;
  background: #fff;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
#connexion-user-form-container h1 {
  width: 38%;
  margin: 0 auto;
  padding-bottom: 10px;
}

/* Full-width inputs */
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

/* Set a style for all buttons */
input[type="submit"] {
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}
</style>
