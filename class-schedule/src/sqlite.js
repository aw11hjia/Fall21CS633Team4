/**
 * Module handles database management
 *
 * Server API calls the methods in here to query and update the SQLite database
 */

// Utilities we need
const fs = require("fs");

// Initialize the database
const dbFile = "./.data/choices.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const dbWrapper = require("sqlite");
let db;

/* 
We're using the sqlite wrapper so that we can make async / await connections
- https://www.npmjs.com/package/sqlite
*/
dbWrapper
  .open({
    filename: dbFile,
    driver: sqlite3.Database
  })
  .then(async dBase => {
    db = dBase;

    // We use try and catch blocks throughout to handle any database errors
    try {
      // The async / await syntax lets us write the db operations in a way that won't block the app
      if (!exists) {
        // Database doesn't exist yet - create Choices and Log tables
        await db.run(
          "CREATE TABLE Choices (id INTEGER PRIMARY KEY AUTOINCREMENT, language TEXT, picks INTEGER)"
        );

        // Add default choices to table
        await db.run(
          "INSERT INTO Choices (language, picks) VALUES ('HTML', 0), ('JavaScript', 0), ('CSS', 0)"
        );

        // Log can start empty - we'll insert a new record whenever the user chooses a poll option
        await db.run(
          "CREATE TABLE Log (id INTEGER PRIMARY KEY AUTOINCREMENT, choice TEXT, time STRING)"
        );
        
        //------------------------------------------------------------------------------------------------------------------------------------------------
        
        //create student table
        await db.run(
          "CREATE TABLE Student (username TEXT, password TEXT, firstName TEXT, lastName TEXT, gender TEXT, dob TEXT, PRIMARY KEY (username))"
        );
        
        //create class table
        await db.run(
          "CREATE TABLE Class (department TEXT, number INTEGER, title TEXT, description TEXT, instructor TEXT, classSchedule TEXT, PRIMARY KEY (department, number))"
        );
        //create register table
        await db.run(
          "CREATE TABLE Register (username TEXT, department TEXT, number INTEGER, title TEXT, description TEXT, instructor TEXT, classSchedule TEXT, PRIMARY KEY (username, department, number));"
        );
        //insert classes
        await db.run(
          "INSERT INTO Class ( department, number, description, title, instructor, classSchedule) VALUES ( 'AD',510, 'The goal of this course is to introduce to students foundational mathematics and statistics knowledge that will provide them skills and tools necessary to succeed in their area of study.', 'Math Stat&Mgmt','Ritt', 'MON18:00')"
        );
        await db.run(
          "INSERT INTO Class ( department, number, description, title, instructor, classSchedule) VALUES ('AD', '571','Prereq: AD100 Pre-Analytics Laboratory This course presents fundamental knowledge and skills for applying business analytics to managerial decision-making in corporate environments. Topics include descriptive analytics (techniques for categorizing, characterizing, consolidation, and classifying data for conversion into useful information for the purposes of understanding and analyzing business performance), predictive analytics (techniques for detection of hidden patterns in large quantities of data to segment and group data into coherent sets in order to predict behavior and trends), prescriptive analytics (techniques for identification of best alternatives for maximizing or minimizing business objectives). ','Bus Analytics', 'Kim','TUE18:00')"
        );        
        await db.run(
          "INSERT INTO Class ( department, number, description, title, instructor, classSchedule) VALUES ('AD', '605','This course helps students to develop an understanding of the impact of business processes on the organization''s performance and provides students the key tools to analyze and improve processes in both manufacturing and service sectors.', 'Operations Mgmt', 'Maleyeff','MON9:05')"
        );     
        await db.run(
          "INSERT INTO Class ( department, number, description, title, instructor, classSchedule) VALUES  ('AD', '709', 'Prereq: MET AD630, MET AD731. Finance forecasting and planning; capital budgeting, cost of capital, dividend policy, rate of return, and financial aspects of growth. Readings and extensive use of case studies.', 'Cse St Corp Fin', 'Sullivan','MON18:00')"
        ); 
        await db.run(
          "INSERT INTO Class ( department, number, description, title, instructor, classSchedule) VALUES  ('AD', '714', 'Prereq: MET AD630, MET AD731. This course examines the process by which takeovers and other corporate control transactions take place. Of particular interest will be the defensive measures by management against hostile bids, buyout transactions, the relation of takeovers to capital structure changes, and the insider trading in takeover contests.', 'Mergers & Acq', 'Sullivan','TUE09:00')"
        ); 
        await db.run(
          "INSERT INTO Class ( department, number, description, title, instructor, classSchedule) VALUES  ('UA', '503', 'Surveys the factors affecting supply and price of urban housing. Examines federal, state, and municipal programs, as well as future policy options, from the standpoint of housing quality and community development goals. Analysis of selected international comparative experience','Housing&COM Dev', 'Kwon','TUE18:00')"
        ); 
        await db.run(
          "INSERT INTO Class ( department, number, description, title, instructor, classSchedule) VALUES  ('UA', '619', 'This course will provide students with a broad introduction to important concepts and policy issues in transportation, principally at an urban and metropolitan level. In addition, the course will explore methods planning practitioners can use to analyze transportation problems and propose solutions.', 'Urb Trans Polcs', 'Hassol','WED18:00')"
        ); 
        await db.run(
          "INSERT INTO Class ( department, number, description, title, instructor, classSchedule) VALUES   ('UA', '664', 'This course specifically explores the area where the private and public sectors meet so that the student can develop an awareness of the complexity of dealing with these often competing interests. The objective of the course is to give the student an understanding of the motivations of the private sector in the way they go about creating their products and projects and to leave the student with the tools and knowledge to successfully negotiate the Public Interest with the Private Needs.', 'Plan & Dev Proc', 'Greeley','WED18:00')"
        ); 
        await db.run(
          "INSERT INTO Class ( department, number, description, title, instructor, classSchedule) VALUES  ('UA', '703', 'Mixed-Methods Design for Urban Research is intended to develop skills in the evaluation and utilization of quantitative, qualitative, and mixed-methods approaches to scholarship in social-science research. ', 'Urban Res Methd', 'Sungu-Eryilm','TUE18:00')"
        ); 
        await db.run(
          "INSERT INTO Class ( department, number, description, title, instructor, classSchedule) VALUES   ('UA', '704', 'This course provides basic understanding of economics and approaches urban problems and planning issues from economic perspectives. It explores how microeconomic theories and models can help us understand how cities and regions function, analyze urban problems, and evaluate urban policies.', 'Urban Econ', 'Resseger','TUE18:00')"
        ); 
        await db.run(
          "INSERT INTO Class ( department, number, description, title, instructor, classSchedule) VALUES  ('CS', '201', 'Introduction to problem-solving methods and algorithm development. Includes procedural and data abstractions, program design, debugging, testing, and documentation. Covers data types, control structures, functions, parameter passing, library functions, and arrays. Laboratory exercises in Python. Laboratory course.', 'Intro to Progrm', 'Keklak','WED18:00')"
        ); 
        await db.run(
          "INSERT INTO Class ( department, number, description, title, instructor, classSchedule) VALUES  ('CS', '669', 'Students learn the latest relational and object-relational tools and techniques for persistent data and object modeling and management. Students gain extensive hands- on experience using Oracle or Microsoft SQL Server as they learn the Structured Query Language (SQL) and design and implement databases. ', 'Db Des Imp Bus', 'Matthews','TUE18:00')"
        ); 
        await db.run(
          "INSERT INTO Class ( department, number, description, title, instructor, classSchedule) VALUES   ('CS', '546', 'The goal of this course is to provide students with the mathematical fundamentals required for successful quantitative analysis of problems. The first part of the course introduces the mathematical prerequisites for understanding probability and statistics.', 'Intro Prob&Stat', 'Gorlin', 'MON18:00')"
        ); 
        await db.run(
          "INSERT INTO Class ( department, number, description, title, instructor, classSchedule) VALUES   ('CS', '625', 'This course presents the foundations of data communications and takes a bottom-up approach to computer networks. The course concludes with an overview of basic network security and management concepts. Prereq: MET CS 200, or instructor''s consent. ', 'Bus Data COM Nw', 'Arena', 'MON08:00')"
        ); 
        await db.run(
          "INSERT INTO Class ( department, number, description, title, instructor, classSchedule) VALUES   ('CS', '633', 'Theory and practice of security and quality assurance and testing for each step of the software development cycle. Verification vs. validation. Test case design techniques, test coverage criteria, security development and verification practices, and tools for static and dynamic analysis.', 'It Proj Mgmt', 'Elentukh', 'WED18:00')"
        ); 
        await db.run(
          "INSERT INTO Class ( department, number, description, title, instructor, classSchedule) VALUES  ('CS', '782', 'This course describes and compares contemporary and emerging information technology and its management. Students learn how to identify information technologies of strategic value to their organizations and how to manage their implementation. The course highlights the application of I.T. to business needs. CS 782 is at the advanced Masters (700) level, and it assumes that students understand IT systems at the level of CS 682 Systems Analysis and Design. Students who haven''t completed CS 682 should contact their instructor to determine if they are adequately prepared. Prereq: MET CS 682, or instructor''s consent.', 'IT Strategy and Management', 'Arakelian', 'TUE18:00')"
        ); 
        await db.run(
          "INSERT INTO Class ( department, number, description, title, instructor, classSchedule) VALUES   ('CS', '634', 'This course provides students with a comprehensive overview of the principles, processes, and practices of agile software development. Students learn techniques for initiating, planning and executing on software development projects using agile methodologies.', 'Agile Sftwr Dev', 'Heda', 'MON18:00')"
        ); 
        await db.run(
          "INSERT INTO Class ( department, number, description, title, instructor, classSchedule) VALUES  ('CS', '544', 'The goal of this course is to provide students with the mathematical and practical background required in the field of data analytics. Probability and statistics concepts will be reviewed as well as the R tool for statistical computing and graphics. Different types of data are investigated along with data summarization techniques and plotting.', 'Found Analytics', 'Kalathur', 'MON18:00')"
        ); 

        
        
      } else {
        // We have a database already - write Choices records to log for info
        console.log(await db.all("SELECT * from Choices"));

        //If you need to remove a table from the database use this syntax
        //db.run("DROP TABLE Logs"); //will fail if the table doesn't exist
      }
    } catch (dbError) {
      console.error(dbError);
    }
  });

// Our server script will call these methods to connect to the db
module.exports = {
  
  /**
   * Get the options in the database
   *
   * Return everything in the Choices table
   * Throw an error in case of db connection issues
   */
  getOptions: async () => {
    // We use a try catch block in case of db errors
    try {
      return await db.all("SELECT * from Choices");
    } catch (dbError) {
      // Database connection error
      console.error(dbError);
    }
  },

  /**
   * Process a user vote
   *
   * Receive the user vote string from server
   * Add a log entry
   * Find and update the chosen option
   * Return the updated list of votes
   */
  processVote: async vote => {
    // Insert new Log table entry indicating the user choice and timestamp
    try {
      // Check the vote is valid
      const option = await db.all(
        "SELECT * from Choices WHERE language = ?",
        vote
      );
      if (option.length > 0) {
        // Build the user data from the front-end and the current time into the sql query
        await db.run("INSERT INTO Log (choice, time) VALUES (?, ?)", [
          vote,
          new Date().toISOString()
        ]);

        // Update the number of times the choice has been picked by adding one to it
        await db.run(
          "UPDATE Choices SET picks = picks + 1 WHERE language = ?",
          vote
        );
      }

      // Return the choices so far - page will build these into a chart
      return await db.all("SELECT * from Choices");
    } catch (dbError) {
      console.error(dbError);
    }
  },
  
  
  //-----------------------------------------------------------------------------------------------------------------------
  
    /*
       this query is to register a new student in database
    */
  
  
    register: async (username, password, firstName, lastName, gender, dob) => {
    try {
      //Check if the user is already registered
      const checkStudent = await db.all(
        "SELECT * from Student WHERE username = ?",
        username
      );
      if (checkStudent.length <= 0) {
        // Build the student data from provided info
        await db.run("INSERT INTO Student (username, password, firstName, lastName, gender, dob) VALUES (?, ?, ?, ?, ?, ?)", [
          username, password, firstName, lastName, gender, dob
        ]);
        let result = await db.all(
          "SELECT username, firstName, lastName, gender, dob FROM Student WHERE username = ?",
          username
        );
        return result
      } else {
        return
      }
    } catch (dbError) {
      console.error(dbError);
    }
  },
  
   /*
       this query is get all registered student - testing ONLY!!!!!
  */
    getAllUsers: async () => {
    try {
      return await db.all("SELECT username, firstName, lastName, gender, dob FROM Student");
    } catch (dbError) {
      console.error(dbError);
    }
  },
      
  
  /*
      this method is for admin use to add class
  */
  adminAddClass: async (department, number, title, description, instructor, classSchedule) => {
    console.log("db add class called3");
    try {
      //Check if the user is already registered
      console.log("db add class called2"); 
      const checkClass = await db.all(
        "SELECT * from Class WHERE department = ? AND number = ?" ,
        department, number
      );
      console.log("db add class called5"); 
      if (checkClass.length <= 0) {
        console.log("db add class called");
        // Build the student data from provided info
        await db.run("INSERT INTO Class (department, number, title, description, instructor, classSchedule) VALUES (?, ?, ?, ?, ?, ?)", [
          department, number, title, description, instructor, classSchedule
        ]);
        let result = await db.all(
          "SELECT * FROM Class WHERE department = ? AND number = ?",
          department, number
        );
        return result
      } else {
        return ("error, this class in already in class schedule")
      }
    } catch (dbError) {
      console.error(dbError);
    }
  },

  /*
      this method is for admin use to remove class
  */
  removeClass: async (department, number) => {
    try {
      console.log("db remove class called3");
      //Check if the user is already registered
      const checkClass = await db.all(
        "SELECT * from Class WHERE department = ? AND number = ?" ,
        department, number
      );
      if (checkClass.length > 0) {
        // Build the student data from provided info
        await db.run("DELETE FROM Class WHERE department = ? AND number = ?", [
          department, number
        ]);
        await db.run("DELETE FROM Register WHERE department = ? AND number = ?", [
          department, number
        ]);
        let result = await db.all(
          "SELECT * FROM Class WHERE department = ? AND number = ?",
          department, number
        );
        return result
      } else {
        return ("error, the class is not in the class list")
      }
    } catch (dbError) {
      console.error(dbError);
    }
  },
  
  /*
      this method is for admin use to remove registered student account
  */
  removeStudent: async (username) => {
    try {
      //Check if the user is already registered
      const checkStudent = await db.all(
        "SELECT * from Student WHERE username = ?" ,
        username
      );
      if (checkStudent.length > 0) {
        // Build the student data from provided info
        await db.run("DELETE FROM Student WHERE username = ?", [
          username
        ]);
        await db.run("DELETE FROM Register WHERE username = ?", [
          username
        ]);
        let result = await db.all(
          "SELECT * FROM Student WHERE username = ?",
          username
        );
        return result
      } else {
        return ("error, the username provided has not been registered yet")
      }
    } catch (dbError) {
      console.error(dbError);
    }
  },
  
  
  checkPassword: async (username, password) => {
    try {
      //Check if the user is already registered
      const getPassword = await db.all(
        "SELECT * from Student WHERE username = ?" ,
        username
      );
      const str = JSON.stringify(getPassword[0].password);
      console.log("Username=" + username)
      console.log("getPassword=" + str)
      if (getPassword.length > 0) {
        if (getPassword[0].password == password) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (dbError) {
      console.error(dbError);
    }
  },
  
  getClass: async (department, number) => {
    try {
      const getClass = await db.all(
        "SELECT * from Class WHERE department = ? AND number = ?" ,
        department, number
      );
      if (getClass.length > 0) {
        return getClass
      } else {
        return false
      }
    } catch (dbError) {
      console.error(dbError);
    }
  },
  
  getClassByDepartment: async (department) => {
    try {
      const getClass = await db.all(
        "SELECT * from Class WHERE department = ?" ,
        department
      );
      return getClass
    } catch (dbError) {
      console.error(dbError);
    }
  },
  
  
  //register a class
  addClass: async (username, department, number, title, description, instructor, classSchedule) => {
    try {
      //Check if the user is already registered
      const checkAddClass = await db.all(
        "SELECT * from Register WHERE username = ? AND department = ? AND number = ?",
        username, department, number
      );
      if (checkAddClass.length <= 0) {
        // Build the student data from provided info
        await db.run("INSERT INTO Register (username, department, number, title, description, instructor, classSchedule) VALUES (?, ?, ?, ?, ?, ?, ?)", [
          username, department, number, title, description, instructor, classSchedule
        ]);
        let result = await db.all(
          "SELECT username, department, number FROM Register WHERE username = ? AND department = ? AND number = ?",
          username, department, number
        );
        return result
      } else {
        return false;
      }
    } catch (dbError) {
      console.error(dbError);
    }
  },
  
  
  //get registered class schedule
  getSchedule: async (username) => {
    try {
      const getSchedule = await db.all(
        "SELECT department, number, title, instructor, classSchedule from Register WHERE username = ?" ,
        username
      );
      return getSchedule
    } catch (dbError) {
      console.error(dbError);
    }
  },
  
  //drop a class
  dropClass: async (username, department, number) => {
    try {
      const checkClass = await db.all(
        "SELECT * from Register WHERE username = ? AND department = ? AND number = ?",
        username, department, number
      );
      if (checkClass.length > 0) {
        await db.run("DELETE FROM Register WHERE username = ? AND department = ? AND number = ?", [
          username, department, number
        ]);
      }
      return
    } catch (dbError) {
      console.error(dbError);
    }
  },
  
  //-----------------------------------------------------------------------------------------------------------------

  /**
   * Get logs
   *
   * Return choice and time fields from all records in the Log table
   */
  getLogs: async () => {
    // Return most recent 20
    try {
      // Return the array of log entries to admin page
      return await db.all("SELECT * from Log ORDER BY time DESC LIMIT 20");
    } catch (dbError) {
      console.error(dbError);
    }
  },

  /**
   * Clear logs and reset votes
   *
   * Destroy everything in Log table
   * Reset votes in Choices table to zero
   */
  clearHistory: async () => {
    try {
      // Delete the logs
      await db.run("DELETE from Log");

      // Reset the vote numbers
      await db.run("UPDATE Choices SET picks = 0");

      // Return empty array
      return [];
    } catch (dbError) {
      console.error(dbError);
    }
  }
};
