import { useEffect, useState, useRef } from "react";
import Trash from "../../assets/image.svg";
import "./style.css";
import api from "../../services/api"

function Home() {
    const [users, setUsers] = useState([]);

    const inputName = useRef();
    const inputAge = useRef();
    const inputEmail = useRef();

  async function getUsers() {
    const userFromApi = await api.get('/usuarios');

    setUsers(userFromApi.data)
  }

  async function postUsers() {
    await api.post(`/usuarios`, {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    });

    getUsers()
  }

  async function deleteUser(id) {
    await api.delete(`/usuarios/${id}`);

    getUsers();
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="container">
      <form>
        <h1>Cadastro de usuários</h1>
        <input placeholder="nome" name="nome" type="text" ref={inputName} />
        <input placeholder="idade" name="idade" type="text" ref={inputAge} />
        <input placeholder="email" name="email" type="email" ref={inputEmail} />
        <button type="button" onClick={postUsers}>Cadastrar</button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>email: <span>{user.email}</span></p>
            <p>idade: <span>{user.age}</span></p>
          </div>
          <button onClick={() => deleteUser(user.id)}>
            <img src={Trash} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
