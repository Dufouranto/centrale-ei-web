def get_database():
    from pymongo import MongoClient

    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = (
        "mongodb://group13:E65yVXRJ74tzNPjU@cs2022.lmichelin.fr:27017/group13?ssl=true"
    )

    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    from pymongo import MongoClient

    client = MongoClient(CONNECTION_STRING)


# This is added so that many files can reuse the function get_database()
if __name__ == "__main__":

    # Get the database
    dbname = get_database()
