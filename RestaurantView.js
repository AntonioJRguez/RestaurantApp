class RestaurantView {
    constructor() {
        this.principal = document.getElementById('principal');
    }

    init() {
        //this.bindDishesCategoryList();
    }

    onLoad(categories, dishes, allergens, menus, restaurants) {
        // llama al controlador con el método getCategories y lo almacena en una variable
        let categorias = categories;

        categorias.forEach(element => {
            document.getElementById('principal').insertAdjacentHTML('beforeend', `<div class="col-md-4">
            <div class="card card-product-grid">
                <a data-category="${element.category.name}" href="#" class="img-wrap"> <!-- Asegúrate de que esto es correcto -->
                    <img class="img-fluid w-100" src="https://via.placeholder.com/258x172.jpg?text=${element.category.name}">
                </a>
                <div id="menuCategorias" class="card-body">
                    <h4 class="card-title mt-5">${element.category.name}</h4>
                    <p class="card-text">${element.category.description}</p>
                    <a data-category="${element.category.name}" href="#" class="btn btn-primary"><i class="fa fa-eye"></i> Show Category</a>
                </div>
            </div>`);

            document.getElementById('menu_categorias').insertAdjacentHTML('beforeend', '<li><a data-category=' + element.category.name + ' class="dropdown-item" href="#">' + element.category.name + '</a></li>');

        });

        /*
        allergens.forEach(element => {

            document.getElementById('menu_allergens').insertAdjacentHTML('beforeend', '<li><a data-category='+element.allergen.name+' class="dropdown-item" href="#">' + element.allergen.name + '</a></li>');

        });
        menus.forEach(element => {

            document.getElementById('menu_menus').insertAdjacentHTML('beforeend', '<li><a data-category='+element.menu.name+' class="dropdown-item" href="#">' + element.menu.name + '</a></li>');

        });
        restaurants.forEach(element => {

            document.getElementById('menu_restaurants').insertAdjacentHTML('beforeend', '<li><a data-category='+element.restaurant.name+' class="dropdown-item" href="#">' + element.restaurant.name + '</a></li>');

        });*/

        let platos = dishes.sort(() => 0.5 - Math.random()).slice(0, 3);

        platos.forEach(element => {
            document.getElementById('platos_aleatorios').insertAdjacentHTML('beforeend', `<div class="col-md-4">
            <div class="card card-product-grid mb-4">
                <a data-dish="${element.name}" href="#" class="img-wrap">
                    <img class="img-fluid w-100" src="https://via.placeholder.com/258x172.jpg?text=`+ element.name + `">
                </a>
                <div class="card-body">
                    <h4 class="card-title mt-5">`+ element.name + `</h4>
                    <p class="card-text">
                    `+ element.description + `
                    </p>
                    <a data-dish="${element.name}" href="#" class="btn btn-success"><i class="fa fa-eye"></i> Show Dish</a>
                </div>
            </div>`);
        });

        let breadcrumbs = document.getElementById('breadcrumb');
        breadcrumbs.replaceChildren();
        breadcrumbs.insertAdjacentHTML('beforeend', `
            
            <a class="link-body-emphasis me-3" href="/index.html">
                <i class="fa-solid fa-house"></i>
            </a>
           
            <li class="breadcrumb-item"><a href="index.html">Home</a></li>`);

        this.init();
    }

    bindAllergsList(handler) {
        let allergensMenu = document.getElementsByClassName('listAllergens');
        Array.from(allergensMenu).forEach(element => {
            element.addEventListener('click', (event) => {
                const { allergen } = event.currentTarget.dataset;
                handler(allergen);
            });
        });        
    }

    bindMenusList(handler) {

        let menusMenu = document.getElementById('listMenus');

        menusMenu.addEventListener('click', (event) => {
            const { menu } = event.currentTarget.dataset;
            handler(menu);
        });
    }

    bindRestaurantsList(handler) {

        let restaurantsMenu = document.getElementById('listRestaurants');

        restaurantsMenu.addEventListener('click', (event) => {
            const { menu } = event.currentTarget.dataset;
            handler(menu);
        });
    }

    bindDishesCategoryList(handler) {
        //!Original
        // let categoryList = document.getElementById('principal');
        // let links = categoryList.querySelectorAll('a[data-category]');
        //?LLamando a todos los a[data-category]

        let links = document.querySelectorAll('a[data-category]');

        for (const link of links) {
            link.addEventListener('click', (event) => {
                const { category } = event.currentTarget.dataset;
                // invocar a la funcion getDishesInCategory(category)
                handler(category);
            });
        }
    }

    bindDishDetail(handler) {      
        document.getElementById('principal').addEventListener('click', (event) => {            
            const dishElement = event.target.closest('[data-dish]');
            if (dishElement) {
                const dish = dishElement.getAttribute('data-dish');
                console.log("Dish clicked:", dish); // Para depuración
                handler(dish);
                event.preventDefault();
            }
        });
        document.getElementById('platos_aleatorios').addEventListener('click', (event) => {            
            const dishElement = event.target.closest('[data-dish]');
            if (dishElement) {
                const dish = dishElement.getAttribute('data-dish');
                console.log("Dish clicked:", dish); // Para depuración
                handler(dish);
                event.preventDefault();
            }
        });
    }

    bindAllergenDetail(handler) {
        document.getElementById('principal').addEventListener('click', (event) => {
            if (event.target.closest('[data-allergen]')) {
                const allergen = event.target.closest('[data-allergen]').getAttribute('data-allergen');
                handler(allergen);
                event.preventDefault();
            }
        });
    }

    bindMenuDetail(handler) {
        document.getElementById('principal').addEventListener('click', (event) => {
            if (event.target.closest('[data-menu]')) {
                const menu = event.target.closest('[data-menu]').getAttribute('data-menu');
                handler(menu);
                event.preventDefault();
            }
        });
    }

    bindRestaurantDetail(handler) {
        document.getElementById('principal').addEventListener('click', (event) => {
            if (event.target.closest('[data-restaurant]')) {
                const restaurant = event.target.closest('[data-restaurant]').getAttribute('data-restaurant');
                handler(restaurant);
                event.preventDefault();
            }
        });
    }

    displayDishDetail(dish) {

        let containerPlatosAleatorios = document.getElementById('containerPlatosAleatorios');
        containerPlatosAleatorios.replaceChildren();

        let principal = document.getElementById('principal');
        principal.replaceChildren();

        let principalTittle = document.getElementById('principal-tittle');
        principalTittle.innerText = 'Dish Detail: ' + dish.name;

        let breadcrumbs = document.getElementById('breadcrumb');
        breadcrumbs.replaceChildren();
        breadcrumbs.insertAdjacentHTML('beforeend', `
            
            <a class="link-body-emphasis me-3" href="/index.html">
                <i class="fa-solid fa-house"></i>
            </a>
            <li class="breadcrumb-item"><a href="index.html">Home</a></li>
            <li class="breadcrumb-item"><a data-dish="${dish.name}" href="#">Dish</a></li>
            <li class="breadcrumb-item active" aria-current="page"> ${dish.name}</li>`);

        const ingredientsListHtml = dish.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('');

        principal.insertAdjacentHTML('beforeend', `
                <div class="col-md-12 mt-3">
                    <h4>Description: </h4> <span>${dish.description}</span>
                    <h4 class="mt-3">Ingredients: </h4>
                    <ul>${ingredientsListHtml}</ul>
                </div>`);
    }

    displayAllergenDetail(data) {

        let containerPlatosAleatorios = document.getElementById('containerPlatosAleatorios');
        containerPlatosAleatorios.replaceChildren();

        let principal = document.getElementById('principal');
        principal.replaceChildren();

        let principalTittle = document.getElementById('principal-tittle');
        principalTittle.innerText = 'Allergen Detail: ' + data.allergen.name;

        let breadcrumbs = document.getElementById('breadcrumb');
        breadcrumbs.replaceChildren();
        breadcrumbs.insertAdjacentHTML('beforeend', `
            
            <a class="link-body-emphasis me-3" href="/index.html">
                <i class="fa-solid fa-house"></i>
            </a>
            <li class="breadcrumb-item"><a href="index.html">Home</a></li>
            <li class="breadcrumb-item"><a data-allergens="allergens" class="listAllergens" href="#">Allergens</a></li>
            <li class="breadcrumb-item active" aria-current="page"> ${data.allergen.name}</li>`);

            const dishesListHtml = data.dishes.map(dish => `<li><a class="text-decoration-none" href="#" data-dish="${dish.name}">${dish.name}</a></li>`).join('');

        principal.insertAdjacentHTML('beforeend', `
                <div class="col-md-12 mt-3">
                    <h4>Description: </h4> <span>${data.allergen.description}</span>
                    <h4 class="mt-3">Dishes: </h4>
                    <ul>${dishesListHtml}</ul>
                </div>`);
    }

    displayMenuDetail(data) {

        let containerPlatosAleatorios = document.getElementById('containerPlatosAleatorios');
        containerPlatosAleatorios.replaceChildren();

        let principal = document.getElementById('principal');
        principal.replaceChildren();

        let principalTittle = document.getElementById('principal-tittle');
        principalTittle.innerText = 'Menu Detail: ' + data.menu.name;

        let breadcrumbs = document.getElementById('breadcrumb');
        breadcrumbs.replaceChildren();
        breadcrumbs.insertAdjacentHTML('beforeend', `            
            <a class="link-body-emphasis me-3" href="/index.html">
                <i class="fa-solid fa-house"></i>
            </a>
            <li class="breadcrumb-item active"><a href="index.html">Home</a></li>
            <li class="breadcrumb-item"><a id="listMenus" data-menus="menus" href="#">Menus</a></li>
            <li class="breadcrumb-item active" aria-current="page"> ${data.menu.name}</li>`);

        const dishesListHtml = data.dishes.map(dish => `<li><a class="text-decoration-none" href="#" data-dish="${dish.name}">${dish.name}</a></li>`).join('');

        principal.insertAdjacentHTML('beforeend', `
                <div class="col-md-12 mt-3">
                    <h4>Description: </h4> <span>${data.menu.description}</span>
                    <h4 class="mt-3">Dishes: </h4>
                    <ul>${dishesListHtml}</ul>
                </div>`);
    }

    displayRestaurantDetail(data) {

        let containerPlatosAleatorios = document.getElementById('containerPlatosAleatorios');
        containerPlatosAleatorios.replaceChildren();

        let principal = document.getElementById('principal');
        principal.replaceChildren();

        let principalTittle = document.getElementById('principal-tittle');
        principalTittle.innerText = 'Restaurant Detail: ' + data.restaurant.name;

        let breadcrumbs = document.getElementById('breadcrumb');
        breadcrumbs.replaceChildren();
        breadcrumbs.insertAdjacentHTML('beforeend', `
            
            <a class="link-body-emphasis me-3" href="/index.html">
                <i class="fa-solid fa-house"></i>
            </a>
            <li class="breadcrumb-item active"><a href="index.html">Home</a></li>
            <li class="breadcrumb-item"><a href="#">Restaurant</a></li>
            <li class="breadcrumb-item active" aria-current="page"> ${data.restaurant.name}</li>`);

        principal.insertAdjacentHTML('beforeend', `
                <div class="col-md-12 mt-3">
                    <h4>Description: </h4> <span>${data.restaurant.description}</span>
                    <h4 class="mt-3">Coordinate: </h4> 
                    <ul>
                        <li>Latitude: ${data.restaurant.location.latitude}</li>
                        <li>Longitude: ${data.restaurant.location.longitude} </li>
                    </ul>
                </div>`);
    }

    displayAllergens(allergsList) {

        let principal = document.getElementById('principal');
        principal.replaceChildren();

        let principalTittle = document.getElementById('principal-tittle');
        principalTittle.innerText = 'Allergens List:';

        let breadcrumbs = document.getElementById('breadcrumb');
        breadcrumbs.replaceChildren();
        breadcrumbs.insertAdjacentHTML('beforeend', `
            
            <a class="link-body-emphasis me-3" href="/index.html">
                <i class="fa-solid fa-house"></i>
            </a>
            <li class="breadcrumb-item"><a href="index.html">Home</a></li>
            <li class="breadcrumb-item active"><a class="listAllergens" href="#">Allergens</a></li>`);

        allergsList.forEach(element => {
            principal.insertAdjacentHTML('beforeend', `<div class="col-md-4">
            <div class="card card-product-grid mb-4">
                <a  data-allergen="`+ element.allergen.name + `" href="#" class="img-wrap">
                    <img class="img-fluid w-100" src="https://via.placeholder.com/258x172.jpg?text=`+ element.allergen.name + `">
                </a>
                <div class="card-body">
                    <h4 class="card-title mt-5">`+ element.allergen.name + `</h4>
                    <p class="card-text">
                    `+ element.allergen.description + `
                    </p>
                    <a data-allergen="`+ element.allergen.name + `" href="#" class="btn btn-warning"><i class="fa fa-eye"></i> Show Allergen</a>
                </div>
            </div>`);
        });
    }

    displayMenus(menusList) {

        let principal = document.getElementById('principal');
        principal.replaceChildren();

        let principalTittle = document.getElementById('principal-tittle');
        principalTittle.innerText = 'Menus List:';

        let breadcrumbs = document.getElementById('breadcrumb');
        breadcrumbs.replaceChildren();
        breadcrumbs.insertAdjacentHTML('beforeend', `
            
            <a class="link-body-emphasis me-3" href="/index.html">
                <i class="fa-solid fa-house"></i>
            </a>
            <li class="breadcrumb-item active"><a href="index.html">Home</a></li>
            <li class="breadcrumb-item active"><a href="#">Menus</a></li>`);

        menusList.forEach(element => {
            principal.insertAdjacentHTML('beforeend', `<div class="col-md-4">
            <div class="card card-product-grid mb-4">
                <a data-menu="`+ element.menu.name + `" href="#" class="img-wrap">
                    <img class="img-fluid w-100" src="https://via.placeholder.com/258x172.jpg?text=`+ element.menu.name + `">
                </a>
                <div class="card-body">
                    <h4 class="card-title mt-5">`+ element.menu.name + `</h4>
                    <p class="card-text">
                    `+ element.menu.description + `
                    </p>
                    <a data-menu="`+ element.menu.name + `" href="#" class="btn btn-danger"><i class="fa fa-eye"></i> Show Menu</a>
                </div>
            </div>`);
        });
    }

    displayRestaurants(restaurantsList) {

        let principal = document.getElementById('principal');
        principal.replaceChildren();

        let principalTittle = document.getElementById('principal-tittle');
        principalTittle.innerText = 'Restaurants List:';

        let breadcrumbs = document.getElementById('breadcrumb');
        breadcrumbs.replaceChildren();
        breadcrumbs.insertAdjacentHTML('beforeend', `
            
            <a class="link-body-emphasis me-3" href="/index.html">
                <i class="fa-solid fa-house"></i>
            </a>
            <li class="breadcrumb-item active"><a href="index.html">Home</a></li>
            <li class="breadcrumb-item"><a href="#">Restaurants</a></li>`);

        restaurantsList.forEach(element => {
            principal.insertAdjacentHTML('beforeend', `<div class="col-md-4">
            <div class="card card-product-grid mb-4">
                <a  data-restaurant="`+ element.restaurant.name + `" href="#" class="img-wrap">
                    <img class="img-fluid w-100" src="https://via.placeholder.com/258x172.jpg?text=`+ element.restaurant.name + `">
                </a>
                <div class="card-body">
                    <h4 class="card-title mt-5">`+ element.restaurant.name + `</h4>
                    <p class="card-text">
                    `+ element.restaurant.description + `
                    </p>
                    <a data-restaurant="`+ element.restaurant.name + `" href="#" class="btn btn-info"><i class="fa fa-eye"></i> Show Restaurant</a>
                </div>
            </div>`);
        });
    }

    displayDishesCategory(dishes, category) {

        let containerPlatosAleatorios = document.getElementById('containerPlatosAleatorios');
        containerPlatosAleatorios.replaceChildren();

        let principal = document.getElementById('principal');
        principal.replaceChildren();

        let platos = dishes;

        let principalTittle = document.getElementById('principal-tittle');
        principalTittle.innerText = 'Dishes for Category: ' + category;

        let breadcrumbs = document.getElementById('breadcrumb');
        breadcrumbs.replaceChildren();
        breadcrumbs.insertAdjacentHTML('beforeend', `
            
            <a class="link-body-emphasis me-3" href="/index.html">
                <i class="fa-solid fa-house"></i>
            </a>
           
            <li class="breadcrumb-item"><a href="index.html">Home</a></li>
            <li class="breadcrumb-item"><a href="index.html">Categories</a></li>
            <li class="breadcrumb-item"><a data-category="${category}" href="#">${category}</a></li>
            <li class="breadcrumb-item active" aria-current="page"> Dishes</li>`);

        platos.forEach(element => {
            principal.insertAdjacentHTML('beforeend', `<div class="col-md-4">
            <div class="card card-product-grid mb-4">
                <a  data-dish="`+ element.name + `" href="#" class="img-wrap">
                    <img class="img-fluid w-100" src="https://via.placeholder.com/258x172.jpg?text=`+ element.name + `">
                </a>
                <div class="card-body">
                    <h4 class="card-title mt-5">`+ element.name + `</h4>
                    <p class="card-text">
                    `+ element.description + `
                    </p>
                    <a data-dish="`+ element.name + `" href="#" class="btn btn-success"><i class="fa fa-eye"></i> Ver Plato</a>
                </div>
            </div>`);
        });
    }

}
export default RestaurantView;