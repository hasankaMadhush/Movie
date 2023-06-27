# Movie Collection API!

This is the backend RESTful API for the Movie collection. API is based on Express.js and consists on JWT Auhtentication with user roles. NoSQL MongoDB is used as the DB and Moongoose is the Object Document Mapping(ODM). Database is hosted in MongoDB cloud(Atlas). MongoDB local setup works as well. Written in Typescript with node js and contains Object Oriented Programming(OOP) concepts as much as possible while considering SOLID Principles.

A sample dataset is been used for demo purposes.

Deployed using [Render.com](https://render.com/)

**Demo URL**: [https://movie-api-hzil.onrender.com/api](https://movie-api-hzil.onrender.com/api)

[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/3611575-47101511-4c56-45b1-80b1-3a583cf5f554?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D3611575-47101511-4c56-45b1-80b1-3a583cf5f554%26entityType%3Dcollection%26workspaceId%3D6e407bd0-2b1f-4337-981b-84584bcd9e2d)

## Table of Contents

- [Introduction](#movie-collection-api)
- [Quickstart](#quickstart)
- [Technologies](#technologies)
- [Folder Structure](#folder-structure)
- [To Do](#to-do)
- [Challenges](#challenges)
- [Notes](#notes)

## Quickstart

- Clone the repository `git clone https://github.com/hasankaMadhush/movie.git`
- Move to the api folder: `cd api`
- Install Dependencies: `npm install` or `npm i`
- Rename the `.env.example` file to `.env` and update the values.
- Start the Application using `npm run dev` to start the dev environment.

## Technologies

- [node.js](https://nodejs.org/en)
- [Typescript](https://www.typescriptlang.org/)
- [express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
  [![My Skills](https://skillicons.dev/icons?i=nodejs,typescript,expressjs,mongo,winston,)](https://skillicons.dev)

## Folder Structure

```
.
├── build                   # Compiled files (alternatively `dist`)
├── src						# Source files
	├── middleware			# Error/Request/Response/Authentication middlewares
	├── resources			# Model/Controller/Service/Router/Validation resource wise
		├── movie
		├── movieCollection
		├── user
	├── utils 				# all Utils - (same as lib)
		├── enums
		├── exceptions		# Exception handing classes
		├── logger			# Application loggin request/error
```

## To Do

- Handle multiple requests from same origin in a given time frame
- Admin User features
- use a secret manager instead of .env file

## Challenges

- Validatating Mongoose Object IDs via Joi
- Mongoose Reference Object types populating issue.
- Mongoose aggregate query between reference tables.

## Notes

- Add movies feature not supported yet - will be implemented later stage [data were inserted using DB.]
- Admin endpoints are not served yet - authentication is handle anyways
