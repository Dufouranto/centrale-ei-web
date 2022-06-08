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


def similar_movies(movie_id):
    return None


# GET/movie/{movie_id}/similar
# Get a list of similar movies. This is not the same as the "Recommendation" system you see on the website.
# These items are assembled by looking at keywords and genres.
# https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=<<api_key>>&page=1
