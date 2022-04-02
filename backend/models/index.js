import Post from "./Post.js";
import User from "./User.js";
import Followers from './Followers.js'
import RePost from './RePost.js'
import Fav from './Fav.js'

User.hasMany(Post)
Post.belongsTo(User)

User.belongsToMany(User, { through: Followers, as: 'followers', foreignKey: 'user_id' })
User.belongsToMany(User, { through: Followers, as: 'followers_list', foreignKey: 'follower_id' })

User.belongsToMany(User, { through: Followers, as: 'following_list', foreignKey: 'user_id' })
User.belongsToMany(User, { through: Followers, as: 'following', foreignKey: 'follower_id' })


User.hasMany(Followers)
Followers.belongsTo(User)

User.belongsToMany(Post, { through: RePost, as: 'reposts' })
Post.belongsToMany(User, { through: RePost, as: 'users_reposted' })
Post.hasMany(RePost)
RePost.belongsTo(Post)

User.belongsToMany(Post, { through: Fav, as: 'favs_list' })
Post.belongsToMany(User, { through: Fav, as: 'post_favs' })
User.hasMany(Fav)
Fav.belongsTo(User)

export default {
    User,
    Post,
    Followers,
    RePost
}

