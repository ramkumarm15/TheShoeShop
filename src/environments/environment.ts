// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  AUTH_API: 'https://online-shopping-asp-production.azurewebsites.net/api/Authentication',
  USER_API: 'https://online-shopping-asp-production.azurewebsites.net/api/Users',
  PRODUCT_API: 'https://online-shopping-asp-production.azurewebsites.net/api/Product',
  BILLING_ADDRESS_API: 'https://online-shopping-asp-production.azurewebsites.net/api/BillingAddress',
  CART_API: {
    CART: 'https://online-shopping-asp-production.azurewebsites.net/api/Cart',
    CART_ITEM: 'https://online-shopping-asp-production.azurewebsites.net/api/CartItem',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
