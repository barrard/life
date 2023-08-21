console.log("UI");
function UI() {
    return {
        colorSelect({
            allLifeTypes,
            parent,
            initialValue,
            onEvent,
            eventHandler,
        }) {
            const select = document.createElement("select");
            if (initialValue) {
                select.value = initialValue;
                select.style.backgroundColor = initialValue;
            } else {
                const option = document.createElement("option");
                option.value = "";
                option.textContent = "Select";
                // option.style.backgroundColor = life.color;
                select.appendChild(option);
            }
            allLifeTypes.forEach((life) => {
                const option = document.createElement("option");
                option.value = life.color;
                option.textContent = life.color;
                option.style.backgroundColor = life.color;
                select.appendChild(option);
            });

            if (onEvent && eventHandler) {
                select.addEventListener(onEvent, function (e) {
                    console.log(e.target.value);
                    eventHandler(select);
                });
            }
            parent.appendChild(select);
        },
        addButton({ btnText, clickHandler, parent }) {
            const btn = document.createElement("button");
            btn.innerHTML = btnText;
            btn.addEventListener("click", clickHandler);
            parent.appendChild(btn);
        },
        addColorBox({ color, parent }) {
            const box = document.createElement("div");
            box.style.width = "10px";
            box.style.height = "10px";
            box.style.marginRight = "10px";
            box.style.display = "inline-block";
            box.style.background = color;
            parent.appendChild(box);
        },
        addInput({
            type,
            parentDom,
            label,
            initialValue,
            onEvent,
            eventHandler,
        }) {
            const input = document.createElement("input");
            input.type = type;
            if (initialValue !== undefined) {
                input.value = initialValue;
            }
            if (label) {
                const inputLabel = document.createElement("label");
                inputLabel.innerText = label;
                inputLabel.style.display = "block";
                inputLabel.style.paddingTop = "1em";
                parentDom.appendChild(inputLabel);
                parentDom.appendChild(input);
            }
            if (onEvent && eventHandler) {
                input.addEventListener(onEvent, eventHandler);
            }
            return;
        },
    };
}
