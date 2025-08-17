const controller = {};

// Listar usuarios
controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM prueba.usuarios", (err, rows) => {
      res.render("customers", {
        data: rows,
      });
    });
  });
};

// Guardar nuevo usuario
controller.save = (req, res) => {
  const data = req.body;
  req.getConnection((err, conn) => {
    conn.query("INSERT INTO prueba.usuarios SET ?", [data], (err) => {
     
      res.redirect("/");
    });
  });
};

// Eliminar usuario
controller.delete = (req, res) => {
  const { id } = req.params;

  req.getConnection((err, conn) => {
    conn.query(
      "DELETE FROM prueba.usuarios WHERE idusuario = ?",
      [id],
      (err) => {
        res.redirect("/");
      }
    );
  });
};

// Mostrar formulario de edición
controller.edit = (req, res) => {
  const { id } = req.params;

  req.getConnection((err, conn) => {
    conn.query(
      "SELECT * FROM prueba.usuarios WHERE idusuario = ?",
      [id],
      (err, rows) => {

        if (rows.length === 0) {
          return res.status(404).send("Usuario no encontrado");
        }

        res.render("edit", {
          usuario: rows[0], 
        });
      }
    );
  });
};

// Actualizar usuario
controller.update = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  req.getConnection((err, conn) => {
    if (err) {
      console.error("Error de conexión:", err);
      return res.status(500).send("Error de conexión a la base de datos");
    }

    conn.query(
      "UPDATE prueba.usuarios SET ? WHERE idusuario = ?",
      [data, id],
      (err) => {
        res.redirect("/");
      }
    );
  });
};

module.exports = controller;
