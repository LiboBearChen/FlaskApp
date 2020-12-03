//fetch data from github api
function fetchData(stack) {
    console.log(stack)
    var request = new XMLHttpRequest()
    var file = 'ssssssssss'
    if (stack===1) {
        file = 'index.html'
    } else if(stack===2){
        file = 'index.js'
    } 
    console.log(file)
    request.open('GET', `https://api.github.com/repos/libobearchen/canvasgame/contents/${file}`, true)
    request.onload = function () {
        var data = JSON.parse(this.response)
        var download_url = data.download_url

        //down load source code
        var request1 = new XMLHttpRequest()
        request1.open('GET', download_url, true)
        request1.onload = function () {
            let backString = '<plaintext>' + this.response.toString()
            $('#fetchContainer').html(backString)
        }
        request1.send()
    }
    request.send()
}

$(document).ready(function(){
    //radio buttons listener
    $('input[type=radio][name=stack]').change(function() {
        console.log(this.value)
    })

})
