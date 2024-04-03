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

**Register Page:**

This page is accessible only to guests. It represents a form where users input their first name, last name, email, password, and confirm password. 
Each input field is mandatory. Additionally, the following validations are applied:

**First Name:** Maximum length of 15 characters.

**Last Name:** Maximum length of 15 characters.

**Email:** Custom validator utilizing RegExp to validate email format.

**Password:** Minimum length of 6 characters.

**rePassword:** Minimum length of 6 characters.

**Password and rePassword must match.**


