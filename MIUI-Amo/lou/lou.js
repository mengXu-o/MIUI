 //先创建一个类
 window.onload = function () {

     class Manager {
         constructor(data) {
             this.data = data;
             this.root = null;
             this.node = null;
         }
         init() {
             this.render();
             this.addHandler();
         }
         render() {
             // 实现数据渲染
             // 先创建一个标签
             this.node = document.createElement("div");
             this.node.classList.add("box");
             // 拿到根节点#con
             this.root = document.querySelector("#con1");
             // 先渲染头部图片部分
             let html1 = `<img src=${this.data.src1} alt="">`
             //渲染标题部分
             let res1 = this.data.tab.map((ele, index) =>
                 `<span class="span2 ${index==this.data.tab.length-1?'active':''}">${ele}</span>`).join("");
             let html2 = `<div class="title"><span class="span1">${this.data.title}</span>${res1}</div>`;
             // 生成内容区左边的部分 
             let html3 = `<div class="left">
                 <img src=${this.data.src2[0]} alt="" class="img1">
                 <img src=${this.data.src2[1]} alt="">
               </div>
                `
             let html4 = "";
             for (let i = 0, len = this.data.data.length; i < len; i++) {
                 let res3 = this.data.data[i].con.map((ele, index) => {
                     return `
                    <li style=${index==3?"margin-right:0":""}>
                    <img src=${ele.src} alt="">
                    <p class="p1">${ele.title}</p>
                    <p class="p2">${ele.dis}</p>
                    <p class="p3">
                        <span class="span1">${ele.priceA}</span>
                        <span class="span2">${ele.priceB}</span>
                    </p>                         
                    </li>                    
                  `
                 }).join("");
                 let res4 = ` <li class="last">
                <div class="ad">
                    <img src=${ this.data.data[i].ad.src} alt="">
                    <p class="p1">${ this.data.data[i].ad.dis}</p>
                    <p class="p2">${ this.data.data[i].ad.price}</p>
                </div>
                <div class="dis">
                    <p class="p1">${ this.data.data[i].dis.p1}</p>
                    <p class="p2">${ this.data.data[i].dis.p2}</p>
                </div>
            </li>
             `
                 html4 += `<ul class="right ${i==0 ?'current':''}">${res3}${res4}</ul>`;
             }
             // 总数据为
             let html = html1 + html2 + ` <div class="show">${html3}${html4}</div>`;
             //设置oDiv的内容,插入到页面上去
             this.node.innerHTML = html;
             this.root.appendChild(this.node);
         }
         addHandler() {
             //获取标签
             let oSpans = this.node.querySelectorAll(".box .title .span2");
             let oDivs = this.node.querySelectorAll(".box .show .right");
             //给标题添加移入事件
             let arr1 = Array.from(oSpans);
             arr1.reverse();
             arr1.forEach((ele, index) => {
                 ele.onmouseenter = function () {
                     //划过让下面的内容，显示出来,先派他
                     Array.from(oSpans).forEach(ele => ele.classList.remove("active"));
                     Array.from(oDivs).forEach(ele => ele.classList.remove("current"));
                     oDivs[index].classList.add("current");
                     arr1[index].classList.add("active");
                 }
             })
         }
     }
     // 实列化第一个对象
     let manager = new Manager(data1);
     manager.init();
     // 实列化第二个对象
     let manage1 = new Manager(data2);
     manage1.init();
     // 实列化第三个对象
     let manage2 = new Manager(data3);
     manage2.init();
     // 实列化第四个对象
     let manage3 = new Manager(data4);
     manage3.init();
     // 拿到第四个的oDiv标签
     let oDiv = document.querySelectorAll("#con1 .box")[3];
     let oShow = oDiv.querySelectorAll(".box .show ul")[2];
     let oLi = oShow.querySelectorAll("li")[5];
     // 把最后一个li中的第一个删掉
     oLi.removeChild(oLi.querySelector(".ad"));
     // 改变样式
     oLi.style.position = "relative";
     oLi.children[0].style.position = "absolute";
     oLi.children[0].style.top = "0px";
     // 实列化第五个对象
     let manager4 = new Manager(data5);
     manager4.init();
 }