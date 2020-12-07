//global variables
let data
let index

//fetch data from github api
function fetchData(stack) {
    $('#fetchContainer').html("<h3 style='text-align:center;'>Fetching data from Github...</h3>")

    let returnData = { codeArray: [], urlArray: [] }
    let exampleArray = []

    if (stack == 1) {
        exampleArray = [
            { repo: 'canvasgame', path: 'index.html' },
            { repo: 'canvasgame', path: 'index.js' }
        ]
    } else if (stack == 2) {
        exampleArray = [
            { repo: 'canvasgame', path: 'index.js' }
        ]
    }

    //loop through all examples
    for (i in exampleArray) {
        let request1 = new XMLHttpRequest()
        request1.open('GET', `https://api.github.com/repos/libobearchen/${exampleArray[i].repo}/contents/${exampleArray[i].path}`, true)
        request1.onload = function () {
            if (request1.status == 200) {
                let data = JSON.parse(this.response)
                let download_url = data.download_url
                let url = data.html_url

                //download source code
                let request2 = new XMLHttpRequest()
                request2.open('GET', download_url, true)
                request2.onload = function () {
                    if (request1.status == 200) {
                        let code = '<plaintext>' + checkCode(this.response.toString())
                        returnData.codeArray.push(code)
                        returnData.urlArray.push(url)
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
        index = 0
        fetchData(this.value)
        console.log(data)
        $('#fetchContainer').html(data.codeArray[index])
        $('#urlLink').attr('href', data.urlArray[index])
        $('#urlLink').html('Check this file on Github')
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
