import { pluralize } from './helpers/pluralize.js';

class UserCounter extends HTMLElement {

  constructor() {
    super();

    const tmpl = document.createElement('template');
    tmpl.innerHTML = `
      <style>
        p, span, slot {
          font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif;
          margin: 0
        }
        p {
          margin-bottom: 0.5rem;
        }
        .user-count {
          font-size: 105%;
          text-decoration: underline;
        }
        #container {
          border: 1px solid #ccc;
          border-radius: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 1rem;
        }
        </style>
      <div id="container">
        <p>There are ${this.countHTML()} online!</p>
        <slot></slot>
      </div>
    `;

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(tmpl.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['count'];
  }

  get count() {
    return this.getAttribute('count');
  }

  set count(amount) {
    this.setAttribute('count', amount)
  }

  countHTML() {
    return `<span class="user-count">${pluralize('user', this.count)}</span>`
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'count') {
      this.shadowRoot.querySelector('.user-count').innerHTML = this.countHTML();
    }
  }
}

customElements.define('user-counter', UserCounter);
