import { mount } from '@vue/test-utils'
import CardGrid from "../src/components/card_grid"
import { login, register, logout } from "../src/_services/user.service"
import axios from "axios";

let user = {
    login: "Toster",
    password: "testerovshik",
    email: "test@kpi.ua"
}

let cards_list = []
function created() {
    axios.get(`${config.apiUrl}/entry/`).then(response => cards_list = response.data.entries ).catch(e => console.log(e.toString()))
}

test("Test login", async () => {
    await register(user);
    let a = await login(user);
    expect(a.response).toBe("204")
})

describe("Test account", () => {
    it("Test register", async () => {
        let a = await register(user);
        expect(a.response).toBe("204");
    })
    it("test login", async () =>{
        let a = await login(user);
        expect(a.response).toBe("204");
    })
    it("test logout", async () =>{
        let a = await logout();
        expect(a.response).toBe("204");
    })
})

login(user)
axios.post(`${config.apiUrl}/entry`,
    {website : "test", login : "test", password : "test"},
    {headers: {'Content-Type':'application/json'}}).then(c => console.log(c)).catch(e => console.log(e.toString()))

describe("Test how it saves passwords",() =>{
    it("Test save of passwords", async () =>{
        created();
        expect(cards_list).toBe([{website : "test", login : "test", password : "test"}])
    })
})