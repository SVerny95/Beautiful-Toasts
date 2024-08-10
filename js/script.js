class MessageSV {
  constructor(options) {
    let defaults = {
         stack: [],
       marginX: 20,
       marginY: 20,
           gap: 20,
        number: 0,
          blur: true,
        effect: "ease",
      duration: ".5s",
      position: "top-right"
    };
    this.options = Object.assign(defaults, options);
  }
  CreateMessage(item) {
    let msg = document.createElement(item.link ? "a" : "div");
    this.number++;
    if (item.link) {
      msg.href = item.link;
      msg.target = item.linkTarget ? item.linkTarget : "_self";
    }
    if (item.confirm || item.input) {
      msg.className = "sms" + " card";
      msg.innerHTML = `
        <svg width="64px" height="64px" viewBox="0 0 120 120" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g><style type="text/css"> .st0{fill:#FFB562;} .st1{fill:#3AB0FF;} .st2{fill:#FFFFFF;}</style><g><path class="st0" d="M98.5,47.1h-3.7l1.6,7.9c0.1,0.7-0.6,1.1-1.1,0.8L82,47.1H71.5c-1.5,0-2.7-1.2-2.7-2.7v-26 c0-1.5,1.2-2.7,2.7-2.7h27c1.5,0,2.7,1.2,2.7,2.7v26C101.2,45.8,100,47.1,98.5,47.1z"></path> <path class="st1" d="M22.3,93h4.8L25,103.3c-0.2,0.8,0.8,1.5,1.5,1L43.7,93h31.5c2,0,3.5-1.6,3.5-3.5V55.6c0-2-1.6-3.5-3.5-3.5 H22.3c-2,0-3.5,1.6-3.5,3.5v33.8C18.8,91.4,20.3,93,22.3,93z"></path> <g> <path class="st2" d="M85.6,37.3h-1.9c-0.6,0-1.1-0.5-1.1-1.1l0,0c0-1.3,0.2-2.3,0.6-3.2c0.4-0.8,1.3-1.8,2.5-2.7 c1.3-1.1,2-1.7,2.2-2c0.4-0.5,0.6-1.1,0.6-1.7c0-0.8-0.4-1.5-1-2.2c-0.7-0.6-1.5-0.9-2.7-0.9c-1.1,0-2,0.3-2.7,0.9 c-0.4,0.4-0.8,0.8-1.1,1.4c-0.4,0.8-1.2,1.3-2.1,1.3l0,0c-1.4-0.2-2.2-1.8-1.5-3c0.4-0.7,0.9-1.3,1.5-2c1.5-1.3,3.4-1.9,5.7-1.9 c2.5,0,4.4,0.6,5.9,2c1.5,1.3,2.2,2.8,2.2,4.5c0,1-0.3,1.8-0.8,2.7s-1.7,2-3.4,3.4c-0.9,0.8-1.5,1.3-1.7,1.8 c-0.1,0.4-0.3,0.8-0.3,1.5S86.2,37.3,85.6,37.3z M82.7,41v-0.2c0-1.1,0.9-2,2-2H85c1.1,0,2,0.9,2,2V41c0,1.1-0.9,2-2,2h-0.2 C83.7,43.1,82.7,42.1,82.7,41z"></path> </g> <g> <path class="st2" d="M31,64.5h8c0.9,0,1.6-0.7,1.6-1.6s-0.7-1.6-1.6-1.6h-8c-0.9,0-1.6,0.7-1.6,1.6S30.1,64.5,31,64.5z"></path> <path class="st2" d="M45.1,64.5h21.3c0.9,0,1.6-0.7,1.6-1.6s-0.7-1.6-1.6-1.6H45.1c-0.9,0-1.6,0.7-1.6,1.6S44.2,64.5,45.1,64.5z"></path> <path class="st2" d="M66.5,67.8H31c-0.9,0-1.6,0.7-1.6,1.6s0.7,1.6,1.6,1.6h35.5c0.9,0,1.6-0.7,1.6-1.6S67.4,67.8,66.5,67.8z"></path><path class="st2" d="M66.5,74.4H31c-0.9,0-1.6,0.7-1.6,1.6c0,0.9,0.7,1.6,1.6,1.6h35.5c0.9,0,1.6-0.7,1.6-1.6 C68.1,75.1,67.4,74.4,66.5,74.4z"></path> <path class="st2" d="M66.5,81H31c-0.9,0-1.6,0.7-1.6,1.6c0,0.9,0.7,1.6,1.6,1.6h35.5c0.9,0,1.6-0.7,1.6-1.6 C68.1,81.7,67.4,81,66.5,81z"></path></g></g></g></svg>
        <p class="cookieHeading">${item.title}</p>
        <p class="cookieDescription">${item.content}</p>
        ${item.confirm 
          ? '<div class="box-btn"><button class="accept-btn" data-accept>Прийняти</button><button class="decline-btn" data-decline>Скасувати</button></div>' 
          : `<div class="messageBox"><input required="" placeholder="${item.placeholder}" type="text" id="messageInput"/><button id="sendButton"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663"><path fill="none" d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"></path><path stroke-linejoin="round" stroke-linecap="round" stroke-width="33.67" stroke="#6c6c6c" d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"></path></svg></button></div>`}
      `;
    } else if (item.loader) {
      msg.className = "sms" + " loader" + " sms-" + this.position;
      msg.innerHTML = `
        <svg width="30px" height="30px" enable-background="new 0 0 100 100" viewBox="0 0 100 100" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m31.6 3.5c-25.7 10.1-38.2 39.2-28.1 64.9s39.2 38.3 64.9 28.1l-3.1-7.9c-21.3 8.4-45.4-2-53.8-23.3s2-45.4 23.3-53.8l-3.2-8z" fill="#fff"><animateTransform attributeName="transform" attributeType="XML" dur="2s" from="0 50 50" repeatCount="indefinite" to="360 50 50" type="rotate"/></path><path d="m42.3 39.6c5.7-4.3 13.9-3.1 18.1 2.7 4.3 5.7 3.1 13.9-2.7 18.1l4.1 5.5c8.8-6.5 10.6-19 4.1-27.7-6.5-8.8-19-10.6-27.7-4.1l4.1 5.5z" fill="#fff"><animateTransform attributeName="transform" attributeType="XML" dur="1s" from="0 50 50" repeatCount="indefinite" to="-360 50 50" type="rotate"/></path><path d="m82 35.7c-7.9-17.7-28.6-25.6-46.3-17.7s-25.6 28.6-17.7 46.3l7.6-3.4c-6-13.5 0-29.3 13.5-35.3s29.3 0 35.3 13.5l7.6-3.4z" fill="#fff"><animateTransform attributeName="transform" attributeType="XML" dur="2s" from="0 50 50" repeatCount="indefinite" to="360 50 50" type="rotate"/></path></svg>
        ${item.content ? '<div class="sms-content">' + item.content + '</div>' : ''}
      `;
    } else {
      msg.className = "sms" + (item.style ? " sms-" + item.style : "") + " sms-" + this.position;
      msg.innerHTML = `
        ${item.icon == null || item.icon === true ? `<div class="icon-SV"><div class="icon-${item.style}"></div></div>` : ''}
        <div class="sms-wrapper">
          ${item.title ? '<h3 class="sms-header">' + item.title + "</h3>" : ""}
          ${item.content ? '<div class="sms-content">' + item.content + "</div>" : ""}
        </div>
        ${item.closeButton == null || item.closeButton === true ? '<button class="sms-close">&times;</button>' : ''}
      `;
    }
    document.body.appendChild(msg);
    msg.getBoundingClientRect();
    if (this.position === "top-right") {
      msg.style.top = 0;
      msg.style.right = this.marginX + "px";
    } else if (this.position === "top-center") {
      msg.style.top = 0;
      msg.style.left = 0;
    } else if (this.position === "top-left") {
      msg.style.top = 0;
      msg.style.left = this.marginX + "px";
    } else if (this.position === "bottom-right") {
      msg.style.bottom = 0;
      msg.style.right = this.marginX + "px";
    } else if (this.position === "bottom-center") {
      msg.style.bottom = 0;
      msg.style.left = 0;
    } else if (this.position === "bottom-left") {
      msg.style.bottom = 0;
      msg.style.left = this.marginX + "px";
    } else if (this.position === "center") {
      msg.style.top = "50%";
      msg.style.left = `calc(50% - ${this.width + "px"} / 2)`;
    }
    if (item.width || this.width) {
      msg.style.width = (item.width || this.width) + "px";
    }
    msg.dataset.transitionState = "queue";
    let index = this.stack.push({ 
      element: msg, 
        props: item, 
      marginX: this.marginX, 
      marginY: this.marginY, 
        index: 0 
    });
    this.stack[index - 1].index = index - 1;
    if (msg.querySelector(".sms-close")) {
      msg.querySelector(".sms-close").onclick = event => {
        event.preventDefault();
        this.CloseMessage(this.stack[index - 1]);
      };
    }
    if (item.link) {
      msg.onclick = () => this.CloseMessage(this.stack[index - 1]);
    }
    this.OpenMessage(this.stack[index-1]);
    if (item.onOpen) item.onOpen(this.stack[index - 1]);
  }
  AnimateMessage(item) {
    if (this.position === "top-center") {
      item.element.style.transform = `translate(calc(50vw - 50%), ${item.marginY}px)`;
    } else if (this.position === "top-right" || this.position === "top-left") {
      item.element.style.transform = `translate(0, ${item.marginY}px)`;
    } else if (this.position === "bottom-center") {
      item.element.style.transform = `translate(calc(50vw - 50%), -${item.marginY}px)`;
    } else if (this.position === "bottom-left" || this.position === "bottom-right") {
      item.element.style.transform = `translate(0, -${item.marginY}px)`;
    }
  }
  OpenMessage(item) {
    if (this.isOpening() === true) {
      return false;
    }
    item.element.dataset.transitionState = "opening";
    item.element.style.transition = this.duration + " transform " + this.effect;
    this.AnimateMessage(item);
    item.element.addEventListener("transitionend", () => {
      if (item.element.dataset.transitionState == "opening") {
        item.element.dataset.transitionState = "complete";
        for (let i = 0; i < this.stack.length; i++) {
          if (this.stack[i].element.dataset.transitionState == "queue") {
            this.OpenMessage(this.stack[i]);
          }
        }
        if (item.props.delMsg) {
          this.CloseMessage(item, item.props.delMsg);
        }
      }
    });
    for (let i = 0; i < this.stack.length; i++) {
      if (this.stack[i].element.dataset.transitionState == "complete") {
        this.stack[i].element.dataset.transitionState = "opening";
        this.stack[i].element.style.transition = this.duration + " transform " + this.effect + (this.blur ? ", " + this.duration + " opacity ease" : "");
        if (this.blur) {
          this.stack[i].element.classList.add("sms-dimmed");
        }
        this.stack[i].marginY += item.element.offsetHeight + this.gap;
        this.AnimateMessage(this.stack[i]);
      }
    }
    return true;
  }
  CloseMessage(item, delay = null) {
    if (this.isOpening() === true) {
      setTimeout(() => this.CloseMessage(item, delay), 100);
      return false;
    }
    if (item.element.dataset.transitionState == "close") {
      return true;
    }
    if (item.element.querySelector(".sms-close")) {
      item.element.querySelector(".sms-close").onclick = null;
    }
    item.element.dataset.transitionState = "close";
    item.element.style.transition = ".2s opacity ease" + (delay ? " " + delay : "");
    item.element.style.opacity = 0;
    item.element.addEventListener("transitionend", () => {
      if (item.element.dataset.transitionState == "close") {
        let offsetHeight = item.element.offsetHeight;
        if (item.props.onClose) item.props.onClose(item);
        item.element.remove();
        for (let i = 0; i < item.index; i++) {
          this.stack[i].element.style.transition = this.duration + " transform " + this.effect;
          this.stack[i].marginY -= offsetHeight + this.gap;
          this.AnimateMessage(this.stack[i]);
        }
        let isFocused = this.FocusMsg();
        if (isFocused) {
          isFocused.element.classList.remove("sms-dimmed");
        }
      }
    });
    return true;
  }
  isOpening() {
    let opening = false;
    for (let i = 0; i < this.stack.length; i++) {
      if (this.stack[i].element.dataset.transitionState == "opening") {
        opening = true;
      }
    }
    return opening;
  }
  FocusMsg() {
    for (let i = 0; i < this.stack.length; i++) {
      if (this.stack[i].marginY == this.marginY) {
        return this.stack[i];
      }
    }
    return false;
  }
  set stack(value) {
    this.options.stack = value;
  }
  get stack() {
    return this.options.stack;
  }
  set position(value) {
    this.options.position = value;
  }
  get position() {
    return this.options.position;
  }
  set marginX(value) {
    this.options.marginX = value;
  }
  get marginX() {
    return this.options.marginX;
  }
  set marginY(value) {
    this.options.marginY = value;
  }
  get marginY() {
    return this.options.marginY;
  }
  set gap(value) {
    this.options.gap = value;
  }
  get gap() {
    return this.options.gap;
  }
  set number(value) {
    this.options.number = value;
  }
  get number() {
    return this.options.number;
  }
  set width(value) {
    this.options.width = value;
  }
  get width() {
    return this.options.width;
  }
  set duration(value) {
    this.options.duration = value;
  }
  get duration() {
    return this.options.duration;
  }
  set effect(value) {
    this.options.effect = value;
  }
  get effect() {
    return this.options.effect;
  }
  set blur(value) {
    this.options.blur = value;
  }
  get blur() {
    return this.options.blur;
  }
}
const ShowMessage = {};
ShowMessage.message = function() {
  const message = {};
  message.ShowNotification = function(title, text, style, pos, del, width, cb, icon) {
    const msg = new MessageSV({
         width: width,
        effect: "ease",
      duration: ".5s", 
          blur: true,
       marginX: 20,
       marginY: 20,
           gap: 20,
      position: pos
    });
    msg.CreateMessage({
            title: title,
          content: text,
            style: style,
           delMsg: del,
      closeButton: cb,
             icon: icon
    });
  }
  message.ShowToast = function(text, pos, del) {
    const msg = new MessageSV({
         width: "",
        effect: "ease",
      duration: ".5s", 
          blur: true,
       marginX: 20,
       marginY: 20,
           gap: 20,
      position: pos
    });
    msg.CreateMessage({
          content: text,
            style: "dark",
           delMsg: del,
      closeButton: false,
             icon: false
    });
  }
  message.ShowLoader = function(text, del) {
    const msg = new MessageSV({
         width: "",
        effect: "ease",
      duration: ".5s", 
      position: "top-center"
    });
    msg.CreateMessage({
          content: text,
           delMsg: del,
      closeButton: false,
             icon: false,
           loader: true
    });
  }
  message.ShowPrompt = function(title, text, placeholder, success, error) {
    const msg = new MessageSV({
         width: "",
        effect: "ease",
      duration: ".5s", 
      position: "top-center"
    });
    msg.CreateMessage({
            title: title,
          content: text,
      closeButton: false,
      placeholder: placeholder,
             icon: false,
            input: true
    });
  }
  message.ShowConfirm = function(title, text, accept, decline) {
    const msg = new MessageSV({
         width: 250,
        effect: "ease",
      duration: ".5s", 
      position: "top-center"
    });
    msg.CreateMessage({
            title: title,
          content: text,
      closeButton: false,
             icon: false,
          confirm: true
    });
  }
  return message;
}
const SV = ShowMessage.message();
