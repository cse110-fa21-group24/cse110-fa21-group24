DB_NAME: `"impasta-db"`

DB_VERSION: `1`

OBJ_STORE: `"cookbook-obj-store"`
- keyPath: `"title"` (cookbook titles must be unique)
- data: 
```
{
  title: "cookbook title",
  description: "cookbook description",
  recipes: {
    key-1: recipe-obj-1, 
    key-2: recipe-obj-2, 
    ...
  },
}
```
- `recipe-obj`:
```
{
  title: "recipe title",
  author: "recipe author",
  cuisines: ["cuisine-1", "cuisine-2", ...],
  readyInMinutes: number,
  image: "recipe_image.url",
  description: "recipe description",
  ingredients: ["ingredient-1", "ingredient-2", ...],
  instructions: ["instruction-1", "instruction-2", ...],
}
```
- The `key` of a `recipe-obj` is a unique number
- When adding new recipes to a cookbook, generate a new `key` by randomizing between `0` and the biggest safe integer until a new unique key is found 
