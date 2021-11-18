// Environment Variables

const token = '18644547xxxxxxxxxxxxxxxxxxxxJLYtRmyKjI'; // bot token
const botName = '@flipkartX_bot'; // bot username along with @
const batchSize = 12
const trackAfter = 5
const patreon = [ownerid, 806378672] // gives benifits for pincode tracking feature
const pincodeTrackAfter = 5
const pincodeBatchSize = 4
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // makes up track id from these
const sheetID = '1XXdtjqg8CBZSwJm6fM5DqJZbr9rTygURr_tCZ9YO29A' // google spreadhseet id
var ownerid = 806378672 // owner tele id
const star = '⭐'

// exclusively mentioned here to enable forceReply function on these message
const feedbackMessage = 'ℹ️ To report a problem/issue/feedback, reply to this message'
const pincodeTrackMessage = 'ℹ️ Input your pincode for tracking product'

// purpose of ssVars is to make shuffling possible in excel without affecting the code
// if you change ssVars don't forget to change function which appends row to spreadheet
const ssVars = [0, 1, 2, 3, 4, 5, 6, 7]
// Order represents : [chatid, price, trackid, url, lastchecked, instock, name, pincode]

// bans a person from using check command
// check command is officialy removed from help page and no user will be aware of it
const banned = []
const bannedReason = [`Misuse of our <b>free functionality</b>`]

function doPost(e){
    // entry point of any request
    executeCommand(e)
}
