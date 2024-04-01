'use strict';

class BaseException extends Error {
    constructor(message = "", fileName, lineNumber) {
        super(message, fileName, lineNumber);
        this.name = "BaseException";
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BaseException)
        }
    }
}

//Excepción acceso inválido a constructor
class InvalidAccessConstructorException extends BaseException {
    constructor(fileName, lineNumber) {
        super("Constructor cant be called as a function.", fileName, lineNumber);
        this.name = "InvalidAccessConstructorException";
    }
}

class InvalidCategoryException extends BaseException {
    constructor(fileName, lineNumber) {
        super(`The category is invalid`, fileName, lineNumber);
        this.name = "InvalidCategoryException";
    }
}


class CategoryExistException extends BaseException {
    constructor(category, fileName, lineNumber) {
        super(`The category ${category} exist`, fileName, lineNumber);
        this.name = "CategoryExistException";
    }
}


class CategoryNoExistException extends BaseException {
    constructor(category, fileName, lineNumber) {
        super(`The category ${category} don't exist`, fileName, lineNumber);
        this.name = "CategoryNoExistException";
    }
}

class InvalidMenuException extends BaseException {
    constructor(fileName, lineNumber) {
        super(`The menu is invalid`, fileName, lineNumber);
        this.name = "InvalidMEnuException";
    }
}


class MenuExistException extends BaseException {
    constructor(menu, fileName, lineNumber) {
        super(`The menu ${menu} exist`, fileName, lineNumber);
        this.name = "MenuExistException";
    }
}


class MenuNoExistException extends BaseException {
    constructor(menu, fileName, lineNumber) {
        super(`The menu ${menu} don't exist`, fileName, lineNumber);
        this.name = "MenuNoExistException";
    }
}

class InvalidDishException extends BaseException {
    constructor(fileName, lineNumber) {
        super(`The dish is invalid`, fileName, lineNumber);
        this.name = "InvalidDishException";
    }
}


class DishExistException extends BaseException {
    constructor(dish, fileName, lineNumber) {
        super(`The dish ${dish} exist`, fileName, lineNumber);
        this.name = "DishExistException";
    }
}


class DishNoExistException extends BaseException {
    constructor(dish, fileName, lineNumber) {
        super(`The dish ${dish} don't exist`, fileName, lineNumber);
        this.name = "DishNoExistException";
    }
}

class InvalidRestaurantException extends BaseException {
    constructor(fileName, lineNumber) {
        super(`The restaurant is invalid`, fileName, lineNumber);
        this.name = "InvalidRestaurantException";
    }
}


class RestaurantExistException extends BaseException {
    constructor(restaurant, fileName, lineNumber) {
        super(`The restaurant ${restaurant} exist`, fileName, lineNumber);
        this.name = "RestaurantExistException";
    }
}


class RestaurantNoExistException extends BaseException {
    constructor(restaurant, fileName, lineNumber) {
        super(`The restaurant ${restaurant} don't exist`, fileName, lineNumber);
        this.name = "RestaurantNoExistException";
    }
}

class InvalidAllergenException extends BaseException {
    constructor(fileName, lineNumber) {
        super(`The allergen is invalid`, fileName, lineNumber);
        this.name = "InvalidAllergenException";
    }
}


class AllergenExistException extends BaseException {
    constructor(allergen, fileName, lineNumber) {
        super(`The allergen ${allergen} exist`, fileName, lineNumber);
        this.name = "AllergenExistException";
    }
}


class AllergenNoExistException extends BaseException {
    constructor(allergen, fileName, lineNumber) {
        super(`The allergen ${allergen} don't exist`, fileName, lineNumber);
        this.name = "AllergenNoExistException";
    }
}

class DishAlreadyAssignedException extends BaseException {
    constructor(dish, fileName, lineNumber) {
        super(`The dish ${dish} is already assigned.`, fileName, lineNumber);
        this.name = "DishAlreadyAssignedException";
    }
}
class AllergenAlreadyAssignedException extends BaseException {
    constructor(allergen, fileName, lineNumber) {
        super(`The allergen ${allergen} is already assigned.`, fileName, lineNumber);
        this.name = "AllergenAlreadyAssignedException";
    }
}

class CategoryAlreadyAssignedException extends BaseException {
    constructor(category, fileName, lineNumber) {
        super(`The category ${category} is already assigned.`, fileName, lineNumber);
        this.name = "CategoryAlreadyAssignedException";
    }
}

class DishIsNotAssignedException extends BaseException {
    constructor(dish, fileName, lineNumber) {
        super(`The dish ${dish} is not assigned.`, fileName, lineNumber);
        this.name = "DishIsNotAssignedException";
    }
}
class AllergenIsNotAssignedException extends BaseException {
    constructor(allergen, fileName, lineNumber) {
        super(`The allergen ${allergen} is not assigned.`, fileName, lineNumber);
        this.name = "AllergenIsNotAssignedException";
    }
}

class CategoryIsNotAssignedException extends BaseException {
    constructor(category, fileName, lineNumber) {
        super(`The category ${category} is not assigned.`, fileName, lineNumber);
        this.name = "CategoryIsNotAssignedException";
    }
}

export {BaseException,
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