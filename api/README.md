# Movie Collection API!

This is the backend RESTful API for the Movie collection. API is based on Express.js and consists on JWT Auhtentication with user roles. NoSQL MongoDB is used as the DB and Moongoose is the Object Document Mapping(ODM). Database is hosted in MongoDB cloud(Atlas). MongoDB local setup works as well. Written in Typescript with node js and contains Object Oriented Programming(OOP) concepts as much as possible while considering SOLID Principles.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/3611575-47101511-4c56-45b1-80b1-3a583cf5f554?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D3611575-47101511-4c56-45b1-80b1-3a583cf5f554%26entityType%3Dcollection%26workspaceId%3D6e407bd0-2b1f-4337-981b-84584bcd9e2d)

## Table of Contents

- [Introduction](https://google.com)
- [Quickstart](https://google.com)
- [Technologies](https://google.com)
- [Folder Structure](https://google.com)
- [Challenges](https://google.com)

## Quickstart

- Clone the repository `git clone https://github.com/hasankaMadhush/movie.git`
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
		├── defentions		# global defenitions
		├── enums
		├── exceptions		# Exception handing classes
		├── logger			# Application loggin request/error
```

## Challenges

- Validatating Mongoose Object IDs via Joi
- Mongoose Reference Object types populating issue.
