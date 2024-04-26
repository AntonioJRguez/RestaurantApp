import RestaurantManagerSingleton, {
    Dish, Allergen, Menu, Category, Restaurant, Coordinate,
} from './RestaurantModel.js';
import RestaurantController from './RestaurantController.js';
import RestaurantView from './RestaurantView.js';

const RestaurantApp = new
    RestaurantController(RestaurantManagerSingleton.getInstance(), new
        RestaurantView());



fetch('objetos.json')
    .then(response => response.json())
    .then(response => {
        // const { menus, dishes } = response.menus
        // { menus, dishes, }
        // response ==== El array de objetos que hay en menus.json

        const menus = response.menus.map((restaurantMenu) => {
            const { name, description } = restaurantMenu;
            // new Menu(restaurantMenu.title, restaurantMenu.description);
            return new Menu(name, description);

        });

        const dishes = response.dishes.map((restaurantDish) => {

            const { name, description, ingredients, image } = restaurantDish;
            return new Dish(name, description, ingredients, image);

        });
        const categories = response.categories.map((restaurantCategory) => {

            const { name, description} = restaurantCategory;
            return new Category(name, description);

        });
        const allergens = response.allergens.map((restaurantAllergen) => {

            const { name, description} = restaurantAllergen;
            return new Allergen(name, description);

        });

        const coordinates = response.coordinates.map((restaurantCoordinate) => {

            const { latitude, longitude} = restaurantCoordinate;
            return new Coordinate( latitude, longitude);

        });
        const restaurants = response.restaurants.map((restaurant, index) => {

            let { name, description, location} = restaurant;
            location = coordinates[index];
            return new Restaurant( name, description, location);

        });



        
        RestaurantApp.onLoad(dishes, allergens, menus, restaurants, categories);
    });



export default RestaurantApp;
