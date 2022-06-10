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
      Connexion user
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
.add-user-title {
  margin-bottom: 10px;
}

.add-user-form-container {
  display: flex;
  margin-bottom: 20px;
}

.add-user-input {
  margin-right: 10px;
  padding: 5px;
}

.add-user-button {
  cursor: pointer;
  padding: 5px;
}
</style>
