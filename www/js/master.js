// Serveur test (Baraffles)
//const API_URL = "http://390-server:1234/api.php";
// Serveur Prod (RR-MUNICIPALES)
const API_URL = "https://rr-municipales2020.fr/vigilie_beta/api.php";

window.current_page = "index";

// Master JS :
// Récupération d'état / de pages / de chargements.
function throw_error(error, title = "Une erreur est survenue.") {
    console.error(error);
    $("#master_modal_title").html(title);
    $("#master_modal_body").html(error);
    $('#masterModal').modal('show');
}

function send_message(message, title = "Information") {
    $("#master_modal_title").html(title);
    $("#master_modal_body").html(message);
    $('#masterModal').modal('show');
}

async function check_connection() {
    let rep;
    let err_msg;
    await $.post(
        API_URL, 
        {"request": "check"}, 
        function(data, status) {
            if (status== "success") {
                rep = data
            } else {
                console.error(status); 
                err_msg = status;
                rep=false
            } 
        }
        );
    if(rep == false) {
        let error_msg = "Une erreur est survenue lors de la connexion au servuer : "+err_msg+".<br>Il est toujours possible d'accèder au menu 'Urgences'.";
        throw_error(error_msg);
        return false;
    } else {
        console.log("Connexion avec le serveur disponible !");
        return true;
    }

}

async function askdata(request, data , token = "") {
    try {
    let response;
    await $.post(
        API_URL, 
        {
            request: request,
            data: data,
            token: token
        },
        function(downloaded_data, status) {
            if (status === "success") {
                response = downloaded_data;
            } else {
                response = false;
                let error_msg = "Une erreur est survenue lors de la connexion au servuer : "+status+".<br>";
                throw_error(error_msg);
            }
        }
        );
    // on vérifie si un token est passé
    if (response.data != null && response.data.token != undefined) {
        storeUserToken(response.data.token);
    }

    // on vérifie que l'api ne demande pas une redirection
    if (response != false && response.data !== null && response.data.redirect != undefined) {
        send_message(response.message);
        change_page(response.data.redirect);
    }
    return response;
    } catch(error) {
        throw_error("Une erreur de connexion est survenue lors de la requête, veuillez réessayer ultérieurement.", "Erreur de connexion");
        throw new Error("Échec de connexion");
    }
    
}

function closeloadingmodal() {
    $('#loadModal').modal({
        backdrop: true,
        keyboard: true
    });
    $("#loadModal").modal("hide");
}
function openloadingmodal() {
    $("loadModal").modal("show");
}


async function askdata_big(request, data , token = "") {
    try {
        // ouverture de la fenêtre de chargement
        let done = false;
        $("#loadModal").on('show.bs.modal', function (e) {
            if (done) {
            e.preventDefault();
            }
        })

        $('#loadModal').modal({
            backdrop: 'static',
            keyboard: false
        });
        openloadingmodal();

        
        
        LOAD_PG_PERCENT = 0;
        // let load_interval = setInterval(function(){ 
        //     if(LOAD_PG_PERCENT>=100) {
        //         LOAD_PG_PERCENT = 0;
        //     }  
        //     let pg = $("#load-pb");
        //     pg.attr("aria-valuenow",LOAD_PG_PERCENT);
        //     pg.css("width",LOAD_PG_PERCENT+"%");
        //     LOAD_PG_PERCENT+= 0.10;
            
        // }, 100);
        
        let response;
        await $.post(
            API_URL, 
            {
                request: request,
                data: data,
                token: token
            },
            function(downloaded_data, status) {
                if (status === "success") {
                    response = downloaded_data;
                } else {
                    response = false;
                    done = true;
                    closeloadingmodal()
                    let error_msg = "Une erreur est survenue lors de la connexion au serveur : "+status+".<br>";
                    throw_error(error_msg);
                }
            }
            );
        done = true;
        //clearInterval(load_interval);
        closeloadingmodal()
        // on vérifie si un token est passé
        if (response.data != null && response.data.token != undefined) {
            storeUserToken(response.data.token);
        }

        // on vérifie que l'api ne demande pas une redirection
        if (response != false && response.data !== null && response.data.redirect != undefined) {
            send_message(response.message);
            change_page(response.data.redirect);
        }

        return response;
    } catch (error) {
        closeloadingmodal()
        throw_error("Une erreur de connexion est survenue lors de la requête, veuillez réessayer ultérieurement.", "Erreur de connexion");
        throw new Error("Échec de connexion");
    }

}


async function change_page(page_name) {
    // récupération de la page
    let request = {"page":page_name};
    let response;
    if (getUserToken() != false) {
        response = await askdata("get_page",request, getUserToken());
    } else {
        response = await askdata("get_page",request);
    }
    
    if (response != false) { 
        if(response.success == true) {
            console.log(response.message);
            $("#container").html(response.data.page);
        } else {
            throw_error(response.message);
        }
    }
}

function storeUserToken(token) {
    let b64token = btoa(token);
    // expiration
    var d = new Date();
    d.setTime(d.getTime() + (7*24*60*60*1000));
    let cookie = "userToken="+b64token+"; expires="+d.toUTCString()+"; path=/";
    console.log(cookie);
    document.cookie = cookie;
}

function getUserToken() {
    // récupération des cookies
    let cookies = decodeURIComponent(document.cookie).split("; ");
    let found = false;
    let content = "";
    for(let cookie of cookies) {
        if (cookie.includes("userToken=")) {
            content = cookie.split("userToken=")[1];
            found=true;
        }
    }
    if (found) {
        return atob(content);
    } else {
        return false;
    }
}

function logout() {
    document.cookie = "userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.cookies.clear(function() {
        console.log('Cookies cleared!');
    });
    location.reload();
}

