export interface IAuth {
    uid: string;
    session: any;
    sessionLoading: Boolean;
    isAnonymous: Boolean;
    signUp: (email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signInAnonymously: () => Promise<void>;
    authLoading: Boolean;
    signOut: () => Promise<void>;
}
