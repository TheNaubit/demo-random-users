# 🤖 Demo Random Users

A little example where you can see a list of users (random, obtained from a random API) and also the details of each specific users (including a map location). The project uses React.js (started the project with CRA), Typescript, React Query, MUI, React Context (with hooks!), and Open Layers.

![Demo Random Users]()

## Live Demo

You can check this project deployed here: [https://demo-random-users.pages.dev/](https://demo-random-users.pages.dev/)

## Stack Used

- React.js (created with CRA)
- Typescript
- MUI
- React Query
- React Context
- Open Layers
- And much more! 🚀

## How to install and run by yourself?

- Clone this repo in your computer and inside the root folder of this project, install the libraries (you can use `npm i`, `yarn` or even `pnpm i`)
- Once the libraries are installed, launch the project with `npm run start`, `yarn start` or `pnpm run start`
- That's it!

## FAQ

### Why do you use "function" instead of arrow functions?

That is a good question. Arrow functions are great but when trying to debug, the logs for arrow functions are not insightful enough (since arrow functions are anonymous functions so the error stack is full of anonymous functions, complicated to follow).

So, as a good practice, I like to code every function as a normal function except functions inside hooks like useMemo, useCallback or useEffect.

### Why do you have an index.ts file inside every component's folder?

Another great question. It is a good practice. Let's explain it:

- It is good to have every component inside its own folder instead of having a components folder with dozens of tsx/jsx files, one per component. Also, in case the component is split into several files, having it inside a folder with the component's name is a good thing.
- Now that we have each component on its own folder, if we want to import it, we should do something like: "components/MyComponent/MyComponent.tsx". That is horrible. So we can replace the tsx/jsx filename to index and that way we don't need to specify the file when importing the component. Like: "components/MyComponent"
- But now we have another issue. If we have several components opened, since all their files are called "index.tsx", we will have the editor full of "index.tsx" tabs. It will be complicated to determine which file is for what component. So to solve that, we create another file inside the component's folder, with the component name. Inside that file we code the component. And then the index.ts file will just export the methods exported in the other file.
- This solution solves all the issues commented before, so it is perfect! A better explanation can be found [here](https://www.joshwcomeau.com/react/file-structure/).

### Why do you import file with "@whatever/whatever" instead of "../../../../whatever"?

Well, because I hate that. It is a nightmare to follow. So I use the TypeScript aliases to clean the paths. Easy and beautiful!
