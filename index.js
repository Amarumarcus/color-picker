
let colorData = []

// add event listeners to elements

document.addEventListener('click', (e) => {
    if (e.target.id === 'get-scheme') {
        handleGetSchemeBtn()
    } else if (e.target.dataset.color) {
        handleColorClick(e.target.dataset.color)
    }
})

// fetch colors scheme to chosen color from www.thecolorapi.com
function handleGetSchemeBtn() {
    const chosenColor = document.getElementById('chosen-color').value.slice(1)
    const chosenScheme = document.getElementById('chosen-scheme').value

    fetch(`https://www.thecolorapi.com/scheme?hex=${chosenColor}&mode=${chosenScheme}&count=5`, {method:"GET"})
        .then(res => res.json())
        .then(data => {
            colorData = data.colors
            render()
        })
}

// render pallet
function render() {
    let hexTextHtml = []

    for (let color of colorData) {
        hexTextHtml += `
            <div style="background-color: ${color.hex.value};" data-color='${color.hex.value}'></div>
            <p>${color.hex.value}</p>
        `
    }
    
    document.getElementById('scheme-container').innerHTML = hexTextHtml
}

// copy to clipbord
function handleColorClick(hexColor) {
    navigator.clipboard.writeText(hexColor)

    // toggle class for copy allert
    document.getElementById('message-container').classList.toggle("active")
    setTimeout(() => {document.getElementById('message-container').classList.toggle("active")}, 1000)
}

handleGetSchemeBtn()