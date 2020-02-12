# Home Automation Hub

Developed using Node v9.5.0

## Installation

Unzip and install the dependencies.

```sh
$ npm install 
```
Or using yarn

```sh
$ yarn install
```

To start in development mode:

```sh
$ yarn start
```

And for tests:

```sh
$ yarn test
```

## Developer Story

### 1. Boilerplate: Create React App

First decision was which boilerplate to use. What I’ve used so far is CRA and have projects online working all right both, ejected and not. I wouldn't pick it if requested to do Server-side rendering, but it wasn’t specified. I also thought that by using CRA without ejecting the project will remain leaner and whoever will review my work can focus on what is important for Resin to evaluate. Worst thing about CRA is the lack of the React Hot Loader feature, but the assignment was short enough not to needed. In this particular case I chose "lean code to review" above all.

### 2. Customizing CRA
Before starting development I added the packages I know they will be of great assistance:  
#### 2.1 Eslint with Prettier for automatic code formatting on VSCode
I added the airbnb eslint packages as their eslint configuration is very complete and is a nice standard to adopt as a code style guideline, though I'm not firm on any particular way of coding. 
I'm packaging also Vscode folder with settings for auto-formatting features using Prettier and Eslint extensions.
#### 2.2 Tests: Enzyme
CRA comes with Jest but lacks of a this great testing library for React components.

### 3. Rendition, styled-system and styled-components.
I've never worked nor did know about them before. 
#### 3.1  
I confess I experienced some minor difficulties trying to customize style: Navbar component had  this [issue](https://github.com/resin-io-modules/rendition/issues/524) that apparently was fixed but not merged to the time I deliver the task. I decided not to wait and developed a custom Navbar (MyNavbar). 
#### 3.2
With Table component also, I couldn't find out the way of easily configuring column width. That's why you'll see when opening in Mobile devices Brightness column is to close to the right margin. 

### 4. The Dimmer
This one was a challenge. As in the assignment email said that the task was expected to last no more tha 3-4 hs I was hoping that the Dimmer was some kind of rendition component, but I didn't find it. I developed the React component almost from scratch. It wasn't completely from scratch as I was based on this [ideas](https://codepen.io/jon-walstedt/), although they are developed in Coffeescript with JQuery for DOM interactions based on. Apart from taking away Jquery and Coffeescript, I styled the dimmer based on the assignment design. Not with complete success, as I left behind the knob as explained on the Left Behind section.

### 5. The ON/OF Switch
I chose the easiest way out in this matter. Credits to [W3School](https://www.w3schools.com/howto/howto_css_switch.asp).

### 6. Responsiveness
I cared about responsiveness during the entire development. Please be sure to check out the view in mobile devices, not just in Chrome Dev Tools preview, as it does not represent the real world conditions. Also you can test stretching the browser, though both can be improved. I'm just leaving it like this because of time.   

### 7. Left behind:
In the case of avoid adding packages I like to think development as an incremental process to grow on-demand, mainly because React apps are getting heavier as packages are added to the the bundle.
#### 7.1 Configure React router for chunking async components.
This is something I regularly do for leveraging the first load but there where no routes to be implemented.
#### 7.1 Configure Redux.
As I came out with a tree-like state only two levels deep I also didn't see the need of using Redux in this case. 
#### 7.1 Beautifying style and components
The Dimmer knob, and style adjustments to fit more to the design are things I’m leaving behind only because a matter of time.

### Thanks!
There is a lot to improve in the product I’m delivering but I don’t like to delay delivery deadlines as expected, and as I know I won’t be able to dedicate time to the task in the next days I’ve decided to deliver it as it is.   