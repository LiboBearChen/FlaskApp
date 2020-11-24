//change active tabs and show the right content
function changeActive(id) {
    var tabs = document.querySelectorAll("#tabs a");
    for (i in tabs) {
        tabs[i].className = 'nav-link';
    }
    
    console.log(tabs)
    document.getElementById(id).className = "nav-link active";
}

changeActive()
