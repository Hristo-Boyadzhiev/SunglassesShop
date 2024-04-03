# SunglassesShop
Angular project

SunglassesShop is a Single Page Application (SPA) for online sunglasses commerce. The site is built using Angular with HTML and CSS for the frontend. A pre-made SoftUni Practice Server is utilized for the backend. 

**There are three types of users:**

-Guests

-Authenticated users without administrative rights, briefly referred to as authenticated users.

-Admin

**The application consists of two main parts:**

-Public Part

-Private Part

### Public Part

The public part does not require authentication and consists of:

**The login and register pages are accessible only to guests. 
All other pages are visible and accessible to all three types of users.**


**Register Page**

This page represents a form where users input their first name, last name, email, password, and confirm password. 
Each input field is mandatory. Additionally, the following validations are applied:

**First Name:** Maximum length of 15 characters.

**Last Name:** Maximum length of 15 characters.

**Email:** Custom validator utilizing RegExp to validate email format.

**Password:** Minimum length of 6 characters.

**rePassword:** Minimum length of 6 characters.

**Password and rePassword must match.**


**Login Page:**

The page presents a form where users input their email and password. 
Each input field is mandatory. Additionally, the following validations are applied:

**Email:** Custom validator utilizing RegExp to validate email format.

**Password:** Minimum length of 6 characters and maximum length of 15 characters.


**Home Page:**

It displays an image and a button for accessing the catalog of sunglasses.


**Catalog Page:**

It showcases all available sunglasses. Each product includes an image and a button for detailed product information. In case there are no sunglasses available, a message "No sunglasses yet" is displayed. If the user is an administrator, they will have access to a "create" button as well.

**Details Page:**

It presents detailed information about the selected product, including an image, brand, model, price, gender, shape, frame color, and glass color. If the user is an administrator, they see the "edit" and "delete" buttons. Upon pressing the "edit" button, a form with the product's existing data is loaded. 
Each field in the form is mandatory. Additional validations are as follows:

**Brand:** Maximum length of 10 characters.

**Model:** Maximum length of 10 characters.

**Price:** Minimum €1.

**Image URL:** Must start with "http://" or "https://".

**Gender:** Selection of male, female, unisex.

**Shape:** Maximum length of 10 characters.

**Frame color:** Maximum length of 10 characters.

**Glass color:** Maximum length of 10 characters.
If the user is an authenticated user, they see the "buy" button and can choose the desired quantity of the product. They can also add the product to their "favorites". If the user is a guest, they only see detailed information about the product.


**Not-found Page:**
It represents a page accessed when a user enters a URL that is not defined.
