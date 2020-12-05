//fetch data from github api
function fetchData(stack) {
    $('#fetchContainer').html("<h3 style='text-align:center;'>Fetching data from Github...</h3>")
    var request = new XMLHttpRequest()
    var file = ''
    if (stack == 1) {
        file = 'index.html'
    } else if (stack == 2) {
        file = 'index.js'
    }
    request.open('GET', `https://api.github.com/repos/libobearchen/canvasgame/contents/${file}`, true)
    request.onload = function () {
        var data = JSON.parse(this.response)
        var download_url = data.download_url

        //download source code
        var request1 = new XMLHttpRequest()
        request1.open('GET', download_url, true)
        request1.onload = function () {
            let backString = '<pre>' + checkCode(this.response.toString()) + '</pre>'
            $('#fetchContainer').html(backString)

        }
        request1.send()
    }
    request.send()
}

//function list template
function ULTemplate(items, element) {
    let resultsHTML = ""
    if (items) {
        for (i = 0; i < items.length - 1; i++) {
            resultsHTML += "<li>Function " + (i + 1) + " : " + items[i] + "</li>"
        }
    }
    element.innerHTML = resultsHTML
}

//analyse and change source code
function checkCode(code) {
    let functionArray = code.match(/function/g)
    ULTemplate(functionArray, document.getElementById("functions"))
    let replaceText = "<mark id='markWord'>$&</mark>"
    let returnStr = code.replace(/function/g, replaceText)
    return returnStr
}

$(document).ready(function () {
    //radio buttons listener
    $('input[type=radio][name=stack]').change(function () {
        fetchData(this.value)
    })

})
