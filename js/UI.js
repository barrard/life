function AddInput(type, parent, label) {
    const input = document.createElement("input");
    const inputLabel = document.createElement("label");
    numInput.type = type;
    numInputLabel.innerText = label;
    addStuffSpot.appendChild(inputLabel);
    addStuffSpot.appendChild(input);
    return;
}
