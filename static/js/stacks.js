//fetch data from github api
var request=new XMLHttpRequest()
request.open('GET','https://api.github.com/users/libobearchen/repos',true)
request.onload=function(){
    var data=JSON.parse(this.response)
    var statusHTML='<table><thead><tr><th>Name</th><th>Language</th></tr></thead><tbody>'
    $.each(data,function(i,status){
        statusHTML+='<tr>'
        statusHTML+='<td>'+status.name+'</td>'
        statusHTML+='<td>'+status.language+'</td>'
        statusHTML+='</tr>'
    })
    statusHTML+='</tbody></table>'
    $('#fetchContainer').html(statusHTML)
}
request.send()