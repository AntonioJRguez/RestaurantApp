class RestaurantView {
    constructor() {
        this.principal = document.getElementById('principal');
    }


    onLoad(categories, dishes, allergens, menus, restaurants) {
        // llama al controlador con el método getCategories y lo almacena en una variable
        // let categorias = categories;

        this.showCategories(categories);


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


    }

    showCategories(categories) {
        principal.replaceChildren("");
        categories.forEach(element => {
            let principal = document.getElementById('principal');

            principal.insertAdjacentHTML('beforeend', `<div class="col-md-4">
            <div class="card card-product-grid">
                <a data-category="${element.category.name}" href="#" class="img-wrap">
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
                handler(dish);
                event.preventDefault();
            }
        });
        document.getElementById('platos_aleatorios').addEventListener('click', (event) => {
            const dishElement = event.target.closest('[data-dish]');
            if (dishElement) {
                const dish = dishElement.getAttribute('data-dish');
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
    //!PRUEBA NO CORREGIDO

    // Método para mostrar el formulario de creación de platos
    displayCreateDishForm(categories, allergens, handler) {
        const existingForm = document.getElementById('createDishForm');
        if (existingForm) {
            existingForm.remove();
        }

        const formHtml = `
        <div id="createDishForm" class="modal fade" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Create new dish</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="newDishForm" novalidate>
                            <div class="mb-3">
                                <label for="dishName" class="form-label">Dish Name</label>
                                <div class="invalid-feedback"></div>
                                <div class="valid-feedback"></div>
                                <input type="text" class="form-control" id="dishName" required>
                            </div>
                            <div class="mb-3">
                                <label for="dishDescription" class="form-label">Description</label>
                                <div class="invalid-feedback"></div>
                                <div class="valid-feedback"></div>
                                <textarea class="form-control" id="dishDescription" rows="3" required></textarea>
                            </div>
                            <div class="mb-3">
                            <label for="ingredients" class="form-label">Ingredients</label>
                            <div class="invalid-feedback"></div>
                            <div class="valid-feedback"></div>
                            <input type="text" class="form-control" pattern="^(([A-Za-z]+)(([ \t]*)?([A-Za-z]+))*([ \t]*,[ \t]*[A-Za-z]+)*)?$" id="ingredients" required></input>
                        </div>
                            <div class="mb-3">
                                <label for="categorySelect" class="form-label">Category</label>
                                <div class="invalid-feedback"></div>
                                <div class="valid-feedback"></div>
                                <select class="form-select" id="categorySelect" multiple required>
                                    ${categories.map(category => `<option value="${category.category.name}">${category.category.name}</option>`).join('')}
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="allergenSelect" class="form-label">Allergens</label>
                                <div class="invalid-feedback"></div>
                                <div class="valid-feedback"></div>
                                <select class="form-select" id="allergenSelect" multiple required>
                                    ${allergens.map(allergen => `<option value="${allergen.allergen.name}">${allergen.allergen.name}</option>`).join('')}
                                </select>
                            </div>
                            <button type="submit" class="btn btn-primary">Create dish</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>`;

        // Agregar el formulario al cuerpo del documento
        document.body.insertAdjacentHTML('beforeend', formHtml);

        // Mostrar el modal
        const createDishModal = new bootstrap.Modal(document.getElementById('createDishForm'));
        createDishModal.show();

        // Manejar el envío del formulario
        document.getElementById('newDishForm').addEventListener('submit', event => {
            event.preventDefault();
            let isValid = true
            // Validamos

            const disNameElement = document.getElementById('dishName');

            if (!disNameElement.checkValidity()) {
                isValid = false

                if (disNameElement.validity.valueMissing) {

                    this.showFeedBack(disNameElement, false, 'This field is required')

                }

            } else {
                this.showFeedBack(disNameElement, true);
            }

            const descriptionElement = document.getElementById('dishDescription');
            if (!descriptionElement.checkValidity()) {

                isValid = false

                this.showFeedBack(descriptionElement, false, 'This field is required');

            } else {
                this.showFeedBack(descriptionElement, true);
            }

            const ingredientsElement = document.getElementById('ingredients');

            if (!ingredientsElement.checkValidity()) {

                isValid = false
                this.showFeedBack(ingredientsElement, false, 'You must enter a list of ingredients separated by commas.');
            } else {
                this.showFeedBack(ingredientsElement, true);
            }


            const categoriesElement = document.getElementById('categorySelect')


            if (!categoriesElement.checkValidity()) {
                isValid = false

                this.showFeedBack(categoriesElement, false, 'Select at least one category');

            } else {
                this.showFeedBack(categoriesElement, true);
            }

            const allergensElement = document.getElementById('allergenSelect')


            if (!allergensElement.checkValidity()) {
                isValid = false

                this.showFeedBack(allergensElement, false, 'Select at least one allergen');

            } else {
                this.showFeedBack(allergensElement, true);
            }

            const dishName = document.getElementById('dishName').value;
            const dishDescription = document.getElementById('dishDescription').value;
            const ingredients = document.getElementById('ingredients').value;
            const selectedCategories = Array.from(document.getElementById('categorySelect').selectedOptions).map(option => option.value);
            const selectedAllergens = Array.from(document.getElementById('allergenSelect').selectedOptions).map(option => option.value);
            // Llamar a un manejador externo para enviar los datos del nuevo plato al controlador

            if (isValid) {
                handler(dishName, dishDescription, ingredients, selectedCategories, selectedAllergens);

                document.getElementById('newDishForm').reset();
                createDishModal.hide();
            }

        });
    }


    showFeedBack(input, valid, message) {
        const validClass = (valid) ? 'is-valid' : 'is-invalid';
        const messageDiv = (valid) ?
            input.parentElement.querySelector('div.valid-feedback') :
            input.parentElement.querySelector('div.invalid-feedback');
        for (const div of input.parentElement.getElementsByTagName('div')) {
            div.classList.remove('d-block');
        }
        messageDiv.classList.remove('d-none');
        messageDiv.classList.add('d-block');
        input.classList.remove('is-valid');
        input.classList.remove('is-invalid');
        input.classList.add(validClass);
        if (message) {
            messageDiv.innerHTML = message;
        }
    }

    // Método para vincular el evento de mostrar el formulario de creación de platos a un botón
    bindCreateDishForm(handler) {
        const createDishButton = document.getElementById('createDishButton');
        createDishButton.addEventListener('click', () => {
            // Llamar al método para mostrar el formulario de creación de platos
            handler();
        });
    }

    displayDeleteDishForm(dishes, handler) {
        const existingForm = document.getElementById('dDishForm');
        if (existingForm) {
            existingForm.remove();
        }
        const formHtml = `
        <div id="dDishForm" class="modal fade" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Delete dish</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="delDishForm">
                            
                            <div class="mb-3">
                                <label for="dishName" class="form-label">Dish</label>
                                <select class="form-select" id="dishName"  required>
                                    ${dishes.map(d => `<option value="${d.dish.name}">${d.dish.name}</option>`).join('')}
                                </select>
                            </div>
                           
                            <button type="submit" class="btn btn-primary">Delete dish</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>`;

        // Agregar el formulario al cuerpo del documento
        document.body.insertAdjacentHTML('beforeend', formHtml);

        // Mostrar el modal
        const deleteDishModal = new bootstrap.Modal(document.getElementById('dDishForm'));
        deleteDishModal.show();

        // Manejar el envío del formulario
        document.getElementById('delDishForm').addEventListener('submit', event => {
            event.preventDefault();
            const dishName = document.getElementById('dishName').value;

            if (dishName !== '') {
                handler(dishName);
            }

            deleteDishModal.hide();
        });
    }

    bindDeleteDishForm(handler) {
        const deleteDishButton = document.getElementById('deleteDishButton');
        deleteDishButton.addEventListener('click', () => {
            // Llamar al método para mostrar el formulario de creación de platos
            handler();
        });
    }

    bindControlDishMenuForm(handler) {
        const controlDishMenuButtom = document.getElementById('controlDishMenuButtom');
        controlDishMenuButtom.addEventListener('click', () => {
            // Llamar al método para mostrar el formulario de creación de platos
            handler();
        });
    }
    displayControlDishMenuForm(dishes, menus, handlerAssign, handlerDeassign) {
        const existingForm = document.getElementById('controlDishMenuForm');
        if (existingForm) {
            existingForm.remove();
        }
        const formHtml = `
<div id="controlDishMenuForm" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Manage dish in menu</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="assignDishForm">
                    <div class="mb-3">
                        <label for="assignDishName" class="form-label">Dish</label>
                        <select class="form-select" id="assignDishName" required>
                            ${dishes.map(d => `<option value="${d.dish.name}">${d.dish.name}</option>`).join('')}
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="assignMenuName" class="form-label">Menu</label>
                        <select class="form-select" id="assignMenuName" required>
                            ${menus.map(m => `<option value="${m.menu.name}">${m.menu.name}</option>`).join('')}
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary">Assign to menu</button>
                </form>

                <form id="deassignDishForm" class="mt-5">
                    <div class="mb-3">
                        <label for="deassignMenuName" class="form-label">Menu</label>
                        <select class="form-select" id="deassignMenuName" required>
                            ${menus.map(m => `<option value="${m.menu.name}">${m.menu.name}</option>`).join('')}
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="deassignDishName" class="form-label">Dish</label>
                        <select class="form-select" id="deassignDishName" required>
                        
                        </select>
                    </div>
                    
                    <button type="submit" class="btn btn-danger">Unassign from menu</button>
                </form>
            </div>
        </div>
    </div>
</div>`;


        // Agregar el formulario al cuerpo del documento
        document.body.insertAdjacentHTML('beforeend', formHtml);

        // Mostrar el modal
        const deleteDishModal = new bootstrap.Modal(document.getElementById('controlDishMenuForm'));
        deleteDishModal.show();

        // Manejar el envío del formulario
        document.getElementById('assignDishForm').addEventListener('submit', event => {
            event.preventDefault();
            const dishName = document.getElementById('assignDishName').value;
            const menuName = document.getElementById('assignMenuName').value;


            handlerAssign(dishName, menuName);

            deleteDishModal.hide();
        })
        document.getElementById('deassignDishForm').addEventListener('submit', event => {
            event.preventDefault();
            const dishName = document.getElementById('deassignDishName').value;
            const menuName = document.getElementById('deassignMenuName').value;


            handlerDeassign(dishName, menuName);

            deleteDishModal.hide();
        })
        this.updateDishesSelect(menus, "Italian especialities");
        document.getElementById('deassignMenuName').addEventListener('change', (event) => {
            const menuName = event.target.value;
            this.updateDishesSelect(menus, menuName);
        });

    }


    updateDishesSelect(menus, menuName) {
        const selectedMenu = menus.find((m) => m.menu.name == menuName);
        const dishesSelect = document.getElementById('deassignDishName');

        // Limpiar el select de platos
        dishesSelect.innerHTML = '';

        // Crear las opciones del select de platos basadas en el menú seleccionado
        selectedMenu.dishes.forEach((dish) => {
            const option = document.createElement('option');
            option.value = dish.name;
            option.textContent = dish.name;
            dishesSelect.appendChild(option);
        });
    }
    updateDishesSelectCategory(categories, categoryName) {
        const selectedCategory = categories.find((c) => c.category.name == categoryName);
        const dishesSelect = document.getElementById('deassignDishCName');

        // Limpiar el select de platos
        dishesSelect.innerHTML = '';

        // Crear las opciones del select de platos basadas en el menú seleccionado
        selectedCategory.dishes.forEach((dish) => {
            const option = document.createElement('option');
            option.value = dish.name;
            option.textContent = dish.name;
            dishesSelect.appendChild(option);
        });
    }
    // Método para vincular el evento de mostrar el formulario de creacion de categorias a un botón
    bindCreateCategoryForm(handler) {
        const createDishButton = document.getElementById('createCategoryButtom');
        createDishButton.addEventListener('click', () => {
            // Llamar al método para mostrar el formulario de creación de platos
            handler();
        });
    }
    displayCreateCategoryForm(handlerCreate, handlerList) {
        const existingForm = document.getElementById('createCategoryForm');
        if (existingForm) {
            existingForm.remove();
        }
        const formHtml = `
        <div id="createCategoryForm" class="modal fade" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Create new category</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="newCategoryForm" novalidate>
                            <div class="mb-3">
                                <label for="categoryName" class="form-label">Category Name</label>
                                <div class="invalid-feedback"></div>
                                <div class="valid-feedback"></div>
                                <input type="text" class="form-control" id="categoryName" required>
                            </div>
                            <div class="mb-3">
                                <label for="categoryDescription" class="form-label">Description</label>
                                <div class="invalid-feedback"></div>
                                <div class="valid-feedback"></div>
                                <textarea class="form-control" id="categoryDescription" rows="3" required></textarea>
                            </div>
                            
                            <button type="submit" class="btn btn-primary">Create Category</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>`;


        // Agregar el formulario al cuerpo del documento
        document.body.insertAdjacentHTML('beforeend', formHtml);
        // Mostrar el modal
        const createCategoryModal = new bootstrap.Modal(document.getElementById('createCategoryForm'));
        createCategoryModal.show();




        // Manejar el envío del formulario
        document.getElementById('newCategoryForm').addEventListener('submit', event => {
            event.preventDefault();
            const categoryNameElement = document.getElementById('categoryName');
            let isValid = true
            if (!categoryNameElement.checkValidity()) {
                isValid = false

                if (categoryNameElement.validity.valueMissing) {

                    this.showFeedBack(categoryNameElement, false, 'This field is required')

                }

            } else {
                this.showFeedBack(categoryNameElement, true);
            }

            const categoryDescriptionElement = document.getElementById('categoryDescription');
            if (!categoryDescriptionElement.checkValidity()) {

                isValid = false

                this.showFeedBack(categoryDescriptionElement, false, 'This field is required');

            } else {
                this.showFeedBack(categoryDescriptionElement, true);
            }



            const categoryName = document.getElementById('categoryName').value;
            const categoryDescription = document.getElementById('categoryDescription').value;

            if (isValid) {
                // Llamar a un manejador externo para enviar los datos de la nueva categoria al controlador
                handlerCreate(categoryName, categoryDescription);


                document.getElementById('menu_categorias').insertAdjacentHTML('beforeend', '<li><a data-category=' + categoryName + ' class="dropdown-item" href="#">' + categoryName + '</a></li>');

                createCategoryModal.hide();

                let links = document.querySelectorAll('a[data-category]');

                for (const link of links) {
                    link.addEventListener('click', (event) => {
                        const { category } = event.currentTarget.dataset;
                        handlerList(category);
                    });
                }
                document.getElementById('newCategoryForm').reset();
            }
        });
    }
    bindDeleteCategoryForm(handler) {
        const deleteCategoryButton = document.getElementById('deleteCategoryButtom');
        deleteCategoryButton.addEventListener('click', () => {
            // Llamar al método para mostrar el formulario de creación de platos
            handler();
        });
    }

    displayDeleteCategoryForm(categories, handler) {
        const existingForm = document.getElementById('dCategoryForm');
        if (existingForm) {
            existingForm.remove();
        }
        const formHtml = `
        <div id="dCategoryForm" class="modal fade" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Delete category</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="dCategoryForm">
                            
                            <div class="mb-3">
                                <label for="categoryDelName" class="form-label">Dish</label>
                                <select class="form-select" id="categoryDelName"  required>
                                    ${categories.map(c => `<option value="${c.category.name}">${c.category.name}</option>`).join('')}
                                </select>
                            </div>
                           
                            <button type="submit" class="btn btn-primary">Delete dish</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>`;

        // Agregar el formulario al cuerpo del documento
        document.body.insertAdjacentHTML('beforeend', formHtml);

        // Mostrar el modal
        const deleteCategoryModal = new bootstrap.Modal(document.getElementById('dCategoryForm'));
        deleteCategoryModal.show();

        // Manejar el envío del formulario
        document.getElementById('dCategoryForm').addEventListener('submit', event => {
            event.preventDefault();
            const categoryName = document.getElementById('categoryDelName').value;

            if (categoryName !== '') {
                handler(categoryName);
            }

            //Quito del menú la categoría que elimino
            const menuCategorias = document.getElementById('menu_categorias');

            const elementosLi = menuCategorias.querySelectorAll('li');

            elementosLi.forEach(elementoLi => {
                const dataCategory = elementoLi.querySelector('a').getAttribute('data-category');

                if (dataCategory === categoryName) {
                    elementoLi.remove();
                }
            });
            deleteCategoryModal.hide();
        });
    }

    bindControlDishCategoryForm(handler) {
        const controlDishMenuButtom = document.getElementById('controlDishCategoryButtom');
        controlDishMenuButtom.addEventListener('click', () => {
            // Llamar al método para mostrar el formulario de creación de platos
            handler();
        });
    }

    displayControlDishCategoryForm(dishes, categories, handlerAssign, handlerDeassign) {
        const existingForm = document.getElementById('controlDishCategoryForm');
        if (existingForm) {
            existingForm.remove();
        }
        const formHtml = `
    <div id="controlDishCategoryForm" class="modal fade" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Manage dish in Category</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="assignDishToCategoryForm">
                        <div class="mb-3">
                            <label for="assignDishCName" class="form-label">Dish</label>
                            <select class="form-select" id="assignDishCName" required>
                                ${dishes.map(d => `<option value="${d.dish.name}">${d.dish.name}</option>`).join('')}
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="assignCategoryName" class="form-label">Category</label>
                            <select class="form-select" id="assignCategoryName" required>
                                ${categories.map(c => `<option value="${c.category.name}">${c.category.name}</option>`).join('')}
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary">Assign to Category</button>
                    </form>
    
                    <form id="deassignDishToCategoryForm" class="mt-5">
                        <div class="mb-3">
                            <label for="deassignCategoryName" class="form-label">Category</label>
                            <select class="form-select" id="deassignCategoryName" required>
                                ${categories.map(c => `<option value="${c.category.name}">${c.category.name}</option>`).join('')}
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="deassignDishCName" class="form-label">Dish</label>
                            <select class="form-select" id="deassignDishCName" required>
                            
                            </select>
                        </div>
                        
                        <button type="submit" class="btn btn-danger">Unassign from Category</button>
                    </form>
                </div>
            </div>
        </div>
    </div>`;


        // Agregar el formulario al cuerpo del documento
        document.body.insertAdjacentHTML('beforeend', formHtml);

        // Mostrar el modal
        const deleteDishModal = new bootstrap.Modal(document.getElementById('controlDishCategoryForm'));
        deleteDishModal.show();

        // Manejar el envío del formulario
        document.getElementById('assignDishToCategoryForm').addEventListener('submit', event => {
            event.preventDefault();
            const dishName = document.getElementById('assignDishCName').value;
            const categoryName = document.getElementById('assignCategoryName').value;


            handlerAssign(dishName, categoryName);

            deleteDishModal.hide();
        })
        document.getElementById('deassignDishToCategoryForm').addEventListener('submit', event => {
            event.preventDefault();
            const dishName = document.getElementById('deassignDishCName').value;
            const categoryName = document.getElementById('deassignCategoryName').value;


            handlerDeassign(dishName, categoryName);

            deleteDishModal.hide();
        })
        this.updateDishesSelectCategory(categories, "Pasta");
        document.getElementById('deassignCategoryName').addEventListener('change', (event) => {
            const categoryName = event.target.value;
            this.updateDishesSelectCategory(categories, categoryName);
        });

    }
    bindCreateRestaurantForm(handler) {
        const createRestaurantButtom = document.getElementById('createRestaurantButtom');
        createRestaurantButtom.addEventListener('click', () => {
            // Llamar al método para mostrar el formulario de creación de restaurantes
            handler();
        });
    }

    displayCreateRestaurantForm(handler) {
        const existingForm = document.getElementById('createRestaurantForm');
        if (existingForm) {
            existingForm.remove();
        }
        const formHtml = `
            <div id="createRestaurantForm" class="modal fade" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Create new restaurant</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="newRestaurantForm" novalidate>
                                <div class="mb-3">
                                    <label for="restaurantName" class="form-label" >Restaurant Name</label>
                                    <div class="invalid-feedback"></div>
                                    <div class="valid-feedback"></div>
                                    <input type="text" class="form-control" id="restaurantName" required>
                                </div>
                                <div class="mb-3">
                                    <label for="restaurantDescription" class="form-label">Description</label>
                                    <div class="invalid-feedback"></div>
                                    <div class="valid-feedback"></div>
                                    <textarea class="form-control" id="restaurantDescription" rows="3" required></textarea>
                                </div>
                                <div class="mb-3">
                                <label for="latitude" class="form-label">Latitude: </label>
                                    <div class="invalid-feedback"></div>
                                    <div class="valid-feedback"></div> 
                                <input type="text" class="form-control" id="latitude" placeholder="Ej: -73.935242" pattern="^(-?(90(\\.0+)?|[1-8]?\\d(\\.\\d+)?))$" required></input>
                                 </div>
                                 <div class="mb-3">
                                <label for="longitude" class="form-label">Longitude: </label>
                                    <div class="invalid-feedback"></div>
                                    <div class="valid-feedback"></div> 
                                 <input type="text" class="form-control" id="longitude" placeholder="Ej: 40.730610" pattern="^(-?(180(\\.0+)?|1[0-7]\\d(\\.\\d+)?|\\d{1,2}(\\.\\d+)?))$" required></input>
                                </div>
                                <button type="submit" class="btn btn-primary">Create Restaurant</button>
                            
                                </form>
                        </div>
                    </div>
                </div>
            </div>`;

        // Agregar el formulario al cuerpo del documento
        document.body.insertAdjacentHTML('beforeend', formHtml);

        // Mostrar el modal
        const createRestaurantModal = new bootstrap.Modal(document.getElementById('createRestaurantForm'));
        createRestaurantModal.show();

        // Manejar el envío del formulario
        document.getElementById('newRestaurantForm').addEventListener('submit', event => {
            event.preventDefault();
            let isValid = true;


            const restaurantNameElement = document.getElementById('restaurantName');
            if (!restaurantNameElement.checkValidity()) {
                isValid = false

                if (restaurantNameElement.validity.valueMissing) {

                    this.showFeedBack(restaurantNameElement, false, 'This field is required')

                }

            } else {
                this.showFeedBack(restaurantNameElement, true);
            }

            const restaurantDescriptionElement = document.getElementById('restaurantDescription');
            if (!restaurantDescriptionElement.checkValidity()) {

                isValid = false

                this.showFeedBack(restaurantDescriptionElement, false, 'This field is required');

            } else {
                this.showFeedBack(restaurantDescriptionElement, true);
            }

            const longitudeElement = document.getElementById('longitude');
            if (!longitudeElement.checkValidity()) {

                isValid = false
                if (longitudeElement.validity.valueMissing) {
                    this.showFeedBack(longitudeElement, false, 'This field is required');
                }
                if (longitudeElement.validity.patternMismatch) {
                    this.showFeedBack(longitudeElement, false, 'You must enter a number between -180 and 180');
                }
            } else {
                this.showFeedBack(longitudeElement, true);
            }

            const latitudeElement = document.getElementById('latitude');
            if (!latitudeElement.checkValidity()) {

                isValid = false

                if (latitudeElement.validity.valueMissing) {
                    this.showFeedBack(latitudeElement, false, 'This field is required');
                }
                if (latitudeElement.validity.patternMismatch) {
                    this.showFeedBack(latitudeElement, false, 'You must enter a number between -90 and 90');
                }
            } else {
                this.showFeedBack(latitudeElement, true);
            }

            const restaurantName = document.getElementById('restaurantName').value;
            const restaurantDescription = document.getElementById('restaurantDescription').value;
            const longitude = document.getElementById('longitude').value;
            const latitude = document.getElementById('latitude').value;
            if (isValid) {
                const location = { longitude, latitude }
                // Llamar a un manejador externo para enviar los datos del nuevo plato al controlador
                handler(restaurantName, restaurantDescription, location);

                createRestaurantModal.hide();
                document.getElementById('newRestaurantForm').reset();
            }
        });
    }

}







export default RestaurantView;