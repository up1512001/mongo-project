const {gql} = require('apollo-server-express')

module.exports = gql`
    type Users{
        email:String
    }
    type Query{
        getUser(email:String):Users
        getData(email:String):Users
    }
    
`