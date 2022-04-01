## LocalStorage Vs SessionStorage 
### Web storage objects localStorage and sessionStorage allow to save key/value pairs in the browser.
#### LocalStorage 
* Shared between all tabs and windows from the same origin(domain/port/protocol).(The localStorage is shared between all windows with the same origin, so if we set the data in one window, the change becomes visible in another one.)
* The data does not expire. It remains after the browser restart and even OS reboot.
* The data stored in localStorage persists until explicitly deleted. 
* The data is not sent back to the server for every HTTP request unlike cookie.


### SessionStorage
* The sessionStorage exists only within the current browser tab.  
* Another tab with the same page will have a different storage.  
* The data survives page refresh, but not closing/opening the tab.  
[Good read](https://javascript.info/localstorage)


## Cookie Vs JWT
* The biggest difference between bearer tokens and cookies is that the browser will automatically send cookies, where bearer tokens need to be added explicitly to the HTTP request.  
* One difference is that cookies are for sending and storing arbitrary data, whereas bearer tokens are specifically for sending authorization data.

#### Cookie
* A cookie is a name-value pair, that is stored in a web browser, and that has an expiry date and associated domain.

#### JWT
* A bearer token is a value that goes into the Authorization header of any HTTP Request. It is not automatically stored anywhere, it has no expiry date, and no associated domain. It's just a value. We manually store that value in our clients and manually add that value to the HTTP Authorization header.    
[Sessionless Authentication](https://blog.usejournal.com/sessionless-authentication-withe-jwts-with-node-express-passport-js-69b059e4b22c)


##### Note:
Web Storage (localStorage/sessionStorage) is vulnerable to XSS, has a larger attack surface area, and can impact all application users on a successful attack.  
Don't store it in local storage (or session storage). If any of the 3rd part scripts you include in your page gets compromised, it can access all your users' tokens.
The JWT needs to be stored inside an **HttpOnly cookie**(this cookie can't be accessible by any javascipt code), a special kind of cookie that's only sent in HTTP requests to the server, and it's never accessible (both for reading or writing) from JavaScript running in the browser.
[Tom abott on securing token](https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage)  


## CORS( Cross Origin Resource Sharing)
 
Cross-Origin Resource Sharing (CORS) is a mechanism that uses additional HTTP headers to tell a browser to let a web application running at one origin (domain) have permission to **access selected resources** from a server at a different origin. A web application executes a cross-origin HTTP request when it requests a resource that has a different origin (domain, protocol, or port) than its own origin.  
CORS is a mechanism which aims to allow requests made on behalf of you and at the same time block some requests made by rogue JS and is triggered whenever you are making an HTTP request to:
- a different domain (eg. site at example.com calls api.com)
- a different sub domain (eg. site at example.com calls api.example.com)
- a different port (eg. site at example.com calls example.com:3001)
- a different protocol (eg. site at https://example.com calls http://example.com)

### Understanding CORS Request Types    
There are two types of CORS request: "simple" requests, and "preflight" requests, and it's the browser that determines which is used. As the developer, you don't normally need to care about this when you are constructing requests to be sent to a server. However, you may see the different types of requests appear in your network log and, since it may have a performance impact on your application, it may benefit you to know why and when these requests are sent.

**1. Simple requests (GET, POST, and HEAD)**   
The browser deems the request to be a "simple" request when the request itself meets a certain set of requirements:

- One of these methods is used: GET, POST, or HEAD
- A CORS safe-listed header is used
- When using the Content-Type header, only the following values are allowed: application/x-www-form-urlencoded, multipart/form-data, or text/plain
- No event listeners are registered on any XMLHttpRequestUpload object
- No ReadableStream object is used in the request   
The request is allowed to continue as normal if it meets these criteria, and the Access-Control-Allow-Origin header is checked when the response is returned.

**2. Preflight requests (OPTIONS)**    

If a request does not meet the criteria for a simple request, the browser will instead make an automatic preflight request using the OPTIONS method. This call is used to determine the exact CORS capabilities of the server, which is in turn used to determine whether or not the intended CORS protocol is understood. If the result of the OPTIONS call dictates that the request cannot be made, the actual request to the server will not be executed.    

The preflight request sets the mode as OPTIONS and sets a couple of headers to describe the actual request that is to follow: 

- ```Access-Control-Request-Method:``` The intended method of the request (e.g., GET or POST)   
- ```Access-Control-Request-Headers:``` An indication of the custom headers that will be sent with the request    
- ```Origin:``` The usual origin header that contains the script's current origin   
 
**Request**
```
curl -i -X OPTIONS localhost:3001/api/ping \
-H 'Access-Control-Request-Method: GET' \
-H 'Access-Control-Request-Headers: Content-Type, Accept' \
-H 'Origin: http://localhost:3000'
  ```
  
This request basically says "I would like to make a GET request with the Content-Type and Accept headers from http://localhost:3000 - is that possible?".    
The server will include some Access-Control-* headers within the response to indicate whether the request that follows will be allowed or not. These include:  


- ```Access-Control-Allow-Origin:``` The origin that is allowed to make the request, or * if a request can be made from any origin
- ```Access-Control-Allow-Methods:``` A comma-separated list of HTTP methods that are allowed
- ```Access-Control-Allow-Headers: ```A comma-separated list of the custom headers that are allowed to be sent
- ```Access-Control-Max-Age: ```The maximum duration that the response to the preflight request can be cached before another call is made  
The response would then be examined by the browser to decide whether to continue with the request or to abandon it.

So a response to the earlier example might look like this:
```
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET,HEAD,PUT,PATCH,POST,DELETE
Vary: Access-Control-Request-Headers
Access-Control-Allow-Headers: Content-Type, Accept
Content-Length: 0
Date: Fri, 05 Apr 2019 11:41:08 GMT
Connection: keep-alive

```
The ```Access-Control-Allow-Origin header```, in this case, allows the request to be made from any origin, while the ```Access-Control-Allow-Methods``` header describes only the accepted HTTP methods. If a given HTTP method is not accepted, it will not appear in this list.

In this example, ```Access-Control-Allow-Headers``` echos back the headers that were asked for in the OPTIONS request. This indicates that all the requested headers are allowed to be sent. If for example, the server doesn't allow the Accept header, then that header would be omitted from the response and the browser would reject the call.


### Example   
 Say your site is http://my-cool-site.com and, you have a third party API at domain http://third-party-site.com, which you can access via AJAX.
 And let's assume that a page from your server my-cool-site.com made a request to third-party-site.com. Normally, users browser will decline AJAX calls to any other site other than your own domain/subdomain per the Same-Origin Security Policy. But if the browser and the third party server supports CORS, following things happen: 
 - Browser will send and Origin HTTP header to third-party-site.com   
```Origin: http://my-cool-site.com```   
- If the third party server accepts requests from your domain, it will respond with an Access-Control-Allow-Origin HTTP header:    
```Access-Control-Allow-Origin: http://my-cool-site.com```      
- To allow all domains, third party server can send this header:   
```Access-Control-Allow-Origin: *```    
- If your site is not allowed, browser will throw an error.   
If the client's have fairly modern browsers that support CORS, and your third party server supports CORS as well, CORS can be useful to you.
[Extra](https://medium.com/@baphemot/understanding-cors-18ad6b478e2b)

