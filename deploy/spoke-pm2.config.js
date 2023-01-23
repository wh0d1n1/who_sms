const envProduction = {
  NODE_ENV:'development',
  SUPPRESS_SELF_INVITE:'',
  AWS_ACCESS_KEY_ID:'',
  AWS_SECRET_ACCESS_KEY:'',
  AWS_S3_BUCKET_NAME: '',
  APOLLO_OPTICS_KEY:'',
  DEV_APP_PORT:8090,
  ASSETS_DIR:'./build/client/assets',
  ASSETS_MAP_FILE:'assets.json',
  CAMPAIGN_ID:'campaign-id-hash',
  DB_HOST:'127.0.0.1',
  DB_PORT:5432,
  DB_NAME:'spokedev',
  DB_USER:'spoke',
  DB_PASSWORD:'spoke',
  DB_KEY:'',
  DB_TYPE:'pg',
  DB_MIN_POOL: 2,
  DB_MAX_POOL: 10,
  DB_USE_SSL: false,
  DEFAULT_SERVICE:'fakeservice',
  JOB_DB_HOST:'127.0.0.1',
  JOB_DB_PORT:6379,
  BASE_URL:'http://localhost:3000',
  PRIVACY_URL:'http://localhost:3000/privacy',
  AUTH0_DOMAIN:'dev-u8a5hk6s.us.auth0.com',
  AUTH0_CLIENT_ID:'hgzAfbr1jIJVhCmbdCRx8dMhDGX2tINn',
  AUTH0_CLIENT_SECRET:'ImwuY3guTTcSSOhvONpPD107LpA3QHhE4sEezWq9jP0C2AD2N5BX0Tf1uUQzaXDS',
  SESSION_SECRET:'set_this_in_production',
  NEXMO_API_KEY:'',
  NEXMO_API_SECRET:'',
  TWILIO_ACCOUNT_SID:'AC6c370e6731f688480e5709bff5172f4c',
  TWILIO_AUTH_TOKEN:'37059c6b503b6df0e103d45cd0efd999',
  TWILIO_STATUS_CALLBACK_URL:'http://localhost:3000/twilio',
  PHONE_NUMBER_COUNTRY: 'US',
  EMAIL_HOST:'gmail',
  EMAIL_HOST_PASSWORD:'wqajubjsfdzmgbrj',
  EMAIL_HOST_USER:'travis@travisthehealthadvisor.com',
  EMAIL_HOST_PORT:'465',
  EMAIL_FROM:'travis@travisthehealthadvisor.com',
  ROLLBAR_CLIENT_TOKEN:'',
  ROLLBAR_ACCESS_TOKEN:'',
  ROLLBAR_ENDPOINT:'https://api.rollbar.com/api/1/item/',
  ALLOW_SEND_ALL: false,
  DST_REFERENCE_TIMEZONE: 'US/Eastern',
  TEXTER_SIDEBOXES:'celebration-gif,default-dynamicassignment,default-releasecontacts,contact-reference,tag-contact,freshworks-widget,default-editinitial,take-conversations,hide-media,texter-feedback,contact-notes'

}

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'spoke-server',
      script    : './build/server/server',
      env_production : envProduction
    },
    {
      name      : 'job-handler',
      script    : './build/server/workers/job-handler.js',
      env_production : envProduction
    },
    {
      name      : 'incoming-message-handler',
      script    : './build/server/workers/incoming-message-handler.js',
      env_production : envProduction
    },
    {
      name      : 'message-sender-01',
      script    : './build/server/workers/message-sender-01.js',
      env_production : envProduction
    },
    {
      name      : 'message-sender-234',
      script    : './build/server/workers/message-sender-234.js',
      env_production : envProduction
    },
    {
      name      : 'message-sender-56',
      script    : './build/server/workers/message-sender-56.js',
      env_production : envProduction
    },
    {
      name      : 'message-sender-789',
      script    : './build/server/workers/message-sender-789.js',
      env_production : envProduction
    }
  ]
};
