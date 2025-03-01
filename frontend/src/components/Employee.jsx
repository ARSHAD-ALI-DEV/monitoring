import { useEffect, useState } from "react";
import { useShotStore } from "../store/useShotStore";
import { useNavigate } from "react-router-dom";

const Employee = () => {
    const { getUsers, users, setSelectedUser } = useShotStore();
    const navigate =  useNavigate()

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-6">All Users</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {users.map(user => (
                    <div onClick={() => {setSelectedUser(user); navigate("/inspect")}} key={user._id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center cursor-pointer">
                        <img src={user.avatar} alt={user.username} className="w-24 h-24 rounded-full text-text-dark object-cover mb-4" />
                        <h2 className="text-lg font-semibold text-text-dark">{user.username}</h2>
                        <p className=" text-text-dark ">{user.email}</p>
                        <p className="text-sm text-text-dark">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Employee;
