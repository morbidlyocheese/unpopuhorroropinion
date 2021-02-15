# [Unpopuhorroropinion](https://unpopuhorroropinion.herokuapp.com/) - 
*by [Damien Darko](https://damiendarko.com/)*

Table Of Contents:
---
- [Description](https://github.com/djangothesolarboy/unpopuhorroropinion#description)
- [Application Architecture & Technologies Used](https://github.com/djangothesolarboy/unpopuhorroropinion#application-architecture--techonologies-used)
- [Installation](https://github.com/djangothesolarboy/unpopuhorroropinion#installation)
- [Frontend Overview](https://github.com/djangothesolarboy/unpopuhorroropinion#frontend-overview)
- [Backend Overview](https://github.com/djangothesolarboy/unpopuhorroropinion#backend-overview)
- [Screenshots](https://github.com/djangothesolarboy/unpopuhorroropinion#screenshots)
- [Technology Shields](https://github.com/djangothesolarboy/unpopuhorroropinion#technology-shields)

Description:
---
Unpopunhorroropinion is a site where horror lovers can go to catalog their collection and share photos of their collection with other horror lovers. It is meant to not only be a catalog of what films you own, but also a place to share the love of horror. Along with the ability of reviewing your favorite, or most hated horror films in your collection!

Application Architecture & Techonologies Used:
---
[Unpopuhorroropinion](https://unpopuhorroropinion.herokuapp.com/) was built using Express NodeJS framework with a PostgreSQL(postgres) database on the backend. The frontend uses Javascript, HTML, CSS, React and Redux.

Frontend Overview:
---
The frontend was built using Javascript, HTML, CSS, React and Redux. It utilizes Redux the store and components to create a more readable file structure.


Fonts Used:
[Big Shoulders Display(Google Fonts)](https://fonts.google.com/specimen/Big+Shoulders+Display?preview.text_type=custom&sidebar.open=true&selection.family=Big+Shoulders+Display:wght@100;400;900&query=big+shoul)
[Creepster(Google Fonts)](https://fonts.google.com/specimen/Creepster?preview.text_type=custom&selection.family=Big+Shoulders+Display:wght@100;400;900|Creepster&query=creepster)

[Color Palette:](https://coolors.co/ffffff-808080-000000-800000-ff0000)
---
- White: `#ffffff`
- Gray Web: `#808080`
- Black: `#000000`
- Maroon Web: `#800000`
- Red: `#ff0000`  
![unpop-palette](./readme-resources/unpop-palette.png)

Backend Overview:
---
The backend uses Express NodeJS framework with a PostgreSQL database. It also uses the TMDB api to make fetch requests for information on films. The movie's id from the TMDB api is stored in the database via an array.

Tables:
---
Table Name | Columns
---|---
Users | username, email, hashedPassword, createdAt, updatedAt
Collections | name, pictures, watched, userId, movieId

![db-diagram](./readme-resources/db.png)

Screenshots:
---
[![Home page](https://i.gyazo.com/3ca65a0b308c1e852b3d05baee2436dc.png)](https://gyazo.com/3ca65a0b308c1e852b3d05baee2436dc)  
[![Movie page](https://i.gyazo.com/d24ed33bb5ded170bcbc25ac64e881f7.png)](https://gyazo.com/d24ed33bb5ded170bcbc25ac64e881f7)  
[![Login modal](https://i.gyazo.com/bdd466228387f53f93c854bc4d99f147.gif)](https://gyazo.com/bdd466228387f53f93c854bc4d99f147)  
[![Signup modal](https://i.gyazo.com/506bc1010a953589307cd874d49818f0.gif)](https://gyazo.com/506bc1010a953589307cd874d49818f0)


Technology Shields:
---
![](https://img.shields.io/badge/-React-ffffff?style=flat-square&logo=react&logoColor=ff0000) 
![](https://img.shields.io/badge/-Redux-ffffff?style=flat-square&logo=redux&logoColor=ff0000) 
![](https://img.shields.io/badge/-Express-ffffff?style=flat-square&logo=express&logoColor=ff0000) 
![](https://img.shields.io/badge/-Nodemon-ffffff?style=flat-square&logo=nodemon&logoColor=ff0000) 
![](https://img.shields.io/badge/-Node.js-ffffff?style=flat-square&logo=node.js&logoColor=ff0000) 
![](https://img.shields.io/badge/-Javasript-ffffff?style=flat-square&logo=javascript&logoColor=ff0000) 
![](https://img.shields.io/badge/-HTML-ffffff?style=flat-square&logo=html5&logoColor=ff0000) 
![](https://img.shields.io/badge/-CSS-ffffff?style=flat-square&logo=css3&logoColor=ff0000)  