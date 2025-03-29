import { createJSONStorage, StateStorage } from "zustand/middleware";

const fireBaseUrl =
  "https://zustand-store-4229b-default-rtdb.firebaseio.com/zustand";

// Custom storage object => storageApi
const storageApi: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const data = await fetch(`${fireBaseUrl}/${name}.json`).then((res) =>
        res.json()
      );
      console.log(data);
      return JSON.stringify(data);
    } catch (error) {
      console.log(error);
      throw error;
    }

    // const data = sessionStorage.getItem(name);
    // return data;
  },
  setItem: async function (name: string, value: string): Promise<void> {

    const data = await fetch(`${fireBaseUrl}/${name}.json`, {
      method: "PUT",
      body: value,
    }).then((res) => res.json());

    // Aplicar ABORTCONTROLLER DE AXIOS
    // console.count("SetItem");
    return;
  },
  removeItem: function (name: string): void | Promise<void> {
    console.log("remove item", name);
  },
};

export const firebaseStorage = createJSONStorage(() => storageApi);
