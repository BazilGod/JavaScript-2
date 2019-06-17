import { Injectable } from "@angular/core";

import axios from "axios";

const baseAddress = "http://localhost:1488";
@Injectable({
  providedIn: "root"
})
export class RequestsService {
  async get(address: string): Promise<any> {
    return (await axios.get(baseAddress + address)).data.result;
  }

  async post(address: string, obj: object): Promise<any> {
    return (await axios.post(baseAddress + address, obj)).data
      .result;
  }

  async put(address: string, obj: object): Promise<any> {
    return (await axios.put(baseAddress + address, obj)).data
      .result;
  }

  async delete(address: string): Promise<any> {
    return (await axios.delete(baseAddress + address)).data.result;
  }
}
