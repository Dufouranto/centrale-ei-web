<template>
  <h2>Ajouter un film à la base de données</h2>
  <div class="movies">
    <form action="/action_page.php">
      <label for="title">Titre:</label><br />
      <input
        type="text"
        id="title"
        placeholder="Fantastic Beasts: The Secrets of Dumbledore"
        size="100"
      /><br />

      <label for="desc">Description:</label><br />
      <input
        type="text"
        id="desc"
        placeholder="Le professeur Albus Dumbledore sait que le puissant mage noir Gellert Grindelwald cherche à prendre le
    contrôle du monde des sorciers. Incapable de l’empêcher d’agir seul, il
    sollicite le magizoologiste Norbert Dragonneau pour qu’il réunisse des
    sorciers, des sorcières et un boulanger moldu au sein d’une équipe
    intrépide. Leur mission des plus périlleuses les amènera à affronter des
    animaux, anciens et nouveaux, et les disciples de plus en plus nombreux de
    Grindelwald. Pourtant, dès lors que que les enjeux sont aussi élevés,
    Dumbledore pourra-t-il encore rester longtemps dans l’ombre ?"
        size="100"
      /><br />

      <label for="popularity">Popularité :</label><br />
      <input
        type="text"
        id="popularity"
        placeholder="Popularité"
        size="100"
      /><br />

      <label for="genre_ids">Genres:</label><br />
      <input
        type="text"
        id="genre_ids"
        placeholder="[{&ldquo;id&rdquo;: 14, &ldquo;name&rdquo;: &ldquo;Fantasy &rdquo;}, {&ldquo;id&rdquo;: 12,
    &ldquo;name&rdquo;: &ldquo;Adventure &rdquo;}, {&ldquo;id&rdquo;: 28,
    &ldquo;name&rdquo;: &ldquo;Action &rdquo; }]"
        size="100"
      /><br />

      <label for="release_date">Date de sortie :</label><br />
      <input
        type="text"
        id="release_date"
        placeholder="2022-04-06"
        size="100"
      /><br />

      <label for="poster_path">Chemin de l'affiche :</label><br />
      <input
        type="text"
        id="poster_path"
        placeholder="/uXs7wMtsfnBFuGVogAxJXZXshFU.jpg"
        size="100"
      /><br />
      <br />
      <input type="submit" value="Submit" />
    </form>

    <p>
      If you click the "Submit" button, the form-data will be sent to a page
      called "/action_page.php".
    </p>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
}

.image {
  float: left;
  margin: 0 30px 15px 0;
}

.box {
  width: 150px;
  height: 100px;
  border-radius: 5px;
  background-color: rgb(22, 47, 67);
  padding: 1em;
}

.movies {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 15px 5px 0 15px;
  box-shadow: 0px 0px 20px 0 rgba(0, 0, 0, 0.5),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin-top: 5px;
  /* background-color: white; */
}
</style>
