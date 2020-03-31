# Authentication
An exericise in implementing user authentiticaion on the backend with signup, login, and verification. 

## Technology

* MongoDB
* mongoose
* express
* jsonwebtoken
* cookie-parser
* bcryptjs
* supertest
* jest

## Routes

* POST /signup (sets session cookie)
* POST /login (sets session cookie)
* GET /verify (uses ensureAuth middleware)

## User Model

email: {
    type: String,
    required: true,
    unique: [true, 'Email is taken']
  },
  passwordHash: {
    type: String,
    required: true
  }
}, 
{ 
  toJSON: {
    transform: (doc, ret) => {
      delete ret.passwordHash;
    }
  }
});

virtuals: password
methods: findByToken(), authenticate(), authToken()

## Middleware

* ensure-auth: uses findByToken to verify user is logged in
* error: sends error message if no validation error or if mongoose catches
* not-found: sends 'not found' error in case of invalid route
