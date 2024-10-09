const jwt = require('jsonwebtoken');


module.exports = (rolesPermitidos) => {
    return (req, res, next) => {
      const token = req.headers['authorization'];
      if (!token) return res.status(403).send({ message: "Token no proporcionado" });
      const secret = '=I^dmT%-nAG%tBiYp55K';
      jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.status(500).send({ message: "Fallo de autenticación..." });
  
        req.userId = decoded.id;
        req.userRole = decoded.role;
  
        // Verificar si el rol del usuario está permitido
        if (!rolesPermitidos.includes(req.userRole)) {
          return res.status(403).send({ message: "No tienes permiso para acceder a esta ruta" });
        }
  
        next();
      });
    };
  };