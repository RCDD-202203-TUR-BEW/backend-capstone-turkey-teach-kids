
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
![NodeJs](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![Mongo](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![eslint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![jwt]( 	https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white)

<div align="center">
  <img src="https://img.freepik.com/free-vector/social-team-helping-charity-sharing-hope_74855-6660.jpg?w=740&t=st=1660832756~exp=1660833356~hmac=2bfd07cb5fac91f98af21b6034a0e23470b91a4e5006c6b392d7e58a02a5e3f" />

  ### Reach
  Reach out for a better future
</div>

### Table of Contents  
1. [About the Project](#about)  
    - [Features](#features)
    - [Built With](#builtwith)
    - [Demo Links](#demo)
    - [Screenshots](#screenshots)
2. [Getting Started](#gettingStarted)  
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
3. [Team](#team) 
4. [Contributing](#contributing) 
5. [License](#license) 
6. [Contact](#contact) 
7. [Acknowledgements](#acknowledgements) 

<a name="about"></a>
##  About the Project 

Reach is a website that connects between volunteer teachers and NGOs concerned with refugee kids around the world. 

The aim of the website is to provide these kids the opportunity to develop essential skills to thrive and have a better future.

The website is intended for volunteer teachers and NGOs.

On this website, you can find a platform for both volunteers and NGOs to sign in and post their own profiles or announce educational events. 



<a name="features"></a>
## Features

- List events
- List NGOs
- List Volunteers
- CRUD operations for events
- CRUD operations for NGOs
- CRUD operations for volunteers
- Filter users by type
- Filter events by tags
- Apply events 
- Approve / decline volunteers
- Register/Login
  - Allow Google, Classic
- Middleware for NGOs, volunteers
- Contact us 
- Subscribe for newsletter

<a name="builtwith"></a>
## Built With

- ![NodeJs](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
- ![Mongo](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
- ![express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

<a name="demo"></a>
## Demo

- Server (backend) link: [![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)](https://reach-capstone.herokuapp.com/api-docs/#/)

<a name="screenshots"></a>
## Screenshots

#### Database Diagram
![capture 7](https://user-images.githubusercontent.com/102862314/187435460-ba04961c-ffda-479e-8366-992de12d114e.PNG)


#### System Design Flowchart
![Capture1](https://user-images.githubusercontent.com/102862314/187435534-a9b0fbd6-daa8-41a1-be36-ad26bcfe25ac.PNG)
![capture 3](https://user-images.githubusercontent.com/102862314/187435659-3653dcb8-e6ec-4701-a2dd-6eaddd00dc52.PNG)
![capture 4](https://user-images.githubusercontent.com/102862314/187435677-8721ac6a-7b81-4c54-972b-917ac8cba4e4.PNG)
![capture 5](https://user-images.githubusercontent.com/102862314/187435682-0e7f2dc3-3bc3-4112-949e-fe9b3773207f.PNG)
![capture 6](https://user-images.githubusercontent.com/102862314/187435717-d43e1849-1108-41e5-9dd7-db9ecbbaa3ec.PNG)




#### OpenAPI Docs
![OpenAPI Docs](https://i.ibb.co/6BBm6Qx/swagger.png)

<a name="gettingStarted"></a>
##  Getting Started
To get a local copy up and running follow these steps.

<a name="prerequisites"></a>
### Prerequisites

- git

```javascript
if (you have brew installed){
  use this command => 'brew install git'
  } else {
    download the installer from the offical website => https://git-scm.com/downloads
  }
```

- node

```javascript
if (you have brew installed){
  use this command => 'brew install node'
  } else {
    download the installer from the offical website => https://nodejs.org/en/
  }
```

What is brew? (See: [Homebrew Package Manager](https://brew.sh/index_tr))

<a name="installation"></a>
### Installation

```bash
 main branch for server side (node)
```

1. Clone the app
```bash
 git clone https://github.com/RCDD-202203-TUR-BEW/backend-capstone-turkey-teach-kids.git
```

2. Install npm packages on both branches
```bash
 cd backend-capstone-turkey-teach-kids
```
```bash
 on main branch
 'yarn / npm i'
```

3. Create environment variables 
```javascript
 if(you will serve on localhost){
  on main directory create a copy of .env.example and rename to .env file
  then change the constants to your own env strings
  ...
  SECRET_KEY: 'secret'
  ...
 } else if (you will use some SaaS hosting services like heroku, netliy etc){
  use process.ENV configuration depends on your server
 }
```
4. You are good to go
```js
 on main directory =>
 if(you need to watch changes){
  'yarn dev / npm run dev'
 }else{
   'yarn start / npm run start'
 }
```
<a name="team"></a>
## Team
Meet our team members through their Github profiles


| <img width="100px" src="https://ca.slack-edge.com/T038H554JTZ-U039S4DU46S-001949f870b8-512" /><p>[@muslimomar](https://github.com/muslimomar)</p>  | <img width="100px" src="https://avatars.githubusercontent.com/u/102875952?v=4" />  <p>[@abdulhafiz96](https://github.com/abdulhafiz96)</p>   | <img width="100px" src="https://avatars.githubusercontent.com/u/38300766?v=4" /> <p>[@BerkAkipek](https://github.com/BerkAkipek)</p> | <img width="100px" src="https://ca.slack-edge.com/T038H554JTZ-U038XP28FN2-5020e687f427-512" /> <p>[@dilarafirtina](https://github.com/dilarafirtina/)</p> | <img width="100px" src="https://ca.slack-edge.com/T038H554JTZ-U038PQJBQ23-f7b31338816e-512" /> <p>[@sobhan-shams](https://github.com/sobhan-shams)</p>| <img width="100px" src="https://avatars.githubusercontent.com/u/102862314?v=4" /> <p>[@yamanrajab90](https://github.com/yamanrajab90)</p> |
| :-------- | :------- | :----------- | :----- |:------- | :------- | 

<a name="contributing"></a>
## Contributing

Contributions are always welcome!

1. Fork the project
2. Create your Feature Branch (git checkout -b feature/AmazingFeature)
3. Commit your Changes(git commit -m "Add some AmazingFeature)
4. Push to the Branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

<a name="license"></a>
## License

Distributed under [MIT](https://choosealicense.com/licenses/mit/) License.

<a name="contact"></a>
## Contact

### Reach Team
Email: mail{at}domain{dot}com

<a name="acknowledgements"></a>
## Acknowledgements

 - ![Google](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)
  - ![Stackoverflow](https://img.shields.io/badge/Stack_Overflow-FE7A16?style=for-the-badge&logo=stack-overflow&logoColor=white)



    






