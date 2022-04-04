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

    type UserInfo {
        name: String!
        username: String!
    }

    type FollowersList {
        followers: [User!]!
        following: [User!]!
    }
    
    type PostData {
        favs: Int!
        reposts: Int!
    }

    type Post {
        id: Int!
        content: String!
        user_id: Int
        updated_at: String!
        created_at: String!
        reposted_by: String
        reply_id: Int
        user: UserInfo
        data: PostData
    }

    type FavData {
        post_id: Int!
        favs: Int!
    }

    type RepostsData {
        post_id: Int!
        reposts: Int!
    }

    type Fav {
        id: Int!
        user_id: Int!
        post_id: Int!
        faved_at: String!
    }
    

    type Query {
        allTweets: [Post!]!
        findUser(user: String!): User
        currentUser: User
        uniquePost(post_id: Int!): Post
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

        editPost(
            post_id: Int!
            content: String!
        ): Post
    }

    type Subscription {
        liveFavs: FavData
        liveReposts: RepostsData
    }

`

export default typeDefs