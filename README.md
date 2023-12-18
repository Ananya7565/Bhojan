# Bhojan
A PWA (Progressive web app) which allows users to select desired recipes based on dietary constraints, allergies to certain ingredients etc. Additionally the user is allowed to order ingredients of the recipes selected. The application was coded in typescript.
Information regarding user data, recipes etc was stored in an SQLite database buit using knex(SQL query builder for javascript). The database was queried with  Apollo server and GraphQL Yoga. Login/Registration of users was done with AWS Cognito, Frontend was built using Next.js. The user interface was developed with Figma and responsive UI from Tailwind CSS. Order management was handeled using ONDC (open network for digital commerce). The application was tested with JEST and deployed as docker container.

## Running the application
The application is split into the frontend and backend which communicate via API. The backend communicates with the database and send the queried results to the frontend. On downloading the repository install the necessary packages from package.json using npm install.  The frontend and backend should be run on seperate terminals, to run the frontend use the command npm run dev. To run the backend use the command npm start. 

# Website View
![image](https://github.com/Ananya7565/Bhojan/assets/79797979/e8057547-9a85-497c-9956-e8210d7152c9)
![image](https://github.com/Ananya7565/Bhojan/assets/79797979/89f4e029-3b23-4a13-a498-2c7d128c3418)
![image](https://github.com/Ananya7565/Bhojan/assets/79797979/0045cb6c-faee-461d-aab9-0a8a3ae1be63)
![image](https://github.com/Ananya7565/Bhojan/assets/79797979/f473fc55-c55e-436b-aaa7-d7b4c9b5a8b7)
![image](https://github.com/Ananya7565/Bhojan/assets/79797979/3b9c6b7a-5f1f-4dc4-8409-f987aa2e36dd)
![image](https://github.com/Ananya7565/Bhojan/assets/79797979/25aef635-b243-4395-85f9-8350f30fc238)
![image](https://github.com/Ananya7565/Bhojan/assets/79797979/064246ef-33d3-4d24-97e9-2ddbe514aa87)

# App View
![image](https://github.com/Ananya7565/Bhojan/assets/79797979/2465eb77-00ec-419a-bbec-f841cbd3db69)
![image](https://github.com/Ananya7565/Bhojan/assets/79797979/db5890ea-71c4-4b8f-a057-0df13e1c1681)
![image](https://github.com/Ananya7565/Bhojan/assets/79797979/84e967a4-5f6e-40d2-aba2-41e33bf65254)
![image](https://github.com/Ananya7565/Bhojan/assets/79797979/8adf8293-62e1-4e0c-a631-621108a3229d)
![image](https://github.com/Ananya7565/Bhojan/assets/79797979/2c48d337-ca96-4282-99a2-56871319e043)
![image](https://github.com/Ananya7565/Bhojan/assets/79797979/5c7688e0-631b-4606-8809-2ec35052d424)
![image](https://github.com/Ananya7565/Bhojan/assets/79797979/4b59e388-995a-46c0-abf4-2e44af717fa2)











