var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');
var SuperLogin = require('superlogin');

var app = express();
app.set('port', process.env.PORT || 443);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
//this.username = 'aticamosyseringlarmentse';
//this.password = 'n';
//this.remote = 'https://6a698139-8043-4f27-a26b-c11561d191a1-bluemix.cloudant.com/wellness';
var config = {
  dbServer: {
    protocol: 'https://',
    host: '6a698139-8043-4f27-a26b-c11561d191a1-bluemix.cloudant.com:443',
    user: '6a698139-8043-4f27-a26b-c11561d191a1-bluemix',
    password: 'ac670c57ba090b57061809aa138fd606922305d26299ac1ab60d4c2bf63926e1',
    cloudant: true,
    userDB: 'sl-users',
    couchAuthDB: '_users'
  },
  mailer: {
    fromEmail: 'noreply@gmail.com',
    transport: require('nodemailer-sendgrid-transport'),
    options: {
       auth: {
         api_user: 'azure_ae9b759c7600baf20662a23b8253a602@azure.com',
         api_key: 'Newl!fe52'
         }
    }
  },
  security: {
    maxFailedLogins: 3,
    lockoutTime: 600,
    tokenLife: 86400,
    loginOnRegistration: true,
  },
  userDBs: {
    defaultDBs: {
      private: ['supertest']
    },
    model: {
      supertest: {
        permissions: ['_reader', '_writer', '_replicator']
      }
    }
  },
  providers: {
    local: true
  },
  emails: {
         confirmEmail: {
           subject: 'Please confirm your email',
           template: path.join(__dirname, '../templates/email/confirm-email.ejs'),
           format: 'text'
         },
         forgotPassword: {
           subject: 'Your password reset link',
           template: path.join(__dirname, '../templates/email/forgot-password.ejs'),
           format: 'text'
         }
       }

}

// Initialize SuperLogin
var superlogin = new SuperLogin(config);

// Mount SuperLogin's routes to our app
app.use('/auth', superlogin.router);

app.listen(app.get('port'));
console.log("App listening on " + app.get('port'));
