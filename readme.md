- npm install
- docker-compose up


- basePath = /api/users

- signin
POST: /signin
req.query = {
  username: "12312313",
  password: "12312313",
}
success => {
  data.user
}
error => {
  message: "Incorrect username or password"
}

//===== CRUD =====
- signup
POST: /signup
req.query = {
  fullName: "test",
  username: "12312313",
  password: "12312313",
}
success => {
  data.user
}
error => {
  message: "Username already exists"
}

- update
PUT: /update
req.query => {
  username: "123123123"
}
success => {
  data.user
}
error => {
  message: "invalid user"
}

- delete
POST: /delete
req.query => {
  username: "123123123"
}
success => {
  message: "deleted user"
}
error => {
  message: "invalid user"
}

- get
POST: /get
req.query => {
  username: "123123123"
}
success => {
  data.user
}
error => {
  message: "invalid user"
}

- get_all
GET: /get_all
success => {
  // auto import admin account
  const isAdmin = user.find({role: "admin})
  if (!isAdmin.length) {
        yield admin_account.map(acc => {
          User.create({...acc, role: 'admin'})
        })
  return data.users
}
error => {
  err
}