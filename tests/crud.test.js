const {app, server} = require("../index");
const supertest = require("supertest");
const db = require("../utils/db");

const api = supertest(app);

// Get test
test("Los pacientes son recuperados en un JSON", async () => {
    await api
        .get("/pacients")
        .expect(200)
        .expect("Content-Type", /application\/json/)
});

test("Los doctores son recuperados en un JSON", async () => {
    await api
        .get("/doctors")
        .expect(200)
        .expect("Content-Type", /application\/json/)
});

test("Las citas son recuperadas en un JSON", async () => {
    await api
        .get("/citas")
        .expect(200)
        .expect("Content-Type", /application\/json/)
});

test("Las areas son recuperadas en un JSON", async () => {
    await api
        .get("/areas")
        .expect(200)
        .expect("Content-Type", /application\/json/)
});


test("Las areas son recuperadas en un JSON", async () => {
    await api
        .get("/dias")
        .expect(200)
        .expect("Content-Type", /application\/json/)
});

test("Las areas son recuperadas en un JSON", async () => {
    await api
        .get("/empleados?id=1")
        .expect(200)
        .expect("Content-Type", /application\/json/)
});

// Post test

test("Se crea un paciente en la base de datos", async () => {
    await api
        .post("/pacients")
        .send({
            nombres: "Edson Raul",
            apellidos: "Cepeda Marquez",
            fecha_nac: new Date(),
            sexo: "Hombre",
            domicilio: "Rosa,347,, Los Vitrales, Apodaca, Nuevo León",
            tel_principal: "8122942626",
            tel_secundario: "8124287896",
            correo: "raulcepedac@hotmail.com",
            fecha_reg: new Date()
        })
        .expect(200)
        .expect("Content-Type", /application\/json/)
});

test("Se crea un doctor en la base de datos", async () => {
    await api
        .post("/doctors")
        .send({
            nombre: "Lorena Maricruz Mireles Campos",
            cedula: "123456789",
            telefono: "8184530000",
            correo: "lorena@hotmail.com",
            fecha_reg: new Date(),
            id_area: 1,
            horario: {
                1: [1,2,3,4,5,6],
                2: [1,2,3,4,5,6],
                3: [1,2,3,4,5,6],
                4: [1,2,3,4,5,6],
                5: [11,12,13,14,15,16,17,18]
            }
        })
        .expect(200)
        .expect("Content-Type", /application\/json/)
});

test("Se crea una cita en la base de datos", async () => {
    await api
        .post("/citas")
        .send({
            id_hora: 1,
            id_doctor: 18,
            id_paciente: 44,
            fecha: new Date()
        })
        .expect(200)
        .expect("Content-Type", /application\/json/)
});


test("Se crea un area en la base de datos", async () => {
    await api
    .post("/areas")
    .send({
        nombre: "Dermatología",
        fecha_reg: new Date()
    })
    .expect(200)
    .expect("Content-Type", /application\/json/)
});


// Update

test("Se actualiza un paciente en la base de datos", async () => {
    await api
        .put("/pacients")
        .send({
            id_paciente: 70,
            nombres: "Edson Raul",
            apellidos: "Cepeda Marquez",
            fecha_nac: new Date(),
            sexo: "Hombre",
            domicilio: "Rosa,347,, Los Vitrales, Apodaca, Nuevo León",
            tel_principal: "8122942626",
            tel_secundario: "8124287896",
            correo: "raulcepedac@hotmail.com",
            fecha_reg: new Date()
        })
        .expect(200)
        .expect("Content-Type", /application\/json/)
});

test("Se actualiza un doctor en la base de datos", async () => {
    await api
        .put("/doctors")
        .send({
            id_doctor: 18,
            nombre: "Lorena Maricruz Mireles Campos",
            cedula: "123456789",
            telefono: "8184530000",
            correo: "lorena@hotmail.com",
            fecha_reg: new Date(),
            id_area: 1,
            horario: {
                1: [1,2,3,4,5,6],
                2: [1,2,3,4,5,6],
                3: [1,2,3,4,5,6],
                4: [1,2,3,4,5,6],
                5: [11,12,13,14,15,16,17,18]
            }
        })
        .expect(200)
        .expect("Content-Type", /application\/json/)
});

test("Se actualiza una cita en la base de datos", async () => {
    await api
        .put("/citas")
        .send({
            id_hora: 12,
            id_doctor: 18,
            id_paciente: 44,
            fecha: new Date()
        })
        .expect(200)
        .expect("Content-Type", /application\/json/)
});

test("Se actualiza un area en la base de datos", async () => {
    await api
        .put("/areas")
        .send({
            id_area: 1,
            nombre: "Dermatología",
            fecha_reg: new Date()
        })
        .expect(200)
        .expect("Content-Type", /application\/json/)
});

// Delete
test("Se elimina un paciente en la base de datos", async () => {
    await api
        .delete("/pacients")
        .send({
            id_paciente: 44
        })
        .expect(200)
        .expect("Content-Type", /application\/json/)
});

test("Se elimina un doctor en la base de datos", async () => {
    await api
        .delete("/doctors")
        .send({
            id_doctor: 34,
        })
        .expect(200)
        .expect("Content-Type", /application\/json/)
});

test("Se elimina una cita en la base de datos", async () => {
    await api
        .delete("/citas")
        .send({
            id_cita: 18,
        })
        .expect(200)
        .expect("Content-Type", /application\/json/)
});

test("Se elimina un area en la base de datos", async () => {
    await api
        .delete("/areas")
        .send({
            id_area: 26,
        })
        .expect(200)
        .expect("Content-Type", /application\/json/)
});

afterAll(() => {
    server.close()
    db.close()
})