# Project Guideline

[Overveiw](#overview)  
[Developers](#who-is-behind-this)  
[Readme](#what-is-in-this-readme)  
[Instructions](#instructions)  
[Projcet Setup](#project-setup)

# Overview

This README file is for a Job Seeking Web App project, built by three students using MERN stack. All related files and more information are below.

## Who is behind this?

These legends 👇🏽

[Syed Faysel]() (left), [Naomi Afrin]() (middle), [Anika Islam]() (right)

<img src='src/images/group.png' alt="Photo of developers: " border="1" />

## What is in this README?

There is an overview of the planning and build details of a real-world MERN app for CSE471 Course assessment. There are also questions answered as part of the assessment task.

# Instructions

A live version of this application can be found [here]()

## Project Setup

1. Clone github repository on your local machine

```
git clone https://github.com/syedfaysel/471_project.git
```

2. Obeserve the folder structure of the project.

```
/backend
    /node_modules
    index.js
    /models
    /utils
    package.json
    package-lock.json

/frontend
    /node_modules
    /app
    /public
    .
    .
.gitignore
readme.md
```

3. Initially you won't see the `node_modules` folder. Next thing you need to do after cloning the repo,  
   Go to the `backend` folder and run

```bash
npm i
```

It'll install all the dependecies and package needed inside the node_modules.
Do the same for `frontend` folder.

> Once done, you're ready to start working.

## Important Instructions

1. Do not work on `main` branch or `dev` branch.

2. > Work only on your particular-dev branch or feature branch. i.e `rajo-dev`, `naomi-dev`, `search-book`. To do so, first move to the `dev` branch. from dev branch create a new branch `yourname-dev` using `git checkout -b yourname-dev`

3. Once a feature or portion is done (working), add `Pull Request` in github for review.

Do the same in a loop

[Top](#project-overview-and-guideline)
