### Team 24 | 11-17-2021 | Zoom | 16:00 - 17:00

## Sprint 1 Check-In

### Attendance:

- [x] Adan Estrada
- [x] Alessandro Todaro
- [x] Andrew Lee
- [x] Ansav Panda
- [x] Edgar Diaz
- [x] Gabriel Leong
- [x] Grant Duntugan
- [ ] Hema Thota
- [x] Keli Wang
- [x] Minh Dinh
- [x] Quyen Nguyen

### Unresolved Issues
- N/A

### Agenda
- Talk about deadlines for 
  - Sprint review
  - Sprint retro
  - MVP
  - Team status video
  - MVP presentation
  - Second ADR check-in
- Walk through repo 
  - Frontend setup
  - Backend interfaces (Spoonacular and IndexedDB, show schema for IndexedDB)
  - Where we connect the backend and frontend
  - Briefly mention JSDocs folder and npm and config files

### Unfinished Issues
- N/A

### Meeting Notes
- Dealines: 
  - 2 meeting: sprint view and retro 
    - Meet on Friday
  - MVP: Due on Friday 
  - Team status video: make it during the weekend
  - ADR checkin: Next Tuesday
- Walk through repo:
  - Frontend: 
    - components: create a object of the template 
    - styles: all the CSS files
    - index.html
  - Backend:
    - app.js: interface between frontend and backend
    - router.js: display and hide the page as you navigate
    - spoonacular-interface.js: 
      - Spoonacular Account:
        - Account: impastarosta@gmail.com
        - Password: impasta123
        - you should never post the api key, but for this project is ok
        - Recipe-id: query for this to find the individual recipe card information 
    - indexDB:
      - store the cookbook, local storage
      - await indexdDb.openDb(): 
      - indexdDB-schema: access the recipes using the key
      - editCookbook need a new title compre to createCookbook
      - add recipe to the cookbook:
        - need title, recipe object
      - delete recipe and edit recipe are the same 
- if you have any question, ask Minh and Grant :) 

