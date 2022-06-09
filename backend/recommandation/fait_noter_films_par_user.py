from pymongo_test import get_database
import pandas as pd
from random import randint
import requests as req

dbname = get_database()

dbname.likes.drop()

collection_users = dbname["users"]
cursor_users = collection_users.find()
users = pd.DataFrame(list(cursor_users))

collection_movies = dbname["movies"]
cursor_movies = collection_movies.find()
movies = pd.DataFrame(list(cursor_movies))

list_movies_id = movies["_id"]
nb_movies = len(list_movies_id)

for userId in users["_id"]:
    for i in range(10):
        p = randint(0, nb_movies - 1)
        note = randint(0, 5)
        movieId = list_movies_id[p]
        url = "http://localhost:3000/users/" + str(userId) + "/" + str(movieId)
        req.post(url, None, {"mark": note})
