# **angular-firebase**
 A package to help you using firebase in angular and ionic in an easy way.

## Installation
First, install the package using npm:

```
   $ npm install angular-firebase --save
```

Then, import the package in your app.module.ts like so:

```javascript
import {FirebaseModule, FirebaseProvider} from 'angular-firebase'

@NgModule({
  imports: [
    FirebaseModule
  ],
  providers: [
    FirebaseProvider
  ]
})
```

Finally, Intialize your firebase in app.component.ts :
```javascript
  import * as firebase from 'firebase';

  constructor() {
    const config = {
      // copy firebase configuration from your firebase project
    };
    firebase.initializeApp(config);
  }

```

## Usage
First, Inject the service in the component you want to use firebase in:

```javascript
   import {FirebaseProvider} from 'angular-firebase';

   constructor(private fb: FirebaseProvider) {
 
   }
```

Then, run the method you want from our service:

**Example**:

```javascript
    this.fb.getDataArr('users','value',{limitToFirst:2}).then((v)=>{
      console.log(v)
    });
```

## angular-firebase methods


### Authentication
- **signupMial(email,password)**

```javascript
    this.fb.signupMial('example@example.com','password').then((value) => {
      console.log(value); //return any validation message like 'this email not valid'
    });

```

- **signinMail(email,password)**

```javascript
    this.fb.signinMail('example@example.com','password').then((value) => {
      console.log(value); //return any validation message like 'the email or password not correct'
    });

```

- **signin3rdparty(email)**
- **signout()**

```javascript
    this.fb.signout();
    //will notify the firebase that this user signed out by removing the token

```

- **getProfile()**

```javascript
    this.fb.getProfile().then((v)=>{
      console.log(v);    //show loged in user data
    });

```

- **verificationMail()**

```javascript
    this.fb.verificationMail(); // send verification email to the current loged in user
```

- **authState()**

```javascript
    this.fb.authState().then((v)=>{
      console.log(v);   //show the current state of the user "logged in as true" or not as "false"
    })
```

- **resetPassword(email)**

```javascript
    // to send a reset password email
    this.fb.resetPassword("example@example.com").then((v)=>{
      console.log(v);   //show the state of the process faild or successfully
    })
```

- **updateEmail(password)**

```javascript
    this.fb.updateEmail("password").then((v)=>{
      console.log(v);   //show the state of the process faild or successfully
    })
```

- **updatePassword(password)**

```javascript
    this.fb.updatePassword("password").then((v)=>{
      console.log(v);   //show the state of the process faild or successfully
    })
```

### Database
- **getData(path, orderby, query object)**

> **path**: the location you want to get data from
>
> **orderby**: the data you want what type of sort you want (**'value', 'key', 'parent' or 'child'**)
>
> **query**: the firebase query 
> Ex:**{startAt : value }, {endAt : value }, {equalTo : value } , {limitToFirst : value } or {limitToLast : value }**
>also you can mixing them like **{endAt : value , limitToFirst : value }**

```javascript
    this.fb.getData('users','value',{limitToFirst:2}).then((v)=>{
      console.log(v)
    });

```

- **getDataArr(path, orderby, query object)**

> **path**: the location you want to get data from
> 
> **orderby**: the data you want what type of sort you want (**'value', 'key', 'parent' or 'child:childKey'**)
> 
> **query**: the firebase query 
> Ex:**{startAt : value }, {endAt : value }, {equalTo : value } , {limitToFirst : value } or {limitToLast : value }**
> also you can mixing them like **{endAt : value , limitToFirst : value }**
> 

```javascript
    this.fb.getDataArr('users','value',{limitToFirst:2}).then((v)=>{
      console.log(v)
    });

```
- **setData(path, data)**

```javascript
    this.fb.setData('users',data).then((v)=>{
      if(v==='success'){
        //..
      } else {
        console.log(v); //show error
      }
    });
```

- **pushData(path, data)**

```javascript
    this.fb.pushData('users',data).then((v)=>{
        console.log(v); //show the uid key generated for the pushed data
    });
```

- **moveFbRecord(pathMoveFrom, pathMoveTo)**

```javascript
    this.fb.moveFbRecord('users','whereToMove');
```

- **copyFbRecord(pathCopyFrom, pathCopyTo)**

```javascript
    this.fb.copyFbRecord('users','whereToCopy');
```

- **increase(path)**

```javascript
    this.fb.increase('pressNumber'); //to make a number in this path if not exist or increase it with 1.
```

- **decrease(path)**

```javascript
    this.fb.decrease('pressNumber'); 
```

- **deleteData(path)**

```javascript
    this.fb.deleteData('pathToRemove'); 
```

- **checkExist(path)**

```javascript
    this.fb.checkExist('users'); //check if there is a data in users path
```

- **startListen(path, callback_method, orderby, query object)**

```javascript
    this.fb.startListen('users', (v)=>{
      console.log(v)
    })
    ,'value',{limitToFirst:2})

```

- **startListenArr(path, callback_method, orderby, query object)**

```javascript
    this.fb.startListenArr('users', (v)=>{
      console.log(v);
    })
    ,'value',{limitToFirst:2});

```

- **stopListen(path)**

```javascript
    this.fb.stopListen('users');  //to stop any listener functions on this path

```


## License
### MIT