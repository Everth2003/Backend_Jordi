const { Vigilante, Persona, User, Role } = require('../models');
const bcrypt = require('bcryptjs');
exports.crearVigilante = async (req, res) => {
    const { documento, nombres, apellidos, sexo, telefono, email,fechaTurno} = req.body;

    try {
        // Verificar si ya existe una persona con ese documento
        const personaExistente = await Persona.findOne({ where: { documento } });
        if (personaExistente) {
            return res.status(400).json({ message: "La persona ya está registrada" });
        }

        // Crear una nueva Persona
        const nuevaPersona = await Persona.create({
            documento,
            nombres,
            apellidos,
            sexo,
            telefono,
            email
        });

        // Crear un nuevo Vigilante asociado a la Persona
        const nuevoVigilante = await Vigilante.create({
            idPersona: nuevaPersona.id,
            fechaTurno
        });

        // Extraer la parte del email antes del @ para el nombre de usuario
        const username = email.split('@')[0];

        // Buscar el rol "profesor"
        const role = await Role.findOne({ where: { roleName: 'Vigilante' } });
        if (!role) {
            return res.status(400).json({ message: "Rol 'vigilante' no encontrado" });
        }

        // Hashear el documento (que es la contraseña) para el usuario
        const hashedPassword = await bcrypt.hash(documento, 10);

        // Crear un nuevo Usuario asociado a la Persona
        const nuevoUsuario = await User.create({
            idPersona: nuevaPersona.id,
            idRole: role.id,
            username,
            password: hashedPassword
        })
        res.status(201).json({
            message: 'Vigilante y usuario creados exitosamente',
            data: { nuevaPersona, nuevoVigilante, nuevoUsuario }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al crear el vigilante',
            error: error.message
        });
    }
}