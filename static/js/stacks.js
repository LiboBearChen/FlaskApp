//fetch data from github api
function fetchData(stack) {
    $('#fetchContainer').html("<h3 style='text-align:center;'>Fetching data from Github...</h3>")
    var request = new XMLHttpRequest()
    var file = ''
    if (stack==1) {
        file = 'index.html'
    } else if(stack==2){
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
            let backString = '<plaintext>' + this.response.toString()
            $('#fetchContainer').html(backString)
            colorTags(this.response.toString())
        }
        request1.send()
    }
    request.send()
}

//color tags
function colorTags(code){
    let wordArray = code.match(/function/g)
    console.log(wordArray)
}

$(document).ready(function(){
    //radio buttons listener
    $('input[type=radio][name=stack]').change(function() {
        fetchData(this.value)
    })

})
