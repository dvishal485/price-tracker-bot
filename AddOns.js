function crop(text) {
    return truncateText(text, 55)
}

function truncateText(text, length) {
    if (text.length <= length) {
        return text;
    }
    var str = String(text.substr(0, length)).trim()
    var x = str.split(' ')
    return (str.replace(x[x.length - 1], '')).trim()
}

function minimum(number1, number2) {
    if (number1 > number2) {
        return number2
    } else {
        return number1
    }
}
function answerCallbackQuery(data, text) {
    var callback_query_id = data.id
    //sendReport(`Callback Query ID : ${callback_query_id}`)
    var current = {
        'callback_query_id': callback_query_id,
        'text': text
    }
    var method = 'answerCallbackQuery';
    var options = {
        'method': 'post',
        'contentType': 'application/json',
        'payload': JSON.stringify(current)
    }
    try {
        var xt = UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/' + method, options);
        var data = JSON.parse(xt.getContentText())
        return data;
    } catch (e) {
        sendReport('Failed to answer callback query')
        sendReport(Error(e).message)
    }
}

function pincodeAPI(link, pincode) {
    var apiURL = `https://flipkart-product-stock.herokuapp.com/product?link=${link}&pincode=${pincode}`
    try {
        var content = UrlFetchApp.fetch(apiURL).getContentText()
        var json = JSON.parse(content)
        return json
    } catch (e) {
        sendReport(`Link : ${link}\nPincode : ${pincode}\n\nResponse :\n<code>${content}</code>`)
        return { 'error': 'API timing' }
    }
}

function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function inr(amount) {
    return Intl.NumberFormat('en-IN').format(parseInt(amount))
}
function fetchAPI(url) {
    const api = 'https://flipkart.dvishal485.workers.dev/product/min/'
    var link = String(url).replace('https://', '').replace('http://', '').replace('://', '').replace('s://', '').replace('dl.flipkart.com/dl/', '').replace('dl.flipkart.com/', '').replace('www.flipkart.com/', '').replace('flipkart.com/', '').replace('fkrt.it', '')
    var link = api + encodeURI(link)
    var json = null
    try {
        Utilities.sleep(500)
        json = JSON.parse(String(UrlFetchApp.fetch(link)))
    } catch (e) {
        try {
            Utilities.sleep(2000)
            json = JSON.parse(String(UrlFetchApp.fetch(link)))
        } catch (ex) {
            sendReport(`${Error(ex).message}\n\nLink : ${link}`)
            json = null
        }
    }
    return json
}

function fetchAmazonAPI(url) {
    const api = 'https://amazon-scraper.dvishal485.workers.dev/product/'
    var link = String(url).replace('https://www.amazon.in/', '').replace('https://', '').replace('http://', '').replace('://', '').replace('amazon.in', '').replace('www.', '')
    var link = api + encodeURI(link)
    var json = null
    try {
        Utilities.sleep(500)
        json = JSON.parse(String(UrlFetchApp.fetch(link)))
    } catch (e) {
        try {
            Utilities.sleep(2000)
            json = JSON.parse(String(UrlFetchApp.fetch(link)))
        } catch (ex) {
            sendReport(`${Error(ex).message}\n\nLink : ${link}`)
            json = null
        }
    }
    //sendReport(JSON.stringify(json,null,4))
    return json
}
function fetchSpecs(specs, url) {
    const apiSpec = 'https://flipkart.dvishal485.workers.dev/property/'
    var link = String(url).replace('https://', '').replace('http://', '').replace('://', '').replace('s://', '').replace('dl.flipkart.com/dl/', '').replace('dl.flipkart.com/', '').replace('www.flipkart.com/', '').replace('flipkart.com/', '').replace('fkrt.it', '')
    var link = apiSpec + specs + '/' + encodeURI(link)
    // sendReport(link)
    const json = JSON.parse(String(UrlFetchApp.fetch(link)))
    return json
}
