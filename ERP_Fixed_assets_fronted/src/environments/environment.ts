// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // //Server 52
  // apiUrl: "http://52.15.152.26:1905/famsauth/fams",
  // //baseUrl: "http://52.15.152.26:9096/api/assets",
  // baseUrl: "http://52.15.152.26:1905/fixedassets/api/assets",
  // baseGetUrl: "http://52.15.152.26:1905/fixedassets/api",
  // BASE_URL : "http://52.15.152.26:1905/fixedassets/",
  // ROOT_URL: "http://52.15.152.26:9096"

  // //Server 52
  // apiUrl: "http://52.15.152.26:9088/fams",
  // //baseUrl: "http://52.15.152.26:9096/api/assets",
  // // baseUrl: "http://localhost:9088/fixedassets/api/assets",
  // baseUrl: "http://52.15.152.26:9088/api/assets",
  // baseGetUrl: "http://52.15.152.26:9088/api",
  // BASE_URL: "http://52.15.152.26:9088",
  // ROOT_URL: "http://52.15.152.26:9088"


  //Localhost
  apiUrl: "http://localhost:9088/fams",
  //baseUrl: "http://52.15.152.26:9096/api/assets",
  // baseUrl: "http://localhost:9088/fixedassets/api/assets",
  baseUrl: "http://localhost:9088/api/assets",
  baseGetUrl: "http://localhost:9088/api",
  BASE_URL: "http://localhost:9088",
  ROOT_URL: "http://localhost:9088"
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
