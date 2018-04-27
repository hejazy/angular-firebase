# **angular-firebase**
 A package to help you using firebase in angular and ionic in an easy way.

## Installation
First, install the package using npm:

```
   $ npm install angular-firebase --save
```

Then, import the package in your app.module.ts like so:

```
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
```
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

```
   import {FirebaseProvider} from 'angular-firebase';

   constructor(private fb: FirebaseProvider) {
 
   }
```

Then, run the method you want from our service:

**Example**:

```
    this.fb.getDataArr('users','value',{limitToFirst:2},this.users).then((v)=>{
      console.log(this.users)
    });
```

## angular-firebase methods

### note
All methods return promise .

### Authentication
- **signupMial(email,password)**
- **signinMail(email,password)**
- **signin3rdparty(email)**
- **signout()**
- **getProfile()**
- **verificationMail()**
- **authState()**
- **resetPassword(password)**
- **updateEmail(password)**
- **updatePassword(password)**

### Database
- **getData(path, orderby, query)**

> **path**: the location you want to get data from
>
> **orderby**: the data you want what type of sort you want (**'value', 'key', 'parent' or 'child'**)
>
> **query**: the firebase query 
>
> Ex:**{startAt : value }, {endAt : value }, {equalTo : value } , {limitToFirst : value } or {limitToLast : value }**
>
>also you can mixing them like **{endAt : value , limitToFirst : value }**


- **getDataArr(path, orderby, query object, Array)**

> **path**: the location you want to get data from
> 
> **orderby**: the data you want what type of sort you want (**'value', 'key', 'parent' or 'child'**)
> 
> **query**: the firebase query 
> Ex:**{startAt : value }, {endAt : value }, {equalTo : value } , {limitToFirst : value } or {limitToLast : value }**
> also you can mixing them like **{endAt : value , limitToFirst : value }**
> 
> **Array**: an empty array you want to push firebase data in.

- **setData(path, data)**
- **pushData(path, data)**
- **moveFbRecord(pathMoveFrom, pathMoveTo)**
- **copyFbRecord(pathCopyFrom, pathCopyTo)**
- **increase(path)**
- **decrease(path)**
- **deleteData(path)**
- **checkExist(path)**


## License
### MIT
