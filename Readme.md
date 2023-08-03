# Reference
https://github.com/GomaGoma676/react-farm-stack/tree/main

# Setup environment
## Chrome extension
- redux dev tools

## VSCode extension
- REST Client

## Create react project(Node:20.50, React-app:5.0.1)
reference: https://qiita.com/tseno/items/fb53fa13004542ef1b80 
  
```
yarn add -D react @types/react
yarn add -D react-dom @types/react-dom
yarn add -D react-query
yarn add -D react-redux @reduxjs/toolkit
yarn add -D react-router-dom @types/react-router-dom
yarn add -D react-scripts
yarn add -D axios
yarn add -D heroicons @heroicons/react
yarn add -D tailwindcss postcss autoprefixer
yarn add -D mini-css-extract-plugin css-minimizer-webpack-plugin css-loader postcss-loader
yarn tailwindcss init -p
yarn add -D typescript
yarn tsc --init
yarn add -D webpack webpack-cli html-webpack-plugin webpack-dev-server babel-loader @babel/core @babel/preset-env  @babel/preset-react @babel/preset-typescript ts-loader
```

--

# Open Source on VSCode & Check view
## 1.[Your Laptop]
Open Terminal or Powershell 
```
$ cd ~/FastAPI_React_Sample_App
$ docker-compose up -d
$ cd ./fast_api
$ code .
```

## 2.[fast_api container]
You can open a terminal in the fast_api container with VSCode. 
And Run the following command.
```
uvicorn main:app --host 0.0.0.0 --reload
```

## 3.[Your Laptop]
Open Terminal or Powershell 
```
$ cd ~/FastAPI_React_Sample_App/frontend
$ code .
```

## 4.[frontend container]
You can open a terminal in the frontend container with VSCode. 
And Run the following command.
```
yarn start
```

