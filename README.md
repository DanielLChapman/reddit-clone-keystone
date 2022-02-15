Reddit Clone built on the keystone skeleton app on my profile, based on the base code from wes bos's Advanced react course with the user authentication left in.

Needs a config.js in the frontend folder with the following: 

* export const endpoint = `link to localhost for testing endpoint`;
* export const prodEndpoint = `link to production endpoint`;


Backend needs a .env with the following:
 
if using cloudinary include the following: 

* CLOUDINARY_CLOUD_NAME=cloudinaryname
* CLOUDINARY_KEY=1234567
* CLOUDINARY_SECRET="secret"

IF using a mailing system:

* MAIL_HOST=""
* MAIL_PORT=###
* MAIL_USER="mail_username"
* MAIL_PASS="mail_password"

Otherwise:

* COOKIE_SECRET="literally anything just to make it long enough"
* DATABASE_URL=mongodb + srv url
* FRONTEND_URL="Link To Front End"
