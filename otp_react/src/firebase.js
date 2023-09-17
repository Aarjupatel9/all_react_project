import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDliTI1pCLyKViODe-8miUE0D2yaLUDrho",
    authDomain: "otp-react-f0976.firebaseapp.com",
    projectId: "otp-react-f0976",
    storageBucket: "otp-react-f0976.appspot.com",
    messagingSenderId: "794019256158",
    appId: "1:794019256158:web:0d68b5a645bf3258c6e1cf"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase