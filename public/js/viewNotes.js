window.onload = event => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log("Signed in as " + user.displayName);
            const googleUserId = user.uid;
            getNotes(googleUserId)
        } else {
            window.location = "index.html";
        }
    })
}

const getNotes = (userId) => {
    const notesRef = firebase.database().ref(`users/${userId}`)
    notesRef.on('value', (snapshot) => {
        const data = snapshot.val()
        renderDataAsHtml(data)
    })
}

const renderDataAsHtml = (data) => {
    let cards = ``
    for (const noteItem in data) {
        const note = data[noteItem];
        const ans = document.querySelector("#label")
        console.log("why")
        if(note.label === ans) {
            cards += createCard(note)
        }
        else if(note.label === "") {
            cards += createCard(note)
        }
        else {
            cards += createCard(note)
        }
    }
    document.querySelector("#app").innerHTML = cards
}

const createCard = (note) => {
    return `
        <div class="column is-one-quarter">
            <div id="random"class="card" style="background-color:${getRandomColor()};">
                <header class="card-header">
                    <p class="card-header-title">${note.title}</p>
                </header>
                <div class="card-content">
                    <div class="content">${note.text}</div>
                </div>
            </div>
        </div>             
    `
}
function getRandomColor() {
  let colors = "#" + Math.floor(Math.random()*16777215).toString(16);
  return colors;
}