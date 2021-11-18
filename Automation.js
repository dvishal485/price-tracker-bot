function subhe() {
    del()
    ScriptApp.newTrigger('pincodeBatchCompare').timeBased().everyMinutes(5).create();
    ScriptApp.newTrigger('raat').timeBased().atHour(1).nearMinute(45).inTimezone('Asia/Kolkata').everyHours(1).create()
    var keyboardButtons = [
        { "text": "Turn Off", "callback_data": `/raat` }
    ]
    sendButtonMessage('🌞 Turned on Pincode mode feature!', null, ownerid, keyboardButtons)
}
function raat() {
    del()
    ScriptApp.newTrigger('subhe').timeBased().atHour(10).nearMinute(30).inTimezone('Asia/Kolkata').everyHours(1).create()
    var keyboardButtons = [
        { "text": "Turn On", "callback_data": `/subhe` }
    ]
    sendButtonMessage('🌑 Turned off Pincode mode feature!', null, ownerid, keyboardButtons)
}

function batchCompare() {
    compare(null, null, true)
}
function pincodeBatchCompare() {
    pincodeCompare(null, null, true)
}

function restart(time, data) {
    // Do not use restart function
    try {
        var t = parseInt(time)
        if (t == 5 || t == 10 || t == 30 || t == 15) {
            del()
            ScriptApp.newTrigger('batchCompare').timeBased().everyMinutes(t).create();
            sendMessage(`Running code every ${t} minute`, data)
        }
    } catch (e) { sendReport(Error(e).message) }
}

function del() {
    var Triggers = ScriptApp.getProjectTriggers();
    for (var i = 0; i < Triggers.length; i++) {
        ScriptApp.deleteTrigger(Triggers[i])
    }
}