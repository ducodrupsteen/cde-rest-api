# Crazy Dutch Experience rest api

# Endpoints:

## Admin:

Register admin: POST - 
`https://cde-v1.herokuapp.com/v1/register`

Login admin: POST - 
`https://cde-v1.herokuapp.com/v1/login`

### Admin Schema:

```
{
    name: 'your name',
    email: 'your@email.com',
    password: 'pick a good one'
}
```

## Participants:

create: POST -  `https://cde-v1.herokuapp.com/v1/campaign/particepent/create`

### Participants Schema

```
{
    name: 'your name',
    email: 'your@email.com',
}
```
## Recipe’s:

Create with existing participant: POST - 
`https://cde-v1.herokuapp.com/v1/campaign/recipe/create/[participant_id]`

Create without existing participant: POST - 
`https://cde-v1.herokuapp.com/v1/campaign/recipe/create`

Read single recipe: GET - 
`https://cde-v1.herokuapp.com/v1/campaign/recipe`

Read recipe by id: GET - 
`https://cde-v1.herokuapp.com/v1/campaign/recipe/[recipe_id]`

Like recipe: PUT - 
`https://cde-v1.herokuapp.com/v1/campaign/recipe/[participant_id]/like/[recipe_id]`

Remove like from recipe: PUT - 
`https://cde-v1.herokuapp.com/v1/campaign/recipe/[participant_id]/dislike/[recipe_id]`

Remove recipe *(Admin only)*: DELETE - 
`https://cde-v1.herokuapp.com/v1/campaign/recipe/[recipe_id]/delete`

### Recipe Schema

```
{
    name: 'recipe name',
    body: 'Maybe you have a fun story about it...',
    particepent: participant_id,
    upvotes: 0,
    ingredients: ["array", "of", "ingredients"]
}
```

## Ingredients

Create ingredient: POST - 
`https://cde-v1.herokuapp.com/v1/campaign/ingredients/create`

Read all ingredients: GET - 
`https://cde-v1.herokuapp.com/v1/campaign/ingredient`

Update ingredient: PUT - 
`https://cde-v1.herokuapp.com/v1/campaign/ingredient/update/[ingredient_id]`

Delete ingredient: DELETE - 
`https://cde-v1.herokuapp.com/v1/campaign/ingredient/delete/[ingredient_id]`

### Ingredient Schema

```
{
    name: 'ingredient name',
    category: category_id,
    messurement: {
        unit: 'ml, g, etc',
        amount: [array, of, amounts]
    }
}
```
## Categories

Create category: POST - 
`https://cde-v1.herokuapp.com/v1/campaign/categories/create`

Read all categories: GET - 
`https://cde-v1.herokuapp.com/v1/campaign/categories`

Read single category: GET - 
`https://cde-v1.herokuapp.com/v1/campaign/categories/[category_id]`

Update category: PUT - 
`https://cde-v1.herokuapp.com/v1/campaign/categories/[category_id]`

### Category Schema

```
{
    name: 'category name',
    items: [array, of, ingredient, ids]
}
```

## Content

Create a page: POST - 
`https://cde-v1.herokuapp.com/v1/content/newpage`

Create section for page: POST - 
`https://cde-v1.herokuapp.com/v1/content/[page_id]/newsection`

Read page: GET - 
`https://cde-v1.herokuapp.com/v1/content/[page_id]`

Read page sections: GET - 
`https://cde-v1.herokuapp.com/v1/content/[page_id]/sections`

Read single section: GET - 
`https://cde-v1.herokuapp.com/v1/content/single/[section_id]`

Update section: PUT - 
`https://cde-v1.herokuapp.com/v1/content/update/[section_id]`

Read all pages: GET - 
`https://cde-v1.herokuapp.com/v1/content/pages`

### Page Schema

```
{
    pageTitle: 'your page title',
    contents: [array, of, section, ids],
    created_by: admin_id
}
```

### Section Schema

```
{
  title: 'your title',
  contents: your content as an Object,
  belongs_to: page_id
}
```
