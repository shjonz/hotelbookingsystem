### Hotel Booking System Web Application
- module 50.003 Elements of Software Construction
- Worked with realtime data using <a href="https://www.ascendaloyalty.com/">Ascenda</a> APIs
- MERN Stack
- AGILE SDLC

# Editor.md

![Hotel_Booking_System](https://github.com/shjonz/hotelbookingsystem/assets/81726240/121df415-25a3-40e4-b5fe-18fffe296465)


![](https://img.shields.io/github/stars/pandao/editor.md.svg) ![](https://img.shields.io/github/forks/pandao/editor.md.svg) ![](https://img.shields.io/github/tag/pandao/editor.md.svg) ![](https://img.shields.io/github/release/pandao/editor.md.svg) ![](https://img.shields.io/github/issues/pandao/editor.md.svg) ![](https://img.shields.io/bower/v/editor.md.svg)


Video
-----------


Description
-------------
Hotel booking system was created for module 50.003 Elements of software constructure which required an AGILE Software Development LifeCycle while working with <a href="https://www.ascendaloyalty.com/">Ascenda</a>. This web application is designed to help customers book hotels online easily, based on your dates, location and number of people.

With an intuitive interface, users can effortlessly browse through an endless list of hotels using our search engine, filter by prices and ratings, and then with a simple click of a button obtain a booking and pay with Stripe's payment gateway. 

Designed with robust and maintainable software principles such as favouring composition over inheritance, encapsulation and polymorphism, this ensures a maintainable code base. Whether you're planning a weekend getaway, a well-organised business trip, or discovering hidden gems in your hometown, this is your ultimate travel companion.

#### Installation

    git clone "https://github.com/shjonz/hotelbookingsystem.git"
	npm i
	npm start


### Images

Image:

![](https://pandao.github.io/editor.md/examples/images/4.jpg)

> Change later

![](https://pandao.github.io/editor.md/examples/images/8.jpg)

> Change later


                
----


#### Pages

- Login/Register
- View Bookings
- View Profile
- Home page 
- View HotelsList
- View Hotel
- Booking Form
- Payment Gateway
    
#### Features

* Realtime search using location, dates, number of rooms and people
* Infinite Scrolling
* Login/Register
* Edit Bookings/Cancel Bookings

                
### FlowChart

```flow
st=>start: Login
op=>operation: Login operation
cond=>condition: Successful Yes or No?
e=>end: To admin

st->op->cond
cond(yes)->e
cond(no)->op
```

### Sequence Diagram
                    
```seq
Andrew->China: Says Hello 
Note right of China: China thinks\nabout it 
China-->Andrew: How are you? 
Andrew->>China: I am good thanks!
```

### End
