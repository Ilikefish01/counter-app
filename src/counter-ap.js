import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class counterAp extends DDDSuper(LitElement) {

  static get tag() {
    return "counter-ap";
  }

  constructor() {
    super();
    this.title = "";
    this.counter = 0;
    this.max = 0;
    this.min = 0;
  }

  static get properties() {
    return {
      title: { type: String },
      counter: {type: Number, reflect: true},
      max: {type: Number, reflect: true},
      min: {type: Number, reflect: true},
    };
  }

  updated(changedProperties) {
    if (changedProperties.has('counter')) {
      this.updateColor();
      if (this.counter === 21) {
        this.makeItRain();
      }
    }
  }

  updateColor() {
    if (this.counter === this.min || this.counter === this.max) {
      this.style.color = 'black';
    }
    else if (this.counter === 18){
      this.style.color = "brown";
    }
    else if (this.counter === 21){
      this.style.color = "blue";
    }
   else {
      this.style.color = '';
    }
  }

  increase() {
    if (this.counter < this.max)
        this.counter++;
  }

  decrease() {
    if (this.counter > this.min)
        this.counter--;
  }

  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
      (module) => {
      setTimeout(() => {
        document.querySelector("#confetti").setAttribute("popped", "");
      }, 0);
    });
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        font-size: var(--counter-ap-font-size, var(--ddd-font-size-s));
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      div {
        padding: 0;
        margin: 0;
      }
      button:disabled {
        background-color: gray;
        cursor: not-allowed;
      }
    `];
  }

  render() {
    return html`
    <div class = "counter">
            ${this.counter}
        </div>
        <div class = "button">
            <button @click="${this.increase}" ?disabled="${this.counter == this.max}">+</button>
            <button @click="${this.decrease}" ?disabled="${this.counter == this.min}">-</button>
        </div>  
    <div class="wrapper">
      <div>${this.title}</div>
      <slot></slot>
    </div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(counterAp.tag, counterAp);