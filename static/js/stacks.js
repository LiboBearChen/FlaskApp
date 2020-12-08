//global variables



let exampleArray = [
    [
        { repo: 'canvasgame', path: 'index.html' },  //2 pages
        { repo: 'textreader', path: 'style.css' }
    ],
    [
        { repo: 'textreader', path: 'index.html' },
        { repo: 'canvasgame', path: 'index.js' },
        { repo: 'stockchart', path: 'package.json' }
    ]
]


//fetch data from github api
function fetchData(exampleIndex, examplePage, callback) {
    $('#fetchContainer').html("<h3 style='text-align:center;'>Fetching data from Github...</h3>")

    let githubData = { code: '', link: '' }
    let url = `https://api.github.com/repos/libobearchen/${exampleArray[exampleIndex][examplePage].repo}/contents/${exampleArray[exampleIndex][examplePage].path}`

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
                    githubData.code = code
                    githubData.link = html_url
                    callback(githubData, examplePage, exampleIndex)
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
function displayer(value, examplePage, exampleIndex) {
    $('#fetchContainer').html(value.code)
    $('#urlLink').attr('href', value.link)
    $('#urlLink').html('View this file on Github')
    $('#page').html(`${examplePage + 1}/${exampleArray[exampleIndex].length}`)
}

$(document).ready(function () {
    let exampleIndex = 0
    let examplePage = -1

    //radio buttons listener
    $('input[type=radio][name=stack]').change(function () {
        exampleIndex = this.value - 1
        examplePage = 0
        fetchData(exampleIndex, examplePage, displayer)
    })

    //arrow buttons listener
    $('#next').click(function () {
        if (examplePage > -1 && examplePage < exampleArray[exampleIndex].length - 1) {
            examplePage++
            fetchData(exampleIndex, examplePage, displayer)
        }
    })
    $('#previous').click(function () {
        if (examplePage >= 1) {
            examplePage--
            fetchData(exampleIndex, examplePage, displayer)
        }
    })

})
