
import { storageService } from '../async-storage.service'
import { loadFromStorage, makeId, saveToStorage } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'story'

export const storyService = {
  query,
  getById,
  save,
  remove,
  addComment
}
_createStories()
window.cs = storyService


async function query(filterBy = {}) {
  var stories = await storageService.query(STORAGE_KEY)
  const { userId } = filterBy

  // if (txt) {
  //     const regex = new RegExp(filterBy.txt, 'i')
  //     stories = stories.filter(story => regex.test(car.vendor) || regex.test(car.description))
  // }
  if (userId) {
      stories = stories.filter(story => story.by._id === userId)
  }
  // if(sortField === 'vendor' || sortField === 'owner'){
  //     cars.sort((car1, car2) => 
  //         car1[sortField].localeCompare(car2[sortField]) * +sortDir)
  // }
  // if(sortField === 'price' || sortField === 'speed'){
  //     cars.sort((car1, car2) => 
  //         (car1[sortField] - car2[sortField]) * +sortDir)
  // }

  // stories = stories.map(({ _id, txt, imgUrl, by.., comments.., likedBy.., tags.. }) => ({ _id, vendor, price, speed, owner }))
  return stories
}

function getById(storyId) {
  return storageService.get(STORAGE_KEY, storyId)
}

async function remove(storyId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, storyId)
}

async function save(story) {
  var savedStory
  if (story._id) {
    const storyToSave = {
      _id: story._id,
      txt: story.txt,
    }
    savedStory = await storageService.put(STORAGE_KEY, storyToSave)
  } else {
    const storyToSave = {
      // txt: story.txt,
      // imgUrl: story.imgUrl,

      // // Later, owner is set by the backend
      ...story,
      by: userService.getLoggedinUser(),
      createdTime: Date.now(),
      
      
      // msgs: []
    }
    savedStory = await storageService.post(STORAGE_KEY, storyToSave)
  }
  return savedStory
}

async function addComment(storyId, comment) {
  // Later, this is all done by the backend
  const story = await getById(storyId)
  const commentToAdd = {...comment}

  commentToAdd.id = makeId()
  commentToAdd.by =  userService.getLoggedinUser()
  commentToAdd.createdTime = Date.now()
  commentToAdd.likedBy = []
  
  story.comments.unshift(commentToAdd)
  await storageService.put(STORAGE_KEY, story)
  return commentToAdd
}

function _createStories() {
  let stories = loadFromStorage(STORAGE_KEY)
  if (!stories || !stories.length) {
    stories = [
      // {
      //   _id: "s101",
      //   txt: "Homemade flowers" + "\u2764\uFE0F",
      //   imgUrl: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f",
      //   by: {
      //     _id: "u101",
      //     fullname: "Ulash Ulashi",
      //     imgUrl: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
      //   },
      //   createdTime: 1672531200000,
      //   //   loc: { // Optional
      //   //     lat: 11.11, 
      //   //     lng: 22.22,
      //   //     name: "Tel Aviv"
      //   //   },
      //   comments: [
      //     {
      //       id: "c1001",
      //       by: {
      //         _id: "u105",
      //         fullname: "Bob",
      //         imgUrl: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
      //       },
      //       txt: "good one!" + "\u2764\uFE0F",
      //       createdTime: 1672531200000,
      //       likedBy: [ // Optional
      //         {
      //           "_id": "u105",
      //           "fullname": "Bob",
      //           "imgUrl": "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
      //         }
      //       ]
      //     },
      //     {
      //       id: "c1002",
      //       by: {
      //         _id: "u106",
      //         fullname: "Dob",
      //         imgUrl: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
      //       },
      //       txt: "not good!",
      //       createdTime: 1672531200000,
      //     }
      //   ],
      //   likedBy: [
      //     {
      //       _id: "u105",
      //       fullname: "Bob",
      //       imgUrl: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
      //     },
      //     {
      //       _id: "u106",
      //       fullname: "Dob",
      //       imgUrl: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
      //     }
      //   ],
      //   tags: ["fun", "DIY"]

      // },

      // {
      //   _id: "s102",
      //   txt: "Best trip ever! " + " \u{1F680} \u{1F525}",
      //   imgUrl: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg",
      //   by: {
      //     _id: "u102",
      //     fullname: "Gulash Gulashi",
      //     imgUrl: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
      //   },
      //   createdTime: 1677695400000,
      //   //   loc: { // Optional
      //   //     lat: 11.11, 
      //   //     lng: 22.22,
      //   //     name: "Tel Aviv"
      //   //   },
      //   comments: [
      //     {
      //       id: "c1002",
      //       by: {
      //         _id: "u106",
      //         fullname: "Rob",
      //         imgUrl: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
      //       },
      //       txt: "Boring!",
      //       createdTime: 1675252800000,
      //       likedBy: [ // Optional
      //         {
      //           "_id": "u106",
      //           "fullname": "Rob",
      //           "imgUrl": "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
      //         }
      //       ]
      //     },
      //     {
      //       id: "c1003",
      //       by: {
      //         _id: "u107",
      //         fullname: "Mob",
      //         imgUrl: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
      //       },
      //       txt: "Enjoy!",
      //       createdTime: 1677695400000,
      //     }
      //   ],
      //   likedBy: [
      //     {
      //       _id: "u106",
      //       fullname: "Rob",
      //       imgUrl: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
      //     },
      //     {
      //       _id: "u107",
      //       fullname: "Mob",
      //       imgUrl: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
      //     }
      //   ],
      //   tags: ["Trip", "Nature"]

      // },

      // {
      //   _id: "s103",
      //   txt: "Beatiful sunrise in the desert",
      //   imgUrl: "https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg"
      //   ,
      //   by: {
      //     _id: "u103",
      //     fullname: "Mulash Mulashi",
      //     imgUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
      //   },
      //   createdTime: 1706486400000,
      //   //   loc: { // Optional
      //   //     lat: 11.11, 
      //   //     lng: 22.22,
      //   //     name: "Tel Aviv"
      //   //   },
      //   comments: [
      //     // {
      //     //   id: "c1002",
      //     //   by: {
      //     //     _id: "u106",
      //     //     fullname: "Rob",
      //     //     imgUrl: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
      //     //   },
      //     //   txt: "Boring!",
      //     //   createdTime: 1675252800000,
      //     //   likedBy: [ // Optional
      //     //     {
      //     //       "_id": "u106",
      //     //       "fullname": "Rob",
      //     //       "imgUrl": "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
      //     //     }
      //     //   ]
      //     // },
      //     // {
      //     //   id: "c1003",
      //     //   by: {
      //     //     _id: "u107",
      //     //     fullname: "Mob",
      //     //     imgUrl: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
      //     //   },
      //     //   txt: "Enjoy!",
      //     //   createdTime: 1677695400000,
      //     // }
      //   ],
      //   likedBy: [
      //     {
      //       _id: "u106",
      //       fullname: "Rob",
      //       imgUrl: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
      //     },
      //     {
      //       _id: "u107",
      //       fullname: "Mob",
      //       imgUrl: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
      //     }
      //   ],
      //   tags: ["Trip", "Nature"]

      // },
      
    ]
    saveToStorage(STORAGE_KEY, stories)
  }
}

