//Admin Signup Validator
exports.adminSignupValidator = (req, res, next) => {
  req.check("name", "Name is required").notEmpty();
  req.check("username", "Username is required").notEmpty();
  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .isLength({
      min: 6,
    })
    .withMessage("Password must contain atleast 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain atleast one digit");

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};


//Admin Login Validator
exports.adminLoginValidator = (req, res, next) => {
  req.check("username", "Username is required").notEmpty();
  req.check("password", "Password is required").notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};

// //Application Validation (Seeker)
// exports.applicationValidator = (req, res, next) => {
//     req.check("name", "Name is required").notEmpty();
//     req.check("domain", "Please select a domain").notEmpty();
//     req.check("email","Email must not be less than 3 characters")
//     .matches(/.+\@.+\..+/)
//     // .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
//     .withMessage("Email err")
//     // isLength({
//     //     min:5
//     // })
  
//     const errors = req.validationErrors();
//     if (errors) {
//       const firstError = errors.map((error) => error.msg)[0];
//       return res.status(400).json({ error: firstError });
//     }
//     next();
//   };
  
//User Signup Validator
exports.userSignupValidator = (req, res, next) => {
    req.check("number", "number is required").notEmpty();
    req.check("channel", "channel for verification is required").notEmpty();
  
    const errors = req.validationErrors();
    if (errors) {
      const firstError = errors.map((error) => error.msg)[0];
      return res.status(400).json({ error: firstError });
    }
    next();
  };

//User Login Validator
exports.userLoginValidator = (req, res, next) => {
    req.check("number", "Number is required").notEmpty();
    req.check("code", "OTP for verification is required").notEmpty();
  
    const errors = req.validationErrors();
    if (errors) {
      const firstError = errors.map((error) => error.msg)[0];
      return res.status(400).json({ error: firstError });
    }
    next();
  };

  //Domain validation
  exports.domainValidator = (req, res, next) => {
    req.check("domainName", "Domain name is required").notEmpty();
  
    const errors = req.validationErrors();
    if (errors) {
      const firstError = errors.map((error) => error.msg)[0];
      return res.status(400).json({ error: firstError });
    }
    next();
  };

// Internship Validation
exports.internshipValidator = (req,res,next)=>{
  req.check("title", "Job Title is required").notEmpty();
  req.check("description", "Job Description is required").notEmpty();
  req.check("place","Location is required").notEmpty();
  req.check("gender","Prefered Gender is required").notEmpty();
  req.check("domain","Domain is required").notEmpty();
  req.check("Salary","Salary is required").notEmpty();
  req.check("language", "Preferable language is required").notEmpty();
  const errors=req.validationErrors();
  if(errors){
    const firstError=errors.map((error)=>error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next()
}