console.log("life");

// return this;

// }

document.addEventListener("DOMContentLoaded", () => {
    console.log("loaded");
    const h = window.innerHeight;
    const w = window.innerWidth;
    const cvs = document.getElementById("life-canvas");
    cvs.width = w;
    cvs.height = h;
    console.log(cvs);
    const ctx = cvs.getContext("2d");
    console.log(ctx);
    // let UI = UI;

    /**
     * START UI LOGIC
     */
    const allRules = [];

    let currentAdd = false;

    function addLife() {
        //find the add spot place and create inputs
        const addStuffSpot = document.getElementById("addStuffSpot");
        // Life needs a name, color, and count
        UI("number", addStuffSpot, "Life Count");
        // const numInput = document.createElement("input");
        // const numInputLabel = document.createElement("label");
        // numInput.type = "number";
        // numInputLabel.innerText = "Life Count";
        // addStuffSpot.appendChild(numInputLabel);
        // addStuffSpot.appendChild(numInput);
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
    });
    const addLifeBtn = document.getElementById("addLifeBtn");
    addLifeBtn?.addEventListener("click", () => {
        console.log("addLifeBtn");
        currentAdd = "addLife";
        addLife();
    });

    /**
     * END UI HERE
     */

    const myParticle = new Particle(1, 1, 1, 1);

    console.log(myParticle);
    myParticle.draw();

    const myLife = new Life({ ctx, w, h });

    const yellow = myLife.create(90, "yellow");
    const red = myLife.create(30, "red");
    const green = myLife.create(300, "green");
    // const blue = myLife.create(3, "blue");

    // myLife.update(yellow, yellow, 1);
    // myLife.update(red, red, -1);
    myLife.update([
        { g1: "green", g2: "green", g: -0.32 },
        { g1: "green", g2: "red", g: -0.17 },
        { g1: "green", g2: "yellow", g: 0.34 },
        { g1: "red", g2: "red", g: -0.1 },
        { g1: "red", g2: "green", g: -3.4 },
        { g1: "yellow", g2: "yellow", g: 0.15 },
        { g1: "yellow", g2: "green", g: -0.2 },
    ]);
});
