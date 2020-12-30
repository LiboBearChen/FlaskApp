/* document.addEventListener('mousewheel', function(e) {e.preventDefault();}, {passive: false});
document.addEventListener('touchmove', function(e) {e.preventDefault();}, {passive: false}); */

/* addEventListener(document, "mousewheel", function (e) {
    console.log(e.defaultPrevented);  // will be false
    e.preventDefault();   // does nothing since the listener is passive
    console.log(e.defaultPrevented);  // still false
}, {passive: true});

addEventListener(document, "touchmove", function (e) {
    console.log(e.defaultPrevented);  // will be false
    e.preventDefault();   // does nothing since the listener is passive
    console.log(e.defaultPrevented);  // still false
}, {passive: true}); 
 */