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
  ingredients: [{amount: 12, unit: "u", name: "n"}, {amount: 2, unit: "y", name: "z"}, ...],
  instructions: ["instruction-1", "instruction-2", ...],
}
```

- The `key` of a `recipe-obj` is a unique number
- When adding new recipes to a cookbook, generate a new `key` by randomizing between `0` and the biggest safe integer until a new unique key is found
- The ingredients array holds objects which contains the name of the ingredient, the unit that ingredient should be measured in, and the amount of that unit to be used in the recipe where the amount is a Number
