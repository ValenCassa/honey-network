import { gql } from 'apollo-server-express'

const typeDefs = gql`

    type Token {
        value: String!
    }

    type Followers {
        followings: Int!
        followers: Int!
    }

    type User {
        id: Int!
        name: String!
        username: String!
        passwordHash: String!
        disabled: Boolean!
        admin: Boolean!
    }

    type FollowersList {
        followers: [User!]!
        following: [User!]!
    }

    type Post {
        id: Int!
        content: String!
        user_id: Int
        updated_at: String!
        created_at: String!
        reposted_by: String
        reply_id: Int
    }

    type Fav {
        id: Int!
        user_id: Int!
        post_id: Int!
        faved_at: String!
    }

    type PostData {
        favs: Int!
        reposts: Int!
    }

    type Query {
        allTweets: [Post!]!
        findUser(user: String!): User
        checkUser: User
        checkUserFollowers(user_id: Int!): FollowersList
        countUserFollowers(user_id: Int!): Followers
        postFromFollowers: [Post!]
        tweetsProfile(user_id: Int!): [Post!]
        timeline: [Post!]
        userFavs(user_id: Int!): [Post!]
        postComments(post_id: Int!): [Post!]
        postData(post_id: Int!): PostData
    }

    type Mutation {
        registerUser(
            name: String!
            password: String!
            username: String!
        ): User

        login(
            username: String!
            password: String!
        ): Token

        createPost(
            content: String!
        ): Post

        follow(
            follower_id: Int!
        ): User

        unfollow(
            follower_id: Int!
        ): String

        fav(
            post_id: Int!
        ): String

        unFav(
            post_id: Int!
        ): String

        rePost(
            post_id: Int!
        ): String

        delRePost(
            post_id: Int!
        ): String

        addComment(
            reply_id: Int!
            content: String!
        ): Post

        delComment(
            comment_id: Int!
        ): String
    }

    type Subscription {
        liveFavs: Fav
        liveUnFav: Fav
    }

`

export default typeDefs