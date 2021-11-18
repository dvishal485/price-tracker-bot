
function executeCommand(e) {
    try {
        if (e.postData.type == "application/json") {
            try {
                var answerCallback = false
                var isOwnerCallback = false
                var data = JSON.parse(e.postData.contents);
                if (data.callback_query != undefined) {
                    var text = data.callback_query.data;
                    data = data.callback_query
                    answerCallbackQuery(data, 'Processing your request...')
                    answerCallback = true
                    if (data.from.id == ownerid) {
                        var isOwnerCallback = true
                    }
                    var id = data.from.id
                } else {
                    var text = data.message.text;
                    var id = data.message.from.id
                }

                text = text.replace(/ownerId/g, ownerid).replace(/botName/g, botName).replace(/pincodeTrackAfter/g, pincodeTrackAfter).replace(/pincodeBatchSize/g, pincodeBatchSize).replace(/batchSize/g, batchSize).replace(/trackAfter/g, trackAfter).replace(/pincodeTrackAfter/g, pincodeTrackAfter)
                //sendReport(JSON.stringify(data, null, 4))
                try {
                    if (answerCallback) {
                        var callBackMessage = String(data.message.text).toLowerCase()
                        if (callBackMessage.lastIndexOf('added') == -1 && callBackMessage.lastIndexOf('issue persits') == -1 && callBackMessage.lastIndexOf('true') == -1 && callBackMessage.lastIndexOf('donate') == -1 && callBackMessage.lastIndexOf('coffee') == -1 && callBackMessage.lastIndexOf('prices have been') == -1 && callBackMessage.lastIndexOf('product out of stock') == -1 && callBackMessage.lastIndexOf('stock avaliable for') == -1) {
                            deleteMessage(null, data.message.message_id, data.message.chat.id)
                        }
                    }
                } catch (et) { }
                try {
                    var replyMessage = data.message.reply_to_message.text
                    switch (replyMessage) {
                        case feedbackMessage:
                            text = '/r ' + text
                            break;
                    }
                    // sendReport(replyMessage)
                    // sendReport(replyMessage.lastIndexOf(pincodeTrackMessage))
                    if (replyMessage.lastIndexOf(pincodeTrackMessage) != -1) {
                        var prodURL = replyMessage.split('Product URL')[1].split(': ')[1].split(' ')[0]
                        text = '/pincodeTrack ' + prodURL + ' ' + text
                    }
                } catch (error) { }
                if (text.split('_message').length > 1 && answerCallback) {
                    text = text.replace('_message', '')
                    url = data.message.reply_markup.inline_keyboard[1][0].url
                    text = '/' + text + ' ' + url
                }
                if (text == 'send_report' && answerCallback) {
                    text = `/send ${ownerid} ${JSON.parse(data.message.text).result.text}`
                }
                if (text.lastIndexOf('set_pincode_track') != -1 && answerCallback) {
                    var pinc = text.replace('set_pincode_track', '')
                    var lk = 'http' + JSON.stringify(data).split('http')[1].split(' ')[0].split('"')[0]
                    text = `/pincodeTrack ${lk} ${pinc}`
                }
                //sendReport(text)
                var command = text.split(' ')[0];
                command = command.replace('/', '').replace(botName, '');
                if (command.split('_').length > 1 && text.split(' ').length == 1) {
                    command = command.split('_')[0]
                    text = text.replace(botName, '').replace(/_/g, ' ')
                }
                if (text.split('http').length > 1) {
                    var prodUrl = text.split('http')[1].split(' ')[0]
                    if (prodUrl.split(`fkrt.it`).length > 1) {
                        sendMessage(`ℹ️ We detected that you have sent a link corresponding to fkrt.it\n\n➡️ We do not support <code>fkrt</code> domain. Please open link on flipkart and share link from the app. The link should either start with <code>flipkart.com</code> or <code>dl.flipkart.com</code> for bot to work.`, data)
                    } else if (prodUrl.split('myntra.com').length > 1) {
                        sendMessage(`ℹ️ Kindly read out bot name, it says ${botName}\n\n➡️ We do not support Myntra products which should be clear from but profile photo and instructions as well.\n\nI may work on them seperately and will notify you as soon as it is available.\n\nTill then feel free to track Flipkart Products. If you want to fasten the project, consider buying me a coffee by /donate`, data)
                    } else if (text[0] != '/') {
                        perform('get', 'http' + prodUrl, data)
                    }
                }

            } catch (e) { var command = null }
            try {
                if (text.split(' ').length > 1) {
                    perform(command, text.split(text.split(' ')[0] + ' ')[1], data)
                }
                try {
                    if (id == ownerid || isOwnerCallback) {
                        switch (command) {
                            case 'subhe':
                                subhe()
                                break;
                            case 'raat':
                                raat()
                                break;
                            case 'features':
                                var keyboardButtons = [
                                    { "text": "Working Report", "callback_data": `/report` },
                                    { "text": "Clear Clutter", "callback_data": `/clear` },
                                    { "text": 'Restart', "callback_data": '/restart 5' }
                                ]
                                sendButtonMessage(`Owner only features :\n\nReport - Get active working report of bot\nClear Clutter - Remove disabled user & their trackings\nRestart - Restart server\n\n/send {chat_id} {message} - Send message to given chat\n/inform {message} - Send message to all users\n/info {chat_id} - Get trackings of given user\n/delete {message_id} {chat_id} - Delete a specified message`, data, null, keyboardButtons)
                                break;
                            case 'clear':
                                clearClutter()
                                break;
                            case 'restart':
                                restart(text.split(' ')[1], data)
                                break;
                            case 'delete':
                                deleteMessage(null, text.split(' ')[1], text.split(' ')[2])
                                break;
                        }
                    }
                } catch (e) { }
                switch (command) {
                    case 'status':
                        workingReport(data)
                        break;
                    case 'help':
                        var after = updateNotice(true, data)
                        var helpMessage = `👜 Flipkart Tracker Bot\n\nThe bot allows you check out any product price and details from Flipkart through it's link and Search products briefly. You can also turn on the price tracker to monitor any ups or downs in the product price or it\'s stock availibility which you urge to buy!\n\nℹ️ Just forward any flipkart link here to get started\nOn sending product link, you will be send the lastest pricing, rating and it's highlights and on starting it's tracking you will get notified about any changes in product price\n\n<b>Other Commands :</b>\n🔎 <code>/search {keyword}</code> : To search the given keyword on flipkart\n<code>/spec {specs to search} {link/trackID}</code> : Show details about the specs in the product\nFor more info on this command, send /spec\n👜 /info : To show all produts set on track.\n\n<b>Note : </b> Tracking is done once in every ${after} minutes.\n\n☕ If you like my project consider buying me a coffee. Tap /donate for more info.`;
                        var keyboardButtons = [
                            { "text": "🧑🏻‍💻 Report a Problem", "callback_data": `/r` },
                            { "text": '☕ Buy me a coffee', "callback_data": '/donate' }
                        ]
                        sendButtonMessage(helpMessage, data, null, keyboardButtons)
                        break;
                    case 'r':
                        if (text.split(' ').length == 1) {
                            forceReply(feedbackMessage, data, null, 'Type your issue/feedback')
                        }
                        break;
                    case 'start':
                        var startMessage = '👋 Hello ' + data.message.from.first_name + '\n\n👜 Flipkart Tracker Bot allows you check out any product price and details from Flipkart through it\'s link and Search products briefly.\n\n📉 You can also turn on the price tracker to monitor any ups or downs in the product price or it\'s stock availibility which you urge to buy!\n\nTo get started send me any flipkart link.\n\nSend /help for more details';
                        sendMessage(startMessage, data)
                        try {
                            subscribe(id)
                        } catch (e) { }
                        break;
                    case 'donate':
                    case 'donation':
                        var keyboardButtons = [
                            { "text": '☕ Donate Now', "url": 'https://easy-upi.vercel.app/' }
                        ]
                        sendButtonMessage(`🧡 <b>Flipkart-Amazon Tracker Bot</b>\n\n➡️ A project started as a hobby now grew into an asset for all shoppers! The normal tracking is <i>free to use and open-source</i> as well. The bot is deployed consuming my server CPU and RAM and server time. Even a small donation is welcomed to make the project great!\n\nDonation will also grant you the following feature :\n - Unlimited trackings through pincode mode\n - Direct help from developer in case of any issue\n\n☕ If you appreciate my work the consider buying me a coffee.\n\n<b>UPI ID :</b> <code>dvishal485@okhdfcbank</code>`, data, null, keyboardButtons);
                        break;
                    case 'check':
                        try {
                            if (id == ownerid || isOwnerCallback) {
                                var bannedUser = false
                                var bannedId = 0
                                for (var a = 0; a < banned.length; a++) {
                                    if (id == banned[a]) {
                                        bannedUser = true
                                        bannedId = a
                                    }
                                }
                                if (bannedUser) {
                                    sendMessage('✋ You are banned from using /check command\n\nReason : ' + bannedReason[bannedId] + '\n\nℹ️ If you feel anything wrong or to lift the ban send a message to developer using :\n<code>/r followed by your message</code>', data)
                                } else {
                                    var d = sendMessage('Please wait while we check your products and it\'s price in the market 👜\n\nNote : The <code>/check</code> may take a long time to respond or may even fail in case of high number of trackings. Hence it is advised to use /info command.', data)
                                    if (text.split(' ').length > 1) {
                                        compare('yes', text.split(' ')[1])
                                    } else {
                                        compare('yes', data.message.chat.id)
                                    }
                                    deleteMessage(d)
                                }
                            }
                        } catch (e) { }
                        break;
                    case 'search':
                    case 'find':
                    case 'explore':
                        if (text.split(' ').length == 1) {
                            search('', data, 'compact', 'Flipkart')
                        }
                        break;
                    case 'info':
                        if ((isOwnerCallback || id == ownerid) && text.split(' ').length > 1) {
                            var infos = info(text.split(' ')[1])
                            for (var i = 0; i < infos.length; i++) {
                                sendMessage(infos[i], data)
                            }
                            var infos = info(text.split(' ')[1], true)
                            for (var i = 0; i < infos.length; i++) {
                                sendMessage(infos[i], data)
                            }
                        } else {
                            var infos = info(data.message.chat.id)
                            for (var i = 0; i < infos.length; i++) {
                                sendMessage(infos[i], data)
                            }
                            var infos = info(data.message.chat.id, true)
                            for (var i = 0; i < infos.length; i++) {
                                sendMessage(infos[i], data)
                            }
                        }
                        break;
                    case 'spec':
                    case 'specs':
                        if (text.split(' ').length == 1) {
                            sendMessage('👜 Product Specification Search\n\n⭐ To get all the specification of product with it\'s name, send the following command :\n - <code>/spec @ {product name}</code>\n<b>Example :</b> <code>/spec @ samsung galaxy f41</code>\n\n⭐ To get all the specification of product with it\'s link, send the following command :\n\n - <code>/spec {link}</code>\n<b>Example :</b> <code>/spec https://dl.flipkart.com/s/iLYCwCNNNN</code>\n\n⭐ To get some specific information, send command as follows :\n\n - <code>/spec {specs to search} {link}</code>\n<b>Example :</b> <code>/spec display https://dl.flipkart.com/s/iLYCwCNNNN</code>\n\n⚖️ You can search for multiple specs, just seperate each of the with space\n\n<b>Example :</b> <code>/spec battery display https://dl.flipkart.com/s/iLYCwCNNNN</code>\n\n⭐ You can also track specific specs of a product with it\'s name as follows :\n\n - <code>/spec {specs to search} @ {product name}</code>\n<b>Example :</b> <code>/spec processor @ samsung galaxy f41</code>\n\nℹ️ You can also use the Tracking ID instead of product link.', data)
                        }
                        break;
                    case 'all':
                        search('', data, 'split')
                        break;
                }

            } catch (e) {
                try {
                    var userProfile = data.my_chat_member
                    var jsonError = userProfile.new_chat_member
                    if (jsonError.user.id == 1864454704 && jsonError.status == 'kicked') {
                        //sendReport(`User ID <a href="tg://user?id=${userProfile.chat.id}">${userProfile.chat.id}</a> kicked out the bot`)
                        removeUser(userProfile.chat.id)
                    }
                } catch (ex) {
                    sendReport(`Head error : ${Error(e).message}\nError handled further by : ${Error(ex).message}\n\nUser Name : <code>${data.message.from.first_name}</code> (<code>${data.message.chat.id}</code>)\n<code>${text}</code>`)
                    sendReport(JSON.stringify(data, null, 2))
                    var keyboardButtons = [
                        { "text": "🧑🏻‍💻 Contact developer", "callback_data": `/r` },
                        { "text": "🔥 Help project grow", "callback_data": "/donate" }
                    ]
                    if (text != undefined) {
                        sendButtonMessage('🙇‍♂️ Some unknown error occured! Registering an issue with the developer on the same.\n\nIn order to give best experience to users, we suggest providing details of error directly to developer.', data, null, keyboardButtons)
                        sendReport('Error occured from user <code>' + data.message.from.first_name + '</code> (<code>' + data.message.chat.id + '</code>)\n\nMessage : ' + text)
                    }

                }
            }
        }
    } catch (error) {
        sendReport(Error(error).message)
        if (text != undefined) {
            sendMessage('🙇‍♂️ Sorry! I failed to follow your command!\n\nA fix will be worked upon as soon as possible.\n\nTo report error manually, send :\n<code>/r your problem here</code>', data)
            sendReport('Error occured from user <code>' + data.message.from.first_name + '</code> (<code>' + data.message.chat.id + '</code>)\n\nMessage : ' + text)
        }
    }
}
