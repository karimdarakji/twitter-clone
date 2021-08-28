import React from 'react';
 let _ = {};
const sessionInfo = localStorage.getItem("sessionInfo");

if (sessionInfo) {
    _ = JSON.parse(decodeURIComponent(atob(sessionInfo)));
}

export const setSessionInfo = ({ name, val }) => {
     _[name] = val;
     localStorage.setItem("sessionInfo", btoa(encodeURIComponent(JSON.stringify(_))));

}

export const getSessionInfo = (name) => {
  return (_[name]);
}

export const clearSessionInfo = () => {
    localStorage.clear();
    for (const prop of Object.keys(_)) {
        delete _[prop];
    }

}

export const removeSessionInfo = (name) => {
    delete _[name];
    sessionStorage.setItem("sessionInfo", btoa(encodeURIComponent(JSON.stringify(_))));
}

export const noDataFound = <div className="col-12 card customCard border-radius p-3 mt-3 mb-3 text-center">
                        No Data Found
                       </div>