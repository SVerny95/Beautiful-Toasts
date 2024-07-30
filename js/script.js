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
    push(obj) {
        this.numb++;
        let toast = document.createElement(obj.link ? 'a' : 'div');
        if (obj.link) {
            toast.href = obj.link;
            toast.target = obj.linkTarget ? obj.linkTarget : '_self';
        }
        toast.className = 'sms' + (obj.style ? ' sms-' + obj.style : '') + ' sms-' + this.posXY;
        toast.innerHTML = `
            ${obj.icon == null || obj.icon === true ? `<div class="icon-SV"><div class="icon-${obj.style}"></div></div>` : ''}
            <div class="sms-wrapper">
                ${obj.title ? '<h3 class="sms-header">' + obj.title + '</h3>' : ''}
                ${obj.content ? '<div class="sms-content">' + obj.content + '</div>' : ''}
            </div>
            ${obj.closeButton == null || obj.closeButton === true ? '<button class="sms-close">&times;</button>' : ''}
        `;
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
        if (obj.width || this.width) {
            toast.style.width = (obj.width || this.width) + 'px';
        }
        toast.dataset.transitionState = 'queue';
        let index = this.stack.push({ element: toast, props: obj, margX: this.margX, margY: this.margY, index: 0 });
        this.stack[index-1].index = index-1;
        if (toast.querySelector('.sms-close')) {
            toast.querySelector('.sms-close').onclick = event => {
                event.preventDefault();
                this.closeToast(this.stack[index-1]);
            };
        }
        if (obj.link) {
            toast.onclick = () => this.closeToast(this.stack[index-1]);
        }
        this.openToast(this.stack[index-1]);
        if (obj.onOpen) obj.onOpen(this.stack[index-1]);
    }

    openToast(toast) {
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
                        this.openToast(this.stack[i]);
                    }
                }
                if (toast.props.dismissAfter) {
                    this.closeToast(toast, toast.props.dismissAfter);
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

    closeToast(toast, delay = null) {
        if (this.isOpening() === true) {
            setTimeout(() => this.closeToast(toast, delay), 100);
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
