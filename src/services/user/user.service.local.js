import { storageService } from '../async-storage.service'
import { storyService } from '../story/index'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser,
    saveLoggedinUser,
    follow,
}

async function getUsers() {
    const users = await storageService.query('user')
    return users.map(user => {
        delete user.password
        return user
    })
}

async function getById(userId) {
    const user = await storageService.get('user', userId)
    const stories =  await storyService.query({ userId })

    user.stories = stories
    return user
}

function remove(userId) {
    return storageService.remove('user', userId)
}

async function update({ _id , following, followers}) {
    const user = await storageService.get('user', _id)
    if (following) user.following = following
    if (followers) user.followers = followers
    await storageService.put('user', user)

	// When admin updates other user's details, do not update loggedinUser
    const loggedinUser = getLoggedinUser()
    if (loggedinUser._id === user._id) saveLoggedinUser(user)
    console.log(user);
        
    return user
}

async function login(userCred) {
    const users = await storageService.query('user')
    const user = users.find(user => user.username === userCred.username)

    if (user) return saveLoggedinUser(user)
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    

    const user = await storageService.post('user', userCred)
    return saveLoggedinUser(user)
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))}

async function follow(userId){
    const loggedinUser = await storageService.get('user', getLoggedinUser()._id)
    const followedUser = await storageService.get('user', userId)

    const miniFollowedUser = {_id:followedUser._id, fullname:followedUser.fullname, imgUrl:followedUser.imgUrl}
    const miniLoggedinUser = getLoggedinUser()

    if (loggedinUser.following){
        loggedinUser.following.push(miniFollowedUser)
    } else{
        loggedinUser.following = [miniFollowedUser]
    }

    if (followedUser.followers){
        followedUser.followers.push(miniLoggedinUser)
    } else{
        followedUser.followers = [miniLoggedinUser]
    }
    console.log(loggedinUser);
    console.log(followedUser);
    
    await storageService.put('user', loggedinUser)
    await storageService.put('user', followedUser)

    return saveLoggedinUser(loggedinUser)
}




//    return  {
    //     _id: "u101",
    //     username: "Muko",
    //     password: "mukmuk",
    //     fullname: "Muki Muka",
    //     imgUrl: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
    //     following: [
    //       {
    //         _id: "u106",
    //         fullname: "Dob",
    //         imgUrl: "http://some-img"
    //       }
    //     ],
    //     followers: [
    //       {
    //         _id: "u105",
    //         fullname: "Bob",
    //         imgUrl: "http://some-img"
    //       }
    //     ],
       // stories: [],
    //     savedStoryIds: ["s104", "s111", "s123"] // can also use mini-stories
    //   }


function saveLoggedinUser(user) {
	user = { 
        _id: user._id, 
        fullname: user.fullname, 
        imgUrl: user.imgUrl, 
        following: user.following,
    }
	sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
	return user
}

// To quickly create an admin user, uncomment the next line
// _createAdmin()
// async function _createAdmin() {
//     const user = {
//         username: 'admin',
//         password: 'admin',
//         fullname: 'Mustafa Adminsky',
//         imgUrl: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png',
        
//     }

//     const newUser = await storageService.post('user', userCred)
//     console.log('newUser: ', newUser)
// }