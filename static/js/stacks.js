//global variables
let githubData = { codeArray: [], linkArray: [] }
let exampleArray = [
    { repo: 'canvasgame', path: 'index.html' },
    { repo: 'canvasgame', path: 'index.js' }
]

//fetch data from github api
function fetchData(stack, callback) {
    $('#fetchContainer').html("<h3 style='text-align:center;'>Fetching data from Github...</h3>")

    githubData = { codeArray: [], linkArray: [] }
    let url=`https://api.github.com/repos/libobearchen/${exampleArray[i].repo}/contents/${exampleArray[i].path}`

    //fetch data from github
    let request1 = new XMLHttpRequest()
    request1.open('GET', url, true)
    request1.onload = function () {
        if (request1.status == 200) {
            let data = JSON.parse(this.response)
            let download_url = data.download_url
            let html_url = data.html_url

            //download source code
            let request2 = new XMLHttpRequest()
            request2.open('GET', download_url, true)
            request2.onload = function () {
                if (request1.status == 200) {
                    let code = '<plaintext>' + checkCode(this.response.toString())
                    githubData.codeArray.push(code)
                    githubData.linkArray.push(html_url)
                } else {
                    $('#fetchContainer').html('Failed to download the source code!')
                }
            }
            request2.send()
        } else {
            $('#fetchContainer').html('Failed to fetch the data from Github!')
        }
    }
    request1.send()

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

//diaplay source code and link
function displayer(value, codeIndex) {
    $('#fetchContainer').html(value.codeArray[codeIndex])
    $('#urlLink').attr('href', value.linkArray[codeIndex])
    $('#urlLink').html('Check this file on Github')
    console.log(value)
}

$(document).ready(function () {
    let codeIndex = 0

    //radio buttons listener
    $('input[type=radio][name=stack]').change(function () {

        codeIndex = 0

        fetchData(this.value, displayer)

    })

    //arrow buttons listener
    /* $('#').click(function () {
        for(i in data.urlArray){
            data.urlArray[i]
            index++
        }
        $('#fetchContainer').html(code)
        $('#urlLink').attr('href', url)
        $('#urlLink').html('Check this file on Github')
    }) */

})
