class LBT {
    constructor(data) {
        this.data = data;
        this.index = 0;
        this.picWidth = 1228;
        this.oLis = null;
    }
    init() {
        this.renderUI();
        this.addEventHandlerWithClick();
        this.arrowsClick();
        this.setTimer();
    }
    renderUI() {
        this.oBox = document.createElement("div");
        this.oBox.className = "box";
        this.renderPic();
        this.renderArrows();
        this.renderPoint();
        this.append();
        this.clearTimer();
        let oLis = document.querySelectorAll(".arrows ul li");
        this.oLis = oLis;
        this.oLis[0].className = "grey";
    }
    renderLi() {
        this.oLi = this.data.map(function (e, index) {
            return `<li><img src=${e.src} class="lunbotu_img"></li>`
        }).join("")
    }
    renderPic() {
        this.oPic = document.createElement("ul");
        this.oPic.className = "pic";
        this.renderLi();
        this.oPic.innerHTML = this.oLi;
        this.oPc = this.oPic;
    }
    renderArrows() {
        this.direction = document.createElement("div");
        this.direction.className = "direction";
        let oSpan = `<div class="lt-box">
                        <span class="lt"></span>
                    </div>
                    <div class="gt-box">
                        <span class="gt"></span>
                    </div>`;
        this.direction.innerHTML = oSpan;
        this.Direction = this.direction
    }
    renderPoint() {
        this.oArrows = document.createElement("div");
        this.oArrows.className = "arrows";
        this.oulArrow = document.createElement("ul");
        this.oLi = this.data.map(function (e) {
            return `<li></li>`
        }).join("");
        this.oulArrow.innerHTML = this.oLi;
        this.oArrows.appendChild(this.oulArrow);
        this.Arrow = this.oArrows;
    }
    append() {
        this.oBox.appendChild(this.oPc);
        this.oBox.appendChild(this.direction);
        this.oBox.appendChild(this.Arrow);
        document.querySelector(".slideshow").appendChild(this.oBox)
    }
    right() {
        this.index++;
        if (this.index == this.data.length) {
            this.index = 0;
        }
        this.oPic.style.left = -(this.picWidth * this.index) + "px";
    }
    left() {
        this.index--;
        if (this.index == -1) {
            this.index = this.data.length - 1;
        }
        this.oPic.style.left = -(this.picWidth * this.index) + "px";
    }
    setTimer() {
        this.timer = setInterval(() => {
            this.right();
            this.oLisForeach();
        }, 1000)
    }
    clearTimer() {
        this.oBox.onmouseenter = () => clearInterval(this.timer);
        this.oBox.onmouseleave = () => this.setTimer();
    }
    addEventHandlerWithClick() {
        this.direction.onclick = (e) => {
            e = e || e.srcElement;
            let target = e.target;
            if (target.className == "gt") {
                this.right();
                this.oLisForeach();
            } else if (target.className == "lt") {
                this.left();
                this.oLisForeach();
            }
        }
    }
    arrowsClick() {
        for (let i = 0, len = this.oulArrow.children.length; i < len; i++) {
            this.oLis[i].num = i;
            this.oLis[i].onclick = () => {
                this.oPic.style.left = -(this.picWidth * this.oLis[i].num) + "px";
                this.index = this.oLis[i].num;
                this.oLisForeach();
                console.log("+++");
                
            }
        }
    }
    oLisForeach() {
        Array.from(this.oLis).forEach(function (e) {
            e.className = "";
        })
        this.oLis[this.index].className = "grey"
    }
}