

var drone = new ScaleDrone('w5KH0DMG4aMcU8Cu');
var numUsers = 0;

drone.on('open', function (error) {
    if (error) return console.log(error);

    var room = drone.subscribe('general-chat');

    room.on('open', function (error) {
        if (error) return console.log(error);
        console.log('Connected to room.');
    });

    room.on('data', addMessageToScreen, notifyMe);
});



function onSubmitForm(event) {
      var nameEl = document.querySelector('.input.name');
      var contentEl = document.querySelector('.input.content');

      if (nameEl.value && contentEl.value) {
          sendMessageToScaleDrone(nameEl.value, contentEl.value);
          contentEl.value = '';
      } else if (!nameEl.value) {
        nameEl.value = 'Anonymous'
      } else if (!contentEl.value) {
        alert("Can't send a empty message.");
      }
}

function sendMessageToScaleDrone(name, content) {
    drone.publish({
        room: 'general-chat',
        message: {
            name: name,
            content: content
        }
    });
}


function addMessageToScreen(message) {
    var div = document.createElement('div');

    div.classList.add('message');
    document.querySelector('.text-area').appendChild(div);

    window.scrollTo(0, document.body.scrollHeight);
    notifyMe();
    console.log(message.name + " sent:" + message.content)

    var lowerMessage = message.content.toLowerCase()

    let filter = lowerMessage.replace('nigger', '******',).replace('n i g g e r', '* * * * * *');
    filter = lowerMessage.replace('https', "Link; Not allowed.")

    // Admin Checker
    var d = new Date();
    if (message.name == "BM-2342") {
        div.innerHTML = d.getHours() + ":" + d.getMinutes() + " : " + "<b>" + '<p style="display:inline; Color:#eb0e0e;">[Admin]</p>' + "</b>" + " : " + "<b>" + "Something: " + "</b>" + filter;
    } else if (message.name == "SYSTEM") {
        div.innerHTML = d.getHours()+":"+d.getMinutes()+":"+'<b>' + message.name + "</b>" + '<p style="display:inline; Color:#999999;">⚙</p>: '  + filter; 
    } else {
        div.innerHTML =  d.getHours() + " : " + d.getMinutes() + " : " + '<b>' + message.name + '</b>: ' + filter;
    }


    // Bad Name Checker
    if (nameEl == "Nigger".toLowerCase()) {
        nameEl = "Random"
        alert("User Kicked; Via Automated System for Racial Slur in the users name.")
    } else if (nameEl =="Fucker".toLowerCase()) {
        nameEl = "Random"
        alert("User Kicked; Via Automated System for The users name has a word in the name thats not allowed.");
    } else if (nameEl == "Bitch".toLowerCase()) {
        nameEl = "Random"
        alert("User Kicked; Via Automated System for The users name has a word in the name thats not allowed.");
    } else if (nameEl == "Cunt".toLowerCase()) {
        nameEl = "Random"
        alert("User Kicked; Via Automated System for the users name has a word in the name thats not allowed.");
    } else if (nameEl == "Gay".toLowerCase()) {
        nameEl = "Random"
        alert("User Kicked; Via Automated System for the users name has a word in the name thats not allowed.");
    }



    // Commands
    if (message.content == "/time") {
        var d = new Date();
        var nameEl = document.querySelector('.input.name');
        if (nameEl.value === 'BM-2342') {
             sendMessageToScaleDrone("SYSTEM", "Something," + " The time is " + d.getHours() + ":" + d.getMinutes());
        } else {
        sendMessageToScaleDrone("SYSTEM", message.name + ", the time is " + d.getHours() + ":" + d.getMinutes());
    } else if (message.content == "/systemerror") {
        if (message.name == "BM-2342") {
            sendMessageToScaleDrone("SYSTEM", " ERROR MANUALLY CALLED BY Something");
        } else {
            sendMessageToScaleDrone("SYSTEM", message.name + ", you dont have permissions to call that command!");
        } 
    } else if (message.content == "/log") {
        update();
        message.delete();
    } 
}

document.addEventListener('DOMContentLoaded', function () {
    if (!Notification) {
        console.warn('Desktop notifications are not avaiable in your browser. Try Chromium');
        const string = 'Desktop notifications are not avaiable in your browser. Try Chromium';
        alert(string)
        return;
    }

    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
});

function notifyMe(message) {
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    } else {
        var nameEl = document.querySelector('.input.name');
        var contentEl = document.querySelector('.input.content');

        var notification = new Notification('Chatroom', {
            icon: '',
            body: nameEl.value + " : " + contentEl.value,
            vibrate: [100, 50, 100]
        });

        notification.onclick = function () {
            window.open("index.html");
        };
    }

    function Close() {
        var nameEl = document.querySelector('.input.name');
        if (nameEl.value == "") {
            sendMessageToScaleDrone("SYSTEM", + "Someone Has Left The Chat.");
        } else {
            if (nameEl === 'BM-2342') return sendMessageToScaleDrone("Someone, Has Left The Chat.");

            sendMessageToScaleDrone("SYSTEM", `${nameEl}` + "Has Left The Chat.");
        }
    }
    function CloseWindow() {
        window.close();
    }

    window.closed = function() {
        var nameEl = document.querySelector('.input.name');
        if (nameEl === 'BM-2342') return sendMessageToScaleDrone("Someone, Has Left The Chat.");
        sendMessageToScaleDrone("SYSTEM", `${nameEl} Has Left The Chat.`);
    }

    function Load() {
        sendMessageToScaleDrone("SYSTEM", "Someone Joined The Chat!");
    }

    function offline() {
        alert("You are offline. Chatroom doesn't operate offline, please connect to the internet.");
    }

    function Error() {
        alert("Error: Alert a Admin!");
    }

   function errorMessage() {
        sendMessageToScaleDrone("SYSTEM", " THERE IS CURRENTLY AN INTERNAL ERROR WITH THE SITE.");
    }
}
