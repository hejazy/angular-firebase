import { NgModule } from '@angular/core';
import { FirebaseProvider } from './providers/firebase';
var FirebaseModule = (function () {
    function FirebaseModule() {
    }
    FirebaseModule.forRoot = function () {
        return {
            ngModule: FirebaseModule,
            providers: [FirebaseProvider]
        };
    };
    FirebaseModule.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    declarations: [],
                    exports: []
                },] },
    ];
    return FirebaseModule;
}());
export { FirebaseModule };
//# sourceMappingURL=firebase.module.js.map