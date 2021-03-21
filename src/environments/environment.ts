// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
   loginApiBaseUrl: 'https://rte1.tnschools.gov.in/rte/api/index.php/ResumeAppliValid',
   loginAuthorization : 'EMIS@2019_api',
   googleApiKey :'AIzaSyBSLHNn40CleEvZeu2d_CPqqsIpsshjptE',
   mapApi : 'https://maps.googleapis.com/maps/api/geocode',
   // apiBaseUrl: 'http://localhost/emis-code',
   //  apiBaseUrl: 'http://13.232.216.80',
   apiBaseUrl: 'https://rte1.tnschools.gov.in/rte',
    //apiBaseUrl: 'http://15.206.4.200/',
   authorization : 'EMIS_web@2019_api',
   production: false,
   environment: 'LOCAL',
   showEnvironment: true
};
