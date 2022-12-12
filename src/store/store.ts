import { makeAutoObservable, runInAction, toJS } from "mobx";
import { createContext, useContext } from "react";
import sample from "../mock/data.json";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface Location {
  locationID: number;
  name: string;
}

export interface Env {
  envID: number;
  name: string;
}

export interface Server {
  serverID: number;
  name: string;
  locationID: number;
  envID: number;
}

export interface TestLocation {
  serverID: number;
  hint: string;
  locationID: number;
  envID: number;
  testLocationID: number
}

export class Store {
  isLoaded = false;
  locations: Location[] = [];
  envs: Env[] = [];
  servers: Server[] = [];
  testLocations: TestLocation[] = []

  addTestLocation() {
    this.testLocations.push({
      envID: this.envs[0].envID,
      locationID: this.locations[0].locationID,
      serverID: this.servers[0].serverID,
      hint: "",
      testLocationID: this.testLocations.length + 1
    })
  }

  updateTestLocation(id: number, field: keyof TestLocation, value: string) {
    const index = this.testLocations.findIndex((el) => el.testLocationID === id)

    if (field === "hint") {
      this.testLocations[index][field] = value
    } else {
      this.testLocations[index][field] = Number(value)
    }
  }

  deleteTestLocation(id: number) {
    this.testLocations = this.testLocations.filter((el) => el.testLocationID !== id)
  }

  getTestLocationsList () {
    return this.testLocations.map((el) => {
      return {
        locationID: el.locationID,
        envID: el.envID,
        hint: el.hint
      }
    })
  }

  fetchData = async () => {
    await sleep(3000);
    runInAction(() => {
      this.locations = sample.locations;
      this.envs = sample.envs;
      this.servers = sample.servers;
      this.isLoaded = true;
    });
  };

  constructor() {
    makeAutoObservable(this);
  }
}

export const store = new Store();
export const storeContext = createContext(store);
export const useStoreContext = () => useContext(storeContext)
