const MODEL = Symbol('RestaurantModel');
const VIEW = Symbol('RestaurantView');

class RestaurantController {
    constructor(modelRestaurant, viewRestaurant) {
        this[MODEL] = modelRestaurant;
        this[VIEW] = viewRestaurant;
    }

    onInit() {
        this[VIEW].init();
    }

    onLoad(dishes, allergens, menus, restaurants, categories) {
        for (const dish of dishes) {
            this[MODEL].addDish(dish);
        }
        for (const allergen of allergens) {
            this[MODEL].addAllergen(allergen);
        }
        for (const menu of menus) {
            this[MODEL].addMenu(menu);
        }
        for (const restaurant of restaurants) {
            this[MODEL].addRestaurant(restaurant);
        }
        for (const category of categories) {
            this[MODEL].addCategory(category);
        }

        this[MODEL].assignCategoryToDish(categories[0], dishes[0]);
        this[MODEL].assignCategoryToDish(categories[0], dishes[1]);
        this[MODEL].assignCategoryToDish(categories[0], dishes[2]);
        this[MODEL].assignCategoryToDish(categories[0], dishes[3]);

        this[MODEL].assignCategoryToDish(categories[1], dishes[4]);
        this[MODEL].assignCategoryToDish(categories[1], dishes[5]);
        this[MODEL].assignCategoryToDish(categories[1], dishes[6]);
        this[MODEL].assignCategoryToDish(categories[1], dishes[7]);

        this[MODEL].assignCategoryToDish(categories[2], dishes[8]);
        this[MODEL].assignCategoryToDish(categories[2], dishes[9]);
        this[MODEL].assignCategoryToDish(categories[2], dishes[10]);
        this[MODEL].assignCategoryToDish(categories[2], dishes[11]);

        this[MODEL].assignAllergenToDish(allergens[0], dishes[0]);
        this[MODEL].assignAllergenToDish(allergens[0], dishes[1]);
        this[MODEL].assignAllergenToDish(allergens[1], dishes[3]);
        this[MODEL].assignAllergenToDish(allergens[1], dishes[4]);
        this[MODEL].assignAllergenToDish(allergens[2], dishes[7]);
        this[MODEL].assignAllergenToDish(allergens[2], dishes[8]);
        this[MODEL].assignAllergenToDish(allergens[3], dishes[10]);
        this[MODEL].assignAllergenToDish(allergens[3], dishes[11]);

        this[MODEL].assignDishToMenu(dishes[0], menus[0]);
        this[MODEL].assignDishToMenu(dishes[1], menus[0]);
        this[MODEL].assignDishToMenu(dishes[2], menus[0]);
        this[MODEL].assignDishToMenu(dishes[3], menus[1]);
        this[MODEL].assignDishToMenu(dishes[4], menus[1]);
        this[MODEL].assignDishToMenu(dishes[9], menus[1]);
        this[MODEL].assignDishToMenu(dishes[0], menus[2]);
        this[MODEL].assignDishToMenu(dishes[6], menus[2]);
        this[MODEL].assignDishToMenu(dishes[10], menus[2]);

        categories = this[MODEL].getCategories();
        allergens = this[MODEL].getAllergens();
        menus = this[MODEL].getMenus();
        restaurants = this[MODEL].getRestaurants();
        this[VIEW].onLoad(categories, dishes, allergens, menus, restaurants);

        this[VIEW].bindDishesCategoryList((category) => this.handleDishesCategoryList(category));

        this[VIEW].bindDishDetail((dish) => this.handleDishDetail(dish));
        this[VIEW].bindAllergenDetail((allergen) => this.handleAllergenDetail(allergen));
        this[VIEW].bindMenuDetail((menu) => this.handleMenuDetail(menu));
        this[VIEW].bindRestaurantDetail((restaurant) => this.handleRestaurantDetail(restaurant));

        this[VIEW].bindAllergsList((allergen) => this.handleAllergensList(allergen));
        this[VIEW].bindMenusList((menu) => this.handleMenusList(menu));
        this[VIEW].bindRestaurantsList((restaurant) => this.handleRestaurantsList(restaurant));
        this[VIEW].bindCreateDishForm(() => this.handleShowCreateDish());
        this[VIEW].bindDeleteDishForm(() => this.handleShowDeleteDish());
        this[VIEW].bindControlDishMenuForm(() => this.handleShowControlDishMenu());
    }

    handleShowCreateDish = () => {
        const categories = [...this[MODEL].getCategories()];
        const allergens = [...this[MODEL].getAllergens()];
        this[VIEW].displayCreateDishForm(categories, allergens, this.handleCreateDish);
    }

    handleCreateDish = (dishName, description, ingredients, categories, allergens) => {
            let arrIngredients = ingredients.split(",");
            let createdDish = this[MODEL].createDish(dishName, description, arrIngredients);
            this[MODEL].addDish(createdDish);
            let categoriesStored = [...this[MODEL].getCategories()];
            console.log(categoriesStored);
            categories.forEach(category => {
                let categoryToAdd = categoriesStored.find(c => c.category.name === category).category;
                this[MODEL].assignCategoryToDish(categoryToAdd, createdDish);
            });
            let allergensStored = [...this[MODEL].getAllergens()];
            allergens.forEach(allergen => {
                let allergenToAdd = allergensStored.find(a => a.allergen.name === allergen).allergen;
                this[MODEL].assignAllergenToDish(allergenToAdd, createdDish);
            });
            
    }

    handleShowDeleteDish = () => {
        const dishes = [...this[MODEL].getDishes()];
        this[VIEW].displayDeleteDishForm(dishes, this.handleDeleteDish);
    }

    handleDeleteDish = (dishName) => {
        const dishes = [...this[MODEL].getDishes()];
        const dish = dishes.find(d => d.dish.name === dishName);
        console.log(dish);
        this[MODEL].removeDish(dish.dish);
    }

    handleShowControlDishMenu = () => {
        const dishes = [...this[MODEL].getDishes()];
        const menus = [...this[MODEL].getMenus()];
        this[VIEW].displayControlDishMenuForm(dishes, menus, this.handleAssignDishMenu, this.handleDeassignDishMenu);
    }

    handleAssignDishMenu = (dishName, menuName) => {
        // const dishes = [...this[MODEL].getDishes()];
        // const dish = dishes.find(d => d.dish.name === dishName);
        // console.log(dish);
        // this[MODEL].removeDish(dish.dish);
    }
    handleDeassignDishMenu = (dishName, menuName) => {
        // const dishes = [...this[MODEL].getDishes()];
        // const dish = dishes.find(d => d.dish.name === dishName);
        // console.log(dish);
        // this[MODEL].removeDish(dish.dish);
    }

    handleInit = () => {
        this.onInit();
    }

    handleRestaurantsList = (restaurants) => {
        const restaurantsList = [...this[MODEL].getRestaurants()];

        if (restaurantsList.length > 0) {
            this[VIEW].displayRestaurants(restaurantsList);
        } else {
            console.log(`No se encontraron Restaurants`);
        }
    }

    handleAllergensList = (allergen) => {
        const allergsList = [...this[MODEL].getAllergens()];

        if (allergsList.length > 0) {
            console.log(allergsList);
            this[VIEW].displayAllergens(allergsList);
        } else {
            console.log(`No se encontraro Alérgenos`);
        }
    }

    handleMenusList = (menus) => {
        const menusList = [...this[MODEL].getMenus()];

        if (menusList.length > 0) {
            this[VIEW].displayMenus(menusList);
        } else {
            console.log(`No se encontraron Menús`);
        }
    }

    handleDishesCategoryList = (categoryName) => {
        const categoryDishesArray = [...this[MODEL].getCategories()];
        const categoryData = categoryDishesArray.find(catData => catData.category.name === categoryName);

        if (categoryData) {
            this[VIEW].displayDishesCategory(categoryData.dishes, categoryName);
        } else {
            console.log(`No se encontró la categoría '${categoryName}'`);
        }
    }

    handleDishDetail = (dishName) => {
        const dishesList = [...this[MODEL].getDishes()];
        const dishData = dishesList.find(dishData => dishData.dish.name === dishName);

        if (dishData) {
            this[VIEW].displayDishDetail(dishData.dish);
            console.log(dishData.dish)
        } else {
            console.log(`No se encontró la categoría '${dishName}'`);
        }
    }

    handleAllergenDetail = (allergenName) => {
        const allergenesList = [...this[MODEL].getAllergens()];
        const allergenData = allergenesList.find(allergenData => allergenData.allergen.name === allergenName);

        if (allergenData) {
            this[VIEW].displayAllergenDetail(allergenData);
        } else {
            console.log(`No se encontró la categoría '${allergenName}'`);
        }
    }

    handleMenuDetail = (menuName) => {
        const menuesList = [...this[MODEL].getMenus()];
        const menuData = menuesList.find(menuData => menuData.menu.name === menuName);

        if (menuData) {
            this[VIEW].displayMenuDetail(menuData);
        } else {
            console.log(`No se encontró el menú '${menuName}'`);
        }
    }

    handleRestaurantDetail = (restaurantName) => {
        const restaurantsList = [...this[MODEL].getRestaurants()];
        const restaurantData = restaurantsList.find(restaurantData => restaurantData.restaurant.name === restaurantName);
        console.log(restaurantData);
        if (restaurantData) {
            this[VIEW].displayRestaurantDetail(restaurantData);
        } else {
            console.log(`No se encontró el restaurant '${restaurantName}'`);
        }
    }


}
export default RestaurantController;