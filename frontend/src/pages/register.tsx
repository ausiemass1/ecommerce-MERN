

// function Register() {
//   return <h1>Register Page</h1>;
// }

// export default Register;



import { useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios.post("https://mern.austinmasamhiri.com/api/auth/register", {
      email,
      password
    });

    alert("Registered successfully");
  };

  return (
    <div className="container">
      <h4>Register</h4>

      <form onSubmit={handleSubmit}>

      <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={e => setName(e.target.value)}
        
        />
        <input
          type="Number"
          placeholder="Age"
          value={age}
          onChange={e => setAge(e.target.value)}
          min={1}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button className="btn">Register</button>
      </form>
    </div>
  );
};

export default Register

