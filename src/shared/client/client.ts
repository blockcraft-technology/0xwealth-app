import axios from 'axios';
export class Client {
    private readonly _apiUrl = `http://localhost:3000`;
    async getBalance(address:string) {
        const { data } = await axios.get(`${this._apiUrl}/balances/address/${address}`);
        return data;
    }
}