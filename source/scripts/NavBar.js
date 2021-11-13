class Navbar extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  set data(data) {
    const styleElem = document.createElement("style");
    const styles = `
          body {
              margin: 0;
            }
            
            .navbar-section {
              display: flex;
              flex-direction: row;
              align-items: stretch;
            }
            
            #web-app-title {
              text-decoration: none;
              color: #fff;
              font-size: 1.3vw;
            }
            
            .tab:link {
              color: #dfdede;
            }
            
            .tab:visited {
              color: #dfdede;
            }
            
            .tab:focus {
              color: #fff;
            }
            
            .tab:hover {
              color: #fff;
            }
            
            .tab:active {
              color: #fff;
            }
            
            @media (orientation: landscape) {
              #navbar {
                background: #e5383b;
                font-family: Helvetica, sans-serif;
                position: fixed;
                top: 0;
                width: 100%;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
              }
            
              #navbar-section-left {
                flex: 1;
                padding-left: 3%;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
              }
            
              #navbar-section-right {
                flex: 5;
                justify-content: flex-start;
              }
            
              .tab-divider {
                color: #fdcb6e;
                padding-left: 9%;
                padding-right: 9%;
                font-size: 1vw;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
              }
            
              .tab {
                text-decoration: none;
                font-size: 1vw;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
              }
            }
            
            @media (orientation: portrait) {
              #navbar {
                background: #e5383b;
                font-family: Helvetica, sans-serif;
                position: fixed;
                bottom: 0;
                width: 100%;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
              }
            
              #navbar-section-left {
                display: none;
              }
            
              #navbar-section-right {
                flex: 1;
                justify-content: center;
              }
            
              .tab-divider {
                color: #fdcb6e;
                padding-left: 5%;
                padding-right: 5%;
                font-size: 2vh;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
              }
            
              .tab {
                text-decoration: none;
                font-size: 2vh;
                display: flex;
                flex-direction: row;
                justify-content: center;
                align-items: center;
              }
            }
          `;
    styleElem.innerHTML = styles;
    this.shadow.appendChild(styleElem);

    // Body for HTML element
    const body = document.createElement("body");

    // Main section of navbar
    const nav = document.createElement("nav");
    nav.id = "navbar";

    // Div which contains the title
    const leftDiv = document.createElement("div");
    leftDiv.id = "navbar-section-left";
    leftDiv.className = "navbar-section";

    // The article element that is the title
    const title = document.createElement("a");
    title.id = "web-app-title";
    title.href = "/source/navbar.html"; //TODO: Change for navigation
    title.textContent = "Impasta Rosta";

    // Div that contains the directories
    const rightDiv = document.createElement("div");
    rightDiv.id = "navbar-section-right";
    rightDiv.className = "navbar-section";

    // Article and Paragraph elements for Home
    const homeA = document.createElement("a");
    homeA.className = "tab";
    homeA.href = "/source/navbar.html"; //TODO: Change for navigation
    homeA.textContent = "Home";
    const homeP = document.createElement("p");
    homeP.className = "tab-divider";
    homeP.textContent = "•";

    // Article and Paragraph elements for Explore
    const exploreA = document.createElement("a");
    exploreA.className = "tab";
    exploreA.href = "/source/navbar.html"; //TODO: Change for navigation
    exploreA.textContent = "Explore";
    const exploreP = document.createElement("p");
    exploreP.className = "tab-divider";
    exploreP.textContent = "•";

    // Article and Paragraph elements for Cookbooks
    const cookbookA = document.createElement("a");
    cookbookA.className = "tab";
    cookbookA.href = "/source/navbar.html"; //TODO: Change for navigation
    cookbookA.textContent = "My Cookbooks";

    // Combine all according to template
    body.appendChild(nav);
    nav.appendChild(leftDiv);
    leftDiv.appendChild(title);
    nav.appendChild(rightDiv);
    rightDiv.appendChild(homeA);
    rightDiv.appendChild(homeP);
    rightDiv.appendChild(exploreA);
    rightDiv.appendChild(exploreP);
    rightDiv.appendChild(cookbookA);

    // Add block to shadow element
    this.shadow.appendChild(body);
  }
}

customElements.define("top-navbar", Navbar);
