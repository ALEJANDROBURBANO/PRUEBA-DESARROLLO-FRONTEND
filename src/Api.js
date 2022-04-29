import React from "react";

export const Api = {
    create: async (data) => {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                var localData = JSON.parse(localStorage.getItem("data"));

                localData = [...(localData ?? []), data];

                resolve(
                    localStorage.setItem("data", JSON.stringify(localData))
                );
            }, 500);
        });
    },
    update: async (data, index) => {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                var localData = JSON.parse(localStorage.getItem("data"));

                localData[index] = data;

                resolve(
                    localStorage.setItem("data", JSON.stringify(localData))
                );
            }, 500);
        });
    },
    get: async () => {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                const localData = JSON.parse(localStorage.getItem("data"));

                resolve(localData);
            }, 500);
        });
    },
    delete: async (id) => {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                const localData = JSON.parse(localStorage.getItem("data"));

                localData.splice(id, 1);

                localStorage.setItem("data", JSON.stringify(localData));

                resolve(localData);
            }, 500);
        });
    },
};
