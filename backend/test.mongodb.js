use('url_shortner')

db.users.aggregate([
    {
        $match: {
          "_id" : ObjectId("6692a601baec560cbe7785ab")
        }
    },
    {
        $project: {
          "username" : 1,
          "email" : 1,
          "domains" : 1,
          "profilePhoto" : 1,
          "_id" : 0
        }
    }
])

