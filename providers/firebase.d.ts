export declare class FirebaseProvider {
    constructor();
    signupMail(email: string, password: string): Promise<{}>;
    signinMail(email: string, password: string): Promise<{}>;
    signin3rdparty(credential: any): Promise<{}>;
    signout(): Promise<{}>;
    getProfile(): Promise<{}>;
    verificationMail(): void;
    authState(): Promise<{}>;
    resetPassword(email: string): Promise<{}>;
    updateEmail(password: string): Promise<{}>;
    updatePassword(password: string): Promise<{}>;
    getData(ref: string, orderBy?: string, data?: firebaseQuery): Promise<{}>;
    getDataArr(ref: string, orderBy?: string, data?: firebaseQuery): Promise<{}>;
    startListen(ref: string, callback: (snapshot: any) => void, orderBy?: string, data?: firebaseQuery): void;
    startListenArr(ref: string, callback: (snapshot: any) => void, orderBy?: string, data?: firebaseQuery): Promise<{}>;
    stopListen(ref: string): Promise<{}>;
    setData(ref: string, data: any): Promise<{}>;
    pushData(ref: string, data: any): Promise<{}>;
    moveFbRecord(x: string, y: string): void;
    copyFbRecord(x: string, y: string): void;
    increase(ref: string): void;
    decrease(ref: string): void;
    deleteData(ref: string): Promise<{}>;
    checkExist(ref: string): Promise<{}>;
    uploadString(encodedFile: string, filePath: string, fileType: string, callback?: (snapshot: any) => void): Promise<{}>;
    uploadFile(File: any, filePath: string, callback?: (snapshot: any) => void): Promise<{}>;
    getFileLink(filePath: string): Promise<{}>;
    removeFile(filePath: string, successfulCallback?: () => void, failCallback?: (error: any) => void): void;
}
export declare class firebaseQuery {
    startAt?: any;
    endAt?: any;
    equalTo?: any;
    limitToFirst?: number;
    limitToLast?: number;
}
