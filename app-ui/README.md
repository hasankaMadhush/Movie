# Movie

This is the frontend for the Movie Application. Developed using Angular 16 along with bootstrap.

Hosted with [vercel.com](https://vercel.com/)
**Demo site**: [https://movie-kappa-seven.vercel.app/login](https://movie-kappa-seven.vercel.app)

**demo user**: **johndoe@test.com**
**password**: **123@intel**

## Table of Contents

- [Introduction](#movie)
- [Quickstart](#quickstart)
- [To Do](#to-do)
- [Challenges](#challenges)
- [Notes](#notes)
- [Screenshots](#screenshots)

## Quickstart

- Clone the repository `git clone https://github.com/hasankaMadhush/movie.git`
- Move to the app-ui folder: `cd app-ui`
- Install Dependencies: `npm install` or `npm i`
- Start the Application using `ng serve` to start the dev environment.
- Go to `http://localhost:4200` to go to application

## To Do

- Add to collection page to single movie view
- Enable collection delete feature
- Implement Admin views

## Challenges

- Http Request and Response intercepting.
- Routing with authentication enabled.
- Attaching bearer token to each request.
- Using reusable components with ngFor
- Global components (eg: search bar)
- Using env files in the production build with vercel
- Handling modals
- Handling gloabl toast/alert

## Notes

- environments file is commited to repo, knowing that it's a risk, this is done to overcome the hosting env variable issue in vercel. environments file will be removed in future.

## Screenshots
![Screenshot 2023-06-27 at 06 09 30](https://github.com/hasankaMadhush/movie/assets/17855709/c5301ca7-fe2b-42e9-8697-60bb8688bff4)
![Screenshot 2023-06-27 at 06 10 04](https://github.com/hasankaMadhush/movie/assets/17855709/fedd9554-ee33-480d-b584-792be35af3b0)
![Screenshot 2023-06-27 at 06 10 17](https://github.com/hasankaMadhush/movie/assets/17855709/0135006f-4ecc-4fda-8aee-acf31b909633)
![Screenshot 2023-06-27 at 06 10 46](https://github.com/hasankaMadhush/movie/assets/17855709/6dd87254-c17c-45d2-81db-73f804071757)
