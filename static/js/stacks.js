//fetch data from github api
var request = new XMLHttpRequest()
request.open('GET', 'https://api.github.com/repos/libobearchen/canvasgame/contents/index.html', true)
request.onload = function () {
    var data = JSON.parse(this.response)
    var download_url = data.download_url

    //down load source code
    var request1 = new XMLHttpRequest()
    request1.open('GET', download_url, true)
    request1.onload = function () {
        $('#fetchContainer').html(this.response)
    }
    request1.send()
}
request.send()

/* var statusHTML = '<table><thead><tr><th>Name</th><th>Language</th></tr></thead><tbody>'
$.each(data, function (i, status) {
    statusHTML += '<tr>'
    statusHTML += '<td>' + status.name + '</td>'
    statusHTML += '<td>' + status.language + '</td>'
    statusHTML += '</tr>'
})
statusHTML += '</tbody></table>'
$('#fetchContainer').html(statusHTML) */