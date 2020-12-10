# Summary
This app was built in Javascript language (NodeJS) with ExpressJS as the framework, PostgreSQL as the DBRM and Sequelize as the ORM. All of the credentials are already provided so just install NodeJS, clone/download the repo, install all dependencies with 
```
npm i
```
and start the app with (please check additional notes before executing the command below) 
```
npm start
```

After that, open up the http://localhost:3001/documentation for more details.

#### by : Choirul Rahmaditya (choirul.rahmaditya@mail.ugm.ac.id)

## Additional Notes
If the provided credentials are used, there is no need to worry about the seeds and migrations. In case of different credentials, please run the migration by 
```
npx sequelize db:migrate
```
and the seed by
```
npx sequelize db:seed:all
```
before starting the app. 