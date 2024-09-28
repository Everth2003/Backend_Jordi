const bcrypt = require('bcryptjs');

const { User, Persona, Role } = require('../models');

exports.crearUser = async (req, res) => {
    const { documento, nombres, apellidos, sexo, telefono, email, roleName, username, password } = req.body;

    try {
        // Verificar si la persona ya existe
        const personaExistente = await Persona.findOne({ where: { documento } });
        if (personaExistente) {
            // Verificar si ya existe un usuario asociado a esa persona
            const usuarioExistente = await User.findOne({ where: { idPersona: personaExistente.id } });
            if (usuarioExistente) {
                return res.status(400).json({ message: "El usuario ya está registrado para esta persona" });
            }

            // Si la persona existe pero no el usuario, crear el usuario
            const role = await Role.findOne({ where: { roleName } });
            if (!role) {
                return res.status(400).json({ message: "Rol no válido" });
            }

            // Hashear la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Crear el nuevo usuario
            const newUser = await User.create({
                idPersona: personaExistente.id,
                idRole: role.id,
                username,
                password: hashedPassword
            })
            return res.status(201).json({ message: "Usuario creado exitosamente para la persona existente", user: newUser, persona: personaExistente });
        }


        // Si la persona no existe, crear persona y usuario
        const newPersona = await Persona.create({
            documento,
            nombres,
            apellidos,
            sexo,
            telefono,
            email
        });
        // Buscar el rol por nombre
        const role = await Role.findOne({ where: { roleName } });
        if (!role) {
            return res.status(400).json({ message: "Rol no válido" });
        }
        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el nuevo usuario
        const newUser = await Users.create({
            idPersona: newPersona.id,
            idRole: role.id,
            username,
            password: hashedPassword
        });
        res.status(201).json({ message: "Persona y usuario creados exitosamente", user: newUser, persona: newPersona });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor", error });

    }
}
