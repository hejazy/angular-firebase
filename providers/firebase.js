import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
var FirebaseProvider = (function () {
    function FirebaseProvider() {
    }
    //#region authentication
    // ==============================================================================================
    // firebase authentication
    //#region authentication
    // ==============================================================================================
    // firebase authentication
    FirebaseProvider.prototype.signupMail = 
    //#region authentication
    // ==============================================================================================
    // firebase authentication
    function (email, password) {
        //input: email,password
        return new Promise(function (resolve, reject) {
            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
                //firebase authentication
                reject(error);
            }).then(function (v) { return resolve(v); });
        });
    };
    FirebaseProvider.prototype.signinMail = function (email, password) {
        //input: email,password
        return new Promise(function (resolve, reject) {
            firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
                reject(error);
            }).then(function (v) { return resolve(v); });
        });
    };
    FirebaseProvider.prototype.signin3rdparty = function (credential) {
        //input: credential
        return new Promise(function (resolve, reject) {
            firebase.auth().signInWithCredential(credential).then(function (success) {
                resolve(success);
            }).catch(function (error) { return reject(error); });
        });
    };
    FirebaseProvider.prototype.signout = function () {
        return new Promise(function (resolve, reject) {
            firebase.auth().signOut().then(function () { resolve(true); }).catch(function (error) {
                reject(error);
            });
        });
    };
    // ============================================================================================
    // get firebase auth uid
    // ============================================================================================
    // get firebase auth uid
    FirebaseProvider.prototype.getProfile = 
    // ============================================================================================
    // get firebase auth uid
    function () {
        return new Promise(function (resolve, reject) {
            try {
                var user = firebase.auth().currentUser;
            }
            catch (e) {
                reject(e);
            }
            resolve(user);
        });
    };
    // ==============================================================================================
    // get verification key to email
    // ==============================================================================================
    // get verification key to email
    FirebaseProvider.prototype.verificationMail = 
    // ==============================================================================================
    // get verification key to email
    function () {
        firebase.auth().onAuthStateChanged(function (user) {
            user.sendEmailVerification();
        });
    };
    // =================================================================================================
    // check auth state
    // =================================================================================================
    // check auth state
    FirebaseProvider.prototype.authState = 
    // =================================================================================================
    // check auth state
    function () {
        return new Promise(function (resolve, reject) {
            try {
                firebase.auth().onAuthStateChanged(function (user) {
                    if (user) {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                });
            }
            catch (e) {
                reject(e);
            }
        });
    };
    // ==================================================================================================
    // reset password "forgot password"
    // ==================================================================================================
    // reset password "forgot password"
    FirebaseProvider.prototype.resetPassword = 
    // ==================================================================================================
    // reset password "forgot password"
    function (email) {
        //input: email
        return new Promise(function (resolve, reject) {
            firebase.auth().sendPasswordResetEmail(email).then(function (d) {
                //firebase verify your email
                resolve(d);
            }, function (error) {
                reject(error);
            });
        });
    };
    // ==================================================================================================
    // changing email
    // ==================================================================================================
    // changing email
    FirebaseProvider.prototype.updateEmail = 
    // ==================================================================================================
    // changing email
    function (password) {
        //input: password
        return new Promise(function (resolve, reject) {
            firebase.auth().currentUser.updateEmail(password).then(function (value) {
                resolve(value);
            }, function (error) { reject(error); });
        });
    };
    // ==================================================================================================
    // changing password
    // ==================================================================================================
    // changing password
    FirebaseProvider.prototype.updatePassword = 
    // ==================================================================================================
    // changing password
    function (password) {
        //input: password
        return new Promise(function (resolve, reject) {
            firebase.auth().currentUser.updatePassword(password).then(function (value) {
                resolve(value);
            }, function (error) { reject(error); });
        });
    };
    //#endregion
    //#region get data from firebase
    // ========================================================================================
    // get data from firebase
    // input (link, orderBy, {query key: query value})
    //#endregion
    //#region get data from firebase
    // ========================================================================================
    // get data from firebase
    // input (link, orderBy, {query key: query value})
    FirebaseProvider.prototype.getData = 
    //#endregion
    //#region get data from firebase
    // ========================================================================================
    // get data from firebase
    // input (link, orderBy, {query key: query value})
    function (ref, orderBy, data) {
        var order = (orderBy != (undefined)) ? "orderBy" + orderBy.charAt(0).toUpperCase() + orderBy.slice(1) : "orderByKey";
        order.replace(/ /g, '');
        var obj = (data == null) ? {} : data;
        var keys = Object.keys(obj);
        return new Promise(function (resolve, reject) {
            try {
                var x;
                if (order.substring(0, 12) === 'orderByChild') {
                    x = firebase.database().ref(ref)[order.split(':')[0]](order.split(':')[1]);
                }
                else {
                    x = firebase.database().ref(ref)[order]();
                }
                for (var i = 0; i < keys.length; i++) {
                    x = x[keys[i]](obj[keys[i]]);
                }
                x.once('value').then(function (snapshot) { return snapshot.val(); }).then(function (snapshot) { resolve(snapshot); });
            }
            catch (e) {
                reject(e);
                firebase.database().goOffline();
                setTimeout(function () { firebase.database().goOnline(); }, 2000);
            }
        });
    };
    // ========================================================================================
    // get data from firebase as array
    // input (link, orderBy, {query key: query value})
    // ========================================================================================
    // get data from firebase as array
    // input (link, orderBy, {query key: query value})
    FirebaseProvider.prototype.getDataArr = 
    // ========================================================================================
    // get data from firebase as array
    // input (link, orderBy, {query key: query value})
    function (ref, orderBy, data) {
        var order = (orderBy != (undefined)) ? "orderBy" + orderBy.charAt(0).toUpperCase() + orderBy.slice(1) : "orderByKey";
        order.replace(/ /g, '');
        var array = [];
        var obj = (data == null) ? {} : data;
        var keys = Object.keys(obj);
        return new Promise(function (resolve, reject) {
            try {
                var x;
                if (order.substring(0, 12) === 'orderByChild') {
                    x = firebase.database().ref(ref)[order.split(':')[0]](order.split(':')[1]);
                }
                else {
                    x = firebase.database().ref(ref)[order]();
                }
                for (var i = 0; i < keys.length; i++) {
                    x = x[keys[i]](obj[keys[i]]);
                }
                x.once('value').then(function (snapshot) {
                    snapshot.forEach(function (childSnapshot) { var item = childSnapshot.val(); array.push(item); });
                    resolve(array);
                });
            }
            catch (e) {
                reject(e);
                firebase.database().goOffline();
                setTimeout(function () { firebase.database().goOnline(); }, 2000);
            }
        });
    };
    // ===================================================================================================
    // listen to database
    // ===================================================================================================
    // listen to database
    FirebaseProvider.prototype.startListen = 
    // ===================================================================================================
    // listen to database
    function (ref, callback, orderBy, data) {
        var order = (orderBy != (undefined)) ? "orderBy" + orderBy.charAt(0).toUpperCase() + orderBy.slice(1) : "orderByKey";
        order.replace(/ /g, '');
        var obj = (data == null) ? {} : data;
        var keys = Object.keys(obj);
        try {
            var x;
            if (order.substring(0, 12) === 'orderByChild') {
                x = firebase.database().ref(ref)[order.split(':')[0]](order.split(':')[1]);
            }
            else {
                x = firebase.database().ref(ref)[order]();
            }
            for (var i = 0; i < keys.length; i++) {
                x = x[keys[i]](obj[keys[i]]);
            }
            x.on('value', function (snapshot) { return new Promise(function (resolve, reject) { resolve(snapshot.val()); }).then(callback); });
        }
        catch (e) {
            firebase.database().goOffline();
            setTimeout(function () { firebase.database().goOnline(); }, 2000);
        }
    };
    // ===================================================================================================
    // listen to database as array
    // ===================================================================================================
    // listen to database as array
    FirebaseProvider.prototype.startListenArr = 
    // ===================================================================================================
    // listen to database as array
    function (ref, callback, orderBy, data) {
        var order = (orderBy != (undefined)) ? "orderBy" + orderBy.charAt(0).toUpperCase() + orderBy.slice(1) : "orderByKey";
        order.replace(/ /g, '');
        var array;
        var obj = (data == null) ? {} : data;
        var keys = Object.keys(obj);
        return new Promise(function (resolve, reject) {
            try {
                var x;
                if (order.substring(0, 12) === 'orderByChild') {
                    x = firebase.database().ref(ref)[order.split(':')[0]](order.split(':')[1]);
                }
                else {
                    x = firebase.database().ref(ref)[order]();
                }
                for (var i = 0; i < keys.length; i++) {
                    x = x[keys[i]](obj[keys[i]]);
                }
                x.on('value', function (snapshot) {
                    return new Promise(function (resolve, reject) {
                        array = [];
                        snapshot.forEach(function (childSnapshot) { var item = childSnapshot.val(); array.push(item); });
                        resolve(array);
                    }).then(callback);
                });
            }
            catch (e) {
                reject(e);
                firebase.database().goOffline();
                setTimeout(function () { firebase.database().goOnline(); }, 2000);
            }
        });
    };
    // ===================================================================================================
    // stop Listen to firebase data
    // ===================================================================================================
    // stop Listen to firebase data
    FirebaseProvider.prototype.stopListen = 
    // ===================================================================================================
    // stop Listen to firebase data
    function (ref) {
        //input: firebase path
        return new Promise(function (resolve, reject) {
            firebase.database().ref(ref).off();
            resolve("success");
        });
    };
    //#endregion
    //#region set data to firebase
    // ==================================================================
    // set data to firebase
    //#endregion
    //#region set data to firebase
    // ==================================================================
    // set data to firebase
    FirebaseProvider.prototype.setData = 
    //#endregion
    //#region set data to firebase
    // ==================================================================
    // set data to firebase
    function (ref, data) {
        //input: firebase path, data
        return new Promise(function (resolve, reject) {
            try {
                firebase.database().ref(ref).set(data).then(function () {
                    resolve("success");
                });
            }
            catch (e) {
                reject(e);
            }
        });
    };
    // ==================================================================
    // push data to firebase
    // ==================================================================
    // push data to firebase
    FirebaseProvider.prototype.pushData = 
    // ==================================================================
    // push data to firebase
    function (ref, data) {
        //input: firebase path,data
        return new Promise(function (resolve, reject) {
            var myRef = firebase.database().ref(ref).push();
            myRef.set(data, function (error) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(myRef.key);
                }
            });
        });
    };
    // endregion
    // ======================================================================================================
    // move firebase record from path to another
    // endregion
    // ======================================================================================================
    // move firebase record from path to another
    FirebaseProvider.prototype.moveFbRecord = 
    // endregion
    // ======================================================================================================
    // move firebase record from path to another
    function (x, y) {
        //input: move from x path to y path
        firebase.database().ref(x).once('value').then(function (snap) {
            firebase.database().ref(y).set(snap.val(), function (error) {
                if (!error) {
                    firebase.database().ref(x).remove();
                }
                else if (typeof (console) !== 'undefined' && console.error) {
                    console.error(error);
                }
            });
        });
    };
    // ======================================================================================================
    // move firebase record from path to another
    // ======================================================================================================
    // move firebase record from path to another
    FirebaseProvider.prototype.copyFbRecord = 
    // ======================================================================================================
    // move firebase record from path to another
    function (x, y) {
        //input: move from x path to y path
        firebase.database().ref(x).once('value').then(function (snap) {
            firebase.database().ref(y).set(snap.val(), function (error) {
            });
        });
    };
    // =====================================================================================================
    // increment firebase record without read it
    // =====================================================================================================
    // increment firebase record without read it
    FirebaseProvider.prototype.increase = 
    // =====================================================================================================
    // increment firebase record without read it
    function (ref) {
        //input: firebase path
        firebase.database().ref(ref).transaction(function (currentClicks) {
            return (currentClicks || 0) + 1;
        });
    };
    // =====================================================================================================
    // decrement firebase record without read it
    // =====================================================================================================
    // decrement firebase record without read it
    FirebaseProvider.prototype.decrease = 
    // =====================================================================================================
    // decrement firebase record without read it
    function (ref) {
        //input: firebase path
        firebase.database().ref(ref).transaction(function (currentClicks) {
            return (currentClicks) - 1;
        });
    };
    // ============================================================================
    // delete path in firebase
    // ============================================================================
    // delete path in firebase
    FirebaseProvider.prototype.deleteData = 
    // ============================================================================
    // delete path in firebase
    function (ref) {
        //input: firebase path
        return new Promise(function (resolve, reject) {
            var myRef = firebase.database().ref(ref).remove(function (error) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve('success');
                }
            });
        });
    };
    // ==================================================================
    // check is data available
    // ==================================================================
    // check is data available
    FirebaseProvider.prototype.checkExist = 
    // ==================================================================
    // check is data available
    function (ref) {
        //input: firebase path
        return new Promise(function (resolve, reject) {
            firebase.database().ref(ref).once('value').then(function (snapshot) {
                return snapshot.val();
            }).then(function (snapshot) {
                if (snapshot != undefined) {
                    resolve("true");
                }
                else {
                    resolve("false");
                }
            }).catch(function (error) { return reject(error); });
        });
    };
    // ==================================================================
    // upload string like base64
    // ==================================================================
    // upload string like base64
    FirebaseProvider.prototype.uploadString = 
    // ==================================================================
    // upload string like base64
    function (encodedFile, filePath, fileType, callback) {
        return new Promise(function (resolve, reject) {
            var storageRef = firebase.storage().ref();
            var imageRef = storageRef.child(filePath);
            if (callback == undefined) {
                callback = function (snapshot) { };
            }
            imageRef.putString(encodedFile, fileType).on(firebase.storage.TaskEvent.STATE_CHANGED, callback, function (e) {
                reject(JSON.stringify(e, null, 2));
            }, function () {
                imageRef.getDownloadURL().then(function (url) {
                    resolve(url);
                });
            });
        });
    };
    // ==================================================================
    // upload file to database
    // ==================================================================
    // upload file to database
    FirebaseProvider.prototype.uploadFile = 
    // ==================================================================
    // upload file to database
    function (File, filePath, callback) {
        return new Promise(function (resolve, reject) {
            var storageRef = firebase.storage().ref();
            var imageRef = storageRef.child(filePath);
            if (callback == undefined) {
                callback = function (snapshot) { };
            }
            imageRef.put(File).on('state_changed', callback, function (e) {
                reject(JSON.stringify(e, null, 2));
            }, function () {
                imageRef.getDownloadURL().then(function (url) {
                    resolve(url);
                });
            });
        });
    };
    // ==================================================================
    // get linkurl from file path 
    // ==================================================================
    // get linkurl from file path
    FirebaseProvider.prototype.getFileLink = 
    // ==================================================================
    // get linkurl from file path
    function (filePath) {
        return new Promise(function (resolve, reject) {
            var storageRef = firebase.storage().ref().child(filePath);
            storageRef.getDownloadURL().then(function (url) {
                resolve(url);
            }).catch(function (error) { return reject(error); });
        });
    };
    // ==================================================================
    // remove file to database
    // ==================================================================
    // remove file to database
    FirebaseProvider.prototype.removeFile = 
    // ==================================================================
    // remove file to database
    function (filePath, successfulCallback, failCallback) {
        firebase.storage().ref().child(filePath).delete().then(successfulCallback).catch(failCallback);
    };
    FirebaseProvider.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    FirebaseProvider.ctorParameters = function () { return []; };
    return FirebaseProvider;
}());
export { FirebaseProvider };
var firebaseQuery = (function () {
    function firebaseQuery() {
    }
    return firebaseQuery;
}());
export { firebaseQuery };
//# sourceMappingURL=firebase.js.map