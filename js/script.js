class AlertSV {
  constructor(options) {
    let defaults = {
      stack: [],
      margX: 20,
      margY: 20,
        gap: 20,
       numb: 0,
       blur: true,
      anima: 'ease',
       time: '.5s',
      posXY: 'top-right'
    };
    this.options = Object.assign(defaults, options);
  }
  create(item) {
    this.numb++;
    let toast = document.createElement(item.link ? 'a' : 'div');
    if (item.link) {
      toast.href = item.link;
      toast.target = item.linkTarget ? item.linkTarget : '_self';
    }
    if (item.modal || item.input) {
      toast.className = 'card';
      toast.innerHTML = `
        <svg width="64px" height="64px" viewBox="0 0 120 120" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g><style type="text/css"> .st0{fill:#FFB562;} .st1{fill:#3AB0FF;} .st2{fill:#FFFFFF;}</style><g><path class="st0" d="M98.5,47.1h-3.7l1.6,7.9c0.1,0.7-0.6,1.1-1.1,0.8L82,47.1H71.5c-1.5,0-2.7-1.2-2.7-2.7v-26 c0-1.5,1.2-2.7,2.7-2.7h27c1.5,0,2.7,1.2,2.7,2.7v26C101.2,45.8,100,47.1,98.5,47.1z"></path> <path class="st1" d="M22.3,93h4.8L25,103.3c-0.2,0.8,0.8,1.5,1.5,1L43.7,93h31.5c2,0,3.5-1.6,3.5-3.5V55.6c0-2-1.6-3.5-3.5-3.5 H22.3c-2,0-3.5,1.6-3.5,3.5v33.8C18.8,91.4,20.3,93,22.3,93z"></path> <g> <path class="st2" d="M85.6,37.3h-1.9c-0.6,0-1.1-0.5-1.1-1.1l0,0c0-1.3,0.2-2.3,0.6-3.2c0.4-0.8,1.3-1.8,2.5-2.7 c1.3-1.1,2-1.7,2.2-2c0.4-0.5,0.6-1.1,0.6-1.7c0-0.8-0.4-1.5-1-2.2c-0.7-0.6-1.5-0.9-2.7-0.9c-1.1,0-2,0.3-2.7,0.9 c-0.4,0.4-0.8,0.8-1.1,1.4c-0.4,0.8-1.2,1.3-2.1,1.3l0,0c-1.4-0.2-2.2-1.8-1.5-3c0.4-0.7,0.9-1.3,1.5-2c1.5-1.3,3.4-1.9,5.7-1.9 c2.5,0,4.4,0.6,5.9,2c1.5,1.3,2.2,2.8,2.2,4.5c0,1-0.3,1.8-0.8,2.7s-1.7,2-3.4,3.4c-0.9,0.8-1.5,1.3-1.7,1.8 c-0.1,0.4-0.3,0.8-0.3,1.5S86.2,37.3,85.6,37.3z M82.7,41v-0.2c0-1.1,0.9-2,2-2H85c1.1,0,2,0.9,2,2V41c0,1.1-0.9,2-2,2h-0.2 C83.7,43.1,82.7,42.1,82.7,41z"></path> </g> <g> <path class="st2" d="M31,64.5h8c0.9,0,1.6-0.7,1.6-1.6s-0.7-1.6-1.6-1.6h-8c-0.9,0-1.6,0.7-1.6,1.6S30.1,64.5,31,64.5z"></path> <path class="st2" d="M45.1,64.5h21.3c0.9,0,1.6-0.7,1.6-1.6s-0.7-1.6-1.6-1.6H45.1c-0.9,0-1.6,0.7-1.6,1.6S44.2,64.5,45.1,64.5z"></path> <path class="st2" d="M66.5,67.8H31c-0.9,0-1.6,0.7-1.6,1.6s0.7,1.6,1.6,1.6h35.5c0.9,0,1.6-0.7,1.6-1.6S67.4,67.8,66.5,67.8z"></path><path class="st2" d="M66.5,74.4H31c-0.9,0-1.6,0.7-1.6,1.6c0,0.9,0.7,1.6,1.6,1.6h35.5c0.9,0,1.6-0.7,1.6-1.6 C68.1,75.1,67.4,74.4,66.5,74.4z"></path> <path class="st2" d="M66.5,81H31c-0.9,0-1.6,0.7-1.6,1.6c0,0.9,0.7,1.6,1.6,1.6h35.5c0.9,0,1.6-0.7,1.6-1.6 C68.1,81.7,67.4,81,66.5,81z"></path></g></g></g></svg>
        <p class="cookieHeading">${item.title}</p>
        <p class="cookieDescription">${item.content}</p>
        ${item.modal 
          ? '<div class="box-btn"><button class="accept-btn" data-accept>Прийняти</button><button class="decline-btn" data-decline>Скасувати</button></div>' 
          : '<div class="messageBox"><input required="" placeholder="Введіть ваш текст..." type="text" id="messageInput"/><button id="sendButton"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663"><path fill="none" d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"></path><path stroke-linejoin="round" stroke-linecap="round" stroke-width="33.67" stroke="#6c6c6c" d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"></path></svg></button></div>'}
      `;
    } else {
      toast.className = 'sms' + (item.style ? ' sms-' + item.style : '') + ' sms-' + this.posXY;
      toast.innerHTML = `
        ${item.icon == null || item.icon === true ? `<div class="icon-SV"><div class="icon-${item.style}"></div></div>` : ''}
          <div class="sms-wrapper">
            ${item.title ? '<h3 class="sms-header">' + item.title + '</h3>' : ''}
            ${item.content ? '<div class="sms-content">' + item.content + '</div>' : ''}
          </div>
          ${item.closeButton == null || item.closeButton === true ? '<button class="sms-close">&times;</button>' : ''}
      `;
    }
    document.body.appendChild(toast);
    toast.getBoundingClientRect();
    if (this.posXY == 'top-left') {
      toast.style.top = 0;
      toast.style.left = this.margX + 'px';
    } else if (this.posXY == 'top-center') {
      toast.style.top = 0;
      toast.style.left = 0;
    } else if (this.posXY == 'top-right') {
      toast.style.top = 0;
      toast.style.right = this.margX + 'px';
    } else if (this.posXY == 'bottom-left') {
      toast.style.bottom = 0;
      toast.style.left = this.margX + 'px';
    } else if (this.posXY == 'bottom-center') {
      toast.style.bottom = 0;
      toast.style.left = 0;
    } else if (this.posXY == 'bottom-right') {
      toast.style.bottom = 0;
      toast.style.right = this.margX + 'px';
    }
    if (item.width || this.width) {
      toast.style.width = (item.width || this.width) + 'px';
    }
    toast.dataset.transitionState = 'queue';
    let index = this.stack.push({ element: toast, props: item, margX: this.margX, margY: this.margY, index: 0 });
    this.stack[index-1].index = index-1;
    if (toast.querySelector('.sms-close')) {
      toast.querySelector('.sms-close').onclick = event => {
        event.preventDefault();
        this.close(this.stack[index-1]);
      };
    }
    if (item.link) {
      toast.onclick = () => this.close(this.stack[index-1]);
    }
    this.open(this.stack[index-1]);
    if (item.onOpen) item.onOpen(this.stack[index-1]);
  }
  open(toast) {
    if (this.isOpening() === true) {
      return false;
    }
    toast.element.dataset.transitionState = 'opening';
    toast.element.style.transition = this.time + ' transform ' + this.anima;
    this._transformToast(toast);
    toast.element.addEventListener('transitionend', () => {
      if (toast.element.dataset.transitionState == 'opening') {
        toast.element.dataset.transitionState = 'complete';
        for (let i = 0; i < this.stack.length; i++) {
          if (this.stack[i].element.dataset.transitionState == 'queue') {
            this.open(this.stack[i]);
          }
        }
        if (toast.props.dismissAfter) {
          this.close(toast, toast.props.dismissAfter);
        }
      }
    });
    for (let i = 0; i < this.stack.length; i++) {
      if (this.stack[i].element.dataset.transitionState == 'complete') {
        this.stack[i].element.dataset.transitionState = 'opening';
        this.stack[i].element.style.transition = this.time + ' transform ' + this.anima + (this.blur ? ', ' + this.time + ' opacity ease' : '');
        if (this.blur) {
          this.stack[i].element.classList.add('sms-dimmed');
        }
        this.stack[i].margY += toast.element.offsetHeight + this.gap;
        this._transformToast(this.stack[i]);
      }
    }
    return true;
  }
  close(toast, delay = null) {
    if (this.isOpening() === true) {
      setTimeout(() => this.close(toast, delay), 100);
      return false;
    }
    if (toast.element.dataset.transitionState == 'close') {
      return true;
    }
    if (toast.element.querySelector('.sms-close')) {
      toast.element.querySelector('.sms-close').onclick = null;
    }
    toast.element.dataset.transitionState = 'close';
    toast.element.style.transition = '.2s opacity ease' + (delay ? ' ' + delay : '');
    toast.element.style.opacity = 0;
    toast.element.addEventListener('transitionend', () => {
      if (toast.element.dataset.transitionState == 'close') {
        let offsetHeight = toast.element.offsetHeight;
        if (toast.props.onClose) toast.props.onClose(toast);
        toast.element.remove();
        for (let i = 0; i < toast.index; i++) {
          this.stack[i].element.style.transition = this.time + ' transform ' + this.anima;
          this.stack[i].margY -= offsetHeight + this.gap;
          this._transformToast(this.stack[i]);
        }
        let focusedToast = this.getFocusedToast();
        if (focusedToast) {
          focusedToast.element.classList.remove('sms-dimmed');
        }
      }
    });
    return true;
  }
  isOpening() {
    let opening = false;
    for (let i = 0; i < this.stack.length; i++) {
      if (this.stack[i].element.dataset.transitionState == 'opening') {
        opening = true;
      }
    }
    return opening;
  }
  getFocusedToast() {
    for (let i = 0; i < this.stack.length; i++) {
      if (this.stack[i].margY == this.margY) {
        return this.stack[i];
      }
    }
    return false;
  }
  _transformToast(toast) {
    if (this.posXY == 'top-center') {
      toast.element.style.transform = `translate(calc(50vw - 50%), ${toast.margY}px)`;
    } else if (this.posXY == 'top-right' || this.posXY == 'top-left') {
      toast.element.style.transform = `translate(0, ${toast.margY}px)`;
    } else if (this.posXY == 'bottom-center') {
      toast.element.style.transform = `translate(calc(50vw - 50%), -${toast.margY}px)`;            
    } else if (this.posXY == 'bottom-left' || this.posXY == 'bottom-right') {
      toast.element.style.transform = `translate(0, -${toast.margY}px)`;
    }
  }
  set stack(value) {
    this.options.stack = value;
  }
  get stack() {
    return this.options.stack;
  }
  set posXY(value) {
    this.options.posXY = value;
  }
  get posXY() {
    return this.options.posXY;
  }
  set margX(value) {
    this.options.margX = value;
  }
  get margX() {
    return this.options.margX;
  }
  set margY(value) {
    this.options.margY = value;
  }
  get margY() {
    return this.options.margY;
  }
  set gap(value) {
    this.options.gap = value;
  }
  get gap() {
    return this.options.gap;
  }
  set numb(value) {
    this.options.numb = value;
  }
  get numb() {
    return this.options.numb;
  }
  set width(value) {
    this.options.width = value;
  }
  get width() {
    return this.options.width;
  }
  set time(value) {
    this.options.time = value;
  }
  get time() {
    return this.options.time;
  }
  set anima(value) {
    this.options.anima = value;
  }
  get anima() {
    return this.options.anima;
  }
  set blur(value) {
    this.options.blur = value;
  }
  get blur() {
    return this.options.blur;
  }
}
const SV = {};
SV.message = function() {
  const message = {};
  const msg = new AlertSV({
    width: 300,
    anima: 'ease',
    time: '.5s', 
    blur: true,
  });
  const toasts = new AlertSV({
    width: 180,
    posXY: 'bottom-right',
    anima: 'ease',
     time: '.5s',
     blur: true,
    margX: 20,
    margY: 20,
      gap: 20,
  });
  message.popup = function(title, text, style) {
    msg.create({
      title: title,
      content: text,
      style: style, 
      dismissAfter: '5s',
    });
  }
  message.modal = function() {
    msg.create({
      modal: true,
    });
  }
  message.input = function(title, text) {
    msg.create({
      input: true,
      title: title,
      content: text
    });
  }
  message.toast = function(text, style) {
    toasts.create({
      content: text,
        style: style,
        dismissAfter: '3s',
        closeButton: false
    });
  }
  return message;
}
const ShowMessage = SV.message();
ShowMessage.toast('щось там таке', 'dark');
ShowMessage.popup('Успіх', 'Якась успішна подія', 'success');
ShowMessage.popup('Помилка', 'Якась помилкова подія', 'error');