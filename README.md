# NodeJS API with Typescript, Express, TypeORM, Jest and Supertest

## 1. Project Description
The following project has a simple device module, with the following fields:
```
name
serial
mac_address
type (ENUM)
```

Having the following routes access:
```
get /devices
get /device/:id
post /create-device
post /update-device
delete /delete-device/:id
```


## 2. How to Install and Run the Project
### 2.1 Installing the project
- Configure .env file
- Create a local development database with `DB_DATABASE` name
- Create a local test database with `DB_DATABASE_TEST` name
- 
Installing dependencies
```
yarn install
```

### 2.2 Running the project
```
yarn dev
```

### 2.3 Running tests
```
yarn test
```

## 3. How to Use the Project
### 3.1 Via routes (insomnia/postman)
Access the API by the routes disposed at section 2 or `routes.ts` file

Create a valid device example JSON example:
```json
{
    "name": "Device name",
    "mac_address": "0123456789AB",
    "serial": "12",
    "type": "CAMERA"
}
```

### 3.2 Via FrontEnd
Accessing repository: [WEB-ReactJS-Typescript-Jest-ReactTestingLibrary](https://github.com/amandavmanduca/WEB-ReactJS-Typescript-Jest-ReactTestingLibrary)


## 4. Tecnologies
- Node JS
- Express JS
- Typescript
- TypeORM
- Jest
- Supertest

<img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />

<img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white"/>

<img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/>

<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
