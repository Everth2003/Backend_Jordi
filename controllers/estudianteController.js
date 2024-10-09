const { Estudiante, Persona, User, Role } = require('../models');

const bcrypt = require('bcryptjs');

exports.crearEstudiante = async (req, res) => {
    const { documento, nombres, apellidos, sexo, telefono, email, carrera } = req.body;

    try {
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

        // Crear un nuevo Estudiante asociado a la Persona
        const nuevoEstudiante = await Estudiante.create({
            idPersona: nuevaPersona.id,
            carrera
        })

        // Extraer la parte del email antes del @ para el nombre de usuario
        const username = email.split('@')[0];

        // Buscar el rol "profesor"
        const role = await Role.findOne({ where: { roleName: 'Estudiante' } });
        if (!role) {
            return res.status(400).json({ message: "Rol 'estudiante' no encontrado" });
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
            message: 'Estudiante y usuario creados exitosamente',
            data: { nuevaPersona, nuevoEstudiante, nuevoUsuario }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error al crear el vigilante',
            error: error.message
        });
    }
}


exports.listarEstudiantes = async (req, res) => {
    try {
      const estudiante = await Estudiante.findAll({
        include: [
         {  model: Persona, 
            as: 'persona',
            include: [
              { model: User, as: 'usuario' }  // Incluye 'Users' a través de 'Persona'
            ]
          }   // Incluye información del usuario asociado
        ]
      });
  
      res.status(200).json({estudiante});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al listar los estudiantes', error: error.message });
    }
  };