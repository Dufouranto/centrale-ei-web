from pymongo import MongoClient
import certifi


def get_database():

    CONNECTION_STRING = (
        "mongodb://group13:E65yVXRJ74tzNPjU@cs2022.lmichelin.fr:27017/group13?ssl=true"
    )

    client = MongoClient(CONNECTION_STRING, tlsCAFile=certifi.where())

    return client["group13"]


# This is added so that many files can reuse the function get_database()
if __name__ == "__main__":

    # Get the database
    dbname = get_database()
