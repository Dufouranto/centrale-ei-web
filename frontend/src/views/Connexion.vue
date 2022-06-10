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
    <!-- <router-link :to="`/users/${username._id}/movies`">
      <button class="connexion-user-button" @click="connexion()">
        connexion
      </button>
    </router-link> -->
    <div v-if="userConnexionError">{{ userConnexionError }}</div>
  </div>
</template>

<script>
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
