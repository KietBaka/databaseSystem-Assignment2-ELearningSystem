import { useEffect, useState } from "react";
import { getUsers, createUser } from "../../services/userService";

function Users() {
    const [users, setUsers] = useState([{}]);


    const loadUsers = async () => {
        const data = await getUsers();
        setUsers(data);
        console.log(data);
    };

    const handleAdd = async () => {
        // await createUser({
        //     name: "Binh",
        //     email: "binh@gmail.com"
        // });
        loadUsers();
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <div>
           <h2>{JSON.stringify(users)}</h2>
        </div>
    );
}

export default Users;