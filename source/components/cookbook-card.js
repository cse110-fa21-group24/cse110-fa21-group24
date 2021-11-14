/**
 * @classdesc A component in which users can create their own cookbook-cards.
 */
class cookbookCard extends HTMLElement {
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
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 auto;
    }
    
    article {
        width: 285px;
        height: 340px;
        background-color: #f5f3f4;
        border-radius: 25px;
    }
    
    .edit-remove-container {
        display: flex;
        flex-direction: row;
        column-gap: 50%;
    }
    
    #edit {
        border: none;
        background: none;
        padding: 8%;
    }
    
    #remove {
        border: none;
        background: none;
        padding: 8%;
    }
    
    .title-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        margin: 0 auto;
    }
    
    .title {
        display: flex;
        font-size: 24px;
        font-weight: 800;
        margin: 0 auto;
    }
    
    .description {
        font-weight: 800;
        padding-left: 5%;
    }
    
    .detailed-description {
        padding: 0% 5%;
    }
    
    .open-button-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
    }
    
    #open {
        font-weight: 800;
        border-radius: 15px;
        width: 40%;
        height: 45px;
        background-color: transparent;
        background-repeat: no-repeat;
        cursor: pointer;
        border: #c0c0c0 solid;
    }
    
    #open:hover {
        filter: brightness(90%);
        background-color: #c0c0c0;
    }
    
    @media (orientation: portrait) {
        article {
        width: 90%;
        height: 300px;
        border-radius: 30px;
        margin-left:6vw;
        }
        .edit-remove-container {
        column-gap: 70%;
        }
        #edit {
        padding: 4%;
        }
    
        #remove {
        padding: 4%;
        }
    }
  
    `;
    styleElem.innerHTML = styles;
    const card = document.createElement("article");

    const editingSection = document.createElement("div");
    editingSection.setAttribute("class", "edit-remove-container");
    const editButton = document.createElement("button");
    editButton.id = "edit";
    const editImage = document.createElement("input");
    editImage.setAttribute("type", "image");
    editImage.setAttribute("src", "images/icons8-edit-24.png");
    editImage.setAttribute("name", "edit-image");
    editButton.appendChild(editImage);
    editingSection.appendChild(editButton);
    const removeButton = document.createElement("button");
    removeButton.id = "remove";
    const removeImage = document.createElement("input");
    removeImage.setAttribute("type", "image");
    removeImage.setAttribute("src", "images/icons8-remove-24.png");
    removeImage.setAttribute("name", "remove-image");
    removeButton.appendChild(removeImage);
    editingSection.appendChild(removeButton);
    const titleSection = document.createElement("div");
    titleSection.setAttribute("class", "title-container");
    const title = document.createElement("p");
    title.setAttribute("class", "title");
    // title.textContent = changeTitle(data);
    title.textContent = "Title";
    titleSection.appendChild(title);
    const description = document.createElement("p");
    description.textContent = "Description";
    description.setAttribute("class", "description");
    const detailedDescription = document.createElement("p");
    // detailedDescription = editDescription(data);
    detailedDescription.textContent =
      "This is my first cookbook! Lorem ipsum dolor sit amet, consectetur adipiscing elit...";
    detailedDescription.setAttribute("class", "detailed-description");
    const openContainer = document.createElement("div");
    openContainer.setAttribute("class", "open-button-container");
    const openButton = document.createElement("button");
    openButton.id = "open";
    openButton.textContent = "Open";
    openContainer.appendChild(openButton);

    card.appendChild(editingSection);
    card.appendChild(titleSection);
    card.appendChild(description);
    card.appendChild(detailedDescription);
    card.appendChild(openContainer);

    this.shadowRoot.append(styleElem, card);
  }
}

customElements.define("cookbook-card", cookbookCard);
