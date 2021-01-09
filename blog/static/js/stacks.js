//global variables
let exampleArray = [
    //React
    [
        { repo: 'stockchart', path: 'src/App.js' },  //2 pages
        { repo: 'shop', path: 'client/src/components/App.js' }
    ],
    //React-Redux
    [
        { repo: 'shop', path: 'client/src/_reducers/user_reducer.js' },
        { repo: 'shop', path: 'client/src/_actions/user_actions.js' },
        { repo: '', path: '' }
    ],
    //jQuery
    [
        { repo: 'FlaskApp', path: 'blog/static/js/stacks.js' },
        { repo: 'PageAnalyse', path: 'popup.js' },
        { repo: '', path: '' }
    ],
    //Bootstrap
    [
        { repo: 'FlaskApp', path: 'blog/blueprints/page/templates/page/index.html' },
        { repo: 'FlaskApp', path: 'blog/blueprints/page/templates/page/projects.html' },
        { repo: '', path: '' }
    ],
    //Node
    [
        { repo: '', path: '' },
        { repo: '', path: '' },
        { repo: '', path: '' }
    ],
    //Node-Express
    [
        { repo: 'shop', path: 'server/index.js' },
        { repo: '', path: '' },
        { repo: '', path: '' }
    ],
    //Docker
    [
        { repo: '', path: '' },
        { repo: '', path: '' },
        { repo: '', path: '' }
    ],
    //Flask
    [
        { repo: 'FlaskApp', path: 'startup.py' },
        { repo: '', path: '' },
        { repo: '', path: '' }
    ],
    //MongoDB
    [
        { repo: 'shop', path: 'server/models/Product.js' },
        { repo: 'shop', path: 'server/routes/product.js' },
        { repo: '', path: '' }
    ],
    //MySQL
    [
        { repo: 'FlaskApp', path: 'blog/blueprints/post/models.py' },
        { repo: 'FlaskApp', path: 'blog/blueprints/page/routes.py' },
        { repo: '', path: '' }
    ]
]


//fetch data from github api
function fetchData(exampleIndex, examplePage, callback1, callback2) {
    $('#fetchContainer').html("<h3 style='text-align:center;'>Fetching data from Github...<br><br><p><i class='fa fa-spinner w3-spin' style='font-size:200px'></i></p></h3>")

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
                    let code = '<plaintext>' + callback1(this.response.toString())
                    console.log(code)
                    githubData.link = html_url
                    githubData.code = code
                    callback2(githubData, examplePage, exampleIndex)
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

//analyse and mark source code
function markCode(code) {
    let returnStr = code.split('\n').map((line, index) =>{
        let lineNumber=String(index + 1).padStart(4)
        return `${lineNumber}. ${line}`
    }).join('\n')
    /* let functionArray = code.match(/function/g)
    ULTemplate(functionArray, document.getElementById("functions"))
    let replaceText = "<mark id='markWord'>$&</mark>"
    let returnStr = code.replace(/function/g, replaceText) */
    return returnStr
}

//diaplay source code and links
function displayer(value, examplePage, exampleIndex) {
    let repoName = exampleArray[exampleIndex][examplePage].repo
    let repoLink = `https://github.com/libobearchen/${repoName}`
    $('#fetchContainer').html(value.code)
    $('#fileLink').attr('href', value.link)
    $('#fileLink').html('View this file on Github')
    $('#page').html(`${examplePage + 1}/${exampleArray[exampleIndex].length}`)
    $('#repo').html(`   From Github Repository: <a target="_blank" href=${repoLink}>${repoName}</a>`)
}

$(document).ready(function () {
    let exampleIndex = 0
    let examplePage = -1

    //radio buttons listener
    $('input[type=radio][name=stack]').change(function () {
        exampleIndex = this.value - 1
        examplePage = 0
        fetchData(exampleIndex, examplePage, markCode, displayer)
    })

    //arrow buttons listener
    $('#next').click(function () {
        if (examplePage > -1 && examplePage < exampleArray[exampleIndex].length - 1) {
            examplePage++
            fetchData(exampleIndex, examplePage, markCode, displayer)
        }
    })
    $('#previous').click(function () {
        if (examplePage >= 1) {
            examplePage--
            fetchData(exampleIndex, examplePage, markCode, displayer)
        }
    })

})
