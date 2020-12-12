//change active tabs and show the right content
function changeActive(id) {
    //make ids for tabs and contents
    let tabID = 'tab' + id;
    let contentID = 'content' + id;
    //change tabs
    let containerTabs = document.querySelector("#tabs");
    let tabs = containerTabs.querySelectorAll("a");
    for (i in tabs) {
        //tabs[i].className = 'nav-link';
    }
    //document.getElementById(tabID).className = "nav-link active";

    //change contents
    let containerContents = document.querySelector("#contents");
    let contents = containerContents.querySelectorAll("div");
    for (i in tabs) {
        tabs[i].className = 'tab-pane';
    }
    document.getElementById(contentID).className = "tab-pane active show";
}


//run function after the page loaded completely
document.addEventListener('DOMContentLoaded', function () {
    //get variable from url
    let pathArray = window.location.pathname.split('/');
    let parameter = pathArray[pathArray.length - 1];

    changeActive(parameter)
}, false);

//generate org charts
$(function () {
    $('#chart1').orgChart({ container: $('#chartContainer1') });
    $('#chart2').orgChart({ container: $('#chartContainer2') });
    $('#chart3').orgChart({ container: $('#chartContainer3') });
    $('#chart4').orgChart({ container: $('#chartContainer4') });
})