import AbstractUserService from "./userServiceInterface";

export default class MySQLUserService extends AbstractUserService {
  async fetchAll() {
    const res = await fetch("http://localhost:3001/users");
    return await res.json();
  }

  async create(user) {
    const res = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    return await res.json();
  }

  async delete(userId) {
    await fetch(`http://localhost:3001/users/${userId}`, { method: "DELETE" });
    return { success: true };
  }
//Apartado para la Logica De Login para el usuario dentro de MySQL
async login(username, password) {
    try {
      const res = await fetch("http://localhost:3001/api/users/login", {   //Modificar siempre el localhost al puerto que se este utilizando
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (!res.ok) return null;
      return await res.json();
    } catch (err) {
      console.error("Error login MySQL:", err);
      return null;
    }
  }

}
//Modificar este apartado para saber en que apartado de base de datos esta trabajando