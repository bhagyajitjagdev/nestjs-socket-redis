# NestJS Redis Load Balancing with ngnix docker

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ docker compose up

# production mode
$ docker compose -f docker-compose.prod.yml up --scale prod=4
```

## How to Test

- Goto index.html file in the root directory
- Run it using vs-code Go Live
- in the params you can add userId
  `Eg: http://127.0.0.1:5500/index.html?userId=user1`
- Duplicate tabs and create multiple users to test
- Open console and reload multiple times to make the instance ids different

---

## **_While testing I found that ngnix was only load balancing to one instance with upstream of single server prod:3000, if it happens just restart the ngnix container and it should work just fine._**
