console.log("life");

if (document.readyState !== "loading") init();
else document.addEventListener("DOMContentLoaded", init);

function init() {
    console.log("loaded");
    const h = window.innerHeight;
    const w = window.innerWidth;
    const cvs = document.getElementById("life-canvas");
    cvs.width = w;
    cvs.height = h;
    console.log(cvs);
    const ctx = cvs.getContext("2d");
    console.log(ctx);
    let ui = new UI();

    /**
     * START UI LOGIC
     */
    const allLifeTypes = [
        { color: "#ff0000", count: 30 },
        { color: "#00ff00", count: 300 },
        { color: "#ffff00", count: 90 },
    ];
    let allRules = [
        { g1: "#00ff00", g2: "#00ff00", g: -0.32 },
        { g1: "#00ff00", g2: "#ff0000", g: -0.17 },
        { g1: "#00ff00", g2: "#ffff00", g: 0.34 },
        { g1: "#ff0000", g2: "#ff0000", g: -0.1 },
        { g1: "#ff0000", g2: "#00ff00", g: -3.4 },
        { g1: "#ffff00", g2: "#ffff00", g: 0.15 },
        { g1: "#ffff00", g2: "#00ff00", g: -0.2 },
    ];

    let currentAdd = false;

    function addLife() {
        const newLifeData = {
            count: 0,
            color: "#ff0000",
            rules: [],
        };
        //find the add spot place and create inputs
        const addStuffSpot = document.getElementById("addStuffSpot");
        // Life needs a name, color, and count
        ui.addInput({
            type: "number",
            parentDom: addStuffSpot,
            label: "Life Count",
            initialValue: newLifeData.count,
            onEvent: "input",
            eventHandler: (e) => {
                newLifeData.count = e.target.value;
            },
        });
        ui.addInput({
            type: "color",
            parentDom: addStuffSpot,
            label: "Life Color",
            onEvent: "input",
            eventHandler: (e) => {
                console.log(e.target.value);
                newLifeData.color = e.target.value;
            },
        });

        ui.addButton({
            parent: addStuffSpot,
            btnText: `&#9989;`,
            // onEvent: "click",
            clickHandler: () => {
                allLifeTypes.push(newLifeData);
                listLifeTypes();
                addStuffSpot.innerHTML = "";
                runLife();
            },
        });
    }

    //show a list of life types
    function listLifeTypes() {
        const groupListSpot = document.getElementById("groupList");
        groupListSpot.innerHTML = "";

        //Color  and Count  labels
        allLifeTypes.forEach((lifeType, i) => {
            if (lifeType.edit) {
                const container = document.createElement("div");

                ui.addInput({
                    type: "color",
                    parentDom: container,
                    label: "Life Color",
                    onEvent: "input",
                    initialValue: lifeType.color,

                    eventHandler: (e) => {
                        lifeType.originalColor = lifeType.color;
                        console.log(lifeType.originalColor);
                        lifeType.newColor = e.target.value;
                        // lifeType.color = e.target.value;
                        // listLifeTypes();
                    },
                });

                ui.addInput({
                    type: "number",
                    parentDom: container,
                    label: "Life Count",
                    initialValue: lifeType.count,
                    onEvent: "input",
                    eventHandler: (e) => {
                        lifeType.count = e.target.value;
                    },
                });

                ui.addButton({
                    parent: container,
                    btnText: `&#9989;`,
                    // onEvent: "click",
                    clickHandler: () => {
                        console.log("OK");
                        lifeType.edit = false;
                        if (
                            lifeType.newColor &&
                            lifeType.newColor !== lifeType.color
                        ) {
                            //need to update all the rules
                            allRules.forEach((rule) => {
                                let { g1, g2 } = rule;
                                if (g1 === lifeType.color) {
                                    rule.g1 = lifeType.newColor;
                                }
                                if (g2 === lifeType.color) {
                                    rule.g2 = lifeType.newColor;
                                }
                            });
                            lifeType.color = lifeType.newColor;
                            listRules();
                        }
                        listLifeTypes();
                        runLife();
                    },
                });
                groupListSpot.appendChild(container);
            } else {
                //show a box with the color
                const container = document.createElement("div");
                container.style.padding = ".5em";

                ui.addColorBox({ color: lifeType.color, parent: container });

                //show the count
                const p = document.createElement("p");
                p.innerText = lifeType.count;
                p.style.display = "inline";
                p.style.marginRight = "0.5em";

                container.appendChild(p);

                //edit/delete buttons
                ui.addButton({
                    parent: container,
                    btnText: `&#9999;&#65039;`,
                    // onEvent: "click",
                    clickHandler: () => {
                        console.log("edit");
                        lifeType.edit = true;
                        listLifeTypes();
                    },
                });
                ui.addButton({
                    parent: container,
                    btnText: `&#10060;`,
                    // onEvent: "click",
                    clickHandler: () => {
                        console.log("delete");
                        allLifeTypes.splice(i, 1);
                        //remove any rules with this color
                        allRules = allRules.filter((rule) => {
                            const { g1, g2 } = rule;
                            if (
                                g1 !== lifeType.color &&
                                g2 !== lifeType.color
                            ) {
                                return rule;
                            }
                        });
                        listRules();
                        listLifeTypes();
                        runLife();
                    },
                });

                groupListSpot.appendChild(container);
            }
        });
    }
    function listRules() {
        console.log(allRules);
        const rulesListSpot = document.getElementById("rulesList");
        rulesListSpot.innerHTML = "";

        //Color  and Count  labels

        allRules.forEach((rule, i) => {
            if (rule.edit) {
                //create select
                const container = document.createElement("div");

                const handleChange = (group) => {
                    return (select) => {
                        var selectedColor = select.value;
                        select.style.backgroundColor = selectedColor;
                        rule[group] = selectedColor;
                        listRules();
                    };
                };
                //options
                ui.colorSelect({
                    allLifeTypes,
                    parent: container,
                    initialValue: rule.g1,
                    onEvent: "change",
                    eventHandler: handleChange("g1"),
                });

                //options
                ui.colorSelect({
                    allLifeTypes,
                    parent: container,
                    initialValue: rule.g2,
                    onEvent: "change",
                    eventHandler: handleChange("g2"),
                });

                ui.addInput({
                    type: "number",
                    parentDom: container,
                    label: "Attract/Repel",
                    initialValue: rule.g,
                    onEvent: "input",
                    eventHandler: (e) => {
                        rule.g = e.target.value;
                    },
                });

                ui.addButton({
                    parent: container,
                    btnText: `&#9989;`,
                    // onEvent: "click",
                    clickHandler: () => {
                        console.log("OK");
                        rule.edit = false;
                        listRules();
                    },
                });
                ui.addButton({
                    parent: container,
                    btnText: `&#128683;`,
                    // onEvent: "click",
                    clickHandler: () => {
                        console.log("cancel");
                        allRules.splice(i, 1);
                        listRules();
                    },
                });

                rulesListSpot.appendChild(container);
            } else {
                //show a box with the color
                const container = document.createElement("div");
                container.style.padding = ".5em";

                ui.addColorBox({ color: rule.g1, parent: container });
                ui.addColorBox({ color: rule.g2, parent: container });

                const p = document.createElement("p");

                p.innerText = rule.g;
                p.style.display = "inline";
                p.style.marginRight = "0.5em";

                container.appendChild(p);

                //edit/delete buttons
                ui.addButton({
                    parent: container,
                    btnText: `&#9999;&#65039;`,
                    // onEvent: "click",
                    clickHandler: () => {
                        console.log("edit");
                        rule.edit = true;
                        listRules();
                    },
                });
                ui.addButton({
                    parent: container,
                    btnText: `&#10060;`,
                    // onEvent: "click",
                    clickHandler: () => {
                        console.log("delete");
                        allRules.splice(i, 1);
                        listRules();
                    },
                });

                rulesListSpot.appendChild(container);
            }
        });
    }

    /**
     * END UI LOGIC
     */

    /**
     * START UI HERE
     */
    //add Rule btn
    const addRuleBtn = document.getElementById("addRuleBtn");
    addRuleBtn?.addEventListener("click", () => {
        console.log("addRuleBtn");
        currentAdd = "addRule";
        allRules.push({ g1: undefined, g2: undefined, g: 0, edit: true });
        listRules();
    });
    const addLifeBtn = document.getElementById("addLifeBtn");
    addLifeBtn?.addEventListener("click", () => {
        console.log("addLifeBtn");
        currentAdd = "addLife";
        addLife();
    });
    listLifeTypes();
    listRules();

    /**
     * END UI HERE
     */

    const myParticle = new Particle(1, 1, 1, 1);

    console.log(myParticle);
    myParticle.draw();

    const myLife = new Life({ ctx, w, h });
    runLife();
    function runLife() {
        myLife.group = {};
        myLife.particles = [];
        allLifeTypes.forEach((life) => {
            console.log(life);

            myLife.create(life.count, life.color);
        });

        myLife.update(allRules);
    }
}
