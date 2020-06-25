document.getElementById("urgency").addEventListener("click",function(listener) { changeLocalPage("urgence") });
document.getElementById("register").addEventListener("click", function(listener) { change_page("register")});
document.getElementById("login").addEventListener("click", function(listener) { change_page("login")});
function changeLocalPage(pagename) {
    location.replace(pagename+".html");
}