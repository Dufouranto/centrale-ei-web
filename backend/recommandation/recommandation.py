from pymongo_test import get_database
from random import choice
from sklearn import model_selection
from sklearn.metrics.pairwise import pairwise_distances
import numpy as np
import pandas as pd


def get_indexes_max_value(l):
    return [i for i, x in enumerate(l) if x == max(l)], max(l)


def negation_list(list1, list2):
    l = []
    for i in list1:
        if np.all(list2 != i):
            l.append(i)
    return l


def recommandation_similar():
    # Get the database using the method we defined in pymongo_test_insert file
    dbname = get_database()

    L = []
    for i in ["likes", "movies", "users"]:
        # Connexion to the collection movies
        collection_i = dbname[i]

        cursor_i = collection_i.find()

        # Expand the cursor and construct the DataFrame
        L.append(pd.DataFrame(list(cursor_i)))

    likes, movies, users = L

    nb_users = users.email.unique().shape[0]
    nb_movies = movies.title.unique().shape[0]

    print("Number of users : ", nb_users)
    print("Number of movies : ", nb_movies)
    print()

    train_likes, test_likes = model_selection.train_test_split(likes, test_size=0.25)

    print(train_likes.head())

    movie_matrix = train_likes.pivot_table(
        index="userId", columns="movieId", values="mark"
    )
    print("movie_matrix")
    print()
    print(movie_matrix)

    # test_matrix = test_likes.pivot_table(
    #     index="userId", columns="movieId", values="mark"
    # )
    # print()
    # print("test_likes")
    # print()
    # print(test_likes)

    # Constucrion de la matrice contenant que les notes des différents films.
    train_likes_matrix = movie_matrix.to_numpy()
    for i in range(len(train_likes_matrix)):
        for j in range(len(train_likes_matrix[0])):
            if np.isnan(train_likes_matrix[i][j]):
                train_likes_matrix[i][j] = 0

    print("train_likes_matrix")
    print(train_likes_matrix)

    # Construction de la matrice de test contenant que les notes des différents films.
    # test_likes_matrix = test_matrix.to_numpy()
    # for i in range(len(test_likes_matrix)):
    #     for j in range(len(test_likes_matrix[0])):
    #         if np.isnan(test_likes_matrix[i][j]):
    #             test_likes_matrix[i][j] = 0

    # print("test_likes_matrix")
    # print(test_likes_matrix)

    user_similarity = pairwise_distances(train_likes_matrix, metric="cosine")

    print("user_similarity")
    print(user_similarity)

    dbname.recommandations.drop()
    collection_recommandations = dbname["recommandations"]
    collection_likes = dbname["likes"]

    for i in range(len(user_similarity)):
        user_index, score = get_indexes_max_value(user_similarity[i])
        user_index, score = choice(user_index), score - 0.01
        idSimilarUser = movie_matrix.index[user_index]
        idUser = movie_matrix.index[i]

        movies_recommanded = collection_likes.find(
            {"userId": idSimilarUser}, {"movieId": 1, "_id": 0}
        )
        movies_already_seen = collection_likes.find(
            {"userId": idUser}, {"movieId": 1, "_id": 0}
        )
        list1 = (pd.DataFrame(list(movies_recommanded)).to_numpy(),)
        list2 = (pd.DataFrame(list(movies_already_seen)).to_numpy(),)

        list_id_movies_reco = negation_list(list1, list2)

        if list_id_movies_reco:
            for objId in list_id_movies_reco[0]:
                collection_recommandations.insert_one(
                    {"userId": idUser, "movieId": objId[0], "score": score}
                )


def recommandation_simple(user_id):
    # Get all the ids of the films the user noted

    dbname = get_database()

    collection_likes = dbname["likes"]

    movies_noted = collection_likes.find({"userId": user_id})

    print(movies_noted)
    # Find the genre_ids of these films

    # Sort the genres according to there occurences

    # Return a list of film ids for each genre
    return None


recommandation_similar()
# recommandation_simple(15845)

# GET/movie/{movie_id}/similar
# Get a list of similar movies. This is not the same as the "Recommendation" system you see on the website.
# These items are assembled by looking at keywords and genres.
# https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=<<api_key>>&page=1

# Likes Table
likes_cols = ["userId", "movieId", "mark"]

# Movies Table
movies_cols = [
    "title",
    "desc",
    "url",
    "popularity",
    "genre_ids",
    "release_date",
    "poster_path",
]
# Recommandation Table
recommandation_cols = ["userId", "movieId", "score"]

# Users Table
users_cols = ["email", "firstName", "lastName"]

# On va s'interesser ici au genre des films, que l'on retrouve dans genre_ids.
# genre_ids: Array(3)

"""
{
    "genres": [
        {"id": 28, "name": "Action"},
        {"id": 12, "name": "Adventure"},
        {"id": 16, "name": "Animation"},
        {"id": 35, "name": "Comedy"},
        {"id": 80, "name": "Crime"},
        {"id": 99, "name": "Documentary"},
        {"id": 18, "name": "Drama"},
        {"id": 10751, "name": "Family"},
        {"id": 14, "name": "Fantasy"},
        {"id": 36, "name": "History"},
        {"id": 27, "name": "Horror"},
        {"id": 10402, "name": "Music"},
        {"id": 9648, "name": "Mystery"},
        {"id": 10749, "name": "Romance"},
        {"id": 878, "name": "Science Fiction"},
        {"id": 10770, "name": "TV Movie"},
        {"id": 53, "name": "Thriller"},
        {"id": 10752, "name": "War"},
        {"id": 37, "name": "Western"},
    ]
}
"""
