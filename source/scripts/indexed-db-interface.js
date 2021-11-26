const DB_NAME = "impasta-db";
const DB_VERSION = 1;
const OBJ_STORE = "cookbook-obj-store";

/**
 * @classdesc An interface for performing CRUD operations on cookbooks stored
 *            in local storage using the IndexedDB API
 */
export class IndexedDbInterface {
  /**
   * Open a connection to a local IndexedDB database
   * @returns A promise that resolves when the database is successfully opened
   *          or rejects when the database cannot be opened
   */
  async openDb() {
    return new Promise((resolve, reject) => {
      let request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = () => {
        this.db = request.result;
        this.db.createObjectStore(OBJ_STORE, { keyPath: "title" });
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve(true);
      };
      request.onerror = () => {
        console.error("Could not open DB:", request.error);
        reject(false);
      };
    });
  }

  /**
   * Create a new cookbook
   * @param {string} title The title of the new cookbook
   * @param {string} description The description of the new cookbook
   * @returns A promise that resolves with true when the cookbook is
   *          successfully added or rejects with false when adding is
   *          unsuccessful
   */
  async createCookbook(title, description) {
    return new Promise((resolve, reject) => {
      let cookbookStore = this.db
        .transaction(OBJ_STORE, "readwrite")
        .objectStore(OBJ_STORE);

      let addRequest = cookbookStore.add({
        title: title,
        description: description,
        recipes: {},
      });

      addRequest.onsuccess = () => {
        resolve(true);
      };
      addRequest.onerror = () => {
        console.error("Could not create cookbook:", addRequest.error);
        reject(false);
      };
    });
  }

  /**
   * Retrieve the titles and descriptions of all cookbooks
   * @returns A promise that resolves with an array containing objects which
   *          contain the title and description of each cookbook or rejects
   *          with an empty array
   */
  async getAllCookbooks() {
    return new Promise((resolve, reject) => {
      let cookbookStore = this.db
        .transaction(OBJ_STORE, "readonly")
        .objectStore(OBJ_STORE);
      let cookbooks = [];

      let openCursorRequest = cookbookStore.openCursor();

      openCursorRequest.onsuccess = (event) => {
        let cursor = event.target.result;

        if (cursor) {
          cookbooks.push({
            title: cursor.key,
            description: cursor.value.description,
          });
          cursor.continue();
        } else {
          resolve(cookbooks);
        }
      };
      openCursorRequest.onerror = () => {
        console.error("Could not get cookbooks:", openCursorRequest.error);
        reject(cookbooks);
      };
    });
  }

  /**
   * Edit the title and description of a cookbook
   * @param {string} oldTitle The old title of the cookbook
   * @param {string} newTitle The new title of the cookbook
   * @param {string} description The new description of the cookbook
   * @returns A promise which resolves with true if the cookbook was
   *          successfully updated or rejects with false if the update failed
   */
  async editCookbook(oldTitle, newTitle, description) {
    return new Promise((resolve, reject) => {
      let cookbookStore = this.db
        .transaction(OBJ_STORE, "readwrite")
        .objectStore(OBJ_STORE);

      if (oldTitle === newTitle) {
        let getRequest = cookbookStore.get(oldTitle);

        getRequest.onsuccess = (event) => {
          let cookbookData = event.target.result;
          cookbookData.description = description;

          let putRequest = cookbookStore.put(cookbookData);

          putRequest.onsuccess = () => {
            resolve(true);
          };
          putRequest.onerror = () => {
            console.error("Could not edit cookbook:", putRequest.error);
            reject(false);
          };
        };
        getRequest.onerror = () => {
          console.error("Could not get old cookbook:", getRequest.error);
          reject(false);
        };
      } else {
        this.createCookbook(newTitle, description)
          .then(() => {
            this.deleteCookbook(oldTitle)
              .then(() => {
                resolve(true);
              })
              .catch(() => {
                reject(false);
              });
          })
          .catch(() => {
            reject(false);
          });
      }
    });
  }

  /**
   *
   * @param {string} title The title of the cookbook to delete
   * @returns A promise which resolves with true when deletion is successful
   *          or rejects with false if deletion failed
   */
  async deleteCookbook(title) {
    return new Promise((resolve, reject) => {
      let cookbookStore = this.db
        .transaction(OBJ_STORE, "readwrite")
        .objectStore(OBJ_STORE);
      let deleteRequest = cookbookStore.delete(title);

      deleteRequest.onsuccess = () => {
        resolve(true);
      };
      deleteRequest.onerror = () => {
        console.log("Could not delete cookbook:", deleteRequest.error);
        reject(false);
      };
    });
  }

  /**
   * Add a recipe to a cookbook
   * @param {string} cookbookTitle Title of the cookbook to add the recipe to
   * @param {object} recipeObj An object containing all the properties of a
   *                           recipe
   * @returns A promise which resolves when the recipe is successfully added or
   *          rejects when adding is unsuccessful
   */
  async addRecipe(cookbookTitle, recipeObj) {
    return new Promise((resolve, reject) => {
      let cookbookStore = this.db
        .transaction(OBJ_STORE, "readwrite")
        .objectStore(OBJ_STORE);

      let getRequest = cookbookStore.get(cookbookTitle);

      getRequest.onsuccess = (event) => {
        let cookbookData = event.target.result;
        let newKey = 0;

        do {
          newKey = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        } while (
          newKey in cookbookData.recipes &&
          cookbookData.recipes.hasOwnProperty(newKey)
        );

        cookbookData.recipes[newKey] = recipeObj;

        let putRequest = cookbookStore.put(cookbookData);

        putRequest.onsuccess = () => {
          resolve(true);
        };
        putRequest.onerror = () => {
          console.error("Could not add recipe:", putRequest.error);
          reject(false);
        };
      };
      getRequest.onerror = () => {
        console.error(
          "Could not get cookbook to add recipe to:",
          getRequest.error
        );
        reject(false);
      };
    });
  }

  /**
   * Get all the description from a cookbook
   * @param {string} cookbookTitle Title of the cookbook to retrieve all
   *                               recipes from
   * @returns A promise which resolves with an object containing all the
   *          recipes or rejects with an empty object
   */
  async getDescription(cookbookTitle) {
    return new Promise((resolve, reject) => {
      let cookbookStore = this.db
        .transaction(OBJ_STORE, "readonly")
        .objectStore(OBJ_STORE);

      let getRequest = cookbookStore.get(cookbookTitle);

      getRequest.onsuccess = (event) => {
        let cookbookData = event.target.result;
        resolve(cookbookData.description);
      };
      getRequest.onerror = () => {
        console.error("Could not get all recipes:", getRequest.error);
        reject({});
      };
    });
  }

  /**
   * Get all the recipes from a cookbook
   * @param {string} cookbookTitle Title of the cookbook to retrieve all
   *                               recipes from
   * @returns A promise which resolves with an object containing all the
   *          recipes or rejects with an empty object
   */
  async getAllRecipes(cookbookTitle) {
    return new Promise((resolve, reject) => {
      let cookbookStore = this.db
        .transaction(OBJ_STORE, "readonly")
        .objectStore(OBJ_STORE);

      let getRequest = cookbookStore.get(cookbookTitle);

      getRequest.onsuccess = (event) => {
        let cookbookData = event.target.result;
        resolve(cookbookData.recipes);
      };
      getRequest.onerror = () => {
        console.error("Could not get all recipes:", getRequest.error);
        reject({});
      };
    });
  }

  /**
   * Edit a recipe in a cookbook
   * @param {string} cookbookTitle The title of the cookbook to edit the recipe
   *                               in
   * @param {number} recipeKey The key of the recipe to edit
   * @param {object} recipeObj An object containing the edited recipe info
   * @returns A promise which resolves with true if editing was successful or
   *          rejects with false when editing is unsuccessful
   */
  async editRecipe(cookbookTitle, recipeKey, recipeObj) {
    return new Promise((resolve, reject) => {
      let cookbookStore = this.db
        .transaction(OBJ_STORE, "readwrite")
        .objectStore(OBJ_STORE);

      let getRequest = cookbookStore.get(cookbookTitle);

      getRequest.onsuccess = (event) => {
        let cookbookData = event.target.result;

        cookbookData.recipes[recipeKey].title = recipeObj.title;
        cookbookData.recipes[recipeKey].description = recipeObj.description;
        cookbookData.recipes[recipeKey].ingredients = recipeObj.ingredients;
        cookbookData.recipes[recipeKey].instructions = recipeObj.instructions;

        let putRequest = cookbookStore.put(cookbookData);

        putRequest.onsuccess = () => {
          resolve(true);
        };
        putRequest.onerror = () => {
          console.error("Could not edit recipe:", putRequest.error);
          reject(false);
        };
      };
      getRequest.onerror = () => {
        console.error(
          "Could not get cookbook to edit recipe in:",
          getRequest.error
        );
        reject(false);
      };
    });
  }

  /**
   * Delete a recipe from a cookbook
   * @param {string} cookbookTitle The title of the cookbook to delete a recipe
   *                               from
   * @param {number} recipeKey The key of the recipe to delete
   * @returns A promise which resolves to true if deletion was successful or
   *          resolves to false if deletion was unsuccessful
   */
  async deleteRecipe(cookbookTitle, recipeKey) {
    return new Promise((resolve, reject) => {
      let cookbookStore = this.db
        .transaction(OBJ_STORE, "readwrite")
        .objectStore(OBJ_STORE);

      let getRequest = cookbookStore.get(cookbookTitle);

      getRequest.onsuccess = (event) => {
        let cookbookData = event.target.result;

        delete cookbookData.recipes[recipeKey];

        let putRequest = cookbookStore.put(cookbookData);

        putRequest.onsuccess = () => {
          resolve(true);
        };
        putRequest.onerror = () => {
          console.error("Could not delete recipe:", putRequest.error);
          reject(false);
        };
      };
      getRequest.onerror = () => {
        console.error(
          "Could not get cookbook to delete recipe from:",
          getRequest.error
        );
        reject(false);
      };
    });
  }
}
