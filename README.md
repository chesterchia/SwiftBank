This project is built on top of https://github.com/skirupa/Bank-Management-System

# Getting Started
Follow the following steps to run locally.
1. Client

    ```
    npm start
    ```

    Run the code below and upload files in the resulting build folder in S3 bucket.
    ```
    npm run build
    ```
2. Server
    ```
    node app.js
    ```

# Redis Set Up
```
docker pull redis:alpine
```
```
docker run -it -p 6379:6379 -d --name redis-server redis:alpine
```
Download RedisInsight and test connection.