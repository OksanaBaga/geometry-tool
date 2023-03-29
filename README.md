# Geometry tool
This project is a web application built with React (TypeScript) that uses MUI for styling, MobX for state management, and Three.js for 3D rendering.

##Design Overview
The application is designed to display 3D models in a web browser. The front-end is built with React (TypeScript) and uses MUI for styling. I chose MUI because it provides a wide range of pre-built components and styles that can be easily customized.

I chose MobX for state management because I have more experience with it and found it to be a good fit for this project. MobX provides a simple and intuitive way to manage state, which is important when working with complex 3D models.

For 3D rendering, I chose Three.js because it is a powerful and widely-used library that provides many useful features, including lighting, shading, and animation. Three.js also has a large community and many examples and tutorials available online.

##Likes and Dislikes
Overall, I am pleased with how the application turned out. I are particularly proud of the smooth and responsive 3D rendering, as well as the intuitive user interface. I also found MobX to be a good choice for state management, as it allowed us to easily update and synchronize state between components.
Also, using inheritance for shapes allows us to create new shapes without much code rewriting quickly.

A couple of areas I'd like to improve are the layering or validation to prevent intersecting/overlapping shapes, and improving the position of the marker after the shape is moved (there is a bug: the nearest point is displayed with an offset after the shape is dragged). I'm looking for ways to optimize these features in future versions of the app.  Also, I would like to write Unit tests for each part of the project.

##New Technologies
While working on this project, I gained new experience with Three.js, which I had not used much before, and found it to be a useful tool for 3D rendering.

##Project set up

1. **Clone the repository:** The first step is to clone the repository. To do this, open your terminal or command prompt and navigate to the directory where you want to clone the repository. Once you are in the directory, run the following command:

    ```
    git clone https://github.com/OksanaBaga/geometry-tool.git
    ```

2. **Install dependencies:** Once you have cloned the repository, navigate to the project directory using your terminal or command prompt. Once you are in the project directory, run the following command:

    ```
    npm install
    ```
    This will install all the dependencies required by the project. The dependencies are specified in the package.json file.


3. **Start the project:** After the dependencies are installed, run the following command:

    ```
    npm start
    ```
    This will start the project and open it in your default web browser. The start command is specified in the scripts section of the package.json file.
