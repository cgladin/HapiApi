# API Clément Gladin

npm start/yarn start

Pour le bon fonctionnement du projet il faut modifier les variables d'environnement présentes dans le .env à la racine du projet qui sont les suivante:
- MAILER_HOST le lien du smtp exemple: smtp.ethereal.email
- MAILER_USER l'adresse email de l'utilisateur qui envoie exemple: arvel34@ethereal.email
- MAILER_PASSWORD le password de l'adresse email exemple: eQkzgE2c3mbYumyn1R
- MAILER_FROM l'email de provenance des emails envoyés exemple: mail@contact.com

## Les routes
### User
- /user [GET]
  

- /user/{id} [PATCH]
    - prend au minimum l'id dans l'url 
    - champs possible:
      - firstName type string
      - lastName type string
      - password type string
      - email type string
      - username type string
      - scope type string (user OU admin)
  

- /user/{id} [delete]
  - id dans l'url
  

- /user [POST]
  - champs:
    - firstName type string
    - lastName type string
    - password
    - email type string 
    - username type string
  

- /user/login [POST]
  - champs:
    - password type string
    - email type string
  
###Film
- /films [POST]
    - champs:
      - titre type string
      - description type string
      - releaseDate type string
      - director type string


- /films [PATCH]
  - prend au minimum l'id dans l'url
  - champs possible:
    - titre type string
    - description type string
    - releaseDate type string
    - director type string


- /films/{id} [DELETE]
  - id dans l'url


- /films/fav [POST]
  - champs:
    - idUser type int
    - idFilms type array Int (permet d'ajouté plusieur favoris en même temps pour 1 user)
  

- /films/fav [DELETE]
  - champs:
    - idUser type int
    - idFilms type array Int (permet de supprimer plusieurs favoris en même temps pour 1 user)
