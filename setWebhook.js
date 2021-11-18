const script =
    'https://script.google.com/macros/s/xxxxxxxxxxx/exec' // deployed script url

function setWebhook() {
    Logger.log(UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/setWebhook?url=' + script))
}