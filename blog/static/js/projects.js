//change active tabs and show the right content
function changeActive(id) {
    //make ids for tabs and contents
    let tabID = '#tab' + id;
    let target = document.querySelector(tabID);
    target.click()
}

//run function after the page loaded completely
document.addEventListener('DOMContentLoaded', function () {
    //get variable from url
    let pathArray = window.location.pathname.split('/');
    let parameter = pathArray[pathArray.length - 1];
    changeActive(parameter);
}, false);

//generate org charts
$(function () {
    $('#chart1').orgChart({ container: $('#chartContainer1') });
    $('#chart2').orgChart({ container: $('#chartContainer2') });
    $('#chart3').orgChart({ container: $('#chartContainer3') });
    $('#chart4').orgChart({ container: $('#chartContainer4') });
})