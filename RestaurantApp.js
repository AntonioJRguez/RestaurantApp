import RestaurantManagerSingleton, {
    Dish, Allergen, Menu, Category, Restaurant, Coordinate,
    } from './RestaurantModel.js';
    import RestaurantController from './RestaurantController.js';
    import RestaurantView from './RestaurantView.js';

    const RestaurantApp = new
    RestaurantController(RestaurantManagerSingleton.getInstance(), new
    RestaurantView());

    const dish1 = new Dish("Pasta Bolonesa", "Delicious pasta with tomatoe", ["Pasta", "tomatoe"], "bolonesa.jpg");
    const dish2 = new Dish("Pasta Carbonara", "Delicious pasta carbonara", ["Pasta", "bacon"], "carbonara.jpg");
    const dish3 = new Dish("Pasta al pesto", "Delicious pasta al pesto", ["Pasta", "pesto"], "pesto.jpg");
    const dish4 = new Dish("Pasta alfredo", "Delicious pasta alfredo", ["Pasta", "salsa alfredo"], "alfredo.jpg");
    
    const dish5 = new Dish("Chicken with potatoes", "Great chicken tasting plate", ["Chicken", "Pepper", "Potatoes"], "chicken.jpg");
    const dish6 = new Dish("Tomato-Butter Roast Chicken", "Great chicken baked plate", ["Chicken", "Mustard", "Comin"], "chicken.jpg");
    const dish7 = new Dish("Cajun-Stuffed Chicken", "A different chicken good dish", ["Chicken", "Onion", "Cheddar"], "chicken.jpg");
    const dish8 = new Dish("Garlicky Greek Chicken", "Simple chicken dish", ["Chicken", "Garlic", "Oregano"], "chicken.jpg");
    
    const dish9 = new Dish("Mushroom soup", "A soup made of mushroom", ["Mushrooms", "Onion", "Garlic"], "soup.jpg");
    const dish10 = new Dish("Vegetable soup", "Variety vegetable soup", ["Asparagus", "Turnip", "Celery"], "soup.jpg");
    const dish11 = new Dish("Thai curry noodle soup", "Tipical asian soup", ["Curry", "Noodles", "Prawns"], "soup.jpg");
    const dish12 = new Dish("Miso & butternut soup", "Great tasting soup", ["Miso", "Butternut", "Garlic"], "soup.jpg");
    
    // Create some categories
    const category1 = new Category("Pasta", "Pasta dishes");
    const category2 = new Category("Chicken", "Chicken-based dishes");
    const category3 = new Category("Soups", "Soup dishes");
    // Create some allergens
    const allergen1 = new Allergen("Gluten", "Contains gluten");
    const allergen2 = new Allergen("Dairy", "Contains dairy");
    const allergen3 = new Allergen("Seafood", "Contains seafood");
    const allergen4 = new Allergen("Peanut", "Contains peanuts");
    
    // Create some menus
    const menu1 = new Menu("Italian especialities", "Authentic Italian dishes");
    const menu2 = new Menu("Today's menu", "Real time menu");
    const menu3 = new Menu("Around the world", "A menu from many places of the world");
    
    // Create some coordinates
    const coordinate1 = new Coordinate(40.7128, -74.0060);
    const coordinate2 = new Coordinate(34.0522, -118.2437);
    const coordinate3 = new Coordinate(30.0162, -29.2737);
    
    // Create some restaurants
    const restaurant1 = new Restaurant("La Mafia", "Italian restaurant", coordinate1);
    const restaurant2 = new Restaurant("Meson Manolo", "Best spanish restaurant", coordinate2);
    const restaurant3 = new Restaurant("Sakura", "Asian restaurant", coordinate3);

    const dishes = new Array(dish1, dish2, dish3, dish4, dish5, dish6, dish7, dish8, dish9, dish10, dish11, dish12);
    const allergens = new Array(allergen1, allergen2, allergen3, allergen4);
    const menus = new Array(menu1, menu2, menu3);
    const categories = new Array(category1, category2, category3);
    const restaurants = new Array(restaurant1, restaurant2, restaurant3);

    RestaurantApp.onLoad(dishes, allergens, menus, restaurants, categories);
    
    export default RestaurantApp;
