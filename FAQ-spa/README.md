# The FAQ app frontend

This builds on the example at https://github.com/serverless/examples/tree/master/aws-node-single-page-app-via-cloudfront

The single page implemented is a react app for the frontend of ersins FAQ app.

## Building from scratch

4. In the serverless.yml, update to the appropriate AWS region and bucket name config and application name.
5. `sls deploy` Deploy the cloudfront distribution and bucket
6. Build Single page app `npm init react-app app`
7. Build the single page app. `cd app && npm run build`
8. Deploy the single page app. `aws s3 sync build/ s3://<your-bucket>`
9. ???
10. Profit


## Structure of this repo

- `app/` contains the single page app content, a modern react app
- `serverless.yml` contains the serverless config which creates the assets required to deliver the static site
