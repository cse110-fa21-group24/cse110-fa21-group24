/**
 * @classdesc A component in which users can create their own cookbook view page.
 */
class cookbook extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const styleElem = document.createElement("style");
    const styles = `
      * {
      font-family: Inter, sans-serif;
      font-style: normal;
    }
    
    body {
      margin: 0;
    }
    
    .title-container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      height: auto;
      margin: 0 auto;
      box-sizing: border-box;
    }
    
    .title {
      display: flex;
      font-weight: 800;
    }
    
    .cookbook-card-container {
      height: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
    
    .cookbook-cards {
      display: flex;
      background-color: #e5383b;
    }
    
    #button-name {
      font-weight: bold;
      padding: 5vw;
      line-height: 2em;
    }
    
    .add-button {
      display: flex;
      width: 100%;
      margin: 0 auto;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
    
    button {
      display: flex;
      border-radius: 50%;
      filter: brightness(115%);
      color: transparent;
    }
    
    @media (hover: hover) {
      button:hover {
        filter: brightness(90%);
      }
    }
    
    button::before {
      border-radius: 8px;
      content: "";
      position: relative;
      left: 50%;
      top: 50%;
    }
    
    button::after {
      border-radius: 8px;
      content: "";
      position: relative;
      left: 50%;
      top: 50%;
    }
    
    @media (orientation: landscape) {
      /* for desktop */
      .title-container {
        width: 100%;
        max-width: 1100px;
        padding: 2vw;
      }
    
      .title {
        font-weight: 800;
        font-size: 45px;
        line-height: 104px;
      }
    
      .cookbook-card-container {
        column-gap: 2vw;
        width: 100%;
        flex-direction: row;
        row-gap: 2vw;
        padding-bottom: 1vw;
        
      }
    
      .cookbook-cards {
        width: 285px;
        height: 339px;
        border-radius: 10%;
      }
    
      .add-button {
        max-width: 1100px;
        padding: 2vw;
      }
    
      #button-name {
        font-size: 2vw;
      }
    
      button {
        width: 44px;
        height: 44px;
        border: 4px solid #e5383b;
      }
    
      button::before {
        width: 18px;
        margin-left: -9px;
        margin-top: -1px;
        border-top: 4px solid #e5383b;
      }
    
      button::after {
        height: 18px;
        margin-left: -11px;
        margin-top: -8px;
        border-left: 4px solid #e5383b;
      }
    
      button:hover {
        cursor: pointer;
      }
    }
    
    @media (orientation: portrait) {
      /* for mobile phones: */
      .title-container {
        width: 100%;
        margin: 0 auto;
      }
    
      .title {
        font-size: 8vw;
        line-height: 20vw;
      }
    
      .cookbook-card-container {
        width: 100%;
        flex-direction: column;
        row-gap: 4vw;
        padding-bottom: 10vw;
        margin-bottom: 2vw;
      }
    
      .cookbook-cards {
        width: 90%;
        height: 300px;
        border-radius: 30px;
      }
    
      .add-button {
        max-width: 600px;
        padding: 2vw;
      }
    
      #button-name {
        font-size: 5vw;
      }
    
      button {
        width: 60px;
        height: 60px;
        border: 6px solid #e5383b;
      }
    
      button::before {
        width: 30px;
        margin-left: -15px;
        margin-top: -3px;
        border-top: 6px solid #e5383b;
      }
    
      button::after {
        height: 30px;
        margin-left: -18px;
        margin-top: -14px;
        border-left: 6px solid #e5383b;
      }
    }
    
        `;
    styleElem.innerHTML = styles;
    const cookbook = document.createElement("article");

    const titleSection = document.createElement("div");
    titleSection.setAttribute("class", "title-container");
    const title = document.createElement("h1");
    title.setAttribute("class", "title");
    title.textContent = "My Cookbooks";
    titleSection.appendChild(title);
    const cardsection = document.createElement("div");
    cardsection.setAttribute("class", "cookbook-card-container");
    cardsection.id = "cards";
    const addButton = document.createElement("div");
    addButton.setAttribute("class", "add-button");
    const button = document.createElement("button");
    const buttonName = document.createElement("span");
    buttonName.id = "button-name";
    buttonName.textContent = "Create New Cookbook";
    addButton.appendChild(button);
    addButton.appendChild(buttonName);

    cookbook.appendChild(titleSection);
    cookbook.appendChild(cardsection);
    cookbook.appendChild(addButton);

    this.shadowRoot.append(styleElem, cookbook);
  }
}

customElements.define("cook-book", cookbook);
