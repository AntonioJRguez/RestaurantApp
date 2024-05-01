'use strict';
import {BaseException,
InvalidAccessConstructorException,
InvalidCategoryException,
CategoryExistException,
CategoryNoExistException,
InvalidMenuException,
MenuExistException,
MenuNoExistException,
InvalidDishException,
DishExistException,
DishNoExistException,
InvalidRestaurantException,
RestaurantExistException,
RestaurantNoExistException,
InvalidAllergenException,
AllergenExistException,
AllergenNoExistException,
DishAlreadyAssignedException,
AllergenAlreadyAssignedException,
CategoryAlreadyAssignedException,
DishIsNotAssignedException,
AllergenIsNotAssignedException,
CategoryIsNotAssignedException}
 from "./exceptions.js";
class Dish {
    #name;
    #description;
    #ingredients;
    #image;

    constructor(name, description = "", ingredients = [], image = "") {
        this.#name = name;
        this.#description = description;
        this.#ingredients = ingredients;
        this.#image = image;
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        this.#name = value;
    }

    get description() {
        return this.#description;
    }

    set description(value) {
        this.#description = value;
    }
    get ingredients() {
        return this.#ingredients;
    }

    set ingredients(value) {
        this.#ingredients = value;
    }

    get image() {
        return this.#image;
    }

    set image(value) {
        this.#image = value;
    }

    toString() {
        let cadena = "";
        cadena += "Dish --> Name: " + this.#name;
        if (this.#description != "") {
            cadena += ", Description: " + this.#description
        }

        if (this.#ingredients.length > 0) {
            cadena += ", Ingredients [";
            for (let i = 0; i < this.#ingredients.length; i++) {
                cadena += this.#ingredients[i] + " - ";
            }
            cadena += "]";
        }

        if (this.#image != "") {
            cadena += ", Image: " + this.#image
        }

        return cadena;
    }
    toJSON() {
        return {
            name: this.name,
            description: this.description,
            ingredients: this.ingredients,
            image: this.image
        };
      }

}


class Category {
    #name;
    #description;

    constructor(name, description = "") {
        this.#name = name;
        this.#description = description;
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        this.#name = value;
    }

    get description() {
        return this.#description;
    }

    set description(value) {
        this.#description = value;
    }

    toString() {
        let cadena = "";
        cadena += "Category --> Name: " + this.#name;

        if (this.#description != "") {
            cadena += ", Description: " + this.#description
        }

        return cadena;
    }
    toJSON() {
        return {
            name: this.name,
            description: this.description
        };
      }
}

class Allergen {
    #name;
    #description;

    constructor(name, description = "") {
        this.#name = name;
        this.#description = description;
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        this.#name = value;
    }

    get description() {
        return this.#description;
    }

    set description(value) {
        this.#description = value;
    }

    toString() {
        let cadena = "";
        cadena += "Allergen --> Name: " + this.#name;

        if (this.#description != "") {
            cadena += ", Description: " + this.#description
        }

        return cadena;
    }

    toJSON() {
        return {
            name: this.name,
            description: this.description
        };
      }
}

class Menu {
    #name;
    #description;

    constructor(name, description = "") {
        this.#name = name;
        this.#description = description;
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        this.#name = value;
    }

    get description() {
        return this.#description;
    }

    set description(value) {
        this.#description = value;
    }

    toString() {
        let cadena = "";
        cadena += "Menu --> Name: " + this.#name;

        if (this.#description != "") {
            cadena += ", Description: " + this.#description
        }

        return cadena;
    }
    toJSON() {
        return {
            name: this.name,
            description: this.description
        };
      }
}

class Coordinate {
    #latitude;
    #longitude;

    constructor(latitude, longitude) {
        this.#latitude = latitude;
        this.#longitude = longitude;
    }

    get latitude() {
        return this.#latitude;
    }

    set latitude(value) {
        this.#latitude = value;
    }

    get longitude() {
        return this.#longitude;
    }

    set longitude(value) {
        this.#longitude = value;
    }
    toJSON() {
        return {
            latitude: this.latitude,
            longitude: this.longitude
        };
      }


}

class Restaurant {
    #name;
    #description;
    #location;

    constructor(name, description = "", location = null) {
        this.#name = name;
        this.#description = description;
        this.#location = location;
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        this.#name = value;
    }

    get description() {
        return this.#description;
    }

    set description(value) {
        this.#description = value;
    }

    get location() {
        return this.#location;
    }

    set location(value) {
        this.#location = value;
    }

    toString() {
        let cadena = "";
        cadena += "Allergen --> Name: " + this.#name;

        if (this.#description != "") {
            cadena += ", Description: " + this.#description
        }

        if (this.#location != "") {
            cadena += ", Coordinates: Latitude --> " + this.#location.latitude + ", Longitude: " + this.#location.longitude;
        }

        return cadena;
    }

    toJSON() {
        return {
            name: this.name,
            description: this.description,
            location: this.location
        };
      }
}

export const RestaurantManagerSingleton = (function () {
    let instancia;

    function init() {

        class RestaurantManager {
            #name;
            #categories;
            #allergens;
            #dishes;
            #menus;
            #restaurants;

            constructor(nameSystem) {

                this.#name = nameSystem;
                this.#categories = [];
                this.#allergens = [];
                this.#dishes = [];
                this.#menus = [];
                this.#restaurants = [];

            }

            *getCategories() {
                const array = this.#categories;
                for (let category of array) {
                    yield category;
                }
            }

            *getMenus() {
                const array = this.#menus;
                for (let menu of array) {
                    yield menu;
                }
            }

            *getAllergens() {
                const array = this.#allergens;
                for (let allergen of array) {
                    yield allergen;
                }
            }

            *getRestaurants() {
                const array = this.#restaurants;
                for (let restaurant of array) {
                    yield restaurant;
                }
            }

            *getDishes() {
                const array = this.#dishes;
                for (let dish of array) {
                    yield dish;
                }
            }

            #getPositionCategory(category) {
                return this.#categories.findIndex(x => x.category.name === category.name);
            }

            addCategory(...categories) {
                for (const category of categories) {

                    if (category == null || !(category instanceof Category)) {
                        throw new InvalidCategoryException();
                    }

                    if (this.#getPositionCategory(category) == -1) {
                        this.#categories.push({ category, dishes: [] });
                        console.log("Added category to list: " + category.name);
                    } else {
                        throw new CategoryExistException(category.name);
                    }
                }
            }

            removeCategory(...categories) {
                for (const category of categories) {
                    if (this.#getPositionCategory(category) != -1) {
                        let index = this.#getPositionCategory(category);

                        let dishesWithCategory = this.#categories[index].dishes;
                        for (let i = dishesWithCategory.length - 1; i >= 0; i--) {
                            let dish = dishesWithCategory[i];
                            this.deassignCategoryToDish(category, dish);
                        }

                        this.#categories.splice(index, 1);
                        console.log("Eliminated category " + category.name);
                    } else {
                        throw new CategoryNoExistException(category.name);
                    }
                }


            }


            #getPositionMenu(menu) {
                return this.#menus.findIndex(x => x.menu.name === menu.name);
            }

            addMenu(...menus) {
                for (const menu of menus) {
                    if (menu == null || !(menu instanceof Menu)) {
                        throw new InvalidMenuException();
                    }

                    if (this.#getPositionMenu(menu) == -1) {
                        this.#menus.push({ menu, dishes: [] });
                        console.log("Added menu to list: " + menu.name);
                    } else {
                        throw new MenuExistException(menu.name);
                    }
                }
            }
            //!COMPROBAR FUNCIONAMIENTO
            removeMenu(...menus) {
                for (const menu of menus) {
                    if (this.#getPositionMenu(menu) != -1) {
                        let index = this.#getPositionMenu(menu);
                        
                        let dishesWithMenu = this.#menus[index].dishes;

                        for (let i = dishesWithMenu.length - 1; i >= 0; i--) {

                            let dish = dishesWithMenu[i];
 
                            this.deassignDishToMenu(dish, menu);
                        }

                        this.#menus.splice(index, 1);
                        console.log("Eliminated menu " + menu.name);
                    } else {
                        throw new MenuNoExistException(menu.name);
                    }
                }
            }

            #getPositionDish(dish) {
                return this.#dishes.findIndex(x => x.dish.name === dish.name);
            }

            addDish(...dishes) {
                for (const dish of dishes) {
                    if (dish == null || !(dish instanceof Dish)) {
                        throw new InvalidDishException();
                    }

                    if (this.#getPositionDish(dish) == -1) {
                        this.#dishes.push({ dish, categories: [], allergens: [] });
                        console.log("Added dish to list: " + dish.name);
                    } else {
                        throw new DishExistException(dish.name);
                    }
                }
            }

            removeDish(...dishes) {
                for (const dish of dishes) {
                    if (this.#getPositionDish(dish) != -1) {
                        let index = this.#getPositionDish(dish);

                        // eliminar dish de la categoría
                        let categoriesWithDish = this.#dishes[index].categories;
                        for (let i = categoriesWithDish.length - 1; i >= 0; i--) {
                            let category = categoriesWithDish[i];
                            this.deassignCategoryToDish(category, dish);
                        }

                        // eliminar dish de los allergenos
                        let allergensWithDish = this.#dishes[index].allergens;
                        for (let i = allergensWithDish.length - 1; i >= 0; i--) {
                            let allergen = allergensWithDish[i];
                            this.deassignAllergenToDish(allergen, dish);
                        }

                        for (let menuO of this.#menus) {
                            this.deassignDishToMenu(dish, menuO.menu);
                        }

                        console.log("Eliminated dish " + dish.name);
                        this.#dishes.splice(index, 1);

                    } else {
                        throw new DishNoExistException();
                    }
                }
            }



            #getPositionRestaurant(restaurant) {
                return this.#restaurants.findIndex(x => x.restaurant.name === restaurant.name);
            }

            addRestaurant(...restaurants) {
                for (const restaurant of restaurants) {
                    if (restaurant == null || !(restaurant instanceof Restaurant)) {
                        throw new InvalidRestaurantException();
                    }

                    if (this.#getPositionRestaurant(restaurant) == -1) {
                        this.#restaurants.push({ restaurant });
                        console.log("Added restaurant to list: " + restaurant.name);
                    } else {
                        throw new RestaurantExistException(restaurant.name);
                    }
                }
            }

            removeRestaurant(...restaurants) {
                for (const restaurant of restaurants) {
                    if (this.#getPositionRestaurant(restaurant) != -1) {
                        let index = this.#getPositionRestaurant(restaurant);
                        this.#restaurants.splice(index, 1);
                        console.log("Eliminated restaurant " + restaurant.name);
                    } else {
                        throw new RestaurantNoExistException(restaurant.name);
                    }
                }
            }

            #getPositionAllergen(allergen) {
                return this.#allergens.findIndex(x => x.allergen.name === allergen.name)
            }

            addAllergen(...allergens) {
                for (const allergen of allergens) {
                    if (allergen == null || !(allergen instanceof Allergen)) {
                        throw new InvalidAllergenException();
                    }

                    if (this.#getPositionAllergen(allergen) == -1) {
                        this.#allergens.push({ allergen, dishes: [] });
                        console.log("Added allergen to list: " + allergen.name);
                    } else {
                        throw new AllergenExistException(allergen.name);
                    }
                }
            }

            removeAllergen(...allergens) {
                for (const allergen of allergens) {
                    if (this.#getPositionAllergen(allergen) != -1) {
                        let index = this.#getPositionAllergen(allergen);

                        let dishesWithAllergen = this.#allergens[index].dishes;

                        for (let i = dishesWithAllergen.length - 1; i >= 0; i--) {
                            let dish = dishesWithAllergen[i];
                            this.deassignAllergenToDish(allergen, dish);
                        }

                        this.#allergens.splice(index, 1);
                        console.log("Eliminated allergen: " + allergen.name);
                    } else {
                        throw new AllergenNoExistException(allergen.name);
                    }
                }
            }

            // metodos de asignación
            assignAllergenToDish(allergen, dish) {

                let posAllergen = this.#getPositionAllergen(allergen);
                let posDish = this.#getPositionDish(dish);

                if (posAllergen == -1) {
                    this.addAllergen(allergen);
                    posAllergen = this.#getPositionAllergen(allergen);
                }
                if (posDish == -1) {
                    this.addDish(dish);
                    posDish = this.#getPositionDish(dish);
                }

                if (!this.#allergens[posAllergen].dishes.includes(dish)) {
                    this.#allergens[posAllergen].dishes.push(dish);
                } else {
                    throw new DishAlreadyAssignedException(dish.name);
                }

                if (!this.#dishes[posDish].allergens.includes(allergen)) {
                    this.#dishes[posDish].allergens.push(allergen);
                } else {
                    throw new AllergenAlreadyAssignedException(allergen.name);
                }

            }

            //!COMPLETAR LOS DEASSIGN
            deassignAllergenToDish(allergen, dish) {
                let posAllergen = this.#getPositionAllergen(allergen);
                let posDish = this.#getPositionDish(dish);
                if (this.#allergens[posAllergen].dishes.includes(dish)) {
                    let dishIndexInAllergen = this.#allergens[posAllergen].dishes.findIndex(d => d.name == dish.name);
                    this.#allergens[posAllergen].dishes.splice(dishIndexInAllergen, 1);

                } else {
                    throw new DishIsNotAssignedException(dish.name);
                }

                if (this.#dishes[posDish].allergens.includes(allergen)) {
                    let allergenIndexInDish = this.#dishes[posDish].allergens.findIndex(a => a.name == allergen.name);
                    this.#dishes[posDish].allergens.splice(allergenIndexInDish, 1);

                } else {
                    throw new AllergenIsNotAssignedException(allergen.name);                }
            }

            //!No hay array de menus en plato por lo que es mas corto solo se añade el plato al menu

            assignDishToMenu(dish, menu) {

                let posMenu = this.#getPositionMenu(menu);

                if (posMenu == -1) {
                    this.addMenu(menu);
                    posMenu = this.#getPositionMenu(menu);
                }

                if (!this.#menus[posMenu].dishes.includes(dish)) {
                    this.#menus[posMenu].dishes.push(dish);
                } else {
                    throw new DishAlreadyAssignedException(dish.name);
                }

            }
            deassignDishToMenu(dish, menu) {

                let posMenu = this.#getPositionMenu(menu);
                if (this.#menus[posMenu].dishes.includes(dish)) {
                    let posDish = this.#menus[posMenu].dishes.findIndex(d => d.name == dish.name);
                    this.#menus[posMenu].dishes.splice(posDish, 1);
                } 
            }


            assignCategoryToDish(category, dish) {

                let posCategory = this.#getPositionCategory(category);
                let posDish = this.#getPositionDish(dish);

                if (posCategory == -1) {
                    this.addCategory(category);
                    posCategory = this.#getPositionCategory(category);
                }
                if (posDish == -1) {
                    this.addDish(dish);
                    posDish = this.#getPositionDish(dish);
                }

                if (!this.#categories[posCategory].dishes.includes(dish)) {
                    this.#categories[posCategory].dishes.push(dish);
                } else {
                    throw new DishAlreadyAssignedException(dish.name);
                }

                if (!this.#dishes[posDish].categories.includes(category)) {
                    this.#dishes[posDish].categories.push(category);
                } else {
                    throw new CategoryAlreadyAssignedException(category.name);
                }

            }

            //!COMPLETAR LOS DEASSIGN
            deassignCategoryToDish(category, dish) {
                let poscategory = this.#getPositionCategory(category);
                let posDish = this.#getPositionDish(dish);

                if (this.#categories[poscategory].dishes.includes(dish)) {
                    let dishIndexIncategory = this.#categories[poscategory].dishes.findIndex(d => d.name == dish.name);
                    this.#categories[poscategory].dishes.splice(dishIndexIncategory, 1);

                } else {
                    throw new DishIsNotAssignedException(dish.name);
                }

                if (this.#dishes[posDish].categories.includes(category)) {
                    let categoryIndexInDish = this.#dishes[posDish].categories.findIndex(c => c.name == category.name);
                    this.#dishes[posDish].categories.splice(categoryIndexInDish, 1);
                    console.log("categoria: " + category.name + " quitada del plato: " + dish.name);
                } else {
                    throw new CategoryIsNotAssignedException(category.name);
                }


            }

            changeDishesPositionsInMenu(menu, dish1, dish2) {
                let posMenu = this.#getPositionMenu(menu);

                if (posMenu == -1) {
                    throw new MenuNoExistException(menu.name);
                }

                let posDish1 = this.#menus[posMenu].dishes.findIndex(d => d.name == dish1.name);
                let posDish2 = this.#menus[posMenu].dishes.findIndex(d => d.name == dish2.name);
                
                if (posDish1 != -1 && posDish2 != -1) {

                    let temp = posDish1;
                    posDish1 = posDish2;
                    posDish2 = temp;

                    this.#menus[posMenu].dishes[posDish1] = dish1;
                    this.#menus[posMenu].dishes[posDish2] = dish2;

                } else {
                    throw new DishNoExistException(dish1.name+" and "+dish2.name);
                }
            }

            *getDishesInCategory(category) {
                let posCategory = this.#getPositionCategory(category);
                if (posCategory == -1) {
                    throw new CategoryNoExistException(category.name);
                }
                let array = this.#categories[posCategory].dishes;
                for (let dish of array) {
                    yield dish;
                }
            }
            *getDishesWithAllergen(allergen) {
                let posAllergen = this.#getPositionAllergen(allergen);
                if (posAllergen == -1) {
                    throw new AllergenNoExistException(allergen.name);
                }
                let array = this.#allergens[posAllergen].dishes;
                for (let dish of array) {
                    yield dish;
                }
            }

            *findDishes(callbackFunction) {
                let array = this.#dishes.filter(callbackFunction);
                for (let dish of array) {
                    yield dish;
                }
            }

            createDish(name, description = "", ingredients = [], image = "") {
                if ((this.#dishes.findIndex(x => x.dish.name === name)) != -1) {
                    let posDish = this.#dishes.findIndex(x => x.dish.name === name);
                    return this.#dishes[posDish].dish;
                } else {
                    let dish = new Dish(name, description, ingredients, image);
                    return dish;
                }

            }

            createMenu(name, description = "") {
                if ((this.#menus.findIndex(x => x.menu.name === name)) != -1) {
                    let posMenu = this.#menus.findIndex(x => x.menu.name === name);
                    return this.#menus[posMenu].menu;
                } else {
                    let menu = new Menu(name, description);
                    return menu;
                }
            }

            createAllergen(name, description = "") {
                if ((this.#allergens.findIndex(x => x.allergen.name === name)) != -1) {
                    let posAllergen = this.#allergens.findIndex(x => x.allergen.name === name);
                    return this.#allergens[posAllergen].allergen;
                } else {
                    let allergen = new Allergen(name, description);
                    return allergen;
                }
            }

            createCategory(name, description = "") {
                if ((this.#categories.findIndex(x => x.category.name === name)) != -1) {
                    let posCategory = this.#categories.findIndex(x => x.category.name === name);
                    return this.#categories[posCategory].category;
                } else {
                    let category = new Category(name, description);
                    return category;
                }
            }

            createRestaurant(name, description = "", location = null) {
                if ((this.#restaurants.findIndex(x => x.restaurant.name === name)) != -1) {
                    let posRestaurant = this.#restaurants.findIndex(x => x.restaurant.name === name);
                    return this.#restaurants[posRestaurant].restaurant;
                } else {
                    let restaurant = new Restaurant(name, description, location);
                    return restaurant;
                }
            }

        }
        return Object.freeze(new RestaurantManager());
    }

    return {
        getInstance() {
            if (!instancia) instancia = init();
            return instancia;
        }
    }
})();


export default RestaurantManagerSingleton;
export {
    Dish, Allergen, Menu, Category, Restaurant, Coordinate}

