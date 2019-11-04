# ALeRCE [SN Hunter](http://snhunter.alerce.online)

![SN Hunter Image](doc/snhunter.png?raw=true "SN Hunter Image")

[SN Hunter](http://snhunter.alerce.online) is a tool that uses the ALeRCE ZTF Database API to help astronomers discover very young SNe.

SN Hunter is developed in [Vue.js](https://vuejs.org/) framework to be modular and easy to extend.
npm run build


### Set-up

Is required to have installed at least `nodejs` and `npm` in the machine.

To install the application dependencies just run inside the root repository
```
  npm install
```


### API Configuration

There a 3 ways to run the application.

Running on:
- ￼Development   (`.env.developement`):

The most used environment when developing, to run it use the command
```
  npm run serve
```
This will create a webserver running on http://localhost:8080 and will be listen to any changes in the code and restarting the webpage if necessary.

- Staging       (`.env.staging`)

Staging is a pre-production stage, the idea is to use the development branch APIs to check compatibility and other points before sending the changes to production.

To build the staging environment run
```
  npm run build -- --mode staging
```
this will generate the `html`, `css` and `js` files in the repository `/dist` folder.

Then it has to be copied to an `nginx` serve folder, to be served.

- Production    (`.env.production`)

Production is the final environment of the application, to build the statics as in staging just run
```
  npm run build
```
then copy the files to the respective `nginx`/`apache` desired location.

### Dockerized deployment.

SN Hunter can be run as a container, to build the image run the script
```
  ./build.sh [staging]
```
as default it will create an docker image for the production environment, giving staging as parameter it will create the staging docker image.

After the container is created it can be deployed as
```
  docker run --name sn_hunter -p 80:80 -d sn_hunter
```

if you want to rebuild the vue application without creating a new image (for development purposes) mount the `/dist` folder in `/usr/share/nginx/html`.
