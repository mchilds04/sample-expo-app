import React from "react";

import { state } from "./state";
import { getUser } from "../services/usersService";

const appState = state;
export const usersState = appState.usersState;

const usersReducer = (state, action) => {
    switch (action.type) {
        case "GETTING_USER":
            return {
                ...usersState,
                gettingUser: action.payload
            };
        case "SET_SELECTED_USER":
            return {
                ...usersState,
                selectedUser: action.payload
            };
        case "UPDATE_USER_LIST":
            const updateUserList = [
                ...usersState.users,
                ...action.payload
            ];
            return {
                ...usersState,
                users: [...new Set(updateUserList)]
            };
        case "UPDATE_USER":
            const userId = usersState.selectedUser.id;
            const otherUsers = usersState.users.filter(({ id }) => id !== userId);
            const user = { ...usersState.selectedUser, ...action.payload };
            return {
                ...usersState,
                users: [...otherUsers, user],
                selectedUser: user
            };
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
};

const UsersDispatchContext = React.createContext(undefined);
const UsersStateContext = React.createContext(undefined);

const UsersProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(usersReducer, usersState);
    console.log("PROVIDER: ", JSON.stringify(state, null, 2))
    return (
        <UsersStateContext.Provider value={ state }>
            <UsersDispatchContext.Provider value={ dispatch }>
                { children }
            </UsersDispatchContext.Provider>
        </UsersStateContext.Provider>
    );
};

const useUsersDispatch = () => {
    const dispatch = React.useContext(UsersDispatchContext);
    if (dispatch === undefined) {
        throw new Error('useUsersDispatch can only be used with UsersProvider component.')
    };
    return {
        getUser: async (payload) => {
            dispatch({ type: "GETTING_USER", payload: true })
            try {
                const user = await getUser(payload)
                dispatch({ type: "SET_SELECTED_USER", payload: user })
            } catch (error) {
                dispatch({ type: "GETTING_USER", payload: false })
                dispatch({ type: "ERROR_GETTING_USER", payload: error })
            }
        },
        updateUserList: (payload) =>
            dispatch({ type: "UPDATE_USER_LIST", payload }),
        updateUser: (payload) =>
            dispatch({ type: "UPDATE_USER", payload })
    };
};

const useUsersState = () => {
    const context = React.useContext(UsersStateContext);
    if (context === undefined) {
        throw new Error('useUsersState can only be used with UsersProvider component.')
    };
    return context;
};

const useUsers = () => [useUsersState(), useUsersDispatch()];

export {
    useUsers,
    UsersProvider
};
