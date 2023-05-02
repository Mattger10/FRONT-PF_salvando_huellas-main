export default function validate ({name, email, password}){
    let errors = {}
    if (name && (name.split(" ").length !== 2 || name.split(" ")[1] === "")){
        errors = {...errors, name: "Primer nombre y apellido (ej. Juan Perez)"}
    }
    if(email && !(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))){
        errors = {...errors, email: "Introduce un email válido"}
    }
    if(password && !/.{4,16}$/.test(password)){
        errors = {...errors, password: "Debe contener entre 4 y 16 caracteres"}
    } else if (password && !/^(?=.*\d)/.test(password)){
        errors = {...errors, password: "Debe contener al menos un número"}
    }
    return errors
}