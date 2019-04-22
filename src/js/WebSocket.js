var conn = new WebSocket('ws://localhost:8080')

conn.onopen = function (e) {
    console.log("Connection established!")


};


conn.onclose = function (e) {
    console.log("Connection Error...")
}


$(document).ready(function () {

    conn.onmessage = function (e) {
        var data = JSON.parse(e.data)
        var scrollHeight = $("#messages")[0].scrollHeight

        $("#messages table").append("<tr><td>ID[" + data.id + "]: " + data.msg + "</td></tr>")
        $("#message-txt").val("")

        $("#messages").animate({
            scrollTop: scrollHeight
        })
        console.log(e.data);
    };

    $("#message-txt").on("keyup", e => {
        if (e.keyCode == 13) {
            sendMessage()
        }
    })
    $("#send").click(function () {

        sendMessage()

    })

    function sendMessage() {

        var msg = $("#message-txt").val()
        if (msg != "") {

            var id = Math.floor((Math.random() * 10000) + 1);
            var data = {
                msg: msg,
                id: id
            }

            conn.send(JSON.stringify(data))
            console.log(data);
        }else{
            alert('Preeencha o campo!!')
        }

    }


})
