## Description

Blog API implemented using Express.js and MySQL. Sequelize is used for ORM.

## Installation

You can install the project using the following command:

```
git clone https://github.com/serhhatsari/blog-app
```

## Running with Docker Compose

You can start the server using docker compose with the following command:

```
docker compose up --build -d
```

Server is now accessible at the

```
localhost:3000
```

You can delete the containers using the following command:

```
docker compose down
```

#### Swagger Page

Any endpoint that is exposed by the server can be accessible at the /docs endpoint.

```
eg: localhost:3000/api/docs
```

## Running with Kubernetes

You can deploy the server to the k8s using the following command:

```
kubectl apply -f deployment.yml
```

If you are using minikube, then run the following command to generate a URL to access the server:

```
minikube service blog-service --url
```

Server is now accessible at the URL given by minikube.

You can delete the server from k8s using the following command:

```
kubectl delete -f deployment.yml
```

#### Swagger Page

Any endpoint that is exposed by the server can be accessible at the /docs endpoint.

```
eg: localhost:3000/api/docs
```

## Local Development

### Database

First, you need to create MySQL container using the following command:

```
docker container run -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=here -e MYSQL_USER=dev -e MYSQL_PASSWORD=dev -d --name mysql mysql:5.7
```

- After finishing development, you can delete the database using the following command:

```
docker container rm mysql -f
```

### Backend

Then, you can start the server using the following command:

```
NODE_ENV=development DB_ENV=dev npm start
```
