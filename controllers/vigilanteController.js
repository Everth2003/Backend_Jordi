const { Model, where } = require('sequelize');
const { Vigilante, Persona, User, Role } = require('../models');
const bcrypt = require('bcryptjs');
exports.crearVigilante = async (req, res) => {
    const { documento, nombres, apellidos, sexo, telefono, email, fechaTurno } = req.body;

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

exports.listarVigilantes = async (req, res) => {
    try {
        const vigilante = await Vigilante.findAll({
            include: [
                {
                    model: Persona,
                    as: 'persona',
                    include: [
                        { model: User, as: 'usuario' }
                    ]
                }
            ]
        })


        res.status(200).json({ vigilante });
    } catch (error) {

        console.error(error);
        res.status(500).json({ message: 'Error al listar los vigilantes', error: error.message });
    }
}


exports.eliminarVigilante = async (req, res) => {

    const { id } = req.params;

    try {
        const vigilante = await Vigilante.findByPk(id);
        if (!vigilante) {
            return res.status(404).json({ message: "Vigilante no encontrado" });
        }

        await vigilante.destroy();
        res.status(200).json({ message: 'Vigilante eliminado exitosamente' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el vigilante', error: error.message });
    }
}

exports.editarVigilante = async (req, res) => {
    const { id } = req.params; // ID del profesor a editar
    const { documento, nombres, apellidos, sexo, telefono, email, fechaTurno, username, password } = req.body;

    try {
        const vigilante = await Vigilante.findByPk(id,{include:Persona})
        if (vigilante) {
            return res.status(404).json({ message: "Vigilante no encontrado" });
        }

        await vigilante.Persona.update({
            documento,
            nombres,
            apellidos,
            sexo,
            telefono,
            email
          });

        const usuario = User.findOne({where: {idPersona: vigilante.idPersona}})
        if (usuario) {
            let newPassword = usuario.password;
            if (password) {
              newPassword = await bcrypt.hash(password, 10);  // Si hay nueva contraseña, la hasheamos
            }
      
            await usuario.update({
              username: username || usuario.username, // Si no se envía un nuevo username, se mantiene el actual
              password: newPassword
            });
          }
          res.status(200).json({ message: "Vigilante actualizado exitosamente", vigilante });
    } catch (error) {
        console.error(error);
    res.status(500).json({ message: "Error al editar el vigilante", error: error.message });
    }
}