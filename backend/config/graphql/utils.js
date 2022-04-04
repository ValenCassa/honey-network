import models from '../../models/index.js'

export const favSubscription = async ({ post_id }) => {
    const favsData = await models.Fav.findAll({
        where: {
            post_id: post_id
        }
    })
    const favs = JSON.parse(JSON.stringify(favsData)).length

    return { post_id, favs }
}

export const repostSubscription = async ({ post_id }) => {
    const repostData = await models.RePost.findAll({
        where: {
            post_id: post_id
        }
    })
    const reposts = JSON.parse(JSON.stringify(repostData)).length

    return { post_id, reposts }
}