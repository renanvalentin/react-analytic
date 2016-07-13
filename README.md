# React Analytic
***Your friendly neighborhood Spider-Man!***

React Analytic analyzes your components dependencies and gives you a friendly network visualization helping you taking better decisions about how your project is organized.

![alt tag](https://raw.githubusercontent.com/renanvalentin/react-analytic/master/docs/preview.png)

## How it works

React Analytic will scan your files looking for ES6 module import (currently it is not supporting CommonJS):

```javascript
//App.js

import React from 'react'
import Title from 'components/headings/Title'
import Button from 'components/buttons/Button'

class App extends React.Component {
  render() {
    return (
      <div>
        <Title text='Hi! Im a sample' />
        <Button text='Click me!' />
      </div>
    )
  }
}
```

This will create a tree like this:

```javascript
{
  "app": {
    "references": [],
    "dependencies": [
      "components/headings/Title",
      "components/buttons/Button",
      "react"
    ]
  },
  "components/headings/Title": {
    "references": [
      "app"
    ],
    "dependencies": [
      "react"
    ] 
  },
  "components/buttons/Button": {
    "references": [
      "app"
    ],
    "dependencies": [
      "react"
    ] 
  },
  "react": {
    "references": [
      "app",
      "components/headings/Title",
      "components/buttons/Button"
    ],
    "dependencies": [] 
  }
}
```

##Installation

You can add React Analytic from the root directory of any project.

```sh
$ npm install --save-dev react-analytic
```

## Setup

1. Add a config file at your root project called `.react-analytic.json`

```javascript
{
  "root": "./src/",
  "whitelist": []
}
```

#### root
Type: `String`

React Analytic will look at that dir to analyse your project

#### whitelist
Type: `Array`

If you pass a module name to whitelist React Analytic will ignore all modules and it will just look for dependencies that are on the whitelist. eg:

```javascript
{
  "root": "./src/",
  "whitelist": [
    "components"
  ]
}
```

This will create a tree like this one, ignoring references to imports like react:

```javascript
{
  "app": {
    "references": [],
    "dependencies": [
      "components/headings/Title",
      "components/buttons/Button"
    ]
  },
  "components/headings/Title": {
    "references": [
      "app"
    ],
    "dependencies": [] 
  },
  "components/buttons/Button": {
    "references": [
      "app"
    ],
    "dependencies": [] 
  }
}
```

## Running

At your root folder, run:

```sh
react-analytic analyse
```

It will generates the tree and finally, to visualize it, run:

```sh
react-analytic serve
```

Finally, open your browser and access:

```sh
localhost:8080
```

Thanks!
