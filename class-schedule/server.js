/**
 * This is the main server script that provides the API endpoints
 * The script uses the database helper in /src
 * The endpoints retrieve, update, and return data to the page handlebars files
 *
 * The API returns the front-end UI handlebars pages, or
 * Raw json if the client requests it with a query parameter ?raw=json
 */

// Utilities we need
const fs = require("fs");
const path = require("path");

// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  // Set this to true for detailed logging:
  logger: false
});

// Setup our static files
fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "public"),
  prefix: "/" // optional: default '/'
});

// fastify-formbody lets us parse incoming forms
fastify.register(require("fastify-formbody"));

// point-of-view is a templating manager for fastify
fastify.register(require("point-of-view"), {
  engine: {
    handlebars: require("handlebars")
  }
});


// We use a module for handling database operations in /src
const data = require("./src/data.json");
const db = require("./src/" + data.database);

const fastifySession = require('fastify-session');
const fastifyCookie = require('fastify-cookie');

fastify.register(fastifyCookie);
fastify.register(fastifySession, {
    cookieName: 'sessionId',
    secret: 'a secret with minimum length of 32 characters',
    cookie: { secure: false },
    expires: 1800000
  })


/**
 * Home route for the app
 *
 * Return the poll options from the database helper script
 * The home route may be called on remix in which case the db needs setup
 *
 * Client can request raw data using a query parameter
 */
fastify.get("/", async (request, reply) => {

  let params = {};

  // Get the available choices from the database
  const options = await db.getOptions();
  if (options) {
    params.optionNames = options.map(choice => choice.language);
    params.optionCounts = options.map(choice => choice.picks);
  }
  // Let the user know if there was a db error
  else params.error = data.errorMessage;

  // Check in case the data is empty or not setup yet
  if (options && params.optionNames.length < 1)
    params.setup = data.setupMessage;

  // ADD PARAMS FROM README NEXT STEPS HERE

  // Send the page options or raw JSON data if the client requested it
  request.query.raw
    ? reply.send(params)
    : reply.view("/src/pages/index.hbs", params);
});

/**
 * Post route to process user vote
 *
 * Retrieve vote from body data
 * Send vote to database helper
 * Return updated list of votes
 */
fastify.post("/", async (request, reply) => { 

  let params = {};

  // Flag to indicate we want to show the poll results instead of the poll form
  params.results = true;
  let options;

  // We have a vote - send to the db helper to process and return results
  if (request.body.language) {
    options = await db.processVote(request.body.language);
    if (options) {
      // We send the choices and numbers in parallel arrays
      params.optionNames = options.map(choice => choice.language);
      params.optionCounts = options.map(choice => choice.picks);
    }
  }
  params.error = options ? null : data.errorMessage;

  // Return the info to the client
  request.query.raw
    ? reply.send(params)
    : reply.view("/src/pages/index.hbs", params);
});

// Run the server and report out to the logs
fastify.listen(process.env.PORT, function(err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Your app is listening on ${address}`);
  fastify.log.info(`server listening on ${address}`);
}); 


fastify.get('/register', async (request, reply) => {
  reply.status(200).view("/src/pages/register.hbs");
});


fastify.get('/login', async (request, reply) => {
  reply.status(200).view("/src/pages/login.hbs");
});

fastify.get('/adminView', async (request, reply) => {
  reply.status(200).view("/src/pages/adminView.hbs");
});

fastify.get('/class', async (request, reply) => {
  if (request.session.authenticated) {
    reply.status(200).view("/src/pages/class.hbs");
  } else {
    reply.redirect("/login");
  }
});

fastify.get('/schedule', async (request, reply) => {
  if (request.session.authenticated) {
    let params = {};
    console.log("get schedule user="+request.session.username)
    if (request.session.username) {
      params.schedule = await db.getSchedule(request.session.username);
    }
    reply.status(200).view("/src/pages/schedule.hbs", params);
  } else {
    reply.redirect("/login");
  }
  //reply.status(200).send(params);
});
 
// ---------------------------------------------------------------------------------------------------------------------------------------------


//register Students
fastify.post('/register', async (request, reply) => {

  let params = {}
  // Flag to indicate we want to show the poll results instead of the poll form
  params.results = true;
  params.registerFailed = false;
  let registerInfo;
  // We have a vote - send to the db helper to process and return results
  if (request.body.username && request.body.password) {
    registerInfo = await db.register(request.body.username, request.body.password, request.body.firstName, request.body.lastName, request.body.gender, request.body.dob);
  }
  params.content= registerInfo
  if (params.content != null) {
    reply.status(201).view("/src/pages/login.hbs");
    // reply.send(params);
  } else {
    params.registerFailed = true;
    reply.status(403).view("/src/pages/register.hbs", params);
    // params.error = "the username is already registered";
    // reply.send(params);
  }
  // Return the info to the client
});


//Student Login
fastify.post('/login', async (request, reply) => {
    let params = {}
    const username = request.body.username;
    const password = request.body.password;
    let checkPassword;
    checkPassword = await db.checkPassword(username, password)
    if (checkPassword) {
      request.session.authenticated = true;
      request.session.username =  request.body.username;
      reply.redirect('/class')
    } else {
      params.loginFailed = true;
      reply.status(401).view("/src/pages/login.hbs", params);
    }
});

//Student Logout
fastify.post('/logout', (request, reply) => {
    // console.log("logout");
    // console.log("Logoutbody=" + request.body);
    if (request.session.authenticated) {
      request.destroySession((err) => {
        if (err) {
          reply.status(500)
          reply.send('Internal Server Error')
        } else {
          reply.redirect('/login')
        }
      })
    } else {
      reply.redirect('/register')
    }
});

//Show Class List
fastify.post('/classlist', async (request, reply) => {
      //console.log("request here");
      let params = {};
      params.haveSearched = false;
  
      if (request.body.department && request.body.number) {
        params.haveSearched = true;
        
        console.log("have department and number");
        params.classList = await db.getClass(request.body.department, request.body.number);
        if (params.classList) {
          params.haveResult = true;
          params.resultErr = false;
        } else {
          params.resultErr = true;
        }
      } else if (request.body.department && !request.body.number) {
        params.haveSearched = true;
        params.haveResult = true;
        console.log("have department");
        params.classList = await db.getClassByDepartment(request.body.department);
        params.resultErr= false;
      } else {
        console.log("have nothing");
        params.classList = "";
        params.resultErr = true;
      }
      //console.log("params.classList="+JSON.stringify(params.classList));
      reply.status(200).view("/src/pages/class.hbs", params);
     // reply.status(200).send(params);
});



//Register Class
fastify.post('/registerClass', async (request, reply) => {
      console.log("register class called");
      let params = {};    
      console.log("request.body.title:"+request.body.title);
      if (request.body.department && request.body.number && request.session.username){
        var getClass = await db.getClass(request.body.department, request.body.number);
        var title = getClass[0].title;
        var description = getClass[0].description;
        var instructor = getClass[0].instructor;
        var classSchedule = getClass[0].classSchedule;
        params.registerClass = await db.addClass(request.session.username, request.body.department, request.body.number, title, description, instructor, classSchedule);
      }
      console.log("params.registerClass="+params.registerClass);
      if (params.registerClass) {
        reply.status(200).send(params);
      } else {
        reply.status(403).send(params);
      }
});

//Drop Class
fastify.post('/dropClass', async (request, reply) => {
      console.log("drop class called");
      if (request.body.department && request.body.number && request.session.username){
        db.dropClass(request.session.username, request.body.department, request.body.number);
      }
      
      reply.status(200).view("/schedule");
});

// ============================================================================================================================

//get Students.  Admin Use Only!!!!!!
fastify.post('/students', async (request, reply) => {
  let params = {};
    if (
    !request.body.key ||
    request.body.key.length < 1 ||
    !process.env.ADMIN_KEY ||
    request.body.key !== process.env.ADMIN_KEY
  ) {
    console.error("Auth fail");

    // Auth failed, return the log data plus a failed flag
    params.failed = "You entered invalid credentials!";

    // Get the log list
    params.optionHistory = await db.getLogs();
  } else {
    // Get the log history from the db
    params.students = await db.getAllUsers();

    // Let the user know if there's an error
    params.error = params.students ? null : data.errorMessage;

  }
    // // Send the log list
    // reply.send(params)
  
  // Send the student list
   reply.view("/src/pages/adminView.hbs",params);
});


//admin Add Class
fastify.post("/addClass", async (request, reply) => {
  let params = {};

  /* 
  Authenticate the user request by checking against the env key variable
  - make sure we have a key in the env and body, and that they match
  */
  if (
    !request.body.key ||
    request.body.key.length < 1 ||
    !process.env.ADMIN_KEY ||
    request.body.key !== process.env.ADMIN_KEY
  ) {
    console.error("Auth fail");

    // Auth failed
    params.failed = "You entered invalid credentials!";
  } else if (!(request.body.department && request.body.number && request.body.title && request.body.description && request.body.instructor && request.body.classSchedule)) 
  {
    console.error("invalid class info input");
    params.failed = "The class info you entered is missing or invalid";
  } else {
    console.log("add class called")
    console.log("department="+request.body.department+" number="+request.body.number);
    // We have a valid key and can add class
    params.content = await db.adminAddClass(request.body.department, request.body.number, request.body.title, request.body.description, request.body.instructor, request.body.classSchedule);
    console.log("content="+JSON.stringify(params.content));
    // Check for errors - method would return false value
    params.error = params.content ? null : data.errorMessage;
  }

  // Send a 401 if auth failed, 200 otherwise
  const status = params.failed ? 400 : 200;
  // Send an unauthorized status code if the user credentials failed
  reply.status(status).view("/src/pages/adminView.hbs",params);
});


//admin remove class
fastify.post("/removeClass", async (request, reply) => {
  let params = {};

  /* 
  Authenticate the user request by checking against the env key variable
  - make sure we have a key in the env and body, and that they match
  */
  if (
    !request.body.key ||
    request.body.key.length < 1 ||
    !process.env.ADMIN_KEY ||
    request.body.key !== process.env.ADMIN_KEY
  ) {
    console.error("Auth fail");

    // Auth failed
    params.failed = "You entered invalid credentials!";
  } else if (!(request.body.department && request.body.number)) 
  {
    console.error("invalid class info input");
    params.failed = "The class info you entered is missing or invalid";
  } else {
    // We have a valid key and can add class
    params.content = await db.removeClass(request.body.department, request.body.number);

    // Check for errors - method would return false value
    params.error = params.content ? null : data.errorMessage;
  }

  // Send a 401 if auth failed, 200 otherwise
  const status = params.failed ? 400 : 200;
  // Send an unauthorized status code if the user credentials failed
  reply.status(status).view("/src/pages/adminView.hbs",params);
});




//admin remove student account
fastify.post("/removeStudent", async (request, reply) => {
  let params = {};

  /* 
  Authenticate the user request by checking against the env key variable
  - make sure we have a key in the env and body, and that they match
  */
  if (
    !request.body.key ||
    request.body.key.length < 1 ||
    !process.env.ADMIN_KEY ||
    request.body.key !== process.env.ADMIN_KEY
  ) {
    console.error("Auth fail");

    // Auth failed
    params.failed = "You entered invalid credentials!";
  } else if (!request.body.username) 
  {
    console.error(JSON.stringify(request.body));
    console.error("invalid username to delete");
    params.failed = "The username you want to remove cannot be blank";
  } else {
    // We have a valid key and can remove a student account
    params.content = await db.removeStudent(request.body.username);

    // Check for errors - method would return false value
    params.error = params.content ? null : data.errorMessage;
  }

  // Send a 401 if auth failed, 200 otherwise
  const status = params.failed ? 400 : 200;
  // Send an unauthorized status code if the user credentials failed
  reply.status(status).view("/src/pages/adminView.hbs",params);
});