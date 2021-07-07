import { useContext, useState, useEffect, createContext } from "react";

import { auth } from "./../shared/firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  const signup = (email, password, fullName) => {
    let promise = new Promise(function (resolve, reject) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((ref) => {
          ref.user.updateProfile({
            displayName: fullName,
          });
          resolve(ref);
        })
        .catch((error) => reject(error));
    });

    return promise;
  };

  const signin = (email, password) => {
    let promise = new Promise(function (resolve, reject) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((ref) => {
          console.log(ref.user, "After firebase signin");
          resolve(ref);
        })
        .catch((error) => {
          reject(error);
        });
    });

    return promise;
  };

  const setTokenValue = () => {
    auth.currentUser
      .getIdToken(true)
      .then((tokenId) => {
        setToken(tokenId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signout = () => {
    const promise = new Promise((resolve, reject) => {
      auth
        .signOut()
        .then((ref) => {
          console.log(ref, "in logout");
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
    return promise;
  };

  const passwordReset = (email) => {
    let promise = new Promise(function (resolve, reject) {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          resolve(`Password Reset Email sent to ${email}`);
        })
        .catch((error) => {
          reject(error);
        });
    });

    return promise;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log(user);
      setCurrentUser(user);
      if (user) {
        setTokenValue();
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  const value = {
    currentUser,
    signup,
    signin,
    signout,
    passwordReset,
    token,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
