# pawl-ui

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Build Docker image and run container
```
docker build -t pawl-ui:1.0.0 . && docker run -p 80:80 --name pawl-ui pawl-ui:1.0.0 
```

## Login to Docker Hub
```
docker login
```

## Push Docker image to Docker Hub
```
docker tag pawl-ui:1.0.0 aherin/pawl-ui:1.0.0
docker push aherin/pawl-ui:1.0.0
```
