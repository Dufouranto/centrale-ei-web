# On va s'interesser ici au genre des films, que l'on retrouve dans genre_ids.
# genre_ids: Array(3)
# 0: 14
# 1: 12
# 2: 28
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


from operator import itemgetter
from pymongo_test import get_database
import numpy as np
import pandas as pd

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


def recommandation(user_id):
    # Get the database using the method we defined in pymongo_test_insert file
    dbname = get_database()

    L = []
    for i in ["likes", "movies", "recommandations", "users"]:
        # Connexion to the collection movies
        collection_i = dbname[i]

        cursor_i = collection_i.find()

        # Expand the cursor and construct the DataFrame
        L.append(pd.DataFrame(list(cursor_i)))

    likes, movies, recommandations, users = L

    nb_users = users.email.unique().shape[0]
    nb_items = movies.title.unique().shape[0]

    print("Number of users : ", nb_users)
    print("Number of movies : ", nb_items)

    # Get all the ids of the films the user watched

    # Find the genre_ids of these films

    # Sort the genres according to there occurences

    # Return a list of film ids for each genre
    return None


recommandation(15845)

# GET/movie/{movie_id}/similar
# Get a list of similar movies. This is not the same as the "Recommendation" system you see on the website.
# These items are assembled by looking at keywords and genres.
# https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=<<api_key>>&page=1
