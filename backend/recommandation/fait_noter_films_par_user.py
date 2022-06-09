from pymongo_test import get_database
import pandas as pd

dbname = get_database()
collection_users = dbname["users"]
cursor_users = collection_users.find()
users = pd.DataFrame(list(cursor_users))
print(users)
for i in range(100):
    a = 1
