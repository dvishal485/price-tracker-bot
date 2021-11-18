function deleteMessage(message, messageID, chatID) {
    if (message == null) {
        var message_id = messageID
        var chat_id = chatID
    } else {
        var message_id = message.result.message_id
        var chat_id = message.result.chat.id
    }
    try {
        UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/deleteMessage?message_id=' + message_id + '&chat_id=' + chat_id)
    } catch (e) { }
}
function forceReply(message, data, id, context) {
    try {
        if (data == null) {
            var chatId = String(id)
        } else {
            var chatId = data.message.chat.id
        }
        var reply = {
            'chat_id': chatId,
            'text': message,
            'parse_mode': 'HTML',
            'reply_markup': JSON.stringify({
                'force_reply': true,
                'input_field_placeholder': context
            }),
            'disable_web_page_preview': true,
            'allow_sending_without_reply': true
        }
        var method = 'sendMessage';
        var options = {
            'method': 'post',
            'contentType': 'application/json',
            'payload': JSON.stringify(reply)
        }
        var xt = UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/' + method, options);
        var data = JSON.parse(xt.getContentText())
        return data;
    } catch (e) {
        if (Error(e).message.split('blocked').length > 1 || Error(e).message.split('deactivated').length > 1) {
            removeUser(chatId)
        } else {
            sendReport(`Error while sending message : ${Error(e).message}`)
        }
        return null
    }
}

function sendButtonMessage(message, data, id, keyboardButtons) {
    try {
        if (data == null) {
            var chatId = String(id)
        } else {
            var chatId = data.message.chat.id
        }
        if (keyboardButtons.length > 2) {
            var newKeyboardArray = []
            for (var i = 0; i < keyboardButtons.length; i = i + 2) {
                if (i + 1 != keyboardButtons.length) {
                    newKeyboardArray.push([keyboardButtons[i], keyboardButtons[i + 1]])
                } else {
                    newKeyboardArray.push([keyboardButtons[i]])
                }
            }
            var keyboard = { "inline_keyboard": newKeyboardArray };
        } else {
            var keyboard = { "inline_keyboard": [keyboardButtons] };
        }
        try {
            var replyToMsg = data.message.message_id
            var reply = {
                'chat_id': chatId,
                'text': message,
                'parse_mode': 'HTML',
                'reply_to_message_id': replyToMsg,
                'reply_markup': JSON.stringify(keyboard),
                'disable_web_page_preview': true,
                'allow_sending_without_reply': true
            }
        } catch (e) {
            var reply = {
                'chat_id': chatId,
                'text': message,
                'parse_mode': 'HTML',
                'reply_markup': JSON.stringify(keyboard),
                'disable_web_page_preview': true,
                'allow_sending_without_reply': true
            }
        }
        var method = 'sendMessage';
        var options = {
            'method': 'post',
            'contentType': 'application/json',
            'payload': JSON.stringify(reply)
        }
        var xt = UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/' + method, options);
        var data = JSON.parse(xt.getContentText())
        return data;
    } catch (e) {
        if (Error(e).message.split('blocked').length > 1 || Error(e).message.split('deactivated').length > 1) {
            removeUser(chatId)
        } else {
            sendReport(`Error while sending message : ${Error(e).message}`)
        }
        return null
    }
}
function sendPhoto(url, caption, data, id) {
    if (data == null) {
        var chatId = String(id)
    } else {
        var chatId = data.message.chat.id
    }
    try {
        var replyToMsg = data.message.message_id
        reply = {
            'chat_id': chatId,
            'photo': url,
            'caption': caption,
            'parse_mode': 'HTML',
            'reply_to_message_id': replyToMsg,
            'disable_web_page_preview': true,
            'allow_sending_without_reply': true
        }
    } catch (e) {
        var reply = {
            'chat_id': chatId,
            'photo': url,
            'caption': caption,
            'parse_mode': 'HTML',
            'disable_web_page_preview': true,
            'allow_sending_without_reply': true
        }
    }
    var method = 'sendPhoto';
    var options = {
        'method': 'post',
        'contentType': 'application/json',
        'payload': JSON.stringify(reply)
    }
    try {
        var xt = UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/' + method, options);
        var data = JSON.parse(xt.getContentText())
        return data;
    } catch (e) {
        sendReport('Error while sending photo!')
        sendReport(Error(e).message)
        return null
    }
}

function sendMessage(message, data, id) {
    try {
        if (data == null) {
            var chatId = String(id)
        } else {
            var chatId = data.message.chat.id
        }
        try {
            var replyToMsg = data.message.message_id
            reply = {
                'chat_id': chatId,
                'text': message,
                'parse_mode': 'HTML',
                'reply_to_message_id': replyToMsg,
                'disable_web_page_preview': true,
                'allow_sending_without_reply': true
            }
        } catch (e) {
            var reply = {
                'chat_id': chatId,
                'text': message,
                'parse_mode': 'HTML',
                'disable_web_page_preview': true,
                'allow_sending_without_reply': true
            }
        }
        var method = 'sendMessage';
        var options = {
            'method': 'post',
            'contentType': 'application/json',
            'payload': JSON.stringify(reply)
        }
        var xt = UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/' + method, options);
        var data = JSON.parse(xt.getContentText())
        return data;
    } catch (e) {
        if (Error(e).message.split('blocked').length > 1 || Error(e).message.split('deactivated').length > 1) {
            removeUser(chatId)
        } else {
            sendReport(`Error while sending message : ${Error(e).message}`)
        }
        return null
    }
}

function sendReport(message) {
    return sendMessage(message, null, ownerid)
}
